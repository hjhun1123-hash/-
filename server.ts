import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

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
    console.error("Gemini API Error in server.ts:", error);
    res.status(500).json({
      error: "AI 피드백 연산 중 오류가 발생했습니다.",
      details: error.message,
    });
  }
});

// Vite middleware / Static client handling
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
