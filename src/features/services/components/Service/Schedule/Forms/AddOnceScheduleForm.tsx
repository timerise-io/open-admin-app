import React, { PropsWithChildren, useMemo } from "react";
import BoolField from "components/forms/BoolField";
import FormDataPicker from "components/forms/FormDataPicker";
import FormTimeSelect from "components/forms/FormTimeSelect/FormTimeSelect";
import IntField from "components/forms/IntField";
import { Box } from "components/layout/Box";
import { Row } from "components/layout/Row";
import { format } from "date-fns";
import { addDays, subDays } from "date-fns";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { ServiceOnceStrategyCreateRangeVariables } from "features/services/api/mutations/models";
import { ServiceOnceStrategyFields } from "features/services/model/strategies";
import { selectedServiceAtom } from "features/services/state/selectedServiceAtom";
import { Form, Formik } from "formik";
import { useTimezoneFormat } from "helpers/hooks/useTimezoneFormat";
import { TFunction, useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import * as Yup from "yup";

const getValidationSchema = (t: TFunction<"common"[]>) => {
  return Yup.object({
    start: Yup.date(),
    end: Yup.date().when("start", (startDate: Date, schema) => {
      const startNumber = +format(startDate, "yyyyMMdd");
      return schema.test({
        test: (endDate: Date) => {
          const endNumber = +format(endDate, "yyyyMMdd");
          return endNumber >= startNumber;
        },
        message: t("common:validation.laterThen", {
          minValue: format(subDays(startDate, 1), "d LLL yyyy"),
        }),
      });
    }),
    startTime: Yup.string(),
    endTime: Yup.string().when("startTime", (startTime, schema) => {
      const startNumber = +startTime.replace(":", "");

      return schema.test({
        test: (endTime: string, form: any) => {
          const startDate = +format(form.parent.start, "yyyyMMdd");
          const endDate = +format(form.parent.end, "yyyyMMdd");
          const endNumber = +endTime.replace(":", "");
          return (startDate === endDate && endNumber > startNumber) || startDate !== endDate;
        },
        message: t("common:validation.laterThen", { minValue: startTime }),
      });
    }),
    slotQuantity: Yup.number().min(1, t("common:validation.minNumber", { minValue: 1 })),
  });
};

const ControlsWrapper = styled.div`
  padding: 0 20px;
`;

interface ServiceOnceStrategyFormValues {
  start: Date;
  end: Date;
  slotQuantity: number;
  labels: Array<string>;
  startTime: string;
  endTime: string;
  allDay: boolean;
}

const initialValues: ServiceOnceStrategyFormValues = {
  start: new Date(),
  end: addDays(new Date(), 1),
  slotQuantity: 1,
  labels: [],
  startTime: "9:00",
  endTime: "17:00",
  allDay: true,
};

interface ServiceOnceStrategyProps {
  onSubmit: (values: ServiceOnceStrategyCreateRangeVariables) => void;
  strategy?: ServiceOnceStrategyFields;
}

export const AddOnceScheduleForm: React.FC<PropsWithChildren<ServiceOnceStrategyProps>> = ({
  onSubmit,
  children,
  strategy,
}) => {
  const projectId = useRecoilValue(selectedProjectAtom);
  const serviceId = useRecoilValue(selectedServiceAtom)?.serviceId;
  const { t } = useTranslation();
  const { format: formatProjectOffset, getDateInTimezone } = useTimezoneFormat();

  const isAllDays = useMemo(() => {
    return strategy && formatProjectOffset(strategy.end, "H:mm") === "23:59";
  }, [strategy, formatProjectOffset]) as ServiceOnceStrategyFormValues["allDay"];

  const init: ServiceOnceStrategyFormValues = strategy
    ? {
        start: getDateInTimezone(strategy.start),
        end: getDateInTimezone(strategy.end),
        slotQuantity: strategy.slotQuantity,
        labels: [...strategy.labels] as Array<string>,
        startTime: isAllDays ? "9:00" : formatProjectOffset(strategy.start, "H:mm"),
        endTime: isAllDays ? "17:00" : formatProjectOffset(strategy.end, "H:mm"),
        allDay: isAllDays,
      }
    : initialValues;

  const getDateTime = (date: Date, values: ServiceOnceStrategyFormValues, field: string) => {
    const showTime = !values.allDay;
    const isoDate = format(date, "yyyy-MM-dd");

    let timeField = field === "start" ? values.startTime : values.endTime;
    timeField = showTime ? timeField : field === "start" ? "00:00" : "23:59";

    const time = `${timeField.length === 4 ? "0" : ""}${timeField}`;

    return new Date(`${isoDate}T${time}:00.000Z`);
  };

  return (
    <div>
      <Formik
        initialValues={init}
        onSubmit={(values) => {
          if (projectId && serviceId) {
            onSubmit({
              projectId,
              serviceId,
              start: new Date(getDateTime(values.start, values, "start")),
              end: new Date(getDateTime(values.end, values, "end")),
              slotQuantity: values.slotQuantity,
              labels: [...values.labels] as Array<string>,
            });
          }
        }}
        validationSchema={getValidationSchema(t)}
      >
        {({ values }) => {
          return (
            <Form>
              <ControlsWrapper>
                <Row gap="10px" jc="flex-start">
                  <Box w="50%">
                    <FormDataPicker label={t("start-date")} name="start" />
                  </Box>
                  <Box w="50%">
                    <FormDataPicker label={t("end-date")} name="end" />
                  </Box>
                </Row>
                <Row>
                  <Box mb={2.5}>
                    <BoolField label={t("services.all-days")} name="allDay" />
                  </Box>
                </Row>
                <Row gap="10px" jc="flex-start">
                  <Box w="50%">
                    <FormTimeSelect label={t("start-time")} name="startTime" disabled={values.allDay} />
                  </Box>
                  <Box w="50%">
                    <FormTimeSelect label={t("end-time")} name="endTime" disabled={values.allDay} />
                  </Box>
                </Row>
                <Row gap="10px">
                  <Row w="50%">
                    <IntField name="slotQuantity" label={t("services.bookings-per-event")} />
                  </Row>
                </Row>
              </ControlsWrapper>
              {children}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
