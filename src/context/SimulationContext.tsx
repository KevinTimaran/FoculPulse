'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type WatchState = 'IDLE' | 'ACTIVE' | 'PAUSED' | 'ALERT' | 'SUMMARY' | 'HISTORY';
export type ConcentrationLevel = 'High' | 'Medium' | 'Low';
export type Theme = 'light' | 'dark';

interface SimulationState {
  watchState: WatchState;
  currentBpm: number;
  concentrationLevel: ConcentrationLevel;
  theme: Theme;
  focusTimeSeconds: number;
  focusScore: number;
}

interface SimulationContextType extends SimulationState {
  setWatchState: (state: WatchState) => void;
  setCurrentBpm: (bpm: number) => void;
  setConcentrationLevel: (level: ConcentrationLevel) => void;
  setTheme: (theme: Theme) => void;
  startSession: () => void;
  pauseSession: () => void;
  resumeSession: () => void;
  finishSession: (distracted: boolean) => void;
  resetSession: () => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [watchState, setWatchState] = useState<WatchState>('IDLE');
  const [currentBpm, setCurrentBpm] = useState(72);
  const [concentrationLevel, setConcentrationLevel] = useState<ConcentrationLevel>('High');
  const [theme, setTheme] = useState<Theme>('dark');
  const [focusTimeSeconds, setFocusTimeSeconds] = useState(0);
  const [focusScore, setFocusScore] = useState(0);

  // Timer logic for ACTIVE state
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (watchState === 'ACTIVE') {
      interval = setInterval(() => {
        setFocusTimeSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [watchState]);

  const startSession = () => {
    setWatchState('ACTIVE');
    setFocusTimeSeconds(0);
    setFocusScore(0);
  };

  const pauseSession = () => setWatchState('PAUSED');
  const resumeSession = () => setWatchState('ACTIVE');

  const finishSession = (distracted: boolean) => {
    const baseScore = Math.min((focusTimeSeconds / 10) * 10, 100);
    const finalScore = distracted ? Math.max(baseScore - 20, 0) : baseScore + 10;
    setFocusScore(Math.floor(Math.min(finalScore, 100)));
    setWatchState('SUMMARY');
  };

  const resetSession = () => {
    setWatchState('IDLE');
    setFocusTimeSeconds(0);
    setFocusScore(0);
  };

  return (
    <SimulationContext.Provider value={{
      watchState, currentBpm, concentrationLevel, theme, focusTimeSeconds, focusScore,
      setWatchState, setCurrentBpm, setConcentrationLevel, setTheme,
      startSession, pauseSession, resumeSession, finishSession, resetSession
    }}>
      {children}
    </SimulationContext.Provider>
  );
}

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) throw new Error('useSimulation must be used within SimulationProvider');
  return context;
};
