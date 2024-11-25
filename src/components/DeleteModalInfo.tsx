import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { IconAlertCircle } from "@tabler/icons";
import { Typography } from "./Typography";
import { Column } from "./layout/Column";

const DeleteInfoWrapper = styled.div`
  margin-top: 28px;
  margin-bottom: 20px;
  background: #fef6f5;
  border: 1px solid #ea4335;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px 12px;
  display: flex;
  gap: 8px;

  & > .icon {
    color: #ea4335;
    min-width: 15px;
    height: 15px;
    margin-top: 2px;
  }
`;

interface DeleteModalInfoProps {
  text: string;
}

const DeleteModalInfo: React.FC<PropsWithChildren<DeleteModalInfoProps>> = ({ text, children }) => {
  return (
    <DeleteInfoWrapper>
      <IconAlertCircle className="icon" />
      <Column ai="flex-start" gap="8px">
        <Typography typographyType="body" as="span">
          {text}
        </Typography>
        {children}
      </Column>
    </DeleteInfoWrapper>
  );
};

export default DeleteModalInfo;
