import React, { PropsWithChildren } from "react";
import { Typography } from "components/Typography";
import styled, { css } from "styled-components";
import { IconAlertCircle, IconCircleCheck } from "@tabler/icons";

const StyledToast = styled.div<{ type: "SUCCESS" | "ERROR" }>`
  position: relative;
  margin: 4px;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px 12px;
  display: flex;
  height: 36px;
  max-height: 36px;
  align-items: center;

  opacity: 0;

  animation: 0.1s cubic-bezier(0.6, -0.28, 0.74, 0.05) 0s 1 slideInFromTop,
    2s cubic-bezier(0.55, 0.06, 0.83, 0.37) 0.1s 1 stay, 0.5s cubic-bezier(0.55, 0.06, 0.83, 0.37) 2.1s 1 fadeOut;

  @keyframes slideInFromTop {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes stay {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  ${({ type }) => {
    return css`
      background: ${type === "SUCCESS" ? "#267D3D" : "#C83A2D"};
      border: 1px solid ${type === "SUCCESS" ? "#267D3D" : "#C83A2D"};
      box-shadow: 0px 2px 4px ${type === "SUCCESS" ? "rgba(52, 168, 83, 0.2)" : "rgba(234, 67, 53, 0.2)"};

      & > svg {
        margin-right: 8px;
        color: ${type === "SUCCESS" ? "#34a853" : "#EA4335"};
      }
    `;
  }}
`;

const MessageWrapper = styled.div`
  display: flex;
  gap: 3px;
  color: #ffffff;
`;

const Wrapper = styled.div`
  position: relative;
  animation: 0.1s cubic-bezier(0.6, -0.28, 0.74, 0.05) 0s 1 slideInFromTop;

  @keyframes slideInFromTop {
    0% {
      height: 0;
      max-height: 0;
    }
    100% {
      height: 40px;
      max-height: 40px;
    }
  }
`;

interface ToastProps {
  text?: string;
  type: "SUCCESS" | "ERROR";
}

const Toast: React.FC<PropsWithChildren<ToastProps>> = ({ text, type, children }) => {
  if (!text && !children) return null;

  return (
    <Wrapper>
      <StyledToast type={type}>
        {type === "SUCCESS" ? (
          <IconCircleCheck size={20} color="#FFFFFF" />
        ) : (
          <IconAlertCircle size={20} color="#FFFFFF" />
        )}
        <MessageWrapper>
          {text && (
            <Typography typographyType="body" as="span" color="inherit">
              {text}
            </Typography>
          )}
          {children}
        </MessageWrapper>
      </StyledToast>
    </Wrapper>
  );
};

export default Toast;
