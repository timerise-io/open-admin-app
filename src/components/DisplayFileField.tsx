import React from "react";
import styled, { css } from "styled-components";
import { Typography } from "./Typography";
import { Row } from "./layout/Row";

const Wrapper = styled.div`
  width: 100%;
`;

const StyledRow = styled(Row)`
  width: 100%;
  margin-top: 4px;
  padding: 8px 12px;
  ${({ theme }) => {
    return css`
      background-color: ${theme.colorSchemas.background.primary.color};
      border-radius: ${theme.borderRadius};
    `;
  }}
`;

const DownloadFileButton = styled.button`
  all: unset;
  box-sizing: border-box;
  text-decoration: underline;
  cursor: pointer;

  ${({ theme }) => {
    return css`
      font-size: ${theme.typography.label.size};
      line-height: ${theme.typography.label.lineHeight};
    `;
  }}
`;

interface DisplayFileFieldProps {
  label?: string;
  text?: string;
}

export const DisplayFileField: React.FC<DisplayFileFieldProps> = ({ label, text }) => {
  return (
    <Wrapper>
      {label && (
        <Typography typographyType="label" displayType="contents">
          {label}
        </Typography>
      )}
      <StyledRow>
        <Typography typographyType="body" displayType="contents">
          {text}
        </Typography>
        <DownloadFileButton>Download</DownloadFileButton>
      </StyledRow>
    </Wrapper>
  );
};
