import React from "react";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { IconSearch, IconX } from "@tabler/icons";

const Wrapper = styled.div`
  position: relative;

  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);

  &:hover {
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.28);
  }

  .icon-search {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;

const StyledInput = styled.input`
  all: unset;
  cursor: pointer;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 4px;
  width: 208px;
  height: 36px;
  padding: 10px 30px 10px 12px;

  ${({ theme }) => {
    const typographyTheme = theme.typography.body;
    const chosenColor = theme.colors.primary;
    return css`
      font-size: ${typographyTheme.size};
      font-weight: ${typographyTheme.weight};
      line-height: ${typographyTheme.lineHeight};
      color: ${chosenColor};
    `;
  }}
`;

const ClearButton = styled.button`
  all: unset;
  position: absolute;
  right: 0px;
  top: 0px;
  box-sizing: border-box;
  padding: 10px;
  cursor: pointer;
`;

interface SearchInputProps {
  startValue: string;
  onChange: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onChange, startValue }) => {
  const [value, setValue] = React.useState(startValue);
  const { t } = useTranslation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayOnChange = React.useCallback(
    debounce((newValue) => onChange(newValue), 700),
    [],
  );
  return (
    <Wrapper>
      <StyledInput
        placeholder={t("common:search-placeholder")}
        value={value}
        onChange={(ev) => {
          delayOnChange(ev.target.value);
          setValue(ev.target.value);
        }}
      />
      {value !== "" ? (
        <ClearButton
          onClick={() => {
            onChange("");
            setValue("");
          }}
        >
          <IconX size={16} />
        </ClearButton>
      ) : (
        <IconSearch className="icon-search" size={16} />
      )}
    </Wrapper>
  );
};
