import React, { PropsWithChildren, useCallback, useRef, useState } from "react";
import { Button } from "components/Button";
import useOnClickOutside from "helpers/hooks/useOnClickOutside";
import styled from "styled-components";
import { IconDots } from "@tabler/icons";

const Wrapper = styled.div`
  position: relative;
`;

const ToggleMenuButton = styled.button`
  all: unset;
  box-sizing: border-box;
  min-width: 36px;
  height: 36px;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.28);
  }
`;

const OptionsWrapper = styled.div`
  z-index: 999;
  position: absolute;
  top: 24px;
  right: -8px;
  min-width: 220px;
  padding: 8px 16px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ExtendedMenuButton = styled(Button)`
  white-space: nowrap;

  background: unset;
  box-shadow: unset;
  font-weight: 400;
  display: flex;

  &:hover {
    background: #f6f6f6;
    box-shadow: unset;
  }
`;

export const ExtendedMenuSplitter = styled.div`
  border-top: 1px solid #e7e7e7;
`;

const ExtendedMenu: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const memoizedCallback = useCallback(() => setIsOpen(false), []);
  useOnClickOutside(ref, memoizedCallback);

  return (
    <Wrapper ref={ref}>
      <ToggleMenuButton type="button" onClick={() => setIsOpen(!isOpen)}>
        <IconDots />
      </ToggleMenuButton>
      <div style={{ display: isOpen ? "block" : "none" }}>
        <OptionsWrapper>{children}</OptionsWrapper>
      </div>
    </Wrapper>
  );
};

export default ExtendedMenu;
