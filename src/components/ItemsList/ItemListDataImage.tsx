import React from "react";
import { Typography } from "components/Typography";
import { Row } from "components/layout/Row";
import styled from "styled-components";
import { IconPhoto } from "@tabler/icons";

const Wrapper = styled.div`
  overflow: hidden;
  margin-left: 16px;
`;

const StyledImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  margin-right: 16px;
  object-fit: cover;
`;

const NoImageWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  margin-right: 16px;
  display: grid;
  place-items: center;
  color: #999999;
`;

const StyledTypography = styled(Typography)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: calc(100% - 80px);
`;

const NoImage = () => {
  return (
    <NoImageWrapper>
      <IconPhoto />
    </NoImageWrapper>
  );
};

interface ItemListDataImageProps {
  src: string;
  text: string;
  className?: string;
}

export const ItemListDataImage: React.FC<ItemListDataImageProps> = ({ src, text, className = "" }) => {
  return (
    <Wrapper className={className}>
      <Row jc="flex-start">
        {src !== "" ? <StyledImage src={src} alt={text} /> : <NoImage />}
        <StyledTypography typographyType="body">{text}</StyledTypography>
      </Row>
    </Wrapper>
  );
};
