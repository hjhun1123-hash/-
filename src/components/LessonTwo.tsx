import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, FileText, Map, ShieldAlert, CheckCircle, ArrowRight, BookMarked, Award } from "lucide-react";

export default function LessonTwo() {
  const [activeTab, setActiveTab] = useState<"korea" | "japan" | "maps">("korea");
  const [activeStep, setActiveStep] = useState<number>(0);

  // 한국 고문서 사료 데이터
  const koreanSources = [
    {
      title: "세종실록지리지",
      year: 1454,
      quote: "우산(于山, 독도)과 무릉(武陵, 울릉도) 두 섬이 강원도 울진현의 정동쪽 바다에 있다. 두 섬이 서로 거리가 멀지 않아 날씨가 맑으면 바라볼 수 있다.",
      significance: "독도의 독자적인 지리적 가시성과 실질적 생활 영역의 존재를 15세기에 이미 관찬 행정 백서에 공식적으로 정확히 명시해 정립해 둔 대기록입니다.",
    },
    {
      title: "신증동국여지승람",
      year: 1531,
      quote: "울릉도와 우산도(독도)가 강원도 울진현 조에 수록되었으며, 부속 지도로 팔도총도가 삽입되어 조선의 영해 내 두 개의 별개 도서 주권을 영토로 명문화했습니다.",
      significance: "관찬 지리지 및 국가 공인 팔도총도를 통해 독도가 조선 왕조의 영토 구획체계에 체계적이고 명확히 관리되고 있음을 사료상 공포한 문서입니다.",
    },
    {
      title: "만기요람 군정편",
      year: 1808,
      quote: "여지지에 이르기를, 울릉과 우산은 모두 우산국의 땅인데, 우산은 왜인(일본인)들이 말하는 송도(松島)다.",
      significance: "당시 일본 어민들이 독도를 자신들의 가상의 단어인 '송도(Matsushima)'로 호칭하고 있었으나, 조선 정부는 이 송도가 조선 우산국 지위 영역 내의 우리 고유 영토이자 주권 대상인 우산도와 완벽히 잃지 않고 일치함을 명징하게 분석해 밝혀둔 실재 자료입니다.",
    },
    {
      title: "대한제국 칙령 제41호",
      year: 1900,
      date: "10월 25일",
      quote: "울릉도를 ‘울도군’(鬱島郡)으로 격상하고 군수를 파견한다. 관할 구역으로 울릉전도, 죽도 및 석도(石島, 독도)를 관할한다.",
      significance: "중요성 최고 등급! 고종 황제는 일본이 독도를 무단으로 오키지마현에 강제 불법 편입하려 시도한 시기(1905년)보다 무려 5년이나 앞서, 근대 행정 구역령인 국가 수반 조칙 칙령을 공포하여 명확한 법률적 영토 지위를 사전에 대내외에 확고히 정립해 냈습니다.",
    },
  ];

  // 일본 고문서 사료 데이터 (주권 배제 자백 사료)
  const japaneseSources = [
    {
      title: "은주시청합기 (隱州視聽合記)",
      year: 1667,
      author: "사이토 호센",
      quote: "일본 시마네현 서북 끝 오키섬을 우리의 한계(Boundary)로 삼고, 울릉도(죽도)와 독도(송도)는 조선국(고려)의 영토로 간주한다.",
      significance: "일본 관리가 국가의 공식 조사를 통해 일본 자국의 영토 경계 경계선을 오키섬으로 명문화하고, 독도와 울릉도는 명확히 자국 밖 타국 영토(조선국) 영역임을 일찍이 분명하게 시인하고 국경 한계를 자인할 수밖에 없었던 기록물입니다.",
    },
    {
      title: "조선국 교제시말 내탐서",
      year: 1870,
      author: "일본 메이지 외무성 관리들",
      quote: "메이지 외무성 고위직들이 조선 상황을 내탐하고 최고 기관에 보고한 공문서: '죽도(울릉도)와 송도(독도)가 조선 영역으로 공식 귀속되어 귀결된 자초지종 및 전말'을 기록.",
      significance: "메이지 유신 직후 일본 정부 스스로가 독도와 울릉도를 확실한 조선 왕조의 직속 주권 영역으로 강력하게 명확하게 인식하고 감시 보고하고 있었음을 증명하는 공사 주권 배제 실존 증거입니다.",
    },
    {
      title: "태정관 지령 (太政官 指令)",
      year: 1877,
      quote: "메이지 최고 행정권 태정관이 내무성에 공식 하달: 저들이 질의한 '울릉도와 독도(외 일도)'에 대한 건은 메이지 정부(본방) 및 자국 일본 영토와 하등 깊이 관계없음을 마음 깊이 명심하여 지침을 집행할 것.",
      significance: "가장 결정적 폭탄 사료! 당시 총리대신 급인 태정관에서 범국가적 영유권 합의를 통해 '독도는 일본 영토가 아니다'라고 공적인 최종 행정적 공식 조치를 내렸으며, 첨부된 지도 '기죽도약도'에 독도를 자국 영역 밖 타국색으로 빼서 증명해 두었습니다.",
    },
  ];

  // 고지도 데이터
  const mapSources = [
    {
      title: "조선 팔도총도 (1531년)",
      origin: "KOREA",
      desc: "신증동국여지승람에 첨부된 대조선 전도로서 동해상에 울릉도와 우산도(독도)를 국가 영토 범위 내에 뚜려하게 그려넣은 최초의 관판 목판인쇄 지도입니다.",
    },
    {
      title: "개정 일본여지로정전도 (1779년)",
      origin: "JAPAN",
      desc: "일본 지리학 거장 나가쿠보 세키스이가 제작하여 에도 막부 관허를 얻은 대표적 공인 지도. 일본 영토 내는 조밀하고 컬러풀하게 염색한 반면, 동해상의 울릉도와 독도는 투명한 무색인 백색으로 남겨놓아 일본 국외 영역(조선 영도)임을 지도로 솔직히 고백하였습니다.",
    },
    {
      title: "삼국접양지도 (1785년)",
      origin: "JAPAN",
      desc: "일본의 저명 지식인 하야시 시헤이가 제작한 삼국 국경 구도 지도. 국가 구획별로 완벽한 컬러 구분을 적용하여 조선 한반도를 황색(Yellow)으로 칠한 후, 울릉도와 독도 역시 정확하게 한반도와 일치하는 동일한 황색 컬러를 바르고 그 옆에 조선의 소유(朝鮮ノ持, 조선 소유)임을 대문자로 명기해 못 박았습니다.",
    },
  ];

  // 안용복 사건 외교 연정 단계별 데이터
  const anSteps = [
    {
      title: "1차 도일 및 주권 성토 (1693년)",
      desc: "평범한 동래 출신 어부 안용복은 울릉도 조업 중 침범한 일본 돗토리번 어민들에게 포착 및 납치되어 강제로 일본에 끌려갔습니다. 그러나 기죽지 않고 돗토리번주 앞에서 한문 편지로 '울릉도와 독도는 조선의 영토'임을 늠름하게 명명백백 성토하여 막부가 조선의 기세를 파악하게 했습니다.",
    },
    {
      title: "돗토리번 답변서 규명 (1695년)",
      desc: "막부가 영유 분쟁 조사를 위해 돗토리번에 질의를 보내자 번주는 공적 장부를 조사한 뒤 '울릉도(죽도)와 독도(송도)는 본 자수 돗토리번의 영역 소속이 단 한 번도 아닙니다'라고 자인하는 공식 문답 서한을 에도 막부에 전달 발송했습니다.",
    },
    {
      title: "에도 막부의 도해 금지령 (1696년 1월)",
      desc: "번주의 영유 불인정 및 안용복의 주장을 정밀 검토한 막부는 마침내 일본 어민들에게 울릉도와 독도 방면으로의 해외 항해 및 어로 행위를 영구적으로 일절 금지하는 전격적인 '도해 금지령'을 발표하여 영토 분쟁 주권을 인정했습니다.",
    },
    {
      title: "2차 도일 정식 통첩 (1696년 5월)",
      desc: "안용복은 도해 금지령 직후 다시 울릉도에 침입하여 고집부리던 잔여 일본 어민단을 단호하게 추방하고, 스스로 호키주 관청에 정식 항의 서류('울릉자산양도감세장')를 접수해 침략 조업 항의에 대한 호키주의 서명을 정식 기틀로 굳혔습니다.",
    },
  ];

  return (
    <div className="space-y-10" id="lesson-two-root">
      {/* 챕터 타이틀 */}
      <div className="border-l-4 border-blue-600 pl-4 py-1">
        <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase font-mono">Chapter 2</span>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight mt-1">
          사료와 지도로 규명하는 역사적 권원
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          주장과 감정을 넘어, 역사 속에 고스란히 남아 있는 국가적 1차 고문서 원본과 관허 지도가 전하는 명백한 진실을 파헤칩니다.
        </p>
      </div>

      {/* 역사 사료 교차 대조 뷰어 */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-gray-100">
          <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            한·일 양국 1차 역사적 문헌 자료실
          </h3>
          {/* 영유권 문헌 사료 구분 탭 */}
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("korea")}
              className={`text-xs px-3 py-1.5 rounded-md font-bold transition-all ${activeTab === "korea" ? "bg-white text-blue-700 shadow-xs" : "text-gray-500 hover:text-slate-800"}`}
            >
              대한민국 고문서
            </button>
            <button
              onClick={() => setActiveTab("japan")}
              className={`text-xs px-3 py-1.5 rounded-md font-bold transition-all ${activeTab === "japan" ? "bg-white text-red-700 shadow-xs" : "text-gray-500 hover:text-slate-800"}`}
            >
              일본 관찬 고문서의 고백
            </button>
            <button
              onClick={() => setActiveTab("maps")}
              className={`text-xs px-3 py-1.5 rounded-md font-bold transition-all ${activeTab === "maps" ? "bg-white text-emerald-700 shadow-xs" : "text-gray-500 hover:text-slate-800"}`}
            >
              역사 고지도 대조
            </button>
          </div>
        </div>

        {/* 탭 내용 애니메이션 */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === "korea" && (
              <motion.div
                key="korea"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {koreanSources.map((source, index) => (
                  <div key={index} className="border border-slate-100 rounded-xl p-5 hover:border-blue-100 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono">AD {source.year} {source.date && `(${source.date})`}</span>
                        <h4 className="text-sm font-extrabold text-slate-800">{source.title}</h4>
                      </div>
                      <div className="bg-white border-l-2 border-blue-500 p-3 rounded-r-lg my-3 italic text-xs text-slate-600 leading-relaxed font-serif">
                        &ldquo;{source.quote}&rdquo;
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-dashed border-slate-200">
                      <span className="text-[10px] text-blue-700 font-bold block mb-1 font-mono uppercase tracking-widest">역사적 주권적 의의</span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {source.significance}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "japan" && (
              <motion.div
                key="japan"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {japaneseSources.map((source, index) => (
                  <div key={index} className="border border-red-100 rounded-xl p-5 hover:border-red-200 bg-red-50/20 hover:bg-red-5/40 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-700 font-mono">AD {source.year} {source.author && `| ${source.author}`}</span>
                        <h4 className="text-sm font-extrabold text-slate-800">{source.title}</h4>
                      </div>
                      <div className="bg-white border-l-2 border-red-500 p-3 rounded-r-lg my-3 italic text-xs text-slate-600 leading-relaxed font-serif">
                        &ldquo;{source.quote}&rdquo;
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-dashed border-red-100">
                      <span className="text-[10px] text-red-700 font-bold block mb-1 font-mono uppercase tracking-widest">명백한 주권 배제의 고백</span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {source.significance}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "maps" && (
              <motion.div
                key="maps"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {mapSources.map((item, index) => (
                  <div key={index} className="border border-emerald-100 rounded-xl p-5 hover:border-emerald-200 bg-emerald-50/15 hover:bg-emerald-50/30 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-extrabold text-slate-800">{item.title}</h4>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${item.origin === "KOREA" ? "bg-blue-50 text-blue-700" : "bg-red-50 text-red-700"}`}>
                          {item.origin} HISTORIC
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-lg border border-emerald-50">
                        {item.desc}
                      </p>
                    </div>
                    <div className="bg-emerald-50/50 p-2 rounded-lg mt-4 flex items-center gap-2 text-[11px] text-emerald-800 font-semibold border border-emerald-100/50">
                      <CheckCircle className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" />
                      일방적인 주장을 타파하는 시각적 진실!
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 안용복 사건과 한·일 외교 교섭 인터랙티브 스텝퍼 타임라인 */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <BookMarked className="w-5 h-5 text-blue-600" />
          <h3 className="text-md font-semibold text-gray-800">
            조선의 수호 영웅 안용복과 에도 막부의 외교 문서
          </h3>
        </div>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          17세기 조선의 평범한 어부였던 안용복은 뛰어난 외교적 책략과 확신에 찬 용기로 일본 막부의 사법적 결정을 뒤흔든 역사의 위대한 거목입니다. 각 단계를 클릭하여 그의 영웅 일지를 확인하세요.
        </p>

        {/* 수평 진행바 및 번호 버튼들 */}
        <div className="relative flex justify-between items-center max-w-4xl mx-auto mb-8 px-4" id="an-timeline">
          {/* 가상 연선 */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 pointer-events-none z-0" />
          {/* 실선 진행 표시기 */}
          <div
            className="absolute top-1/2 left-0 h-1 bg-blue-500 -translate-y-1/2 pointer-events-none z-0 transition-all duration-300"
            style={{ width: `${(activeStep / (anSteps.length - 1)) * 100}%` }}
          />

          {anSteps.map((step, index) => {
            const isActive = index <= activeStep;
            const isCurrent = index === activeStep;
            return (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all duration-300 z-10 ${
                  isCurrent
                    ? "bg-blue-600 text-white border-blue-600 scale-125 shadow-md shadow-blue-200"
                    : isActive
                      ? "bg-blue-100 text-blue-800 border-blue-500"
                      : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        {/* 현재 단계 원인/결과 대조 카드 */}
        <div className="bg-white border border-slate-100 rounded-xl p-5 min-h-[140px] shadow-xs">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500 animate-pulse" />
            <h4 className="text-sm font-bold text-slate-800">
              {anSteps[activeStep].title}
            </h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mt-3">
            {anSteps[activeStep].desc}
          </p>

          {/* 다음 단계 안내 버튼 */}
          {activeStep < anSteps.length - 1 && (
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setActiveStep((prev) => prev + 1)}
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                다음 외교 성과 보기 <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
