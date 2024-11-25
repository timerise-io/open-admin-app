import React, { useState } from "react";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import TextField from "components/forms/TextField";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { ResetPasswordMutationVariables } from "features/auth/api/mutations/models";
import { useResetPassword } from "features/auth/hooks/useResetPassword";
import { Form, Formik } from "formik";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { pickBy } from "lodash";
import { TFunction, useTranslation } from "react-i18next";
import styled from "styled-components";
import * as Yup from "yup";

const getValidationSchema = (t: TFunction<"common"[]>) => {
  return Yup.object({
    email: Yup.string().required(t("common:validation.required")).email(t("common:validation.email")),
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

const StyledFormHeader = styled(Typography)`
  font-size: 28px;
`;

const SentInstruction: React.FC<{ email: string }> = ({ email }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Column mb={5}>
        <StyledFormHeader typographyType="h1" align="center" as="h1">
          {t("check-your-inbox")}
        </StyledFormHeader>
        <Typography typographyType="body" align="center" as="h2">
          {t("we-have-sent-instructions")}
          <p>{`(${email}).`}</p>
        </Typography>
      </Column>
    </Wrapper>
  );
};

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();
  const whitelabel = useWhitelabel();
  const { resetPasswordMutation: resetPassword, state: resetState } = useResetPassword();

  if (resetState === "done") return <SentInstruction email={email} />;

  return (
    <Wrapper>
      <Column mb={5}>
        <StyledFormHeader typographyType="h1" align="center" as="h1">
          {t("forgot-password")}
        </StyledFormHeader>
        <Typography typographyType="body" align="center" as="h2">
          {t("forgot-password-info")}
        </Typography>
      </Column>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={(formValues) => {
          resetPassword({
            variables: pickBy({
              ...formValues,
              organizationId: whitelabel.organizationId,
            }) as ResetPasswordMutationVariables,
          });
          setEmail(formValues.email);
        }}
        validationSchema={getValidationSchema(t)}
      >
        {({ isValid }) => {
          return (
            <Form>
              <TextField name="email" />
              <Box mt={2}>
                <Button disabled={!isValid} type="submit" buttonType="primary">
                  {t("send-me-instructions")}
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};
