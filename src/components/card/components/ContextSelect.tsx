import React, { useCallback, useRef, useState } from "react";
import StyledLabel from "components/StyledLabel";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import useOnClickOutside from "helpers/hooks/useOnClickOutside";
import styled, { css } from "styled-components";
import { IconCheck, IconChevronDown } from "@tabler/icons";
import { AddOption } from "./AddOption";
import { SelectSearch } from "./SelectSearch";

const SelectWrapper = styled(Column)`
  position: relative;
  width: 100%;

  .hidden {
    display: none;
  }
`;

const OpenListButton = styled.button`
  all: unset;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  height: 36px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  ${({ theme, disabled }) => {
    const borderColor = theme.colorSchemas.input.border;
    const backgroundColor = disabled ? "#F6F6F6" : theme.colorSchemas.input.background;

    return css`
      background-color: ${backgroundColor};
      border-color: ${borderColor};
      border-radius: ${theme.borderRadius};
      font-size: ${theme.typography.body.size};
      padding: calc(1.125 * ${theme.spacing}) calc(1.375 * ${theme.spacing});
    `;
  }}

  ${({ theme, disabled }) => {
    const fontColor = disabled ? "#999999" : theme.colors.primary;

    if (disabled)
      return css`
        .disabled-text {
          color: ${fontColor};
        }
      `;

    const borderHoverColor = theme.colorSchemas.input.borderHover;
    const borderFocusColor = theme.colors.primary;

    return css`
      &:hover {
        border-color: ${borderHoverColor};
      }

      &:focus {
        border-color: ${borderFocusColor};
      }
    `;
  }}

  .chevron {
    width: 15px;
    height: 15px;
    margin: auto 0 auto 24px;
  }
`;

const StyledValue = styled(Typography)<{ hasValue: boolean }>`
  margin: 0 0 0 4px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${({ hasValue }) => {
    if (!hasValue)
      return css`
        color: #777;
      `;
  }}
`;

const OptionsWrapper = styled.div<{ withSearch: boolean; withAddOption: boolean }>`
  z-index: 999;
  position: absolute;
  top: calc(100% - 4px);
  min-width: 100%;
  padding: 4px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow: auto;

  ${({ withSearch, withAddOption }) => {
    if (withSearch || withAddOption)
      return css`
        padding: 0 4px 4px;
      `;
  }}
`;

const OptionButton = styled.button`
  all: unset;
  box-sizing: border-box;
  display: flex;
  margin: 4px 0;
  padding: 8px 12px;
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

const StyledRow = styled(Row)`
  max-width: calc(100% - 40px);
`;

const showTick = (key: string, value: string | Array<string>) => {
  if (typeof value === "string") {
    return value === key;
  }

  const index = value.indexOf(key);

  return index > -1;
};

const getMultiValue = (value: Array<string>, options: Record<string, string>) => {
  const texts = value.map((item) => {
    return options[item] ?? "";
  });

  if (texts.length < 4) {
    return texts.join(", ");
  }

  return `${texts.slice(0, 3).join(", ")} +${texts.length - 3}`;
};

type ContextSelectProps = {
  className?: string;
  label: string;
  value: string | Array<string>;
  options: Record<string, string>;
  onChange?: (value: string | Array<string>) => void;
  disabled?: boolean;
  fixedDisplay?: string;
  closeAfterChange?: boolean;
  ctx?: string;
  separators?: Array<string>;
  placeholder?: string;
  withSearch?: boolean;
  withAddOption?: boolean;
};

export const ContextSelect: React.FC<ContextSelectProps> = ({
  label,
  value,
  options,
  onChange,
  disabled = false,
  fixedDisplay,
  className,
  closeAfterChange = false,
  ctx = "",
  separators = [],
  placeholder,
  withSearch = false,
  withAddOption = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const ref = useRef<HTMLDivElement>(null);
  const memoizedCallback = useCallback((event: Event) => {
    setIsOpen(false);
  }, []);

  useOnClickOutside(ref, memoizedCallback);

  const handleChange = (newSelectedKey: string) => {
    if (typeof value === "string") {
      setIsOpen(false);
      onChange && onChange(newSelectedKey);
      closeAfterChange && setIsOpen(false);
      return;
    }
    //multiselect below
    const index = value.indexOf(newSelectedKey);
    if (index > -1) {
      const newValues = [...value];
      newValues.splice(index, 1);
      onChange && onChange([...newValues]);
    } else {
      onChange && onChange([...value, newSelectedKey]);
    }
    closeAfterChange && setIsOpen(false);
  };

  const selectedValue =
    typeof value === "string" ? options[value] : getMultiValue(value, withAddOption ? filteredOptions : options);
  const hasValue = typeof value === "string" ? value !== "" : value.length > 0 || fixedDisplay;

  return (
    <SelectWrapper ai="flex-start" ref={ref} className={className}>
      {label !== "" && <StyledLabel data-ctx={ctx}>{label}</StyledLabel>}
      <OpenListButton
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        type="button"
        disabled={disabled}
      >
        <StyledRow className="label-value" jc="flex-start">
          <StyledValue className="disabled-text" typographyType="body" hasValue={!!hasValue}>
            {fixedDisplay || selectedValue || placeholder}
          </StyledValue>
        </StyledRow>
        <IconChevronDown className="chevron" />
      </OpenListButton>
      <div className={isOpen ? "" : "hidden"}>
        <OptionsWrapper withSearch={withSearch} withAddOption={withAddOption}>
          {withSearch && <SelectSearch options={options} setFilteredOptions={setFilteredOptions} isOpen={isOpen} />}
          {withAddOption && (
            <AddOption
              options={filteredOptions}
              setFilteredOptions={setFilteredOptions}
              onChange={onChange}
              selected={value}
              isOpen={isOpen}
            />
          )}

          {Object.entries(filteredOptions).map(([itemKey, itemValue]) => {
            const isMarked = showTick(itemKey, value);

            return (
              <React.Fragment key={`select-popup-option-${itemKey}`}>
                {separators?.includes(itemKey) && <StyledSeparator />}
                <OptionButton onClick={() => handleChange(itemKey)} type="button">
                  <Typography typographyType="body" weight={isMarked ? "700" : "400"} as="span">
                    {itemValue}
                  </Typography>
                  {isMarked && <IconCheck size={20} />}
                </OptionButton>
              </React.Fragment>
            );
          })}
        </OptionsWrapper>
      </div>
    </SelectWrapper>
  );
};
