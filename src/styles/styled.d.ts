import {
  BackgroundColorSchema,
  BackgroundType,
  ButtonColorSchema,
  ButtonType,
  ThemeColors,
  ThemeType,
  TypographyTheme,
  TypographyType,
} from "models/theme";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    themeType: ThemeType;

    spacing: string;

    borderRadius: string;

    colors: Record<ThemeColors, string>;

    colorSchemas: {
      button: Record<ButtonType, ButtonColorSchema>;
      background: Record<BackgroundType, BackgroundColorSchema>;
      input: {
        background: string;
        border: string;
        borderHover: string;
      };
    };

    typography: Record<TypographyType, TypographyTheme>;
  }
}
