import React from "react";
import { Typography } from "components/Typography";
import { firebaseAuth, githubProvider, googleProvider } from "firebase-config/connection";
import { signInWithPopup } from "firebase/auth";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  max-width: 360px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProviderButton = styled.button`
  all: unset;
  background: #ffffff;
  box-sizing: border-box;
  padding: 8px 12px;
  width: 204px;
  height: 36px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  margin: 4px 0;
  display: flex;
  cursor: pointer;

  & > img {
    width: 20px;
    height: 20px;
    margin-right: 14px;
  }

  &:hover {
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.28);
  }
`;

const StyledOr = styled(Typography)`
  margin-top: 20px;
  margin-bottom: 16px;
`;

const LogInProviders = () => {
  return (
    <Wrapper>
      <StyledOr typographyType="body" as="span">
        or
      </StyledOr>
      <ProviderButton
        onClick={() => {
          signInWithPopup(firebaseAuth, googleProvider);

          localStorage.setItem("PROVIDER", "google");
        }}
      >
        <img src="https://cdn.timerise.io/app/google_logo.png" alt="google logo" />
        <Typography typographyType="body" as="span">
          Sign in with Google
        </Typography>
      </ProviderButton>
      <ProviderButton
        onClick={() => {
          signInWithPopup(firebaseAuth, githubProvider);

          localStorage.setItem("PROVIDER", "github");
        }}
      >
        <img src="https://cdn.timerise.io/app/github_logo.png" alt="github logo" />
        <Typography typographyType="body" as="span">
          Sign in with GitHub
        </Typography>
      </ProviderButton>
    </Wrapper>
  );
};

export default LogInProviders;
