import React from "react";
import styled from "styled-components";

const ButtonSpinnerWrapper = styled.div`
  width: 100%;
  position: absolute;
  background: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: progress;
`;

const StyledButtonSpinner = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #999999 94%, #0000) top/2px 2px no-repeat,
    conic-gradient(#0000 30%, #999999);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 3px), #000 0);
  animation: s3 1s infinite linear;

  @keyframes s3 {
    100% {
      transform: rotate(1turn);
    }
  }
`;

export const ButtonSpinner = () => {
  return (
    <ButtonSpinnerWrapper>
      <StyledButtonSpinner />
    </ButtonSpinnerWrapper>
  );
};
