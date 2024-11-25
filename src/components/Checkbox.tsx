import React from "react";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import styled, { css } from "styled-components";
import { IconCheck } from "@tabler/icons";

const CheckboxInput = styled.input`
  margin: 0 6px 0 0;
  position: relative;
  width: 0;
  height: 0;
  margin-right: 22px;
  cursor: pointer;
  display: none;
  height: 18px;
`;

const CheckboxWrapper = styled(Row)`
  position: relative;
  height: 18px;

  & > label::before {
    top: -2px;
    left: -22px;
    position: absolute;
    z-index: 10;
    content: "";
    width: 14px;
    height: 14px;
    border-radius: 4px;
    background: #ffffff;
  }

  ${({ theme }) => {
    const colors = theme.colorSchemas.input;

    return css`
      & > label::before {
        border: 1px solid ${colors.border};
      }

      &:hover > label::before {
        border: 1px solid ${colors.borderHover};
      }

      input[type="checkbox"]:checked + label::before {
        border: 1px solid ${theme.colors.primary};
      }
    `;
  }}
  & > .icon-check {
    position: absolute;
    left: 2px;
    top: 2px;
    z-index: 20;
    cursor: pointer;
  }
`;

const CheckboxLabel = styled(Typography)`
  position: relative;
  margin-left: 22px;
  cursor: pointer;
  font-weight: 400;
  line-height: 0.8125rem;
`;

interface CheckboxProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, value, onChange }) => {
  return (
    <Column ai="flex-start">
      <CheckboxWrapper>
        <CheckboxInput
          type="radio"
          checked={value}
          onChange={() => {
            onChange(!value);
          }}
          onClick={() => {
            onChange(!value);
          }}
        />
        {value && (
          <IconCheck
            className="icon-check"
            size={12}
            onClick={() => {
              onChange(!value);
            }}
          />
        )}
        <CheckboxLabel
          typographyType="body"
          as="label"
          onClick={() => {
            onChange(!value);
          }}
        >
          {label}
        </CheckboxLabel>
      </CheckboxWrapper>
    </Column>
  );
};

export default Checkbox;
