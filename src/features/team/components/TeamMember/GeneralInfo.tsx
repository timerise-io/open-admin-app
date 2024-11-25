import React, { PropsWithChildren, useEffect, useState } from "react";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { ContextButton } from "components/ContextButton";
import { DisplayField } from "components/DisplayField";
import ExceptionsSection from "components/Exceptions/ExceptionsSection";
import { Typography } from "components/Typography";
import { ContextSelect } from "components/card/components/ContextSelect";
import PhoneSelect from "components/forms/PhoneSelect";
import TextField from "components/forms/TextField";
import { Column } from "components/layout/Column";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { Row } from "components/layout/Row";
import { DetailsPageLoader } from "components/loaders/DetailsPageLoader";
import { Spinner } from "components/loaders/Spinner";
import { ROUTES } from "constans/routes";
import { currentUserAtom } from "features/auth/state/currentUserAtom";
import { currentUserPrivilegesSelector } from "features/auth/state/currentUserPrivilegesSelector";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useTeamMember } from "features/team/hooks/useTeamMember";
import { useTeamMemberExceptionCreate } from "features/team/hooks/useTeamMemberExceptionCreate";
import { useTeamMemberExceptions } from "features/team/hooks/useTeamMemberExceptions";
import { useTeamMemberSlotDelete } from "features/team/hooks/useTeamMemberSlotDelete";
import { useTeamMemberUpdate } from "features/team/hooks/useTeamMemberUpdate";
import { User } from "features/team/models/user";
import { selectedTeamMemberAtom } from "features/team/state/selectedTeamMember";
import { selectedTeamMemberExceptionsAtom } from "features/team/state/selectedTeamMemberExceptionsAtom";
import { useUploadFile } from "features/timeriseApi/hooks/useUploadFile";
import { Form, Formik } from "formik";
import { TFunction, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import * as Yup from "yup";
import { IconPhoto, IconX } from "@tabler/icons";
import { DeleteTeamMemberButton } from "../DeleteTeamMemberButton";
import { ChangeRoleModal } from "./components";

const getValidationSchema = (t: TFunction<"common"[]>, emailRequired: boolean) => {
  return Yup.object({
    fullName: Yup.string().required(t("common:validation.required")),
    phoneNumber: emailRequired
      ? Yup.string()
          .required(t("common:validation.required"))
          .matches(/^[0-9]{7,15}$/, t("common:validation.phone"))
      : Yup.string().matches(/^[0-9]{7,15}$/, t("common:validation.phone")),
  });
};

const SectionWrapperRow = styled(Row)`
  gap: 32px;
  align-items: flex-start;
  justify-content: flex-start;
`;
const DetailColumn = styled(Column)`
  justify-content: flex-start;
  align-items: flex-start;
`;

const StyledHeader = styled(Typography)`
  margin-top: 32px;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid transparent;
`;

const NoImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid #e5e5e5;
  display: grid;
  place-items: center;
  color: #999999;
`;

const UploadInput = styled.input`
  display: none;
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;

  & > .loader-wrapper {
    position: absolute;
    background: #ffffff80;
    display: grid;
    place-items: center;
    top: 0;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  & > .loader-wrapper > div {
    transform: scale(2);
  }
`;

const RemoveMediaButton = styled.button`
  all: unset;
  box-sizing: border-box;
  position: absolute;
  width: 20px;
  height: 20px;
  right: 4px;
  top: 4px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;

  background: #ffffff;
`;

const EditableFields = () => {
  const { t } = useTranslation();
  return (
    <>
      <TextField name="fullName" label={t("full-name")} />
      <TextField name="jobTitle" label={t("job-title")} />
      <PhoneSelect name="phoneNumber" label={t("phone-number")} />
    </>
  );
};

const DisplayFields: React.FC<User> = ({ fullName, jobTitle, phoneNumber }) => {
  return (
    <>
      <DisplayField label="Full Name" text={fullName} showCopyButton />
      <DisplayField label="Job" text={jobTitle} showCopyButton />
      <DisplayField label="Phone" text={phoneNumber} showCopyButton />
    </>
  );
};

type GeneralInfoProps = PropsWithChildren & {
  memberId: string;
};

const GeneralInfo: React.FC<GeneralInfoProps> = ({ children, memberId }) => {
  const { t, i18n } = useTranslation();
  const selectedProjectId = useRecoilValue(selectedProjectAtom);
  const teamMember = useRecoilValue(selectedTeamMemberAtom);
  const setTeamMember = useSetRecoilState(selectedTeamMemberAtom);
  const currentUser = useRecoilValue(currentUserAtom);
  const setCurrentUser = useSetRecoilState(currentUserAtom);
  const id = memberId;

  useTeamMember(id!);
  useTeamMemberExceptions(id!);
  const isCurrentUser = currentUser?.userId === id;
  const privileges = useRecoilValue(currentUserPrivilegesSelector);
  const navigate = useNavigate();
  const exceptions = useRecoilValue(selectedTeamMemberExceptionsAtom);
  const { filePath, upload } = useUploadFile();
  const [isLoading, setIsLoading] = useState(false);

  const canEdit = isCurrentUser || privileges.canEditOtherProfiles;
  const canDelete = !isCurrentUser && privileges.canDeleteOtherProfiles;

  const { mutation: updateTeamMember } = useTeamMemberUpdate();
  const { mutation: createException } = useTeamMemberExceptionCreate();
  const { mutation: deleteException } = useTeamMemberSlotDelete();

  const uploadAvatar = (file: File) => {
    const reader = new FileReader();
    setIsLoading(true);
    reader.readAsArrayBuffer(file);
    reader.onload = function (this) {
      if (this.result instanceof ArrayBuffer) {
        upload(this.result, file.type.split("/")[1]);
      }
    };
  };

  const removeAvatar = () => {
    if (teamMember !== undefined && currentUser !== undefined) {
      setIsLoading(true);
      updateTeamMember({
        projectId: selectedProjectId || "",
        userId: teamMember.userId,
        role: teamMember.role,
        photoUrl: null,
      });

      setCurrentUser({ ...currentUser, photoUrl: "" });
      setTeamMember({ ...teamMember, photoUrl: "" });
      setIsLoading(false);
    }
  };

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    if (filePath !== undefined && teamMember !== undefined && currentUser !== undefined && isLoading) {
      updateTeamMember({
        projectId: selectedProjectId || "",
        userId: teamMember.userId,
        role: teamMember.role,
        photoUrl: filePath,
      });

      setCurrentUser({ ...currentUser, photoUrl: filePath });
      setTeamMember({ ...teamMember, photoUrl: filePath });
      setIsLoading(false);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath]);

  if (teamMember === undefined)
    return (
      <PageContent>
        <DetailsPageLoader />
      </PageContent>
    );

  return (
    <Formik
      initialValues={{
        fullName: teamMember.fullName,
        jobTitle: teamMember.jobTitle ?? "",
        phoneNumber: (teamMember.phoneNumber ?? "").replaceAll("+", ""),
      }}
      onSubmit={(formValues, { resetForm }) => {
        updateTeamMember({
          projectId: selectedProjectId || "",
          userId: teamMember.userId,
          role: teamMember.role,
          fullName: formValues.fullName,
          jobTitle: formValues.jobTitle,
          ...(formValues.phoneNumber && {
            phoneNumber: `+${formValues.phoneNumber}`,
          }),
        });
        resetForm({ values: { ...formValues } });
      }}
      validationSchema={getValidationSchema(t, !!teamMember.phoneNumber)}
    >
      {({ isValid, dirty, resetForm }) => {
        return (
          <Form>
            <PageHeader
              title={`${teamMember.fullName}${isCurrentUser ? " (Me)" : ""}`}
              onBackButonClick={() => {
                navigate(ROUTES.team);
              }}
              showBackButton
            >
              <Row gap="10px">
                <Button
                  buttonType="secondary"
                  onClick={() => {
                    resetForm();
                  }}
                  disabled={!dirty}
                >
                  {t("common:discard")}
                </Button>
                <Button buttonType="primary" disabled={!isValid || !dirty} type="submit">
                  {t("common:save")}
                </Button>
              </Row>
            </PageHeader>
            <PageContent>
              {children}
              <SectionWrapperRow>
                <DetailColumn w="530px">
                  <StyledHeader typographyType="h3" as="h3">
                    {t("common:team.photo")}
                  </StyledHeader>
                  <Card>
                    <Column gap="20px" jc="flex-start" ai="flex-start">
                      <ImgWrapper>
                        {teamMember.photoUrl ? (
                          <>
                            <Avatar src={filePath ?? teamMember.photoUrl} alt="user photo" />
                            {isCurrentUser && (
                              <RemoveMediaButton type="button" onClick={() => removeAvatar()}>
                                <IconX size={16} />
                              </RemoveMediaButton>
                            )}
                          </>
                        ) : (
                          <NoImageWrapper>
                            <IconPhoto size={50} />
                          </NoImageWrapper>
                        )}

                        {isLoading && (
                          <div className="loader-wrapper">
                            <Spinner />
                          </div>
                        )}
                      </ImgWrapper>
                      {isCurrentUser && (
                        <>
                          <UploadInput
                            id="fileUploadInput"
                            type="file"
                            accept="image/*"
                            value={""}
                            onChange={(event: { target: HTMLInputElement }) => {
                              const files = event.target.files;

                              if (files === null || files.length === 0) return;

                              uploadAvatar(files[0]);
                            }}
                          />
                          <ContextButton
                            type="button"
                            onClick={() => {
                              document.getElementById("fileUploadInput")?.click();
                            }}
                          >
                            {t("common:upload-photo")}
                          </ContextButton>
                        </>
                      )}
                    </Column>
                  </Card>
                  <StyledHeader typographyType="h3" as="h3">
                    {t("common:details")}
                  </StyledHeader>
                  <Card>
                    <DisplayField label={t("user-id")} text={teamMember.userId} showCopyButton />
                    <DisplayField label={t("common:short-id")} text={teamMember.shortId} showCopyButton />
                    {canEdit ? <EditableFields /> : <DisplayFields {...teamMember} />}
                    <DisplayField label={t("email")} text={teamMember.email} showCopyButton />
                    <ChangeRoleModal callback={setTeamMember} />
                    {isCurrentUser && (
                      <ContextSelect
                        options={{
                          en: t("languages.English"),
                          it: t("languages.Italian"),
                          es: t("languages.Spanish"),
                          pl: t("languages.Polish"),
                        }}
                        value={i18n.language}
                        label={t("team.app-language")}
                        onChange={(value) => handleChangeLanguage(value as string)}
                      />
                    )}
                  </Card>
                </DetailColumn>
                <DetailColumn w="334px" mt={2}>
                  <ExceptionsSection
                    title={t("common:availability-exceptions")}
                    slots={exceptions}
                    disabled={!canEdit}
                    onDeleteConfirm={(slotId) => {
                      deleteException({
                        slotId,
                        userId: teamMember.userId,
                        projectId: teamMember.projectId,
                      });
                    }}
                    onCreateException={(item) => {
                      createException({
                        ...item,
                        userId: teamMember.userId,
                        projectId: teamMember.projectId,
                        slotType: "EXCEPTION",
                        quantity: 1,
                      });
                    }}
                  />
                </DetailColumn>
              </SectionWrapperRow>
              {canDelete && (
                <SectionWrapperRow>
                  <DetailColumn w="300px" mt={4}>
                    <DeleteTeamMemberButton />
                  </DetailColumn>
                </SectionWrapperRow>
              )}
            </PageContent>
          </Form>
        );
      }}
    </Formik>
  );
};

export default GeneralInfo;
