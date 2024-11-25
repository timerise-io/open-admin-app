import React from "react";
import { Typography } from "components/Typography";
import { Row } from "components/layout/Row";
import styled, { css } from "styled-components";

const COLORS = ["#3A80F8", "#34A853", "#FE852F", "#8562D9", "#A23D19"];

const Wrapper = styled.div`
  overflow: hidden;
  margin-left: 16px;
`;

const StyledAvatar = styled.div<{ colorIndex: number }>`
  text-transform: uppercase;
  background: #f6f6f6;
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  margin-right: 16px;
  font-family: Inter;
  font-size: 18px;
  ${({ theme, colorIndex }) => {
    return css`
      color: ${COLORS[colorIndex % 5]};
    `;
  }};
`;

const StyledTypography = styled(Typography)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  min-width: 20px;
`;

interface ItemListDataAvatarProps {
  text: string;
  index: number;
  className?: string;
}

export const ItemListDataAvatar: React.FC<ItemListDataAvatarProps> = ({ text, index, className = "" }) => {
  const words = text.split(" ").filter((a) => !!a);
  let avatarText = "--";
  if (words.length > 1) {
    avatarText = `${words[0][0]}${words[1][0]}`;
  } else if (words.length === 1) {
    avatarText = words[0].substring(0, 2);
  }

  return (
    <Wrapper className={className}>
      <Row jc="flex-start">
        <StyledAvatar colorIndex={index}>{avatarText}</StyledAvatar>
        <StyledTypography as="span" typographyType="body">
          {text}
        </StyledTypography>
      </Row>
    </Wrapper>
  );
};
