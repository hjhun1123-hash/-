import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Eye, MapPin, Navigation, Info, ShieldAlert, Waves, Plane } from "lucide-react";

export default function LessonOne() {
  const [activePoint, setActivePoint] = useState<string>("ulleungdo");
  const [activeTerritory, setActiveTerritory] = useState<string>("territory");

  // 지리적 포인트 데이터
  const points = {
    ulleungdo: {
      name: "울릉도 (대한민국)",
      distance: "87.4 km",
      visibility: "맑은 날 육안 관측 가능 (또렷함)",
      coords: { x: 180, y: 150 },
      desc: "울릉도의 사동, 석포마을 등 고지대에서는 독도가 눈으로 또렷이 관측됩니다. 이는 아주 먼 옛날(삼국사기 우산국 기록 등)부터 울릉도 거주민들이 동쪽 끝 독도를 인식하고 생활권이자 영토로 자연스레 편입했음을 뜻하는 결정적 지리학적 증거입니다.",
    },
    uljin: {
      name: "한반도 죽변(울진 - 대한민국)",
      distance: "216.8 km",
      visibility: "육안 관측 불가",
      coords: { x: 50, y: 220 },
      desc: "울릉도를 거쳐 독도로 이어지는 자연스러운 한반도의 영역권적 연결망을 보여줍니다.",
    },
    okishima: {
      name: "오키섬 (일본)",
      distance: "157.5 km",
      visibility: "실제 기상 환경상 절대 관측 불가",
      coords: { x: 440, y: 350 },
      desc: "일본에서 가장 가깝다고 하는 오키섬에서는 지구의 곡률(둥근 지표면)과 157.5km라는 먼 거리 한계 때문에 날씨가 아무리 맑아도 독도를 결코 바라볼 수 없습니다. 일본 어민들이 의도적인 원거리 바다 건너기(도해)를 통해서만 가야 했던 영토 인지 영역 바깥의 섬이었음을 입증합니다.",
    },
    dokdo: {
      name: "독도 (대한민국 도서)",
      distance: "기준점 (0 km)",
      visibility: "본 주권지의 중심",
      coords: { x: 320, y: 200 },
      desc: "북위 37°14'26.8\", 동경 131°52'10.4\". 동도와 서도를 비롯한 89개의 부속 바위섬으로 이루어져 있습니다. 총면적은 187,554㎡로 서울 잠실종합운동장의 약 2배 넓이입니다.",
    },
  };

  const territoryDetails = [
    {
      id: "territory",
      title: "영토 (Territory)",
      icon: MapPin,
      color: "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20",
      textColor: "text-emerald-700 dark:text-emerald-400",
      badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30",
      sub: "경상북도 울릉군 울릉읍 독도리 1~96번지",
      summary: "대한민국의 입법·행정·사법적 주권이 온전히 미치는 한반도의 행정 영토입니다.",
      keyPoint: "주민(김신열 님 외)과 독도경비대, 등대 관리원이 상주하는 실효적 지배 유인화 영토입니다.",
    },
    {
      id: "sea",
      title: "영해 (Territorial Sea)",
      icon: Waves,
      color: "border-sky-500 bg-sky-50/50 dark:bg-sky-950/20",
      textColor: "text-sky-700 dark:text-sky-400",
      badgeColor: "bg-sky-100 text-sky-800 dark:bg-sky-900/30",
      sub: "기선으로부터 12해리 (약 22.2 km)",
      summary: "대한민국은 독도 기점 주변 12해리를 주권 영해로 선포해 영유권을 행사하고 있습니다.",
      keyPoint: "대한민국 해경이 독도 주변에 불법 진입하는 일본 해상보안청 순시선 및 외국의 무단 어선들을 강력하게 상시 단속합니다.",
    },
    {
      id: "air",
      title: "영공 (Airspace)",
      icon: Plane,
      color: "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20",
      textColor: "text-indigo-700 dark:text-indigo-400",
      badgeColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30",
      sub: "영토와 영해의 상공 (대기권 수직 범위)",
      summary: "독도 영공은 대한민국의 주권 한계이며 방공식별구역(KADIZ)에 선명히 수호되고 있습니다.",
      keyPoint: "대한민국 공군 조전 및 전투기 편대가 정기 주권 수호 영비행을 성실히 해 나가며 수호하고 있습니다.",
    },
    {
      id: "eez",
      title: "배타적 경제수역 (EEZ)",
      icon: ShieldAlert,
      color: "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20",
      textColor: "text-amber-700 dark:text-amber-400",
      badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-900/30",
      sub: "영해 기선으로부터 최대 200해리",
      summary: "천연 가스 하이드레이트, 풍부한 수산 등 해양 자원의 탐사·개발에 관한 독점적 경제 권한이 부여되는 구역입니다.",
      keyPoint: "1994년 유엔해양법협정 발효 이후, 현재 한일 양국은 독도 외해 일부를 겹치는 어업 구역(중간수역)으로 조정하여 분쟁을 관리하고 있습니다.",
    },
  ];

  return (
    <div className="space-y-10" id="lesson-one-root">
      {/* 챕터 타이틀 */}
      <div className="border-l-4 border-blue-600 pl-4 py-1">
        <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase font-mono">Chapter 1</span>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight mt-1">
          독도의 지리적 특성과 영역의 이해
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          정교한 기하학적 수치와 지리학적 관측 가능 여부를 통해 독도가 한반도의 유기적 영토임을 조망합니다.
        </p>
      </div>

      {/* 동해 거리 비교 지도 및 상세 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 인터랙티브 지도 그래픽 */}
        <div className="lg:col-span-7 bg-white border border-gray-100 rounded-2xl p-6 shadow-xs relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: "12s" }} />
              영토적 자각의 지도 (거리 비교)
            </h3>
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
              거점을 클릭해 비가시성 대비 분석
            </span>
          </div>

          <div className="w-full h-[400px] bg-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-800">
            {/* 동해 배경 무늬 바다 */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 500 400">
              {/* 울진 -> 독도 연결선 */}
              <line
                x1={points.uljin.coords.x}
                y1={points.uljin.coords.y}
                x2={points.dokdo.coords.x}
                y2={points.dokdo.coords.y}
                stroke="#64748b"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
              {/* 울릉도 -> 독도 연결선 */}
              <line
                x1={points.ulleungdo.coords.x}
                y1={points.ulleungdo.coords.y}
                x2={points.dokdo.coords.x}
                y2={points.dokdo.coords.y}
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="1 1"
                className="animate-pulse"
              />
              {/* 오키섬 -> 독도 연결선 */}
              <line
                x1={points.okishima.coords.x}
                y1={points.okishima.coords.y}
                x2={points.dokdo.coords.x}
                y2={points.dokdo.coords.y}
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />

              {/* 거리 및 관측 상호 텍스트 배지 */}
              <path d="M 220 180 Q 235 155 250 175" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
            </svg>

            {/* 울진 거점 버튼 */}
            <button
              onClick={() => setActivePoint("uljin")}
              className={`absolute p-2 rounded-lg flex flex-col items-center group transition-all duration-300`}
              style={{ left: `${points.uljin.coords.x}px`, top: `${points.uljin.coords.y}px`, transform: "translate(-50%, -50%)" }}
            >
              <div className={`w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center transition-all ${activePoint === "uljin" ? "bg-slate-400 scale-125" : "bg-slate-600 group-hover:bg-slate-500"}`} />
              <span className="text-[10px] text-slate-400 mt-1 font-semibold whitespace-nowrap">죽변(울진)</span>
            </button>

            {/* 울릉도 거점 버튼 */}
            <button
              onClick={() => setActivePoint("ulleungdo")}
              className={`absolute p-2 rounded-lg flex flex-col items-center group transition-all duration-300`}
              style={{ left: `${points.ulleungdo.coords.x}px`, top: `${points.ulleungdo.coords.y}px`, transform: "translate(-50%, -50%)" }}
            >
              <div className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center transition-all ${activePoint === "ulleungdo" ? "bg-blue-500 scale-125 shadow-[0_0_12px_#3b82f6]" : "bg-blue-600 group-hover:bg-blue-500"}`} />
              <span className="text-[11px] text-blue-300 mt-1 font-bold whitespace-nowrap">울릉도</span>
            </button>

            {/* 오키섬 거점 버튼 */}
            <button
              onClick={() => setActivePoint("okishima")}
              className={`absolute p-2 rounded-lg flex flex-col items-center group transition-all duration-300`}
              style={{ left: `${points.okishima.coords.x}px`, top: `${points.okishima.coords.y}px`, transform: "translate(-50%, -50%)" }}
            >
              <div className={`w-4 h-4 rounded-full border-2 border-white flex items-center justify-center transition-all ${activePoint === "okishima" ? "bg-red-400 scale-125 shadow-[0_0_8px_#f87171]" : "bg-red-600 group-hover:bg-red-500"}`} />
              <span className="text-[11px] text-red-300 mt-1 font-semibold whitespace-nowrap">오키섬 (일본)</span>
            </button>

            {/* 독도 거점 랜드마크 */}
            <button
              onClick={() => setActivePoint("dokdo")}
              className={`absolute p-2 rounded-lg flex flex-col items-center group transition-all duration-300`}
              style={{ left: `${points.dokdo.coords.x}px`, top: `${points.dokdo.coords.y}px`, transform: "translate(-50%, -50%)" }}
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className={`w-6 h-6 rounded-full border-2 border-yellow-300 flex items-center justify-center transition-all ${activePoint === "dokdo" ? "bg-amber-400 scale-125 shadow-[0_0_15px_#f59e0b]" : "bg-amber-500"}`}
              >
                🏝️
              </motion.div>
              <span className="text-[11px] text-yellow-300 mt-1 font-extrabold tracking-wider whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">독도 (대한민국)</span>
            </button>

            {/* 범례 및 안내선 표기 */}
            <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-800 text-[10px] space-y-1 font-mono text-slate-400">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-blue-500 inline-block"></span> 울릉도-독도: 87.4 km (관측○)</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-red-500 inline-block"></span> 일본오키-독도: 157.5 km (관측X)</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-slate-500 inline-block"></span> 울진-독도: 216.8 km</div>
            </div>

            {/* 동해 가상 레이블 */}
            <div className="absolute right-6 top-6 text-[18px] font-bold text-slate-700 tracking-widest font-mono select-none">
              EAST SEA (동해)
            </div>
          </div>
        </div>

        {/* 거점별 지리학적 의의 상세 */}
        <div className="lg:col-span-5 flex flex-col h-full justify-between gap-6">
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="p-1 rounded-md bg-blue-100 text-blue-700 text-xs font-mono font-bold">INFO VIEW</span>
                <h4 className="text-sm font-bold text-slate-500">선택한 거점과 독도의 지리적 상관관계</h4>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mt-2 flex items-center gap-2">
                {points[activePoint as keyof typeof points].name}
              </h3>

              <div className="flex items-center gap-4 mt-3 py-2 border-y border-dashed border-slate-200">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">물리적 거리</span>
                  <span className="text-lg font-extrabold text-blue-700">{points[activePoint as keyof typeof points].distance}</span>
                </div>
                <div className="border-l border-slate-200 pl-4">
                  <span className="text-[11px] text-slate-400 block font-medium">영토 인지 및 관측성</span>
                  <span className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <Eye className="w-3.5 h-3.5 text-blue-500" />
                    {points[activePoint as keyof typeof points].visibility}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mt-4">
                {points[activePoint as keyof typeof points].desc}
              </p>
            </div>

            {/* 관측성 역사적 이의 특별 하이라이트 박스 */}
            {activePoint === "ulleungdo" || activePoint === "okishima" ? (
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100/50 mt-6 relative overflow-hidden">
                <div className="absolute right-3 bottom-0 opacity-10">
                  <Eye className="w-20 h-20 text-blue-600" />
                </div>
                <span className="text-xs font-bold text-blue-800 uppercase tracking-widest block font-mono">
                  지리적 육안 관측성의 역사적 의의
                </span>
                <p className="text-xs text-blue-900 mt-1.5 leading-relaxed">
                  역사학적 및 국제법에서 <b>'육안 관측 가능성'</b>은 고대 영토 자각의 결정적 지주입니다. 울릉도 주민들은 일상속에서 독도를 보며 자신들 생활 범주에 두었던 것에 반해, 일본 오키섬은 독도가 육안 범위 밖에 있어 조선국 영토로 간주할 수밖에 없었습니다.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* 영토의 3요소 & 법적 지위 정보 전개 인터랙티브 아코디언 */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs">
        <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <Info className="w-4 h-4 text-blue-600" />
          국가 영역(Territory)의 삼요소와 독도
        </h3>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          국가 영역은 영토, 영해, 영공으로 나뉩니다. 대한민국 영토인 독도가 지니는 법적 권리와 국제 지위를 클릭해 단계적으로 학습하세요.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {territoryDetails.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTerritory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTerritory(item.id)}
                className={`text-left p-5 border-2 rounded-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  isSelected ? `${item.color} shadow-md` : "border-gray-100 hover:border-gray-200 hover:bg-slate-50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor} font-mono`}>
                      {item.sub}
                    </span>
                    <Icon className={`w-5 h-5 ${isSelected ? item.textColor : "text-gray-400"}`} />
                  </div>
                  <h4 className={`text-base font-bold mt-3 ${isSelected ? item.textColor : "text-gray-800"}`}>
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 leading-snug">
                    {item.summary}
                  </p>
                </div>
                {isSelected && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="h-1 bg-blue-600 absolute bottom-0 left-0 right-0"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* 선택된 영역 상세 카드 */}
        <AnimatePresence mode="wait">
          {activeTerritory && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-5 bg-slate-50 border border-slate-100 rounded-xl"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5" />
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider font-mono">
                    핵심 수호 현황 & 국가 영유권 행사
                  </span>
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">
                    {territoryDetails.find((t) => t.id === activeTerritory)?.keyPoint}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 독도의 고유 도로명 주소와 주민의 터전 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 border border-slate-100 rounded-2xl p-6">
        <div>
          <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2 mb-3">
            <Navigation className="w-4 h-4 text-blue-600" />
            독도의 행정 체계와 유인도 증명
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            독도는 주민이 상주하여 생활하는 <b>엄연한 대한민국 유인도(有人島)</b>로서, 우리 고유의 체계적인 '도로명 주소' 및 행정 주소를 영유하고 있습니다. 동도와 서도는 각각 해상 영웅들의 이름을 딴 독특한 신도로명 주소를 가집니다.
          </p>

          <div className="mt-4 space-y-3">
            <div className="bg-white border border-gray-100 p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[11px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-mono font-bold">동도 (Eastern Islet)</span>
                <p className="text-xs font-extrabold text-slate-800 mt-1.5">경상북도 울릉군 울릉읍 독도리 이사부길</p>
                <p className="text-[11px] text-slate-400 mt-0.5">배치 기관: 독도경비대 병영, 독도 무인 등대, 한반도 바위</p>
              </div>
              <span className="text-2xl">🛡️</span>
            </div>
            <div className="bg-white border border-gray-100 p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[11px] bg-sky-50 text-sky-700 px-1.5 py-0.5 rounded font-mono font-bold">서도 (Western Islet)</span>
                <p className="text-xs font-extrabold text-slate-800 mt-1.5">경상북도 울릉군 울릉읍 독도리 안용복길</p>
                <p className="text-[11px] text-slate-400 mt-0.5">배치 시설: 주민 숙소(김신열 님 등), 음용수 원천지 '물골'</p>
              </div>
              <span className="text-2xl">🏠</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-xl p-5 flex flex-col justify-center items-center text-center">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl mb-3">
            📍
          </div>
          <span className="text-[11px] text-blue-600 font-bold tracking-widest font-mono">DOKDO ADDRESS SYSTEM</span>
          <h4 className="text-md font-bold text-slate-800 mt-1">대한민국의 확고하며 명확한 지위</h4>
          <p className="text-xs text-slate-500 mt-2 max-w-xs leading-relaxed">
            우리가 독도에 실질적 주소를 부여하고 통신 기지국을 운영하며 등대와 주민 복지 인프라를 직접 구비해 관리하는 모든 일련의 행정 행위 자체가, 국제적으로 영유권을 온전하게 행사하고 있음을 시인하는 명증한 증후입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
