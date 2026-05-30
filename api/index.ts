import express from "express";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// API: 독도 공동 교과서 집필 내용 AI 피드백 평가
app.post("/api/evaluate", async (req, res) => {
  const { koreanStudent, japaneseStudent, unitTitle, content } = req.body;

  if (!content || content.trim().length === 0) {
    return res.status(400).json({ error: "본문 내용을 입력해주세요." });
  }

  try {
    // API 키 확인
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      // 로컬 테스트 혹은 API 키가 활성화되지 않았을 때의 우아한 목 대체 피드백
      console.warn("GEMINI_API_KEY is not configured or uses default value. Returning simulated feedback.");
      return res.json({
        score: 85,
        historicalFactCheck: "[시뮬레이션 피드백] 작성한 서술에 세종실록지리지(1454년) 또는 태정관 지령(1877년)이 잘 언급되었습니다. 역사적 사실에 부합합니다.",
        objectivityAndPerspective: "[시뮬레이션 피드백] 감정적인 비난을 배제하고 한일 양국의 협력과 미래지향적 상생을 차분한 어조로 제안하였습니다.",
        strengths: "과거 갈등의 사실관계를 역사적 문헌에 기초하여 조리 있게 정립하고, 마무리에 동해를 평화와 공동 번영의 바다로 가꾸자는 메시지가 인상적입니다.",
        improvements: "대한제국 칙령 제41호(1900년) 등 국제법적으로 독도가 근대 행정 구역에 명확히 편입된 사실을 추가하면 주장의 객관적 정당성이 한층 더 강화될 것입니다.",
        evaluationComments: "역사적 공백을 편견 없이 상호 신뢰와 문헌 대조를 통해 해결하려는 노력이 돋보이는 모범적인 공동 집필문입니다. 한일 우호의 훌륭한 길잡이가 될 수 있습니다."
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const prompt = `
      한일 중고등학생이 공동 집필한 역사 교과서 서술문 초안을 분석하고 교육적이고 유용한 피드백을 작성해주세요.
      
      [정보]
      - 한국 학생 이름: ${koreanStudent || "미지정"}
      - 일본 학생 이름: ${japaneseStudent || "미지정"}
      - 단원 제목: ${unitTitle || "독도와 동해의 평화적 이해"}
      - 공동 집필 본문 내용:
      "${content}"

      [평가 기준]
      1. 독도의 지리적 사실과 한·일 핵심 고문서 사료(예: 세종실록지리지, 태정관지령, 삼국접양지도 등)를 2개 이상 올바르게 제시/활용했는가?
      2. 일방적인 비난이나 감정적 표현을 배제하고, 사실(Fact)에 기반한 기술을 하였는가?
      3. 동아시아 내에서 한일 미래 세대의 평화와 공동 번영을 지향하고 있는가?

      반드시 제공된 JSON 스키마에 맞추어 한국어로 정밀하게 피드백을 전달해주세요.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "score",
            "historicalFactCheck",
            "objectivityAndPerspective",
            "strengths",
            "improvements",
            "evaluationComments",
          ],
          properties: {
            score: {
              type: Type.INTEGER,
              description: "0점부터 100점 사이의 전체 평가 점수 (정수)",
            },
            historicalFactCheck: {
              type: Type.STRING,
              description: "고문서 사료의 인용 사실성 및 설명 정확도 평가 (1-2문장)",
            },
            objectivityAndPerspective: {
              type: Type.STRING,
              description: "술어의 객관성 점검 및 감정 대조 표현 유무 검토 (1-2문장)",
            },
            strengths: {
              type: Type.STRING,
              description: "작성서의 뛰어난 문학적, 사실적, 평화지향적 강점 (1-2문장)",
            },
            improvements: {
              type: Type.STRING,
              description: "사료 보충 또는 표현 개선점 조언 (1-2문장)",
            },
            evaluationComments: {
              type: Type.STRING,
              description: "한일 평화 교육 위원회 명의의 따뜻하고 정중한 전체 종합 평가 및 격려사 (3-4문장)",
            },
          },
        },
        systemInstruction: "당신은 대한민국 역사·지리 평화교육위원회의 수석 교육 평가위원이자 역사 교사입니다. 학생들의 인성을 정진시키고 한디자 성장을 돕도록 따뜻하며 사실 지향적인 고도의 교육적 피드백을 건네주세요.",
      },
    });

    const jsonStr = response.text?.trim() || "{}";
    const feedbackData = JSON.parse(jsonStr);
    return res.json(feedbackData);

  } catch (error: any) {
    console.error("Gemini API Error in api/index.ts evaluate:", error);
    res.status(500).json({
      error: "AI 피드백 연산 중 오류가 발생했습니다.",
      details: error.message,
    });
  }
});

// API: 독도 영토 주권 교육 소감문 및 성찰 질문 자동 작성
app.post("/api/generate-impressions", async (req, res) => {
  const { koreanStudent, japaneseStudent, unitTitle } = req.body;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      console.warn("GEMINI_API_KEY is not configured or uses default value. Returning high-quality simulated reflections.");
      return res.json({
        reflection1: `일본의 1877년 『태정관 지령』은 당시 국가 최고 권력기관인 태정관이 하달한 공문으로, '울릉도와 독도(외 1도)는 일본 정부와 아무런 관계가 없음'을 공식 선포한 문서입니다. 이는 현대 일본 외무성이 주장하는 '에도시대 독도 영유권 확립설'을 자국의 최고 행정 사료 수준에서 명백하고 정면으로 뒤엎는 자벌적 증거이며, 기죽도약도라는 지도에서도 독도를 일본령 영토 채색 영역에서 완전 배제하여 조선 영역의 실효를 객관화하고 입증합니다.`,
        reflection2: `1998년 체결된 '신한일어업협정'은 대한민국이 IMF 외환위기를 겪던 극심한 과도기 속에서, 1994년 발효된 유엔해양법협정상의 200해리 배타적 경제수역(EEZ)의 겹침 문제를 한일 간의 기선 확정 없이 신속히 타합해야 하는 외교적 압박 하에 추진되었습니다. 당시 어업상 양국 어민들의 조업 분쟁 충돌을 예방하고 공생하기 위해 타합책으로 독도를 기점이 아닌 공동어로 구역인 '중간수역' 내에 두게 됨으로써, 대내외적으로 대한민국의 고유한 주권적 지위가 침해될 수 있는 여지를 남기고 외교적 갈등의 불씨를 제공했습니다.`,
        reflection3: `동아시아의 지속 가능한 평화 구현을 위해, 한일 미래 세대는 왜곡된 영토주의적 편견과 감정적 대립에서 탈피해야 합니다. 우리는 선조들이 남겨둔 명확한 1차적 사료(태정관지령, 세종실록지리지)라는 이성적 사실에 터 잡아 공동의 역사 지평을 상호 확인하고, 해양 자원 및 안보 쟁점을 평화적 대화로 지혜롭게 극대화함으로써 공존할 수 있는 학술 세션을 구축해야 합니다. 이것이 주권을 수호하는 이성적 방패이자 우호 번영의 바다를 만드는 기틀입니다.`
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const prompt = `
      한일 역사 및 지리 수업의 '토론 및 자기 성찰 일지'에 들어갈 성찰 소감 답변 3가지를 학술적이고 정중한 문체로 작성해주세요.
      이 소감문은 한일 미래 세대의 평화와 객관적 사료 증명에 근거해야 합니다.

      [인적 정보]
      - 한국 대표 학생 이름: ${koreanStudent || "대한민국 학생"}
      - 일본 대표 학생 이름: ${japaneseStudent || "일본 학생"}
      - 단원 제목: ${unitTitle || "독도와 동해의 평화적 이해"}

      [요청 질문 형식]
      질문1: 일본의 1877년 『태정관 지령』과 지도가 현대 일본 정부의 역사적 주장을 논리적으로 무력화하는 이유
      질문2: 1998년 '신한일어업협정'에서 독도가 왜 한국 고유 EEZ 기점이 못 되고 공동 '중간수역'에 놓였는지 당시 외교/어업적 배경과 타합 이유
      질문3: 차세대 미래 세대인 우리가 한일 역사 캠프나 평화 공동 탐험을 통해 우호를 증진하고 주권을 지키는 방법/의의

      정중하고 지적이며 평화지향적인 존댓말(또는 격식있는 진술체) 한국어로 작성하여 제공된 JSON 스키마에 맞추어 전달해주세요.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "reflection1",
            "reflection2",
            "reflection3",
          ],
          properties: {
            reflection1: {
              type: Type.STRING,
              description: "질문 1에 대한 깊이 있는 답변 (250자 내외)",
            },
            reflection2: {
              type: Type.STRING,
              description: "질문 2에 대한 정밀한 역사적/어업적 배경 분석 답변 (250자 내외)",
            },
            reflection3: {
              type: Type.STRING,
              description: "질문 3에 대한 미래지향적 평화 지향 답변 (250자 내외)",
            },
          },
        },
        systemInstruction: "당신은 한일 역사 평화 협의체의 원로 연구원이자 수석 평화교육관입니다. 학생들이 역사의 엄정한 사료 진실에 기반하면서도 이성적이고 상생을 꿈꾸도록 고도로 성찰적인 답변을 작성해주세요.",
      },
    });

    const jsonStr = response.text?.trim() || "{}";
    const resultData = JSON.parse(jsonStr);
    return res.json(resultData);

  } catch (error: any) {
    console.error("Gemini API Error details in generate-impressions API:", error);
    res.status(500).json({
      error: "소감문 생성 중 예기치 못한 오류가 생겼습니다.",
      details: error.message,
    });
  }
});

export default app;
