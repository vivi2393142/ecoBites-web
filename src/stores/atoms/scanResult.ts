import { useCallback } from 'react';
import { atom, useAtom } from 'jotai';

import type { Recipe } from 'libs/schema';

interface ScanResultState {
  recommendedRecipes: Recipe[] | null;
}

const initialState: ScanResultState = {
  recommendedRecipes: null,
};

export const ScanResultAtom = atom(initialState);

export const useScanResultAtom = () => {
  const [state, setState] = useAtom(ScanResultAtom);

  const addScanResult = useCallback(
    ({ recommendedRecipes }: ScanResultState) => {
      setState({ recommendedRecipes });
    },
    [setState],
  );

  const clearScanResult = useCallback(() => {
    setState({ recommendedRecipes: null });
  }, [setState]);

  return {
    scanResult: state,
    addScanResult,
    clearScanResult,
  };
};
