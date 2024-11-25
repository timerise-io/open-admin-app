import { ThemeColors, TypographyType } from "models/theme";
import styled, { css } from "styled-components";

interface TypographyProps {
  typographyType: TypographyType;
  weight?: string | null;
  displayType?: "block" | "contents";
  color?: ThemeColors | "inherit";
  align?: "center" | "left" | "right" | "unset";
  m?: string;
}

export const Typography = styled.p<TypographyProps>`
  font-style: normal;
  display: ${({ displayType: display }) => display ?? "block"};
  text-align: ${({ align }) => align ?? "unset"};

  ${({ typographyType: type, theme, weight, color = "primary" }) => {
    const typographyTheme = theme.typography[type];
    const chosenColor = color !== "inherit" ? theme.colors[color] : color;
    return css`
      font-size: ${typographyTheme.size};
      font-weight: ${weight ?? typographyTheme.weight};
      line-height: ${typographyTheme.lineHeight};
      color: ${chosenColor};
    `;
  }}
`;
