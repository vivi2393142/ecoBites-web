import { type FunctionComponent, type PropsWithChildren, type ReactNode } from 'react';

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { theme } from 'styles/theme';

interface ThemeProviderProps {
  children?: ReactNode;
}

const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  children,
}: PropsWithChildren<ThemeProviderProps>) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
