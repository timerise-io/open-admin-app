import React, { useCallback, useEffect, useState } from "react";
import StyledInput from "components/StyledInput";
import { Row } from "components/layout/Row";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IconSearch, IconX } from "@tabler/icons";

const StyledRow = styled(Row)`
  position: sticky;
  top: 0;
  background: #fff;
`;
const StyledSearchInput = styled(StyledInput)`
  width: 100%;
  margin: 8px 0 0;
`;

const StyledIconSearch = styled(IconSearch)`
  position: absolute;
  top: 18px;
  right: 12px;
`;

const ClearButton = styled.button`
  all: unset;
  position: absolute;
  top: 8px;
  right: 2px;
  box-sizing: border-box;
  padding: 10px;
  cursor: pointer;
`;

interface Props {
  options: Record<string, string>;
  setFilteredOptions: Function;
  isOpen?: boolean;
}

export const SelectSearch: React.FC<Props> = ({ options, setFilteredOptions, isOpen }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredOptions = Object.entries(options).filter(([_key, label]) =>
      label.toLowerCase().includes(value.toLowerCase()),
    );

    setValue(value);
    setFilteredOptions(Object.fromEntries(filteredOptions));
  };

  const searchInputRef = useCallback(
    (searchInputElement: HTMLInputElement) => {
      if (searchInputElement) {
        searchInputElement.focus();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen],
  );

  useEffect(() => {
    return () => {
      setValue("");
      setFilteredOptions(options);
    };
  }, [isOpen, options, setFilteredOptions]);

  return (
    <StyledRow ai="center" jc="center">
      <StyledSearchInput
        placeholder={t("common:search-placeholder")}
        onChange={handleChange}
        value={value}
        ref={searchInputRef}
        autoFocus
      />
      {value !== "" ? (
        <ClearButton
          onClick={() => {
            setValue("");
            setFilteredOptions(options);
          }}
        >
          <IconX size={16} />
        </ClearButton>
      ) : (
        <StyledIconSearch size={16} />
      )}
    </StyledRow>
  );
};
