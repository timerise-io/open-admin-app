export type ThemeType = "LIGHT" | "DARK";

export type TypographyType = "h1" | "h2" | "h3" | "body" | "label" | "label_bold";

export interface TypographyTheme {
  size: string;
  weight: string;
  lineHeight: string;
}

export type ThemeColors = "error" | "success" | "warning" | "primary" | "secondary";

export interface BackgroundColorSchema {
  color: string;
}

export type BackgroundType = "primary" | "secondary";

export type ButtonType = "primary" | "secondary" | "danger" | "positive";

export interface ButtonColorSchema {
  background: string;
  backgroundActive: string;
  backgroundDisabled: string;
  text: string;
  textDisabled?: string;
  border?: string;
  borderActive?: string;
  borderChecked?: string;
  backgroundChecked?: string;
  backgroundCheckedActive?: string;
  shadow: string;
  shadowActive?: string;
}
