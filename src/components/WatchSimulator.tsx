'use client';

import React from 'react';
import { useWatchSession } from '@/hooks/useWatchSession';
import { Play, Heart, Check, X, RotateCcw } from 'lucide-react';

export default function WatchSimulator() {
  const { state, startSession, triggerAlert, finishSession, resetSession } = useWatchSession();

  // Helper to format seconds as MM:SS
  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black w-full">
      {/* Outer Hardware Bezel simulating Xiaomi Band 7 */}
      <div className="relative w-[192px] h-[490px] bg-[#111111] rounded-[90px] border-[6px] border-[#2C2C2E] shadow-2xl flex items-center justify-center p-2">
        
        {/* Actual Screen Container */}
        <div 
          className={`relative w-full h-full rounded-[82px] overflow-hidden transition-colors duration-500 flex flex-col items-center
            ${state.status === 'alert' ? 'bg-amber-950/40' : 'bg-black'}
          `}
        >
          
          {/* STATE: IDLE */}
          {state.status === 'idle' && (
            <div className="flex flex-col items-center justify-center w-full h-full gap-8">
              <h1 className="text-white text-xl font-medium tracking-tight">FocusPulse</h1>
              <button 
                onClick={startSession}
                className="w-[88px] h-[88px] rounded-full bg-apple-cyan/20 flex items-center justify-center backdrop-blur-md border border-apple-cyan/30 shadow-[0_0_20px_rgba(100,210,255,0.2)] transition-transform active:scale-95"
                aria-label="Start Focus"
              >
                <Play className="w-10 h-10 text-apple-cyan translate-x-0.5" fill="currentColor" />
              </button>
              <p className="text-[#8E8E93] text-sm font-medium">Start Focus</p>
            </div>
          )}

          {/* STATE: ACTIVE */}
          {state.status === 'active' && (
            <div className="flex flex-col items-center justify-between w-full h-full py-12 relative">
              {/* Hidden target to trigger distraction alert manually */}
              <button 
                onClick={triggerAlert}
                className="absolute top-0 w-full h-16 opacity-0"
                aria-label="Simulate Distraction"
              />
              
              <div className="flex flex-col items-center mt-8 gap-2">
                <span className="text-apple-cyan text-[56px] font-semibold tracking-tighter leading-none">
                  {formatTime(state.focusTimeSeconds)}
                </span>
                <p className="text-[#8E8E93] text-xs font-medium tracking-wide uppercase">Focus Time</p>
              </div>

              <div className="flex flex-col items-center gap-1 mb-8">
                <Heart className="w-8 h-8 text-apple-red animate-pulse" fill="currentColor" />
                <span className="text-white text-lg font-medium">{state.currentBpm} <span className="text-[#8E8E93] text-sm">BPM</span></span>
              </div>
              
              {/* Cyan Progress indicator decoration (top edge) */}
              <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-apple-cyan to-transparent opacity-80" />
            </div>
          )}

          {/* STATE: ALERT */}
          {state.status === 'alert' && (
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
          {state.status === 'summary' && (
            <div className="flex flex-col items-center justify-center w-full h-full gap-8 px-4">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[#8E8E93] text-sm font-medium uppercase tracking-wider">Total Time</span>
                <span className="text-white text-4xl font-semibold tracking-tight">
                  {formatTime(state.focusTimeSeconds)}
                </span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <span className="text-[#8E8E93] text-sm font-medium uppercase tracking-wider">Score</span>
                <span className={`text-5xl font-bold tracking-tighter ${state.focusScore >= 80 ? 'text-apple-emerald' : state.focusScore >= 50 ? 'text-apple-amber' : 'text-apple-red'}`}>
                  {state.focusScore}
                </span>
              </div>

              <button 
                onClick={resetSession}
                className="w-[88px] h-[88px] rounded-full bg-[#1C1C1E] flex items-center justify-center mt-4 border border-[#3A3A3C] active:scale-95 transition-transform"
                aria-label="Done"
              >
                <RotateCcw className="w-8 h-8 text-white" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
