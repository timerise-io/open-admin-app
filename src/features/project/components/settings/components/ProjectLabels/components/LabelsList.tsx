import React from "react";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import { LabelListItem } from "./LabelListItem";

const Wrapper = styled.div<{ showSeparator: boolean }>`
  width: 100%;
  ${({ showSeparator }) => {
    const borderWidth = showSeparator ? 1 : 0;

    return css`
      border-top: ${borderWidth}px solid #d9d9d9;
    `;
  }}
`;

export const LabelsList = () => {
  const project = useRecoilValue(selectedProjectSelector);

  if (!project) return null;

  const projectLabels = project?.labels || [];

  return (
    <Wrapper showSeparator={projectLabels.length > 0}>
      {projectLabels.map((label) => {
        return <LabelListItem key={label} label={label} labels={projectLabels} />;
      })}
    </Wrapper>
  );
};
