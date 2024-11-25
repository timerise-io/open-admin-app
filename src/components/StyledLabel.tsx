import { TypographyType } from "models/theme";
import styled, { css } from "styled-components";

const StyledLabel = styled.label<{ version?: TypographyType }>`
  margin-bottom: calc(0.5 * ${({ theme }) => theme.spacing});
  ${({ version, theme }) => {
    return css`
      font-size: ${theme.typography[version ?? "label"].size};
      font-weight: ${theme.typography[version ?? "label"].weight};
      line-height: ${theme.typography[version ?? "label"].lineHeight};
    `;
  }}
  color: ${({ theme }) => theme.colors.primary};
`;

export default StyledLabel;
