import React, { useCallback, useRef, useState } from "react";
import StyledLabel from "components/StyledLabel";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { getMonth } from "date-fns";
import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import startOfMonth from "date-fns/startOfMonth";
import useOnClickOutside from "helpers/hooks/useOnClickOutside";
import styled, { css } from "styled-components";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons";

const SelectWrapper = styled(Column)`
  position: relative;

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

const StyledValue = styled(Typography)`
  margin: 0 0 0 4px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const OptionsWrapper = styled.div`
  z-index: 999;
  position: absolute;
  top: calc(100% - 4px);
  min-width: 100%;
  height: 272px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  width: 240px;
`;

const ArrowButton = styled.button`
  all: unset;
  box-sizing: border-box;
  width: 28px;
  height: 28px;
  cursor: pointer;
  display: grid;
  place-items: center;
`;

const DayButton = styled.button<{ selected?: boolean }>`
  all: unset;
  box-sizing: border-box;
  width: 28px;
  height: 28px;
  cursor: pointer;
  display: grid;
  place-items: center;
  border-radius: 4px;

  ${({ selected }) => {
    if (!selected) return "";

    return css`
      color: #ffffff;
      background: #333333;
    `;
  }}

  &:hover {
    border: 1px solid #333333;
  }

  .other-month {
    color: #999999;
  }
`;

const DayHeader = styled.div`
  all: unset;
  box-sizing: border-box;
  width: 28px;
  height: 28px;
  cursor: pointer;
  display: grid;
  place-items: center;
  color: #999999;
`;

type DatePickerProps = {
  label: string;
  value?: Date;
  onChange?: (value: Date) => void;
  disabled?: boolean;
};

export const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange, disabled = false }) => {
  const [calendarDate, setCalendarDate] = useState(startOfMonth(value ?? new Date()));
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const memoizedCallback = useCallback((event: Event) => {
    setIsOpen(false);
  }, []);
  useOnClickOutside(ref, memoizedCallback);

  const handleChange = (newSelectedKey: Date) => {
    setIsOpen(false);
    onChange && onChange(newSelectedKey);
  };

  const selectedValue = value ? format(value, "eeee d MMMM yyyy") : "";

  const firstWeekOffset = getDay(calendarDate) === 0 ? 6 : getDay(calendarDate) - 1;

  return (
    <SelectWrapper ai="flex-start" ref={ref}>
      {label !== "" && <StyledLabel>{label}</StyledLabel>}
      <OpenListButton
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        type="button"
        disabled={disabled}
      >
        <Row className="label-value" jc="flex-start">
          <StyledValue className="disabled-text" typographyType="body">
            {selectedValue}
          </StyledValue>
        </Row>
      </OpenListButton>
      <div className={isOpen ? "" : "hidden"}>
        <OptionsWrapper>
          <Row>
            <Typography typographyType="body" weight="700" as="span">
              {format(calendarDate, "MMMM yyyy").toLocaleUpperCase()}
            </Typography>
            <Row gap="4px">
              <ArrowButton
                type="button"
                onClick={() => {
                  setCalendarDate(addMonths(calendarDate, -1));
                }}
              >
                <IconArrowNarrowLeft size={20} strokeWidth={1.5} />
              </ArrowButton>
              <ArrowButton
                type="button"
                onClick={() => {
                  setCalendarDate(addMonths(calendarDate, 1));
                }}
              >
                <IconArrowNarrowRight size={20} strokeWidth={1.5} />
              </ArrowButton>
            </Row>
          </Row>
          <Row gap="4px" mt={0.5}>
            {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => {
              return (
                <DayHeader key={`day-header-${index}`}>
                  <Typography typographyType="body" as="span" color="inherit">
                    {day}
                  </Typography>
                </DayHeader>
              );
            })}
          </Row>

          {new Array(6).fill("").map((_, rowIndex) => {
            return (
              <Row key={`calendar-row-${rowIndex}`} gap="4px" mt={0.5}>
                {new Array(7).fill("").map((_, index) => {
                  const day = addDays(calendarDate, rowIndex * 7 + index - firstWeekOffset);

                  const className = getMonth(day) !== getMonth(calendarDate) ? "other-month" : "";

                  const selected = value !== undefined && format(day, "ddMMyyyy") === format(value, "ddMMyyyy");

                  return (
                    <DayButton
                      key={`day-button-${rowIndex}-${index}`}
                      selected={selected}
                      type="button"
                      onClick={() => {
                        handleChange(day);
                      }}
                    >
                      <Typography typographyType="body" as="span" className={className} color="inherit">
                        {format(day, "d")}
                      </Typography>
                    </DayButton>
                  );
                })}
              </Row>
            );
          })}
        </OptionsWrapper>
      </div>
    </SelectWrapper>
  );
};
