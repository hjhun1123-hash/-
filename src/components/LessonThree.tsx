import React, { useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, HelpCircle, AlertTriangle, Scale, Archive, Flame, HeartHandshake } from "lucide-react";
import { QuizQuestion } from "../types";

export default function LessonThree() {
  const [selectedPoint, setSelectedPoint] = useState<number>(0);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // 현대사 3대 분기점 쟁점 카드 데이터
  const modernPoints = [
    {
      id: 0,
      title: "전후 처리와 연합국 최고사령관령(SCAPIN) 대 샌프란시스코 강화조약의 공백",
      icon: Scale,
      themeColor: "text-blue-600 bg-blue-50 border-blue-100",
      content: `제2차 세계대전 종전 직후, 연합국 사령부는 주권 복구 행정명령인 **SCAPIN 제677호(1946년 1월)**를 하달했습니다. 본 문서에서는 "울릉도, 제주도, 그리고 독도(Liancourt Rocks)를 일본 관할 영토 범위에서 명확히 배제한다"라고 지정하여 한국에 즉각 반환 조치했습니다.
      
      그러나 이어진 **샌프란시스코 강화조약(1951년 9월)** 체결을 준비하는 과정에서 일본의 치열하고 막대한 대미 외교 로비 공작이 가동되었습니다. 최종 조약 단어 제2조 (a)항에 "일본은 제주도, 거문도, 울릉도를 포함한 한국의 독립을 인정하고 포기한다"며 대표적인 세 섬만 기재되고 '독도'의 지명이 구체적으로 들어가지 않는 의도적 공백이 야기되었습니다. 일본은 이 틈새를 악용하여 오늘날까지 독도가 반환 영토에서 누락됐다는 왜곡을 반복 중입니다.`,
    },
    {
      id: 1,
      title: "이승만 평화선 선포와 목숨을 건 독도의용수비대의 나무 박격포 기적",
      icon: ShieldCheck,
      themeColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
      content: `강화조약 발효 직전인 **1952년 1월, 이승만 대통령은 전격적으로 '인접 해양 주권 평화선'**을 선포하여 독도 영해를 지켜냈습니다. 6·25 전쟁의 극심한 대혼란 동안 해상방위 공백을 틈타 일본 무장 순시선들이 수시로 다가와 "독도는 일본 땅" 푯말을 꽂고 어업권을 수탈하려 했습니다.
      
      이에 울릉도 청년 전역 군인을 주축으로 한 순수 민간 의병 결사대인 **'독도의용수비대(1953~1956년)'**가 자발적으로 소지품을 팔아 창설되었습니다. 변변한 중화기가 아예 없던 그들은 소나무를 둥글게 깎아 검은 칠을 하고 "대형 나무 박격포 위장 모형"을 해안 바위 요새에 성벽처럼 여러 문을 위장 거치하였습니다. 이에 속아 접근이 지체되던 적 무장 군용 순시선들을 용감 무쌍한 소총 난사 사격으로 완전하게 격퇴하고 퇴마해 정식 군대가 지키기 전까지 국가 영토를 기적적으로 독사했습니다.`,
    },
    {
      id: 2,
      title: "1998년 신한일어업협정 '중간수역' 지정 및 갈등의 전격적 재점화",
      icon: Flame,
      themeColor: "text-amber-600 bg-amber-50 border-amber-100",
      content: `1994년 유엔해양법협정 발효에 따라 200해리 배타적 경제수역(EEZ) 제도가 본격 시행되었습니다. 동해 바다는 폭이 400해리가 되지 않아 한일 간의 경제수역이 불가피하게 전 구역 겹치게 되었습니다. 결국 오랜 절충 끝에 횡적으로 타협한 **신한일어업협정(1998년 9월)**이 조인되며, 독도가 영토 기점이 아닌 양국 공동 어업 지역인 '중간수역' 경계 내부에 안착되는 난관에 직면했습니다.
      
      이는 국내적으로 주권 훼손 분란을 낳기도 했습니다. 이 틈새를 타 일본은 자국 극우 세력과 연대하여, 2005년 시마네현 조례로 왜곡된 **'다케시마의 날(2월 22일)'** 표명 조례안을 통과시켰습니다. 나아가 자국 초·중·고교 관헌 학습 지도요령 총칙 교과서를 전방위적으로 조작하여 "한국이 일본 땅 독도를 불법으로 무력 점유 중"이라는 비뚤어진 공격적 주입 교육을 단행해 오늘날 양국 차세대 간 큰 역사적 심연을 깊게 하고 있습니다.`,
    },
  ];

  // 자가 점검 골든벨 퀴즈셋
  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "세종실록지리지(1454년)에 기록된 '울릉도와 독도 두 섬이 날씨가 맑으면 눈으로 볼 수 있다'는 역사적 사실은 어떤 결정적인 주권을 입증합니까?",
      options: [
        "독도가 오키섬보다 울릉도에 지리적으로 훨씬 가깝고 영토 인지가 일찍이 확립되었음",
        "독도가 태평양 한가운데 위치했다는 소문",
        "조선 조정은 가을에만 독도를 방문했다는 사실",
        "독도에 거대 전파 망원경이 있었음"
      ],
      answerIndex: 0,
      explanation: "울릉도에서 맑은 날 또렷이 보이는 지리학적 사실(87.4km)은 울릉 거주민들이 고대 시절부터 독도를 자연스럽고 주도적으로 우리 권역 내에 인지해 영토 수호를 공인해 왔음을 가시적으로 밝혀냅니다.",
    },
    {
      id: 2,
      question: "대한제국 고종 황제가 일본의 1905년 무단 가짜 편입 조치보다 무려 5년이나 앞서 독도를 대한민국 근대 행정 구역에 국법으로 명시해 편입한 역사적 상징물은?",
      options: [
        "삼국접양지도 출판선언",
        "대한제국 칙령 제41호 (1900년 10월 25일)",
        "조선왕조 실록 봉함식",
        "경국대전 수속 개정"
      ],
      answerIndex: 1,
      explanation: "고종 황제는 1900년 10월 25일, 국가 칙령 제41호를 공식 공포하여 울릉도를 울도군으로 승격시키고 석도(돌섬=독도)를 관할권 하에 법제화하였습니다.",
    },
    {
      id: 3,
      question: "1877년 메이지유신 시기, 일본 국가 최고의 헌정 행정기관이 지시를 내려 '독도는 일본 영토의 한계와 전혀 관계없음'을 온 천하에 자각하라고 일본 내무성에 공식 하달한 문서는?",
      options: [
        "은주시청합기",
        "개정일본여지로정전도",
        "태정관 지령 (太政官 指令)",
        "시마네현 자치 강령"
      ],
      answerIndex: 2,
      explanation: "태정관 지령은 일본 역사상 국가 수반 최고 기관이 직접 공적으로 '독도는 조선 영역이기에 일본과 무관하다'고 법적 판단을 내린 파괴력 최강의 자율 증명 문서입니다.",
    },
  ];

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return; // 이미 체크하였으면 중지
    setSelectedAnswer(index);
    if (index === quizQuestions[quizIndex].answerIndex) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const ActiveIcon = modernPoints[selectedPoint].icon;

  return (
    <div className="space-y-10" id="lesson-three-root">
      {/* 챕터 타이틀 */}
      <div className="border-l-4 border-blue-600 pl-4 py-1">
        <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase font-mono">Chapter 3</span>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight mt-1">
          현대 독도 갈등의 전개와 평화적 상생 방안
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          전후 영토 획정의 혼선 속에 단행된 평화선 사수 영웅담과 갈등의 기류, 그리고 이를 슬기롭게 화해로 봉합해 갈 지류를 만납니다.
        </p>
      </div>

      {/* 3대 현대사 분기점 인터랙티브 카드 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl">
            <span className="text-xs text-blue-600 font-extrabold block mb-1 font-mono uppercase">MODERN CONFLICT SEGMENTS</span>
            <h4 className="text-sm font-bold text-slate-700">현대 독도사의 3대 쟁점 분기 기틀</h4>
            <p className="text-xs text-slate-500 mt-2">
              체계적 쟁점을 클릭하여 분기점에 따라 어우러진 주권 수호 역사 흐름을 열어보세요.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {modernPoints.map((pt) => {
              const Icon = pt.icon;
              const isSelected = selectedPoint === pt.id;
              return (
                <button
                  key={pt.id}
                  onClick={() => setSelectedPoint(pt.id)}
                  className={`text-left p-4 border rounded-xl transition-all duration-300 flex items-center gap-3 ${
                    isSelected ? "bg-white border-blue-600 shadow-sm shadow-blue-50 ring-2 ring-blue-50" : "bg-white border-gray-100 hover:bg-slate-50"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isSelected ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-gray-500"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-bold leading-normal ${isSelected ? "text-blue-700" : "text-gray-700"}`}>
                    {pt.id + 1}. {pt.title.slice(0, 30)}...
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 쟁점 상세 상자 */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className={`p-2 rounded-xl inline-block ${modernPoints[selectedPoint].themeColor}`}>
                  <ActiveIcon className="w-5 h-5" />
                </div>
                <h3 className="text-md font-bold text-slate-800">
                  {modernPoints[selectedPoint].title}
                </h3>
              </div>

              {/* 텍스트 내용 */}
              <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed space-y-4">
                {modernPoints[selectedPoint].content.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* 평화 지향 팁 */}
            <div className="mt-8 pt-4 border-t border-slate-100 bg-slate-50/50 p-4 rounded-xl flex items-start gap-2 border border-slate-100/50">
              <HeartHandshake className="w-4.5 h-4.5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-0.5">
                <span className="text-[10px] text-blue-600 font-extrabold uppercase font-mono tracking-wider">미래 지향적 평화 가이드</span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  과거사 조약의 허점과 어업 영역의 갈등을 무력 대결이나 극단적인 대립이 아닌, <b>객관적 사료 증명</b>을 무기 삼아 평화적 외교와 상호 존중으로 수렴해 가는 시민적 소양이 중요합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 미니 골든벨 자가 퀴즈 컴포넌트 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden" id="dokdo-quiz">
        {/* 장식 배경 */}
        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
          <HelpCircle className="w-60 h-60 text-white" />
        </div>

        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs text-blue-400 font-extrabold tracking-widest font-mono block">DOKDO TRIVIA GOLDENBELL</span>
            <h3 className="text-md md:text-lg font-bold text-white mt-1">독도 주권 수호 자가 학습 퀴즈</h3>
          </div>
          <span className="bg-blue-950 text-blue-300 text-xs px-2.5 py-1 rounded-full font-mono font-bold border border-blue-900">
            Q {quizIndex + 1} of {quizQuestions.length}
          </span>
        </div>

        {!quizFinished ? (
          <div className="space-y-6">
            <h4 className="text-sm font-semibold text-slate-200 leading-relaxed min-h-[48px]">
              {quizQuestions[quizIndex].question}
            </h4>

            {/* 퀴즈 선지 목록 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quizQuestions[quizIndex].options.map((opt, oIdx) => {
                const isSelected = selectedAnswer === oIdx;
                const isCorrectOpt = oIdx === quizQuestions[quizIndex].answerIndex;
                let optionStyle = "border-slate-800 text-slate-300 hover:border-slate-700 bg-slate-950/40";
                
                if (selectedAnswer !== null) {
                  if (isSelected) {
                    optionStyle = isCorrectOpt 
                      ? "bg-emerald-950/50 border-emerald-500 text-emerald-200" 
                      : "bg-red-950/50 border-red-500 text-red-200";
                  } else if (isCorrectOpt) {
                    optionStyle = "bg-emerald-950/30 border-emerald-600 text-emerald-300";
                  }
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleAnswerSelect(oIdx)}
                    disabled={selectedAnswer !== null}
                    className={`text-left p-4 border rounded-xl text-xs font-semibold leading-relaxed transition-all duration-300 flex items-start gap-2 ${optionStyle}`}
                  >
                    <span className="w-4.5 h-4.5 rounded-full bg-slate-800 text-[10px] flex items-center justify-center font-bold text-slate-300 flex-shrink-0 mt-0.5">{oIdx + 1}</span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* 설명 및 해설 */}
            {selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-slate-950/60 p-4 border border-slate-800 rounded-xl"
              >
                <div className="flex items-center gap-1.5 text-slate-300 font-bold text-xs">
                  {selectedAnswer === quizQuestions[quizIndex].answerIndex ? (
                    <span className="text-emerald-400">✨ 정답입니다! 축하합니다.</span>
                  ) : (
                    <span className="text-red-400">📝 조금 더 복습해 보세요! 정답은 {quizQuestions[quizIndex].answerIndex + 1}번입니다.</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                  <b>해설:</b> {quizQuestions[quizIndex].explanation}
                </p>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleNextQuiz}
                    className="bg-blue-600 text-[11px] font-bold text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-all cursor-pointer"
                  >
                    {quizIndex < quizQuestions.length - 1 ? "다음 문제" : "결과 확인"}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <span className="text-4xl block mb-2">🎓</span>
            <h4 className="text-base font-bold text-white">독도 퀴즈 학습이 완료되었습니다!</h4>
            <div className="mt-3">
              <span className="text-2xl font-black text-blue-400 font-mono">{quizScore}</span>
              <span className="text-slate-400 font-mono"> / {quizQuestions.length} 문제 통과</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
              사료와 지리학적 근거를 바탕으로 지위 체계를 정확하게 인지하였습니다. 미래 동해 평화 설계자가 될 훌륭한 자격을 채웠습니다!
            </p>
            <button
              onClick={resetQuiz}
              className="mt-5 border border-slate-700 hover:border-slate-600 text-xs text-slate-300 bg-slate-950/20 px-4 py-2 rounded-lg transition-all font-bold cursor-pointer"
            >
              다시 도전하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
