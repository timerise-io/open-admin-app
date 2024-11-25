import React from "react";
import styled from "styled-components";

const SpinnerWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 24px;
  height: 24px;

  & > div {
    transform-origin: 12px 12px;
    animation: lds-spinner 1.6s ease-in-out infinite;
  }
  & > div:after {
    content: " ";
    box-sizing: border-box;
    display: block;
    position: absolute;
    top: 2px;
    left: 11px;
    width: 2px;
    height: 5px;
    border-radius: 2px;
    background-color: #333333;
  }
  & > div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.4s;
  }
  & > div:nth-child(2) {
    transform: rotate(45deg);
    animation-delay: -1.2s;
  }
  & > div:nth-child(3) {
    transform: rotate(90deg);
    animation-delay: -1s;
  }
  & > div:nth-child(4) {
    transform: rotate(135deg);
    animation-delay: -0.8s;
  }
  & > div:nth-child(5) {
    transform: rotate(180deg);
    animation-delay: -0.6s;
  }
  & > div:nth-child(6) {
    transform: rotate(225deg);
    animation-delay: -0.4s;
  }
  & > div:nth-child(7) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }
  & > div:nth-child(8) {
    transform: rotate(315deg);
    animation-delay: 0s;
  }
  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;

export const Spinner = () => {
  return (
    <SpinnerWrapper>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </SpinnerWrapper>
  );
};
