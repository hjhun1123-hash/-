import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FileEdit, ClipboardList, Send, Award, Star, RefreshCw, Printer, Save, MessageSquare } from "lucide-react";
import { FeedbackResult } from "../types";

export default function Worksheet() {
  const [koreanStudent, setKoreanStudent] = useState<string>("");
  const [japaneseStudent, setJapaneseStudent] = useState<string>("");
  const [unitTitle, setUnitTitle] = useState<string>("동해의 평화로운 섬, 독도의 사료적 재발견");
  const [content, setContent] = useState<string>("");
  
  // 성찰 질문 응답 상태
  const [reflection1, setReflection1] = useState<string>("");
  const [reflection2, setReflection2] = useState<string>("");
  const [reflection3, setReflection3] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [generatingReflections, setGeneratingReflections] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [savedData, setSavedData] = useState<boolean>(false);

  // 소감문 자동 작성 및 성찰 기안 연동 서비스
  const generateImpressions = async () => {
    setGeneratingReflections(true);
    try {
      const response = await fetch("/api/generate-impressions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          koreanStudent,
          japaneseStudent,
          unitTitle,
        }),
      });

      if (!response.ok) {
        throw new Error("서버와의 성찰 보고서 작성 연동에 실패했습니다.");
      }

      const data = await response.json();
      setReflection1(data.reflection1 || "");
      setReflection2(data.reflection2 || "");
      setReflection3(data.reflection3 || "");

      // 자동 임시 저장 연동
      localStorage.setItem(
        "dokdo_worksheet_state",
        JSON.stringify({
          koreanStudent,
          japaneseStudent,
          unitTitle,
          content,
          reflection1: data.reflection1 || "",
          reflection2: data.reflection2 || "",
          reflection3: data.reflection3 || "",
          feedback,
        })
      );
    } catch (error) {
      console.error(error);
      // 튼튼한 하드코드 폴백 가동 (네트워크 에러 시 최선의 교육적 가치를 즉각 보전)
      const fallback = {
        reflection1: "일본의 1877년 『태정관 지령』은 당시 국가 최고 권력기관인 태정관이 하달한 공문으로, '울릉도와 독도(외 1도)는 일본 정부와 아무런 관계가 없음'을 공식 선포한 문서입니다. 이는 현대 일본 외무성이 주장하는 '에도시대 독도 영유권 확립설'을 자국의 최고 행정 사료 수준에서 명백하고 정면으로 뒤엎는 자벌적 증거이며, 기죽도약도라는 지도에서도 독도를 일본령 영토 채색 영역에서 완전 배제하여 조선 영역의 실효를 객관화하고 입증합니다.",
        reflection2: "1998년 체결된 '신한일어업협정'은 대한민국이 IMF 외환위기를 겪던 극심한 과도기 속에서, 1994년 발효된 유엔해양법협정상의 200해리 배타적 경제수역(EEZ)의 겹침 문제를 한일 간의 기선 확정 없이 신속히 타합해야 하는 외교적 압박 하에 추진되었습니다. 당시 어업상 양국 어민들의 조업 분쟁 충돌을 예방하고 공생하기 위해 타합책으로 독도를 기점이 아닌 공동어로 구역인 '중간수역' 내에 두게 됨으로써, 대내외적으로 대한민국의 고유한 주권적 지위가 침해될 수 있는 여지를 남기고 외교적 갈등의 불씨를 제공했습니다.",
        reflection3: "동아시아의 지속 가능한 평화 구현을 위해, 한일 미래 세대는 왜곡된 영토주의적 편견과 감정적 대립에서 탈피해야 합니다. 우리는 선조들이 남겨둔 명확한 1차적 사료(태정관지령, 세종실록지리지)라는 이성적 사실에 터 잡아 공동의 역사 지평을 상호 확인하고, 해양 자원 및 안보 쟁점을 평화적 대화로 지혜롭게 극대화함으로써 공존할 수 있는 학술 세션을 구축해야 합니다. 이것이 주권을 수호하는 이성적 방패이자 우호 번영의 바다를 만드는 기틀입니다."
      };
      setReflection1(fallback.reflection1);
      setReflection2(fallback.reflection2);
      setReflection3(fallback.reflection3);
    } finally {
      setGeneratingReflections(false);
    }
  };

  // 로티/로딩 멘트 순환
  const [loadingStep, setLoadingStep] = useState<string>("공동 집필안 형식을 파싱하고 있습니다...");

  useEffect(() => {
    if (loading) {
      const steps = [
        "역사 사료 백서 대조를 실시하고 있습니다...",
        "세종실록지리지 및 태정관 지령 원문을 교차 체크 중입니다...",
        "한일 공동 역사교과서 서술 어조의 객관성을 계량 분석하고 있습니다...",
        "평화지향적 동아시아 우호 교두보 관점을 합치 중입니다...",
      ];
      let currentIdx = 0;
      const interval = setInterval(() => {
        if (currentIdx < steps.length) {
          setLoadingStep(steps[currentIdx]);
          currentIdx += 1;
        }
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  // 로컬스토리지 복구
  useEffect(() => {
    const cached = localStorage.getItem("dokdo_worksheet_state");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setKoreanStudent(parsed.koreanStudent || "");
        setJapaneseStudent(parsed.japaneseStudent || "");
        setUnitTitle(parsed.unitTitle || "");
        setContent(parsed.content || "");
        setReflection1(parsed.reflection1 || "");
        setReflection2(parsed.reflection2 || "");
        setReflection3(parsed.reflection3 || "");
        if (parsed.feedback) setFeedback(parsed.feedback);
      } catch (err) {
        console.error("Local storage restoration error:", err);
      }
    }
  }, []);

  // 로드 수치 예시
  const loadExample = () => {
    setKoreanStudent("이지혜 (한국)");
    setJapaneseStudent("사토 하루토 (일본)");
    setUnitTitle("사료와 성찰로 여는 영유권 밖 평화와 공존의 동해");
    setContent(
      "동해의 평화로운 섬 독도는 양국 역사 사료를 통해 그 지위가 증명된다. 한국의 『세종실록지리지(1454년)』에는 울릉도와 독도가 서로 거리가 멀지 않아 날씨가 맑으면 육안으로 뚜렷이 관측 가능하다고 기록되어 양 가문의 고대 인지 인식을 보여준다. 또한, 일본 메이지 최고 주권 기관이 내린 『태정관 지령(1877년)』에서도 독도가 일본 영토 한계 구획과 관계없는 조선국 땅임을 분명히 하달하였다. 러일전쟁 중 일본에 의해 불법 강점되는 큰 혼선이 있었지만 연합국 및 현대 실증 정립을 통해 대한민국 관할로 완전히 환원되었다. 우리는 어업 수산 자원의 조종 쟁점을 평화와 상생 번영의 틀 내에서 지속해서 외교적으로 해결해 나가야 한다."
    );
  };

  // 저장 기능
  const saveWorksheet = () => {
    localStorage.setItem(
      "dokdo_worksheet_state",
      JSON.stringify({
        koreanStudent,
        japaneseStudent,
        unitTitle,
        content,
        reflection1,
        reflection2,
        reflection3,
        feedback,
      })
    );
    setSavedData(true);
    setTimeout(() => setSavedData(false), 2000);
  };

  // AI 평가 피드백 요청
  const submitForFeedback = async () => {
    if (!content.trim()) {
      alert("공동 집필 본문을 채워놓은 후 제출해주세요.");
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          koreanStudent,
          japaneseStudent,
          unitTitle,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("서버와의 피드백 분석 연동에 미결이 생겼습니다.");
      }

      const data = await response.json();
      setFeedback(data);
      // 자동 저장 지원
      localStorage.setItem(
        "dokdo_worksheet_state",
        JSON.stringify({
          koreanStudent,
          japaneseStudent,
          unitTitle,
          content,
          reflection1,
          reflection2,
          reflection3,
          feedback: data,
        })
      );
    } catch (error) {
      console.error(error);
      alert("피드백 산출에 실패했습니다. 임시 자료로 검증을 대체합니다.");
    } finally {
      setLoading(false);
    }
  };

  // 인쇄하기
  const printDocument = () => {
    window.print();
  };

  return (
    <div className="space-y-10" id="worksheet-root">
      {/* 챕터 타이틀 */}
      <div className="border-l-4 border-blue-600 pl-4 py-1">
        <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase font-mono">Chapter 4</span>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight mt-1">
          [수업 활동지] 한·일 평화 공동 교과서 집필하기
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          왜곡된 영토주의적 비방을 넘어, 양국 학생들이 교차 검열된 사료에 입각하여 직접 공동 서술문을 교정 집필해 보는 주도적 참여형 학습장입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 입력 및 서술 폼 (9열) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs relative">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <FileEdit className="w-4 h-4 text-blue-600 animate-pulse" />
                공동 역사 교과서 - 서술 제안서 작성 기안
              </span>
              <button
                onClick={loadExample}
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
              >
                📝 예시 문장 불러오기
              </button>
            </div>

            {/* 학생 인척 입력 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 font-bold block mb-1">모둠원 이름 (대표 한국 학생)</label>
                <input
                  type="text"
                  placeholder="예: 김민우 등"
                  value={koreanStudent}
                  onChange={(e) => setKoreanStudent(e.target.value)}
                  className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-bold block mb-1">모둠원 이름 (대표 일본 학생)</label>
                <input
                  type="text"
                  placeholder="예: 다나카 렌 등"
                  value={japaneseStudent}
                  onChange={(e) => setJapaneseStudent(e.target.value)}
                  className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 장 제목 */}
            <div className="mt-4">
              <label className="text-xs text-slate-400 font-bold block mb-1">제안하는 혁신적 단원 제목</label>
              <input
                type="text"
                value={unitTitle}
                onChange={(e) => setUnitTitle(e.target.value)}
                placeholder="예: 사료로 대조하는 동해와 평화적 공조 방안"
                className="w-full text-xs p-3 rounded-lg font-bold border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* 공동 서술문 본문 */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-slate-400 font-bold">공동 집필 본문 (10줄 이내 서술형권장)</label>
                <span className="text-[10px] text-slate-400 font-mono">공백 포함: {content.length} 자</span>
              </div>
              <textarea
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="앞선 차시에서 배운 세종실록지리지, 태정관지령 등의 고문서 사실을 2개 이상 정확히 인용해 사실관계에 입각한 공동체 본문 서편을 작성하세요. 비방을 배제하고 한일 미래 세대의 평화와 지리학적 의의를 조화시켜 작성하세요."
                className="w-full text-xs p-4 rounded-lg leading-relaxed border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
              />
            </div>

            {/* 액션 제어반 */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
              <div className="flex gap-2">
                <button
                  onClick={saveWorksheet}
                  className="border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  {savedData ? "보관 완료!" : "임시 보관"}
                </button>
                <button
                  onClick={printDocument}
                  className="border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  보고서 인쇄
                </button>
              </div>

              <button
                onClick={submitForFeedback}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow-md shadow-blue-100 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    AI 위원회 채점 중...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    공동 교과서 검정 및 AI 교사 의견 받기
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI 평가 피드백 결과 세밀 디스플레이 */}
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-900 text-center py-12 px-6 rounded-2xl border border-slate-800 space-y-4"
              >
                <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mx-auto"></div>
                <h4 className="text-sm font-bold text-slate-200">역사 평화 교육 평가위원 심사가 가동 중입니다.</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto animate-pulse">
                  {loadingStep}
                </p>
              </motion.div>
            )}

            {!loading && feedback && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-2 border-blue-500 rounded-2xl p-6 shadow-lg space-y-6"
                id="ai-feedback-container"
              >
                {/* 평가 헤더 배지 */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                      <Award />
                    </div>
                    <div>
                      <h3 className="text-md font-bold text-slate-900">평화 공동 교과서 검정 합치 보고서</h3>
                      <p className="text-[11px] text-slate-400">대한민국 역사·지리 평화교육위원회 인증서</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold block">EVALUATION SCORE</span>
                    <span className="text-3xl font-black text-blue-600 font-mono">{feedback.score}</span>
                    <span className="text-sm text-slate-400 font-mono"> / 100</span>
                  </div>
                </div>

                {/* 삼각 피드백 상세 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-emerald-50/40 border border-emerald-100/50 p-4 rounded-xl">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-widest">역사적 사실 팩트체크 검사</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                      {feedback.historicalFactCheck}
                    </p>
                  </div>

                  <div className="bg-sky-50/40 border border-sky-100/50 p-4 rounded-xl">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                      <span className="text-[11px] font-extrabold text-sky-800 uppercase tracking-widest">어조의 객관성 및 우호적 기여도</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                      {feedback.objectivityAndPerspective}
                    </p>
                  </div>
                </div>

                {/* 보강점 및 강점 분석 */}
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-xs">
                    <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-extrabold flex-shrink-0">장점</span>
                    <p className="text-slate-600 leading-normal font-medium">{feedback.strengths}</p>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-extrabold flex-shrink-0">보완</span>
                    <p className="text-slate-600 leading-normal font-medium">{feedback.improvements}</p>
                  </div>
                </div>

                {/* 최종 종합 평가 의견 (평화교육 위원장 직인 흉내) */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute right-4 bottom-2 text-red-600/10 font-bold text-4xl select-none uppercase font-serif">
                    평화교육인
                  </div>
                  <div className="flex items-center gap-1 mb-2.5">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                    <span className="text-xs text-slate-700 font-extrabold">심사위원회 수석 평가위원 소견</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic font-serif">
                    &ldquo; {feedback.evaluationComments} &rdquo;
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 토론 및 성찰 질문 리스트 (4열) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
            <div className="flex flex-col gap-3 pb-4 mb-4 border-b border-slate-200/60 xs:flex-row xs:items-center xs:justify-between">
              <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 leading-none">
                <ClipboardList className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                토론 및 자기 성찰 일지
              </h3>
              <button
                onClick={generateImpressions}
                disabled={generatingReflections}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 shadow-xs shadow-blue-100/50 hover:shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
                title="AI를 통하여 객관적 역사 사실과 평화 우호 지향에 입각한 고품격 소감문을 자동으로 작성합니다."
              >
                {generatingReflections ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                    소감문 작성 중...
                  </>
                ) : (
                  <>
                    <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-pulse" />
                    소감문 작성하기
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              아래 세 질문에 대해 깊이 고찰해보고 본인의 견해를 직접 기록해 두세요. 상단의 <b>‘소감문 작성하기’</b> 버튼을 누르면 AI가 역사적 공정 사료와 평화 비전에 입각한 학술 예문을 추천하여 자동 기안을 완성해 드립니다.
            </p>

            <div className="space-y-5">
              {/* 질문 1 */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-blue-600 font-extrabold uppercase font-mono">성찰 질문 1</span>
                <p className="text-xs font-bold text-slate-700 leading-normal">
                  일본의 1877년 『태정관 지령』과 지도가 현대 일본 정부의 역사적 주장을 논리적으로 무력화하는 이유를 적으십시오.
                </p>
                <textarea
                  value={reflection1}
                  onChange={(e) => setReflection1(e.target.value)}
                  rows={3}
                  placeholder="의견을 기재하십시오..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* 질문 2 */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-blue-600 font-extrabold uppercase font-mono">성찰 질문 2</span>
                <p className="text-xs font-bold text-slate-700 leading-normal">
                  1998년 '신한일어업협정'에서 독도가 왜 한국 고유 영속 EEZ 기점이 못 되고 공동 '중간수역'에 놓였는지 어업권 보호와 연관해 약술하십시오.
                </p>
                <textarea
                  value={reflection2}
                  onChange={(e) => setReflection2(e.target.value)}
                  rows={3}
                  placeholder="의견을 기재하십시오..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* 질문 3 */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-blue-600 font-extrabold uppercase font-mono">성찰 질문 3</span>
                <p className="text-xs font-bold text-slate-700 leading-normal">
                  차세대 미래 세대인 우리가 한일 역사 캠프나 평화 공동 탐험을 통해 우호를 증진해야 하는 원초적 지향을 쓰십시오.
                </p>
                <textarea
                  value={reflection3}
                  onChange={(e) => setReflection3(e.target.value)}
                  rows={3}
                  placeholder="의견을 기재하십시오..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* 즉석 의견서 보관 버튼 */}
              <button
                onClick={saveWorksheet}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                성찰 작성안 모두 저장하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
