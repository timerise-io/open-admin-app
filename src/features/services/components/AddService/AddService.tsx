import React, { useCallback, useEffect, useState } from "react";
import { Button } from "components/Button";
import { Card } from "components/Card";
import StyledLabel from "components/StyledLabel";
import { Typography } from "components/Typography";
import FormSelect from "components/forms/FormSelect";
import TextField from "components/forms/TextField";
import { Column } from "components/layout/Column";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { Row } from "components/layout/Row";
import { FullPageOverlayLoader } from "components/loaders/FullPageOverlayLoader";
import { ROUTES } from "constans/routes";
import { useProjectUpdate } from "features/project/hooks/useProjectUpdate";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { DisplayType, DisplayTypeSelect, ViewConfig } from "features/services/api/mutations/models";
import { useServiceCreate } from "features/services/hooks/useServiceCreate";
import { Form, Formik } from "formik";
import { uniq } from "lodash";
import { TFunction, useTranslation } from "react-i18next";
import { generatePath, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import * as Yup from "yup";
import AddServiceInfoCard from "./AddServiceInfoCard";

const getValidationSchema = (t: TFunction<"common"[]>) => {
  return Yup.object({
    title: Yup.string().required(t("common:validation.required")),
  });
};

interface AddServiceForm {
  title: string;
  description: string;
  media: Array<string>;
  payment: "free" | "paid";
  currency: string;
  instruction: string;
  assets: Array<string>;
  spaces: Array<string>;
  locations: Array<string>;
  hosts: Array<string>;
  price: number;
  type: string;
  labels: Array<string>;
}

const initialValues: AddServiceForm = {
  title: "",
  description: "",
  media: [],
  payment: "free",
  currency: "EUR",
  instruction: "",
  assets: [],
  spaces: [],
  locations: [],
  hosts: [],
  price: 0,
  type: DisplayTypeSelect.DAYS_SINGLE,
  labels: [],
};

const AddService = () => {
  const { t } = useTranslation();
  const selectedProjectId = useRecoilValue(selectedProjectAtom);
  const project = useRecoilValue(selectedProjectSelector);
  const projectLabels = project?.labels ?? [];
  const { mutation: mutationCreate, data: dataCreate } = useServiceCreate();
  const { mutation: updateProjectMutation } = useProjectUpdate(true);
  const navigation = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<DisplayTypeSelect>(DisplayTypeSelect.DAYS_SINGLE);
  const [viewConfig, setViewConfig] = useState<ViewConfig>({
    displayType: DisplayType.DAYS,
    days: {
      duration: false,
      quantity: false,
      multiSelect: false,
    },
    calendar: {
      quantity: false,
      rangeSelect: false,
      multiSelect: false,
    },
    list: {
      duration: false,
      quantity: false,
      showTime: false,
      multiSelect: false,
    },
    preorder: {
      duration: false,
      quantity: false,
      showDate: false,
      showTime: false,
    },
  });

  const displayTypeConfig: any = {
    [DisplayTypeSelect.DAYS_SINGLE]: {
      duration: false,
      quantity: false,
      multiSelect: false,
    },
    [DisplayTypeSelect.DAYS_MULTI]: {
      duration: false,
      quantity: false,
      multiSelect: true,
    },
    [DisplayTypeSelect.CALENDAR_SINGLE]: {
      quantity: false,
      rangeSelect: false,
      multiSelect: false,
    },
    [DisplayTypeSelect.CALENDAR_MULTI]: {
      quantity: false,
      rangeSelect: false,
      multiSelect: true,
    },
    [DisplayTypeSelect.CALENDAR_RANGE]: {
      quantity: false,
      rangeSelect: true,
      multiSelect: false,
    },
    [DisplayTypeSelect.LIST_SINGLE]: {
      duration: false,
      quantity: false,
      showTime: false,
      multiSelect: false,
    },
    [DisplayTypeSelect.LIST_MULTI]: {
      duration: false,
      quantity: false,
      showTime: false,
      multiSelect: true,
    },
  };

  const handleChangeServiceType = (value: DisplayTypeSelect) => {
    setType(value);

    const displayType = value.split("_")[0] as DisplayType;

    setViewConfig({
      ...viewConfig,
      displayType,
      [displayType.toLowerCase()]: displayTypeConfig[value],
    });
  };

  const handleSubmit = (values: AddServiceForm) => {
    if (selectedProjectId === undefined || !project) return;

    setIsLoading(true);

    mutationCreate({
      title: values.title,
      assets: values.assets,
      currency: values.currency,
      hosts: values.hosts,
      spaces: values.spaces,
      locations: values.locations,
      price: values.payment === "free" ? 0 : +values.price,
      projectId: selectedProjectId,
      media: values.media.map((item, index) => {
        return { title: `service-media-${index}`, url: item };
      }),
      description: values.description,
      instructions: values.instruction,
      viewConfig: viewConfig,
      labels: values.labels,
    });

    updateProjectMutation({
      projectId: selectedProjectId,
      labels: uniq([...(project.labels as []), ...values.labels]),
    });
  };

  useEffect(() => {
    setIsLoading(false);

    if (dataCreate?.serviceCreate.serviceId) {
      navigation(generatePath(ROUTES.service, { id: dataCreate.serviceCreate.serviceId }), { replace: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProjectId, dataCreate]);

  const preview = useCallback(() => {
    const imagesConfig = {
      [DisplayTypeSelect.DAYS_SINGLE]: "days-single.png",
      [DisplayTypeSelect.DAYS_MULTI]: "days-multi.png",
      [DisplayTypeSelect.CALENDAR_SINGLE]: "calendar-single.png",
      [DisplayTypeSelect.CALENDAR_MULTI]: "calendar-multi.png",
      [DisplayTypeSelect.CALENDAR_RANGE]: "calendar-range.png",
      [DisplayTypeSelect.LIST_SINGLE]: "event-single.png",
      [DisplayTypeSelect.LIST_MULTI]: "event-multi.png",
      [DisplayTypeSelect.PREORDER]: "preorder.png",
    };

    return `https://cdn.timerise.io/admin/service/${imagesConfig[type]}`;
  }, [type]);

  const parsedProjectOptions = projectLabels.reduce((acc, key) => {
    acc[key] = key;
    return acc;
  }, {} as Record<string, string>);

  const defaultOptions = {
    Paid: t("services.paid"),
    Free: t("services.free"),
    Online: t("services.online"),
    Offline: t("services.offline"),
    "Internal event": t("services.internal-event"),
  };

  const labelsOptions = { ...parsedProjectOptions, ...defaultOptions };

  return (
    <>
      {isLoading && <FullPageOverlayLoader />}
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={getValidationSchema(t)}>
        {({ values, resetForm, dirty }) => {
          return (
            <Form>
              <PageHeader title={t("services.add-new-service")} showBackButton>
                <Row gap="10px">
                  <Button
                    buttonType="secondary"
                    type="button"
                    onClick={() => {
                      resetForm();
                    }}
                    disabled={!dirty}
                  >
                    {t("discard")}
                  </Button>
                  <Button buttonType="primary" type="submit" disabled={!dirty}>
                    {t("continue")}
                  </Button>
                </Row>
              </PageHeader>
              <PageContent>
                <Row gap="32px" ai="flex-start" jc="flex-start">
                  <Column w="530px" jc="flex-start" ai="flex-start" mt={3.5}>
                    <Card>
                      <TextField
                        name="title"
                        version={"label_bold"}
                        placeholder={t("services.title-field-placeholder")}
                      />
                      <Row jc="center" ai="flex-start" mb={2} style={{ flexDirection: "column" }}>
                        <StyledLabel version="label_bold">{t("services.service-type")}</StyledLabel>
                        <Typography typographyType="label" as="div">
                          {t("services.service-type-info")}
                        </Typography>
                      </Row>
                      <Row jc="center" ai="flex-start" mb={2}>
                        <FormSelect
                          name={"type"}
                          value={type}
                          options={{
                            [DisplayTypeSelect.DAYS_SINGLE]: t("services.days-view"),
                            //[DisplayTypeSelect.DAYS_MULTI]: "Days view, multiple slot selection",
                            //[DisplayTypeSelect.CALENDAR_SINGLE]: "Calendar view, single date selection",
                            //[DisplayTypeSelect.CALENDAR_MULTI]: "Calendar view, multiple dates selection",
                            [DisplayTypeSelect.CALENDAR_RANGE]: t("services.calendar-view"),
                            [DisplayTypeSelect.LIST_SINGLE]: t("services.event-view"),
                            [DisplayTypeSelect.PREORDER]: t("services.preorder-view"),
                          }}
                          hideErrors
                          handleChange={handleChangeServiceType}
                          //separators={[DisplayTypeSelect.CALENDAR_SINGLE, DisplayTypeSelect.LIST_SINGLE]}
                        />
                      </Row>

                      <Row jc="left" ai="flex-start" mb={4} style={{ flexDirection: "column" }}>
                        <StyledLabel>{t("preview")}</StyledLabel>
                        <Typography typographyType="label" as="div">
                          <img src={preview()} alt="preview" width="240" height="120" />
                        </Typography>
                      </Row>

                      <Row jc="center" ai="flex-start" mb={2} style={{ flexDirection: "column" }}>
                        <StyledLabel version="label_bold">{t("labels")}</StyledLabel>
                        <Typography typographyType="label" as="div">
                          {t("labels-info")}
                        </Typography>
                      </Row>

                      <Row jc="center" ai="flex-start" mb={2}>
                        <FormSelect
                          name={"labels"}
                          options={labelsOptions}
                          hideErrors
                          placeholder={t("select-placeholder")}
                          withAddOption
                        />
                      </Row>
                      {/* {values.labels.length > 0 && (
                          <Row jc="left" ai="flex-start" mt={1}>
                            {values.labels.map((label) => (
                              <span key={label}>{label}</span>
                            ))}
                          </Row>
                        )} */}
                    </Card>
                  </Column>

                  <Column w="334px" mt={3.5}>
                    <AddServiceInfoCard />
                  </Column>
                </Row>
              </PageContent>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddService;
