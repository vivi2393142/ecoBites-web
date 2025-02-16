import { Component } from 'themeDemo/libs/schema';
import React, {
  Dispatch,
  FunctionComponent,
  ProviderProps,
  SetStateAction,
  createContext,
  useContext,
} from 'react';

export interface ThemeDemoContextValue {
  setVisibleObj: Dispatch<SetStateAction<Record<Component, boolean>>>;
}

const ThemeDemoContext = createContext<ThemeDemoContextValue>({
  setVisibleObj: () => {},
});

const ThemeDemoProvider = ({
  value,
  children,
}: ProviderProps<ThemeDemoContextValue>): ReturnType<
  FunctionComponent<ProviderProps<ThemeDemoContextValue>>
> => <ThemeDemoContext.Provider value={value}>{children}</ThemeDemoContext.Provider>;

export default ThemeDemoProvider;

export function useThemeDemoContext(): ThemeDemoContextValue {
  return useContext(ThemeDemoContext);
}
