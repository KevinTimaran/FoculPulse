'use client';

import React from 'react';
import { useSimulation } from '@/context/SimulationContext';
import { Play, Heart, Check, X, RotateCcw, History, Sun, Moon, Pause } from 'lucide-react';

export default function WatchSimulator() {
  const { 
    watchState, currentBpm, concentrationLevel, theme, focusTimeSeconds, focusScore,
    setTheme, setWatchState, startSession, pauseSession, resumeSession, finishSession, resetSession 
  } = useSimulation();

  // Helper to format seconds as MM:SS
  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const isLight = theme === 'light';
  
  // Theme classes
  const watchBg = isLight ? 'bg-white' : 'bg-black';
  const textColor = isLight ? 'text-black' : 'text-white';
  const textMuted = isLight ? 'text-[#8E8E93]' : 'text-[#8E8E93]';
  const controlBg = isLight ? 'bg-black/5' : 'bg-[#1C1C1E]';
  
  // Reactive UI colors based on concentration
  const getProgressColor = () => {
    switch (concentrationLevel) {
      case 'High': return 'from-transparent via-apple-cyan to-transparent';
      case 'Medium': return 'from-transparent via-apple-amber to-transparent';
      case 'Low': return 'from-transparent via-apple-orange to-transparent';
    }
  };

  return (
    <div className="flex items-center justify-center p-8 transition-all duration-300">
      {/* Outer Hardware Bezel simulating Xiaomi Band 7 */}
      <div className="relative w-[192px] h-[490px] bg-[#111111] rounded-[90px] border-[6px] border-[#2C2C2E] shadow-2xl flex items-center justify-center p-2">
        
        {/* Actual Screen Container */}
        <div 
          className={`relative w-full h-full rounded-[82px] overflow-hidden transition-colors duration-500 flex flex-col items-center
            ${watchState === 'ALERT' ? (isLight ? 'bg-amber-100' : 'bg-amber-950/40') : watchBg}
          `}
        >
          
          {/* STATE: IDLE */}
          {watchState === 'IDLE' && (
            <div className="flex flex-col items-center justify-between w-full h-full py-8">
              
              {/* Theme Toggle & History */}
              <div className="flex justify-between w-full px-6">
                <button 
                  onClick={() => setTheme(isLight ? 'dark' : 'light')}
                  className={`p-3 rounded-full transition-colors ${controlBg} active:scale-95`}
                  aria-label="Toggle Theme"
                >
                  {isLight ? <Moon className="w-4 h-4 text-black" /> : <Sun className="w-4 h-4 text-white" />}
                </button>
                <button 
                  onClick={() => setWatchState('HISTORY')}
                  className={`p-3 rounded-full transition-colors ${controlBg} active:scale-95`}
                  aria-label="View History"
                >
                  <History className={`w-4 h-4 ${textColor}`} />
                </button>
              </div>

              <div className="flex flex-col items-center gap-6">
                <h1 className={`${textColor} text-xl font-medium tracking-tight`}>FocusPulse</h1>
                <button 
                  onClick={startSession}
                  className="w-[88px] h-[88px] rounded-full bg-apple-cyan/20 flex items-center justify-center backdrop-blur-md border border-apple-cyan/30 shadow-[0_0_20px_rgba(100,210,255,0.2)] transition-transform active:scale-95"
                  aria-label="Start Focus"
                >
                  <Play className="w-10 h-10 text-apple-cyan translate-x-0.5" fill="currentColor" />
                </button>
                <p className={`${textMuted} text-sm font-medium`}>Start Focus</p>
              </div>

              <div className="h-8" /> {/* Spacer */}
            </div>
          )}

          {/* STATE: HISTORY */}
          {watchState === 'HISTORY' && (
            <div className={`flex flex-col items-center w-full h-full py-8 px-4 ${textColor}`}>
              <h2 className="text-sm font-semibold uppercase tracking-wider mb-6 text-[#8E8E93]">History</h2>
              
              <div className="flex flex-col gap-3 w-full">
                {[
                  { time: '25:00', score: 95 },
                  { time: '40:00', score: 82 },
                  { time: '15:00', score: 60 }
                ].map((session, i) => (
                  <div key={i} className={`flex justify-between items-center p-4 rounded-2xl ${controlBg}`}>
                    <span className="font-medium">{session.time}</span>
                    <span className={`font-semibold ${session.score >= 80 ? 'text-apple-emerald' : 'text-apple-amber'}`}>
                      {session.score}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                onClick={resetSession}
                className={`mt-auto w-[50px] h-[50px] rounded-full ${controlBg} flex items-center justify-center active:scale-95 transition-transform`}
              >
                <X className={`w-6 h-6 ${textColor}`} />
              </button>
            </div>
          )}

          {/* STATE: ACTIVE or PAUSED */}
          {(watchState === 'ACTIVE' || watchState === 'PAUSED') && (
            <div className="flex flex-col items-center justify-between w-full h-full py-12 relative">
              <div className="flex flex-col items-center mt-6 gap-2">
                <span className={`${watchState === 'PAUSED' ? textMuted : 'text-apple-cyan'} text-[56px] font-semibold tracking-tighter leading-none transition-colors duration-300`}>
                  {formatTime(focusTimeSeconds)}
                </span>
                <p className={`${textMuted} text-xs font-medium tracking-wide uppercase`}>
                  {watchState === 'PAUSED' ? 'Paused' : 'Focus Time'}
                </p>
              </div>

              <div className="flex flex-col items-center gap-6 mb-4">
                <div className="flex flex-col items-center gap-1">
                  <Heart className={`w-8 h-8 text-apple-red transition-opacity duration-300 ${watchState === 'ACTIVE' ? 'animate-pulse' : 'opacity-50'}`} fill="currentColor" />
                  <span className={`${textColor} text-lg font-medium`}>{currentBpm} <span className="text-[#8E8E93] text-sm">BPM</span></span>
                </div>

                <button 
                  onClick={watchState === 'ACTIVE' ? pauseSession : resumeSession}
                  className={`w-[60px] h-[60px] rounded-full flex items-center justify-center backdrop-blur-md active:scale-95 transition-all duration-300
                    ${watchState === 'ACTIVE' ? 'bg-apple-amber/20 border border-apple-amber/30 text-apple-amber' : 'bg-apple-cyan/20 border border-apple-cyan/30 text-apple-cyan'}
                  `}
                  aria-label={watchState === 'ACTIVE' ? "Pause" : "Resume"}
                >
                  {watchState === 'ACTIVE' ? <Pause className="w-7 h-7" fill="currentColor" /> : <Play className="w-7 h-7 translate-x-0.5" fill="currentColor" />}
                </button>
              </div>
              
              {/* Progress indicator decoration (top edge) */}
              {watchState === 'ACTIVE' && (
                <div className={`absolute top-0 w-full h-2 bg-gradient-to-r ${getProgressColor()} opacity-80 transition-all duration-500`} />
              )}
            </div>
          )}

          {/* STATE: ALERT */}
          {watchState === 'ALERT' && (
            <div className="flex flex-col items-center justify-center w-full h-full px-4 py-8 gap-6">
              <h2 className="text-apple-amber text-2xl font-semibold tracking-tight text-center leading-tight">
                Still<br />focused?
              </h2>
              
              <div className="flex flex-col w-full gap-3 mt-4">
                <button 
                  onClick={() => finishSession(false)}
                  className="w-full h-14 rounded-full border-2 border-apple-emerald bg-apple-emerald/10 text-apple-emerald font-semibold text-lg flex items-center justify-center gap-2 active:bg-apple-emerald/30 transition-colors"
                >
                  <Check className="w-6 h-6" /> Yes
                </button>
                <button 
                  onClick={() => finishSession(true)}
                  className="w-full h-14 rounded-full border-2 border-apple-red bg-apple-red/10 text-apple-red font-semibold text-lg flex items-center justify-center gap-2 active:bg-apple-red/30 transition-colors"
                >
                  <X className="w-6 h-6" /> Distracted
                </button>
              </div>
            </div>
          )}

          {/* STATE: SUMMARY */}
          {watchState === 'SUMMARY' && (
            <div className="flex flex-col items-center justify-center w-full h-full gap-8 px-4">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[#8E8E93] text-sm font-medium uppercase tracking-wider">Total Time</span>
                <span className={`${textColor} text-4xl font-semibold tracking-tight`}>
                  {formatTime(focusTimeSeconds)}
                </span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <span className="text-[#8E8E93] text-sm font-medium uppercase tracking-wider">Score</span>
                <span className={`text-5xl font-bold tracking-tighter ${focusScore >= 80 ? 'text-apple-emerald' : focusScore >= 50 ? 'text-apple-amber' : 'text-apple-red'}`}>
                  {focusScore}
                </span>
              </div>

              <button 
                onClick={resetSession}
                className={`w-[88px] h-[88px] rounded-full ${controlBg} flex items-center justify-center mt-4 border border-[#3A3A3C] active:scale-95 transition-transform`}
                aria-label="Done"
              >
                <RotateCcw className={`w-8 h-8 ${textColor}`} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
