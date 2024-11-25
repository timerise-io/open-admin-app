import React, { PropsWithChildren } from "react";
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "styles/appTheme";
import { ThemeType } from "./model";
import { themeAtom } from "./state/themeAtom";

const themes: Record<ThemeType, any> = {
  LIGHT: lightTheme,
  DARK: darkTheme,
};

export const ThemeWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const themeType = useRecoilValue(themeAtom);

  return <ThemeProvider theme={themes[themeType]}>{children}</ThemeProvider>;
};
