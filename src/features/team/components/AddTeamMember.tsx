import React, { useState } from "react";
import { Button } from "components/Button";
import DeleteModalInfo from "components/DeleteModalInfo";
import { IconButton } from "components/IconButton";
import { Typography } from "components/Typography";
import { ContextSelect } from "components/card/components/ContextSelect";
import BoolField from "components/forms/BoolField";
import FormSelect from "components/forms/FormSelect";
import TextField from "components/forms/TextField";
import { Box } from "components/layout/Box";
import { Row } from "components/layout/Row";
import BaseModal, { ActionButtonsBaseWrapper, ActionRow } from "components/modals/BaseModal";
import { Roles } from "features/auth/model/currentUser";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { Form, Formik } from "formik";
import { TFunction, useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import * as Yup from "yup";
import { IconX } from "@tabler/icons";
import { useCreateGhostUser } from "../hooks/useCreateGhostUser";
import { useInvite } from "../hooks/useInvite";

export const getValidationSchema = (t: TFunction) => {
  return Yup.object({
    email: Yup.string().required(t("validation.required")).email(t("validation.email")),
  });
};

interface AddTeamMemberFormValues {
  role: Roles;
  email: string;
  isGhost: boolean;
}

const initialValues: AddTeamMemberFormValues = {
  role: "MANAGER",
  email: "",
  isGhost: false,
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 5px 0px 20px;
  border-radius: 4px;
`;

const ControlsWrapper = styled.div`
  padding: 15px 20px 20px 20px;
`;

const AddTeamMember = () => {
  const projectId = useRecoilValue(selectedProjectAtom);
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { mutation: inviteMutation } = useInvite();
  const { mutation: ghostMutation } = useCreateGhostUser();

  const teamMemberRoleMap: Record<"OWNER" | "ADMIN" | "MANAGER" | "STAFF", string> = {
    OWNER: t("roles.Owner"),
    ADMIN: t("roles.Admin"),
    MANAGER: t("roles.Manager"),
    STAFF: t("roles.Staff"),
  };

  if (!projectId) return null;

  return (
    <>
      <Button
        buttonType="primary"
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        + {t("add")}
      </Button>
      <BaseModal open={isOpen} customWidth={600}>
        <HeaderWrapper>
          <Typography typographyType="h3">{t("common:team.add-team-memeber")}</Typography>
          <IconButton
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <IconX />
          </IconButton>
        </HeaderWrapper>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            if (values.isGhost) {
              ghostMutation({
                projectId,
                email: values.email,
              });
            } else {
              inviteMutation({
                projectId: projectId,
                invitations: [
                  {
                    role: values.role,
                    email: values.email,
                  },
                ],
              });
            }
            setIsOpen(false);
          }}
          validationSchema={getValidationSchema(t)}
        >
          {({ values, resetForm, dirty }) => {
            return (
              <Form>
                <ControlsWrapper>
                  <Row ai="flex-start" gap="10px">
                    <Box w="390px">
                      <TextField name="email" label={t("common:email")} />
                    </Box>

                    <Box style={{ display: values.isGhost ? "none" : "block" }} w="160px">
                      <FormSelect name="role" options={teamMemberRoleMap} label={t("role")} />
                    </Box>
                    <Box style={{ display: !values.isGhost ? "none" : "block" }} w="160px">
                      <ContextSelect options={{ STAFF: t("roles.Staff") }} value="STAFF" label={t("role")} disabled />
                    </Box>
                  </Row>
                  <BoolField label={t("common:team.ghost-user")} name="isGhost" />
                  {values.isGhost && <DeleteModalInfo text={t("common:team.ghost-user-info")}></DeleteModalInfo>}
                </ControlsWrapper>
                <ActionRow>
                  <ActionButtonsBaseWrapper>
                    <Button
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      buttonType="secondary"
                      type="button"
                    >
                      {t("common:cancel")}
                    </Button>
                    <Button style={{ whiteSpace: "nowrap" }} buttonType="primary" type="submit">
                      {values.isGhost ? t("common:add") : t("common:team.send-invitation")}
                    </Button>
                  </ActionButtonsBaseWrapper>
                </ActionRow>
              </Form>
            );
          }}
        </Formik>
      </BaseModal>
    </>
  );
};

export default AddTeamMember;
