import styled from "styled-components";

export const ContextLink = styled.a`
  all: unset;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
  padding: 9px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #ffffff;
  color: #333333;
  display: flex;
  white-space: nowrap;
  font-size: 13px;
  line-height: 16px;
  gap: 10px;
  width: 100%;
  justify-content: center;

  &:hover,
  &:focus {
    border: 1px solid #999999;
  }

  & > * {
    font-size: 13px;
    line-height: 16px;
    height: 16px;
  }

  &:visited {
    color: #333333;
  }
`;
