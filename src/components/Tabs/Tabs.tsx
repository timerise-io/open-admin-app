import React, { FC } from "react";
import { Row } from "components/layout/Row";
import styled, { css } from "styled-components";

const TabsWrapper = styled(Row)`
  gap: 20px;
  border-bottom: 1px #e6e6e6 solid;
  z-index: 100;
  position: sticky;
  top: 100px;
  background: #f6f6f6;
`;

const Tab = styled.button<{ selected: boolean }>`
  all: unset;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 13px;
  line-height: 20px;
  padding-bottom: 4px;
  cursor: pointer;
  ${({ selected }) => {
    if (!selected) return "border-bottom: 2px transparent solid";
    return css`
      border-bottom: 2px #333333 solid;
    `;
  }}
`;

export interface TabProp {
  text: string;
  id: string;
}

interface TabsProps {
  items: Array<TabProp>;
  onSelect: (value: string) => void;
  selectedId: string;
}

const Tabs: FC<TabsProps> = ({ items, onSelect, selectedId }) => {
  return (
    <TabsWrapper jc="flex-start">
      {items.map((item, index) => {
        return (
          <Tab
            key={`tab-item-${item.id}-${index}`}
            selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
            type="button"
          >
            {item.text}
          </Tab>
        );
      })}
    </TabsWrapper>
  );
};

export default Tabs;
