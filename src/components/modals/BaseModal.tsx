import React, { PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";

export const BaseModalUpperContentWrapper = styled.div`
  background: #ffffff;
  border-radius: 4px;
`;

export const BaseModalControlsWrapper = styled.div`
  padding: 15px 20px 20px 20px;
`;

export const BaseModalHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 5px 0px 20px;
  border-radius: 4px;
`;

const Wrapper = styled.div`
  background-color: #00000073;
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: grid;
  place-items: center;
  & > * {
    width: 100%;
    max-width: 460px;
  }
`;

const StyledModalCard = styled.div<{ customWidth?: number }>`
  ${({ customWidth }) => {
    const w = customWidth ?? 530;
    return css`
      width: ${w}px;
      max-width: ${w}px;
    `;
  }}

  max-height: 650px;

  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

export const ActionRowBase = styled.div`
  display: flex;
  gap: 10px;
  background: #f6f6f6;
  padding: 20px;
  border-radius: 4px;
  justify-content: space-between;
  align-items: center;
`;

export const ActionButtonsBaseWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const ActionRow = styled(ActionRowBase)`
  justify-content: flex-end;
`;

interface BaseModalProps {
  open?: boolean;
  customWidth?: number;
}

const BaseModal: React.FC<PropsWithChildren<BaseModalProps>> = ({ open = false, customWidth, children }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <Wrapper>
      <StyledModalCard customWidth={customWidth}>{children}</StyledModalCard>
    </Wrapper>,
    document.getElementById("modal")!,
  );
};

export default BaseModal;
