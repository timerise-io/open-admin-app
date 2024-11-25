import styled from "styled-components";

export const IconButton = styled.button`
  all: unset;
  padding: ${({ theme }) => `calc(1.25 * ${theme.spacing})`};
  display: flex;
  border-radius: 50%;
  color: #333333;
  transition: color 0.2s ease-in-out;

  &:active,
  &:hover {
    cursor: ${({ disabled }) => (disabled ? "auto" : "pointer")};
    color: #333333;
  }
`;
