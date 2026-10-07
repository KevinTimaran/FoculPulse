'use client';

import React from 'react';
import { useSimulation } from '@/context/SimulationContext';
import { Settings2, Activity, Zap, AlertTriangle } from 'lucide-react';

export default function SimulationControls() {
  const { 
    currentBpm, setCurrentBpm, 
    concentrationLevel, setConcentrationLevel, 
    watchState, setWatchState 
  } = useSimulation();

  return (
    <div className="w-[350px] bg-[#1C1C1E] rounded-3xl border border-[#3A3A3C] p-6 shadow-2xl flex flex-col gap-8 text-[#F5F5F7] transition-all duration-300">
      <div className="flex items-center gap-3">
        <Settings2 className="w-6 h-6 text-apple-cyan" />
        <h2 className="text-xl font-semibold tracking-tight">Wizard of Oz</h2>
      </div>

      {/* BPM Control */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-[#8E8E93]">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">Heart Rate</span>
          </div>
          <span className="text-lg font-semibold font-mono">{currentBpm} BPM</span>
        </div>
        <input 
          type="range" 
          min="60" 
          max="180" 
          value={currentBpm} 
          onChange={(e) => setCurrentBpm(Number(e.target.value))}
          className="w-full accent-apple-red h-2 bg-[#3A3A3C] rounded-full appearance-none cursor-pointer"
        />
      </div>

      {/* Concentration Level */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-[#8E8E93]">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium uppercase tracking-wider">Concentration</span>
        </div>
        <div className="flex p-1 bg-[#2C2C2E] rounded-xl">
          {['High', 'Medium', 'Low'].map((level) => (
            <button
              key={level}
              onClick={() => setConcentrationLevel(level as 'High' | 'Medium' | 'Low')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                concentrationLevel === level 
                  ? 'bg-[#4A4A4C] text-white shadow-sm' 
                  : 'text-[#8E8E93] hover:text-white'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Force Events */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-[#8E8E93]">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm font-medium uppercase tracking-wider">Triggers</span>
        </div>
        <button
          onClick={() => setWatchState('ALERT')}
          disabled={watchState !== 'ACTIVE'}
          className="w-full py-3 rounded-xl font-medium transition-all duration-300 border border-apple-amber text-apple-amber hover:bg-apple-amber/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          Force Distraction Event
        </button>
      </div>

      {/* Debug Info */}
      <div className="mt-auto pt-4 border-t border-[#3A3A3C]">
        <div className="flex justify-between items-center text-xs text-[#8E8E93] font-mono">
          <span>STATE: {watchState}</span>
        </div>
      </div>
    </div>
  );
}
