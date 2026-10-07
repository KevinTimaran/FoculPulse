import { useState, useEffect, useCallback } from 'react';

export type SessionStatus = 'idle' | 'active' | 'alert' | 'summary';

export interface WatchSessionState {
  status: SessionStatus;
  focusTimeSeconds: number;
  currentBpm: number;
  focusScore: number;
}

export function useWatchSession() {
  const [state, setState] = useState<WatchSessionState>({
    status: 'idle',
    focusTimeSeconds: 0,
    currentBpm: 72,
    focusScore: 0,
  });

  // Exportable snapshot for mobile sync (future-proofing)
  const getExportableSnapshot = useCallback(() => {
    return JSON.stringify(state);
  }, [state]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (state.status === 'active') {
      interval = setInterval(() => {
        setState(prev => ({
          ...prev,
          focusTimeSeconds: prev.focusTimeSeconds + 1,
          // Simulate slight BPM variations
          currentBpm: 70 + Math.floor(Math.random() * 10),
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [state.status]);

  const startSession = () => setState({ ...state, status: 'active', focusTimeSeconds: 0, focusScore: 0 });
  
  const triggerAlert = () => setState(prev => ({ ...prev, status: 'alert' }));
  
  const finishSession = (isDistracted: boolean) => {
    // Calculate a mock score based on time and distraction
    // 1 min = 60s, score is roughly 10 points per 10 seconds, max 100
    const baseScore = Math.min((state.focusTimeSeconds / 10) * 10, 100);
    const finalScore = isDistracted ? Math.max(baseScore - 20, 0) : baseScore + 10;
    
    setState(prev => ({ 
      ...prev, 
      status: 'summary',
      focusScore: Math.floor(Math.min(finalScore, 100))
    }));
  };
  
  const resetSession = () => setState({
    status: 'idle',
    focusTimeSeconds: 0,
    currentBpm: 72,
    focusScore: 0,
  });

  return {
    state,
    startSession,
    triggerAlert,
    finishSession,
    resetSession,
    getExportableSnapshot,
  };
}
