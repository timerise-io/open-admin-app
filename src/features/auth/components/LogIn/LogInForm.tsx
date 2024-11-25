import React from "react";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import TextField from "components/forms/TextField";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { ROUTES } from "constans/routes";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { useLogIn } from "features/auth/hooks/useLogIn";
import { Form, Formik } from "formik";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { TFunction, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import * as Yup from "yup";

const getValidationSchema = (t: TFunction<"common"[]>) => {
  return Yup.object({
    email: Yup.string().required(t("common:validation.required")).email(t("common:validation.email")),
    password: Yup.string().required(t("common:validation.required")),
  });
};

const Wrapper = styled(Column)`
  width: 100%;
  max-width: 360px;
  margin: auto;
  & > * {
    width: 100%;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const ForgotPasswordLink = styled(Link)`
  position: absolute;
  top: 0;
  right: 0;
  color: #333333;
`;

const StyledLink = styled.a`
  color: #333333;
`;

const StyledFormHeader = styled(Typography)`
  font-size: 28px;
  margin-bottom: 12px;
`;

export const LogInForm = () => {
  const [apiState, setApiState] = useRecoilState(apiStatusAtom("LOGIN"));
  const { t } = useTranslation();
  const whitelabel = useWhitelabel();
  const logIn = useLogIn();

  React.useEffect(
    () => () => {
      setApiState({});
    },
    [setApiState],
  );

  return (
    <Wrapper>
      <StyledFormHeader typographyType="h1" align="center" as="h1">
        {t("log-in")}
      </StyledFormHeader>
      <Row mb={4} jc="center">
        <Typography typographyType="body" align="center" as="span">
          {t("dont-have-account")}
        </Typography>
        <Box mr={0.5} />
        <StyledLink href={whitelabel.signUpUrl}>
          <Typography typographyType="body" as="span">
            {t("sign-up")}
          </Typography>
        </StyledLink>
      </Row>
      {apiState.state === "ERROR" && (
        <Box mb={4}>
          <Typography typographyType="body" align="center" as="span" color="error">
            {t("incorrect-email-password")}
          </Typography>
          <Typography typographyType="body" align="center" as="span" color="error">
            {t("try-again-or-reset-password")}
          </Typography>
        </Box>
      )}
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(formValues) => {
          logIn({ variables: { ...formValues } });
          localStorage.setItem("PROVIDER", "email");
        }}
        validationSchema={getValidationSchema(t)}
      >
        {({ isValid }) => {
          return (
            <Form>
              <TextField name="email" />
              <PasswordWrapper>
                <TextField name="password" inputProps={{ type: "password" }} />
                <ForgotPasswordLink to={ROUTES.forgotPassword}>
                  <Typography typographyType="label" as="span">
                    {t("forgot-password")}
                  </Typography>
                </ForgotPasswordLink>
              </PasswordWrapper>
              <Box mt={2}>
                <Button disabled={!isValid} type="submit" buttonType="primary">
                  {t("log-in")}
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};
