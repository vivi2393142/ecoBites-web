import { useCallback } from 'react';
import { atom, useAtom } from 'jotai';

import type { Recipe } from 'libs/schema';

interface ScanResultState {
  uploadedPhoto: File | null;
  recommendedRecipes: Recipe[] | null;
}

const initialState: ScanResultState = {
  uploadedPhoto: null,
  recommendedRecipes: null,
};

export const ScanResultAtom = atom(initialState);

export const useScanResultAtom = () => {
  const [state, setState] = useAtom(ScanResultAtom);

  const addScanPhoto = useCallback(
    ({ uploadedPhoto }: Pick<ScanResultState, 'uploadedPhoto'>) => {
      setState({ uploadedPhoto, recommendedRecipes: null });
    },
    [setState],
  );

  const addScanResult = useCallback(
    ({ recommendedRecipes }: Pick<ScanResultState, 'recommendedRecipes'>) => {
      setState((prev) => ({ ...prev, recommendedRecipes }));
    },
    [setState],
  );

  const clearScanResult = useCallback(() => {
    setState({ uploadedPhoto: null, recommendedRecipes: null });
  }, [setState]);

  return {
    scanResult: state,
    addScanPhoto,
    addScanResult,
    clearScanResult,
  };
};
