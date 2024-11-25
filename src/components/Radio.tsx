import React from "react";
import styled from "styled-components";
import { Typography } from "./Typography";
import { Row } from "./layout/Row";

const RadioInput = styled.input`
  margin: 0 6px 0 0;
  position: relative;
  width: 0;
  height: 0;
  margin-right: 22px;
  cursor: pointer;
  display: none;
`;

const RadioWrapper = styled(Row)`
  & > label::before {
    top: 2px;
    left: -22px;
    position: absolute;
    content: "";
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid #e6e6e6;
  }

  &:hover > label::before {
    border: 1px solid #bfbfbf;
  }

  & > label::after {
    top: 2px;
    left: -22px;
    position: absolute;
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: 4px;
    background-color: #333333;
  }

  input[type="radio"] + label::after {
    content: none;
  }

  input[type="radio"]:checked + label::after {
    content: "";
  }

  input[type="radio"]:checked + label::before {
    border: 1px solid #333333;
  }
`;

const RadioLabel = styled(Typography)`
  position: relative;
  margin-left: 22px;
  cursor: pointer;
`;

interface RadioProps {
  checked?: boolean;
  label: string;
  onClick?: () => void;
}

const Radio = ({ label, onClick, checked = false }: RadioProps) => {
  return (
    <RadioWrapper>
      <RadioInput
        type="radio"
        checked={checked}
        onChange={() => {
          onClick && onClick();
        }}
      />
      <RadioLabel
        typographyType="body"
        as="label"
        onClick={() => {
          onClick && onClick();
        }}
      >
        {label}
      </RadioLabel>
    </RadioWrapper>
  );
};

export default Radio;
