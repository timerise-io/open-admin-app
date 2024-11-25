import React, { useCallback, useEffect, useRef, useState } from "react";
import useOnClickOutside from "helpers/hooks/useOnClickOutside";
import styled, { css } from "styled-components";
import { IconCheck, IconChevronDown } from "@tabler/icons";
import { Typography } from "./Typography";
import { Column } from "./layout/Column";
import { Row } from "./layout/Row";

const SelectWrapper = styled(Column)`
  position: relative;
  width: fit-content;

  .hidden {
    display: none;
  }
`;

const OpenListButton = styled.button<{ disabled?: boolean }>`
  all: unset;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  height: 100%;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);

  .chevron {
    width: 15px;
    height: 15px;
    margin: auto 0 auto 24px;
  }

  .label-value {
    max-width: 135px;
  }

  ${({ theme, disabled }) => {
    const background = disabled ? theme.colorSchemas.background.primary.color : theme.colorSchemas.input.background;
    const fontColor = disabled ? theme.colors.secondary : theme.colors.primary;
    const cursor = disabled ? "unset" : "pointer";
    const boxShadow = disabled ? "0px 1px 2px rgba(0, 0, 0, 0.08);" : "0px 1px 2px rgba(0, 0, 0, 0.08)";
    return css`
      background: ${background};
      color: ${fontColor};

      &:hover {
        cursor: ${cursor};
        box-shadow: ${boxShadow};
      }
    `;
  }}
`;

const StyledLabel = styled(Typography)<{ disabled?: boolean }>`
  margin: 0;

  ${({ theme, disabled }) => {
    const fontColor = disabled ? "#999999" : theme.colors.primary;

    return css`
      color: ${fontColor};
    `;
  }}
`;

const StyledValue = styled(Typography)<{ disabled?: boolean }>`
  margin: 0 0 0 4px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${({ theme, disabled }) => {
    const fontColor = disabled ? "#999999" : theme.colors.primary;

    return css`
      color: ${fontColor};
    `;
  }}
`;

const OptionsWrapper = styled.div<{ optionsWrapperOffsetTop: number }>`
  z-index: 999;
  position: absolute;
  top: calc(100% - 4px);
  max-width: 100%;
  min-width: 100%;
  padding: 4px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: calc(100vh - ${(props) => props.optionsWrapperOffsetTop}px);
`;

const OptionButton = styled.button`
  all: unset;
  box-sizing: border-box;
  display: flex;
  margin: 4px 0;
  padding: 8px;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    background: #f6f6f6;
  }

  & > span {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - 21px);
  }
`;

const StyledSeparator = styled.div`
  height: 1px;
  max-height: 1px;
  font-size: 0;
  width: calc(100% - 8px);
  background: #d9d9d9;
  margin: 8px 4px;
`;

interface SelectProps {
  label: string;
  value: string;
  options: Record<string, string>;
  onChange?: (value: string) => void;
  separators?: Array<string>;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({ label, value, options, onChange, separators, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [optionsWrapperOffsetTop, setOptionsWrapperOffsetTop] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const optionsWrapperRef = useRef<HTMLDivElement>(null);
  const memoizedCallback = useCallback(() => setIsOpen(false), []);
  useOnClickOutside(ref, memoizedCallback);

  const handleChange = (newSelectedKey: string) => {
    setIsOpen(false);
    onChange && onChange(newSelectedKey);
  };

  const getOptionsWrapperPosition = () => {
    const offsetTop = optionsWrapperRef.current?.getBoundingClientRect().top;
    setOptionsWrapperOffsetTop(offsetTop ? offsetTop + 45 : 0);
  };

  useEffect(() => {
    getOptionsWrapperPosition();
  }, [isOpen]);

  useEffect(() => {
    getOptionsWrapperPosition();
    window.addEventListener("resize", getOptionsWrapperPosition);
  }, []);

  return (
    <SelectWrapper ai="flex-start">
      <OpenListButton onClick={() => setIsOpen(!isOpen)} disabled={disabled}>
        <Row className="label-value" jc="flex-start">
          <StyledLabel typographyType="body" disabled={disabled}>
            {label}:
          </StyledLabel>
          <StyledValue typographyType="body" weight="700" disabled={disabled}>
            {options[value]}
          </StyledValue>
        </Row>
        <IconChevronDown className="chevron" />
      </OpenListButton>
      <div className={isOpen ? "" : "hidden"} ref={ref}>
        <OptionsWrapper optionsWrapperOffsetTop={optionsWrapperOffsetTop} ref={optionsWrapperRef}>
          {Object.entries(options).map(([itemKey, itemValue], index) => {
            return (
              <React.Fragment key={index}>
                {separators?.includes(itemKey) && <StyledSeparator />}
                <OptionButton
                  key={`select-popup-option-${itemKey}`}
                  onClick={() => handleChange(itemKey)}
                  title={itemValue}
                >
                  <Typography typographyType="body" weight={itemKey === value ? "700" : "400"} as="span">
                    {itemValue}
                  </Typography>
                  {itemKey === value && <IconCheck size={20} />}
                </OptionButton>
              </React.Fragment>
            );
          })}
        </OptionsWrapper>
      </div>
    </SelectWrapper>
  );
};
