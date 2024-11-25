import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background-color: #f6f6f6;
  color: #333333;
  display: grid;
  place-items: center;
`;

export const Avatar: React.FC<{ text: string }> = ({ text }) => {
  const words = text.split(" ").filter((a) => !!a);
  const avatarText = words.length > 1 ? `${words[0][0]}${words[1][0]}` : words[0].substring(0, 2);

  return <Wrapper>{avatarText}</Wrapper>;
};
