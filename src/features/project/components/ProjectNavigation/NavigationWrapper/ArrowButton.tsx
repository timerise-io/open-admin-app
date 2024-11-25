import React, { PropsWithChildren } from "react";
import { ProjectButton } from "../ProjectButton.styled";

interface ArrowButtonProps {
  onClick: () => void;
  disabled: boolean;
  className?: string;
}

const ArrowButton: React.FC<PropsWithChildren<ArrowButtonProps>> = ({ children, onClick, className, disabled }) => {
  return (
    <ProjectButton
      className={className}
      selected={false}
      showBadge={false}
      onClick={() => {
        onClick();
      }}
      disabled={disabled}
    >
      {children}
    </ProjectButton>
  );
};

export default ArrowButton;
