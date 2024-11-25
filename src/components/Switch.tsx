import React from "react";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import styled, { css } from "styled-components";
import { IconCheck, IconLock } from "@tabler/icons";

const CheckboxInput = styled.input`
  margin: 0 6px 0 0;
  position: relative;
  width: 0;
  height: 0;
  margin-right: 22px;
  cursor: pointer;
  display: none;
  height: 20px;
`;

const CheckboxWrapper = styled(Row)<{ value: boolean; disable: boolean }>`
  position: relative;
  height: 20px;

  & > label::before {
    top: -2px;
    left: -34px;
    position: absolute;
    z-index: 10;
    content: "";
    /* width: 14px;
    height: 14px;
    border-radius: 4px; */
    /* background: #ffffff; */

    /* position: relative; */
    width: 26px;
    height: 14px;
    border-radius: 34px;
    cursor: pointer;
  }

  & > label::after {
    top: -1px;
    /* left: -30px; */
    position: absolute;
    z-index: 10;
    content: "";
    /* width: 14px;
    height: 14px;
    border-radius: 4px; */
    background: #ffffff;

    /* position: relative; */
    width: 14px;
    height: 14px;
    border-radius: 50%;
    cursor: pointer;
  }

  & ~ div {
    background: red;
  }

  ${({ theme, value, disable }) => {
    const border = value ? "#267D3D" : "#666666";
    const disableBorder = "#D9D9D9";
    const background = value ? "#267D3D" : "#666666";
    const disableBackground = "#D9D9D9";
    const hoverBorder = value ? "#267D3D" : "#666666";
    const hoverBackground = value ? "#267D3D" : "#666666";

    const dotColor = value ? "FFFFFF" : "#FFFFFF";
    const disableDotColor = "#FFFFFF";
    const dotPos = value ? "-21px" : "-33px";
    const disableDotPos = "-33px";

    return css`
      ${disable &&
      `& > label {
          color: #999999;
        }`}

      & > label::after {
        background: ${!disable ? dotColor : disableDotColor};
        left: ${!disable ? dotPos : disableDotPos};
      }

      & > label::before {
        border: 1px solid ${!disable ? border : disableBorder};
        background: ${!disable ? background : disableBackground};
      }

      &:hover > label::before {
        border: 1px solid ${!disable ? hoverBorder : disableBorder};
        background: ${!disable ? hoverBackground : disableBackground};
      }
    `;
  }}
  & .icon-check {
    position: absolute;
    top: 1px;
    left: -19px;
    z-index: 20;
  }
  & .icon-lock {
    position: absolute;
    top: 1px;
    left: -31px;
    z-index: 20;
    fill: #333;
    stroke-width: 3;

    rect {
      stroke-width: 2;
    }
    circle {
      stroke: #fff;
    }
    path {
      fill: #fff;
      stroke-width: 2;
    }
  }
`;

const CheckboxLabel = styled(Typography)`
  position: relative;
  margin-left: 34px;
  cursor: pointer;
  font-weight: 400;
  line-height: 0.8125rem;
`;

interface CheckboxProps {
  label: string;
  value: boolean;
  disable?: boolean;
  onChange: (value: boolean) => void;
}

const Switch: React.FC<CheckboxProps> = ({ label, value, disable = false, onChange }) => {
  return (
    <Column ai="flex-start" mb={0.5}>
      <CheckboxWrapper value={value} disable={disable}>
        <CheckboxInput
          type="radio"
          checked={value}
          onChange={() => {
            !disable && onChange(!value);
          }}
          onClick={() => {
            !disable && onChange(!value);
          }}
        />
        <CheckboxLabel
          typographyType="body"
          as="label"
          onClick={() => {
            !disable && onChange(!value);
          }}
        >
          {label}
          {value && !disable && <IconCheck className="icon-check" size={10} strokeWidth="3" color="#267D3D" />}
          {disable && <IconLock className="icon-lock" size={10} strokeWidth="3" color="#333333" />}
        </CheckboxLabel>
      </CheckboxWrapper>
    </Column>
  );
};

export default Switch;
