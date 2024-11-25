import React from "react";
import { Typography } from "components/Typography";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  height: 36px;
  left: 42px;
  padding: 8px 10px;
  z-index: 1000000;
  white-space: nowrap;
  opacity: 1;
  background: #333333;
  border-radius: 4px;

  &::before {
    content: "";
    position: absolute;
    width: 9px;
    height: 9px;
    left: -4px;
    top: 14px;

    background: #333333;
    transform: rotate(-45deg);
  }
`;

const StyledTypography = styled(Typography)`
  color: #ffffff;
`;

const ProjectNavigationTooltip: React.FC<{ projectName: string }> = ({ projectName }) => {
  return (
    <Wrapper className="nav-tooltip">
      <StyledTypography typographyType="body" align="center" as="span">
        {projectName}
      </StyledTypography>
    </Wrapper>
  );
};

export default ProjectNavigationTooltip;
