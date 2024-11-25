import React, { useState } from "react";
import styled from "styled-components";
import { IconMaximize } from "@tabler/icons";
import { Button } from "./Button";

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  padding: 9px 19px;

  & > svg {
    margin-right: 6px;
  }
`;

export const FullScreenButton = () => {
  const [isFullScreen, setIsFullScreen] = useState(document.fullscreenElement !== null);

  const handleFullScreen = () => {
    if (document.fullscreenElement !== null) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      document.body.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  const buttonText = isFullScreen ? "Exit Full Screen" : "Full Screen";

  return (
    <StyledButton buttonType="secondary" onClick={handleFullScreen}>
      <IconMaximize size={20} />
      <span>{buttonText}</span>
    </StyledButton>
  );
};
