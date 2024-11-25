import React, { PropsWithChildren } from "react";
import TextField from "components/forms/TextField";
import { UpdateProjectMutationVariables } from "features/project/api/mutations/updateProject";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { Form, Formik } from "formik";
import { uniq } from "lodash";
import { TFunction, useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import * as Yup from "yup";

const getValidationSchema = (t: TFunction<"common"[]>) => {
  return Yup.object({
    label: Yup.string().required(t("common:validation.required")),
  });
};

const ControlsWrapper = styled.div`
  margin-top: 10px;
  padding: 0 20px;
`;

interface LabelFormValues {
  labels: string[];
  label: string;
}

interface LabelFormProps {
  onSubmit: (values: UpdateProjectMutationVariables) => void;
}

export const LabelForm: React.FC<PropsWithChildren<LabelFormProps>> = ({ onSubmit, children }) => {
  const { t } = useTranslation();
  const project = useRecoilValue(selectedProjectSelector);

  const initialValues: LabelFormValues = {
    labels: project?.labels ?? [],
    label: "",
  };

  const handleSubmit = (value: LabelFormValues) => {
    if (project === undefined) return;

    onSubmit({
      projectId: project.projectId,
      labels: uniq([...(value.labels as []), value.label]),
    });
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={getValidationSchema(t)}>
        {({ values }) => {
          return (
            <Form>
              <ControlsWrapper>
                <TextField label={t("label")} name="label" />
              </ControlsWrapper>
              {children}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
