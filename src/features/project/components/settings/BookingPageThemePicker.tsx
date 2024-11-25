import React from "react";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IconCircleCheck } from "@tabler/icons";

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

const Wrapper = styled(Row)`
  gap: 10px;
`;

const ImgWrapper = styled.div`
  position: relative;
  cursor: pointer;

  .light-icon,
  .dark-icon {
    width: 28px;
    height: 28px;
    position: absolute;
    right: 12px;
    top: 12px;
  }

  .light-icon {
    color: #333333;
  }

  .dark-icon {
    color: #ffffff;
  }
`;

const RadioLabel = styled(Typography)`
  position: relative;
  margin-left: 22px;
  cursor: pointer;
`;

interface BookingPageThemePickerProps {
  theme: "LIGHT" | "DARK";
  onChange: (theme: "LIGHT" | "DARK") => void;
}

export const BookingPageThemePicker: React.FC<BookingPageThemePickerProps> = ({ theme, onChange }) => {
  const { t } = useTranslation();
  return (
    <Wrapper jc="flex-start">
      <Column w="240px" ai="flex-start">
        <RadioWrapper mb={1.25}>
          <RadioInput
            type="radio"
            checked={theme === "LIGHT"}
            onChange={() => {
              onChange("LIGHT");
            }}
          />
          <RadioLabel
            typographyType="body"
            as="label"
            onClick={() => {
              onChange("LIGHT");
            }}
          >
            {t("light")}
          </RadioLabel>
        </RadioWrapper>
        <ImgWrapper
          onClick={() => {
            onChange("LIGHT");
          }}
        >
          <img
            src="https://cdn.timerise.io/app/settings/booking%20page%20-%20service%20-%20light.png"
            width="240"
            height="197"
            alt="light theme"
          />
          {theme === "LIGHT" && <IconCircleCheck className="light-icon" />}
        </ImgWrapper>
      </Column>
      <Column w="240px" ai="flex-start">
        <RadioWrapper mb={1.25}>
          <RadioInput
            type="radio"
            checked={theme === "DARK"}
            onChange={() => {
              onChange("DARK");
            }}
          />
          <RadioLabel
            typographyType="body"
            as="label"
            onClick={() => {
              onChange("DARK");
            }}
          >
            {t("dark")}
          </RadioLabel>
        </RadioWrapper>
        <ImgWrapper
          onClick={() => {
            onChange("DARK");
          }}
        >
          <img
            src="https://cdn.timerise.io/app/settings/booking%20page%20-%20service%20-%20dark.png"
            width="240"
            height="197"
            alt="dark theme"
          />
          {theme === "DARK" && <IconCircleCheck className="dark-icon" />}
        </ImgWrapper>
      </Column>
    </Wrapper>
  );
};
