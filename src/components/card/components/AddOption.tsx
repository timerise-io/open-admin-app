import React, { useEffect, useState } from "react";
import StyledInput from "components/StyledInput";
import { Row } from "components/layout/Row";
import { uniq } from "lodash";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IconPlus } from "@tabler/icons";

const StyledRow = styled(Row)`
  position: sticky;
  top: 0;
  background: #fff;
`;
const StyledAddInput = styled(StyledInput)`
  width: 100%;
  margin: 8px 0 0;
`;

const AddButton = styled.button`
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
  onChange?: (value: string | string[]) => void;
  selected: string | string[];
  isOpen?: boolean;
}

export const AddOption: React.FC<Props> = ({ options, setFilteredOptions, onChange, selected, isOpen }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddLabel();
    }
    e.stopPropagation();
    return;
  };

  const handleAddLabel = () => {
    if (value === "") return;

    setFilteredOptions({ [value]: value, ...options });
    onChange && onChange(uniq([...(selected as []), value]));
  };

  useEffect(() => {
    return () => {
      setValue("");
    };
  }, [isOpen, options, setFilteredOptions]);

  return (
    <StyledRow ai="center" jc="center">
      <StyledAddInput
        placeholder={t("common:add-new-label-placeholder")}
        onChange={handleChange}
        value={value}
        onKeyDown={handleKeyDown}
      />
      {value !== "" && (
        <AddButton
          onClick={() => {
            setValue("");
            handleAddLabel();
          }}
        >
          <IconPlus size={16} />
        </AddButton>
      )}
    </StyledRow>
  );
};
