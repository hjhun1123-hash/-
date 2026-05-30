/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, Map, BookOpen, Clock, Heart, Anchor, HelpCircle, CheckCircle, Award } from "lucide-react";
import LessonOne from "./components/LessonOne";
import LessonTwo from "./components/LessonTwo";
import LessonThree from "./components/LessonThree";
import Worksheet from "./components/Worksheet";

type TabId = "lesson1" | "lesson2" | "lesson3" | "worksheet";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("lesson1");

  // 각 세션별 완료 체크 상태 관리 (학습 트래킹 로컬스토리지 보존)
  const [completedLessons, setCompletedLessons] = useState<Record<TabId, boolean>>({
    lesson1: false,
    lesson2: false,
    lesson3: false,
    worksheet: false,
  });

  // 복구
  useEffect(() => {
    const cached = localStorage.getItem("dokdo_completed_lessons");
    if (cached) {
      try {
        setCompletedLessons(JSON.parse(cached));
      } catch (err) {
        console.error("Tracking restoration failure:", err);
      }
    }
  }, []);

  const toggleLessonComplete = (id: TabId) => {
    const nextVal = { ...completedLessons, [id]: !completedLessons[id] };
    setCompletedLessons(nextVal);
    localStorage.setItem("dokdo_completed_lessons", JSON.stringify(nextVal));
  };

  // 진행도 공식 산출 (0-100%)
  const completionPercentage = Math.round(
    (Object.values(completedLessons).filter(Boolean).length / Object.keys(completedLessons).length) * 100
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans selection:bg-blue-100" id="main-root">
      {/* 글로벌 초박 로고 탑 헤더 */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-200">
              <Anchor className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-extrabold text-slate-900 tracking-tight font-sans">
                  독도 영토 주권 교육 종합 플랫폼
                </h1>
                <span className="hidden sm:inline bg-blue-50 text-blue-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-mono">
                  Peace Portal
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold tracking-tight">
                대한민국 역사·지리 평화교육위원회 공인 수업 보조용 자재
              </p>
            </div>
          </div>

          {/* 학습 진행률 트래킹 패널 */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="text-right hidden md:block">
              <span className="text-[10px] font-bold text-slate-400 block tracking-widest font-mono">MY PROGRESS</span>
              <span className="text-xs font-black text-blue-700">{completionPercentage}% 학습 통과</span>
            </div>
            <div className="w-32 md:w-40 h-2 bg-slate-100 rounded-full overflow-hidden relative border border-slate-200/50">
              <div
                className="h-full bg-blue-600 transition-all duration-500 rounded-full"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className="flex -space-x-1.5">
              {(["lesson1", "lesson2", "lesson3", "worksheet"] as TabId[]).map((tab) => (
                <div
                  key={tab}
                  className={`w-3 h-3 rounded-full border border-white z-10 transition-colors ${
                    completedLessons[tab] ? "bg-emerald-500" : "bg-slate-200"
                  }`}
                  title={`${tab} 통과 여부`}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 웅장장한 히어로 배너 */}
      <div className="bg-slate-900 text-white py-12 px-4 md:px-8 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-slate-900 to-black">
        {/* 그리드 정밀 구획 문양 */}
        <div className="absolute inset-x-0 bottom-0 opacity-10 h-24 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-blue-500/20 text-blue-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-blue-500/30 tracking-widest uppercase font-mono">
                융합 교육 교재 (중·고등용)
              </span>
              <span className="text-slate-400 text-xs font-medium font-serif">2026년 5월 최신 개정판</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-none font-serif">
              독도 영토 주권 교육 종합 교재
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              본 웹 교재는 감정적 대립이나 과도한 편견을 배제하고, <b>지리학적 사실 수치, 한·일 자국의 고문서 공문 백서, 역사 지도의 객관적 과학</b>에 터 잡고 진실을 탐색합니다. 나아가 차세대가 나아가야 할 평화 공동체 집필 초안을 제안합니다.
            </p>
          </div>

          <div className="lg:col-span-4 bg-white/5 backdrop-blur-xs border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-blue-400 font-extrabold uppercase font-mono tracking-wider">교재의 핵심 요약과 지향</span>
              <Heart className="w-4 h-4 text-rose-400 animate-pulse" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              우리를 위협하는 일방적인 비난에서 탈피하십시오. 정확하고 타협 불가능한 1차 사료(Primary Sources)의 힘만으로 진실에 다가가고, 동아시아의 평화적 우호 번영을 스스로 리드해 나갈 인성을 함양합니다.
            </p>
          </div>
        </div>
      </div>

      {/* 메인 탭 네비게이터 바 */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-8">
        <div className="flex overflow-x-auto pb-1 border-b border-gray-200 scrollbar-none gap-2">
          {(
            [
              { id: "lesson1", label: "1차시. 지리적 위치 & 영역", icon: Map },
              { id: "lesson2", label: "2차시. 고문서 사료 & 지도", icon: BookOpen },
              { id: "lesson3", label: "3차시. 현대사 갈등 & 극복", icon: Clock },
              { id: "worksheet", label: "수업 활동지. 교과서 집필", icon: GraduationCap },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 text-xs font-extrabold px-4 py-3 rounded-t-xl shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white text-blue-700 border-t-2 border-x border-gray-200 border-t-blue-600 shadow-xs"
                    : "text-gray-500 hover:text-slate-800 hover:bg-slate-100/50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-blue-600 animate-bounce" : "text-gray-400"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 개별 차시 마운트 메인 디스플레이 */}
      <main className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8 flex-grow">
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-xs relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === "lesson1" && <LessonOne />}
              {activeTab === "lesson2" && <LessonTwo />}
              {activeTab === "lesson3" && <LessonThree />}
              {activeTab === "worksheet" && <Worksheet />}
            </motion.div>
          </AnimatePresence>

          {/* 하단 차시 완료 체크박스 플로팅 바 */}
          <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-400 font-bold">현재 보고 계신 단원의 지식을 모두 정전했습니까?</span>
              <button
                onClick={() => toggleLessonComplete(activeTab)}
                className={`text-xs px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  completedLessons[activeTab]
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-blue-600 text-white shadow-xs hover:bg-blue-500"
                }`}
              >
                {completedLessons[activeTab] ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    이수 완료 해제
                  </>
                ) : (
                  <>
                    <Award className="w-3.5 h-3.5" />
                    현재 차시 학습 완료
                  </>
                )}
              </button>
            </div>

            {/* 다음 단원 바로가기 가이드 */}
            <div className="text-right">
              {activeTab === "lesson1" && (
                <button
                  onClick={() => setActiveTab("lesson2")}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  지체없이 2차시 사료 대조 학습장 가기 →
                </button>
              )}
              {activeTab === "lesson2" && (
                <button
                  onClick={() => setActiveTab("lesson3")}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  기세를 몰아 3차시 현대사 갈등 퀴즈 풀기 →
                </button>
              )}
              {activeTab === "lesson3" && (
                <button
                  onClick={() => setActiveTab("worksheet")}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  학습의 꽃인 한·일 공동 교과서 작성하기 →
                </button>
              )}
              {activeTab === "worksheet" && (
                <span className="text-xs text-emerald-600 font-extrabold flex items-center gap-1">
                  🎉 전 교육 과정을 성실하게 이행하셨습니다! 한일 우호 교량 완공!
                </span>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* 우아한 글로벌 푸터 */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-500 text-xs py-8 mt-12 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <p className="font-extrabold text-slate-300 flex items-center justify-center md:justify-start gap-1">
              <span>🛡️</span> 대한민국 역사·지리 평화교육위원회
            </p>
            <p className="text-[11px] text-slate-400 leading-normal max-w-xl">
              본 포털은 영유권 분쟁의 이성적 해제와 동해 번영을 위해 기획되었습니다. 극단적인 편가르기를 넘어 1차 관판 문헌의 과학만으로 역사의 투명한 지위를 설계해 나갑니다.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 font-mono text-[10px] text-slate-400">
            <span>PLATFORM BUILD VERSION 1.4.0 (PROD)</span>
            <span>SYSTEM YEAR: 2026.05 | USER STATUS: VERIFIED</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

