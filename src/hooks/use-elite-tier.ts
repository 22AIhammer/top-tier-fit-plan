import { useState, useEffect } from "react";

interface EliteState {
  isElite: boolean;
  upgradedAt: string | null;
}

const STORAGE_KEY = "fitpro-elite";

const getEliteState = (): EliteState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return { isElite: false, upgradedAt: null };
};

const saveEliteState = (state: EliteState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const useEliteTier = () => {
  const [eliteState, setEliteState] = useState<EliteState>({ isElite: false, upgradedAt: null });

  useEffect(() => {
    setEliteState(getEliteState());
  }, []);

  const upgradeToElite = () => {
    const newState: EliteState = {
      isElite: true,
      upgradedAt: new Date().toISOString(),
    };
    saveEliteState(newState);
    setEliteState(newState);
  };

  const downgradeFromElite = () => {
    const newState: EliteState = {
      isElite: false,
      upgradedAt: null,
    };
    saveEliteState(newState);
    setEliteState(newState);
  };

  return {
    isElite: eliteState.isElite,
    upgradedAt: eliteState.upgradedAt,
    upgradeToElite,
    downgradeFromElite,
  };
};
