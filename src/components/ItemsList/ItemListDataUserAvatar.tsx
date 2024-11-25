import React from "react";
import { Typography } from "components/Typography";
import { Row } from "components/layout/Row";
import styled from "styled-components";
import { IconUser } from "@tabler/icons";

const StyledAvatar = styled.div`
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  margin-right: 16px;
  font-size: 18px;
  border: 1px solid #e5e5e5;
  color: #999999;
`;

const StyledPhoto = styled.img`
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
  margin-right: 16px;
`;

const Wrapper = styled.div`
  overflow: hidden;
  margin-left: 16px;
`;

interface ItemListDataUserAvatarProps {
  text: string;
  className?: string;
  src?: string;
}

export const ItemListDataUserAvatar: React.FC<ItemListDataUserAvatarProps> = ({ text, src = "", className = "" }) => {
  return (
    <Wrapper className={className}>
      <Row jc="flex-start">
        {src === "" ? (
          <StyledAvatar>
            <IconUser />
          </StyledAvatar>
        ) : (
          <StyledPhoto src={src} alt={text} />
        )}
        <Typography typographyType="body">{text}</Typography>
      </Row>
    </Wrapper>
  );
};
