import { type ReactNode, useCallback } from 'react';
import { atom, useAtom } from 'jotai';
import type { AlertColor } from '@mui/material/Alert';

export const enum SnackbarStyle {
  success = 'success',
  error = 'error',
}

interface SnackbarState {
  open: boolean;
  message: ReactNode;
  severity?: AlertColor;
}

const initialState: SnackbarState = {
  open: false,
  message: null,
  severity: undefined,
};

export const snackbarAtom = atom(initialState);

export const useSnackbarAtom = () => {
  const [state, setState] = useAtom(snackbarAtom);

  const showSnackbar = useCallback(
    ({ message, severity }: Omit<SnackbarState, 'open'>) => {
      setState({
        open: true,
        message,
        severity,
      });
    },
    [setState],
  );

  const closeSnackbar = useCallback(() => {
    setState((prev) => ({
      ...prev,
      open: false,
    }));
  }, [setState]);

  return {
    snackbar: state,
    showSnackbar,
    closeSnackbar,
  };
};
