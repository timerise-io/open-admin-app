import React, { PropsWithChildren } from "react";
import FormDataPicker from "components/forms/FormDataPicker";
import FormSelect from "components/forms/FormSelect";
import IntField from "components/forms/IntField";
import { Box } from "components/layout/Box";
import { Row } from "components/layout/Row";
import { format, subDays } from "date-fns";
import { addMonths } from "date-fns/esm";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { ServiceDayRangeStrategyCreateRangeVariables } from "features/services/api/mutations/models";
import { DaysOfWeek, Months } from "features/services/model/serviceSlotStrategie";
import { ServiceDayRangeStrategyFields } from "features/services/model/strategies";
import { selectedServiceAtom } from "features/services/state/selectedServiceAtom";
import { Form, Formik } from "formik";
import { parse, toSeconds } from "iso8601-duration";
import { TFunction, useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { serialize } from "tinyduration";
import * as Yup from "yup";

const getValidationSchema = (t: TFunction<"common"[]>) => {
  return Yup.object({
    startDateTime: Yup.date(),
    endDateTime: Yup.date().when("startDateTime", (startDateTime: Date, schema) => {
      const startNumber = +format(startDateTime, "yyyyMMdd");

      return schema.test({
        test: (endDate: Date, form: any) => {
          const endNumber = +format(endDate || form.parent.endDateTime, "yyyyMMdd");

          return endNumber >= startNumber;
        },
        message: t("common:validation.laterThen", {
          minValue: format(subDays(startDateTime, 1), "d LLL yyyy"),
        }),
      });
    }),

    daysOfWeek: Yup.array().min(1, t("common:validation.required")),
    months: Yup.array().min(1, t("common:validation.required")),
    slotQuantity: Yup.number().min(1, t("common:validation.minNumber", { minValue: 1 })),
    endTimePeriod: Yup.number().min(1, t("common:validation.minNumber", { minValue: 1 })),
  });
};

const ControlsWrapper = styled.div`
  padding: 0 20px;
`;

interface ServiceDayRangeStrategyFormValues {
  startDateTime: Date;
  start: {
    dateTime: Date;
    time: string;
    timeOffset: number;
  };
  endDateTime: Date;
  end: {
    dateTime: Date;
    time: string;
    timePeriod: number;
  };
  endTimePeriod: number;
  daysOfWeek: Array<DaysOfWeek>;
  months: Array<Months>;
  slotQuantity: number;
  labels: Array<string>;
  startType: string;
  endType: string;
}

const initialValues: ServiceDayRangeStrategyFormValues = {
  startDateTime: new Date(),
  start: {
    dateTime: new Date(),
    time: "0:00",
    timeOffset: 30,
  },
  endDateTime: addMonths(new Date(), 3),
  end: {
    dateTime: addMonths(new Date(), 3),
    time: "23:59",
    timePeriod: 60,
  },
  endTimePeriod: 60,
  daysOfWeek: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
  months: [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ],
  slotQuantity: 1,
  labels: [],
  startType: "DATE",
  endType: "DATE",
};

interface ServiceDayRangeStrategyProps {
  onSubmit: (values: ServiceDayRangeStrategyCreateRangeVariables) => void;
  strategy?: ServiceDayRangeStrategyFields;
}

export const AddDayRangeScheduleForm: React.FC<PropsWithChildren<ServiceDayRangeStrategyProps>> = ({
  onSubmit,
  children,
  strategy,
}) => {
  const projectId = useRecoilValue(selectedProjectAtom);
  const serviceId = useRecoilValue(selectedServiceAtom)?.serviceId;
  const { t } = useTranslation();

  const init: ServiceDayRangeStrategyFormValues = strategy
    ? {
        startDateTime: new Date(strategy.start.dateTime ?? initialValues.startDateTime),
        start: {
          dateTime: new Date(strategy.start.dateTime ?? initialValues.startDateTime),
          time: format(new Date(`1900-01-01T${("00" + strategy.start.time).slice(-5)}`), "H:mm"),
          timeOffset: strategy.start.timeOffset
            ? Math.round(toSeconds(parse(strategy.start.timeOffset)) / 86400)
            : initialValues.start.timeOffset,
        },
        endDateTime: new Date(strategy.end.dateTime ?? initialValues.endDateTime),
        end: {
          dateTime: new Date(strategy.end.dateTime ?? initialValues.endDateTime),
          time: format(new Date(`1900-01-01T${("00" + strategy.end.time).slice(-5)}`), "H:mm"),
          timePeriod: strategy.end.timePeriod
            ? Math.round(toSeconds(parse(strategy.end.timePeriod)) / 86400)
            : initialValues.end.timePeriod,
        },
        endTimePeriod: strategy.end.timePeriod
          ? Math.round(toSeconds(parse(strategy.end.timePeriod)) / 86400)
          : initialValues.end.timePeriod,
        daysOfWeek: [...strategy.daysOfWeek] as Array<DaysOfWeek>,
        months: [...strategy.months] as Array<Months>,
        slotQuantity: strategy.slotQuantity,
        labels: [...strategy.labels] as Array<string>,
        startType: strategy.start.dateTime ? "DATE" : "DAYS_FROM_NOW",
        endType: strategy.end.dateTime ? "DATE" : "NEVER",
      }
    : initialValues;

  return (
    <div>
      <Formik
        initialValues={init}
        onSubmit={(values) => {
          if (projectId && serviceId) {
            onSubmit({
              projectId,
              serviceId,
              start: {
                ...(values.startType === "DATE" && { dateTime: new Date(values.startDateTime) }),
                time: values.start.time,
                ...(values.startType === "DAYS_FROM_NOW" && {
                  timeOffset: serialize({ days: values.start.timeOffset }),
                }),
              },
              end: {
                ...(values.endType === "DATE" && { dateTime: new Date(values.endDateTime) }),
                time: values.end.time,
                timePeriod: serialize({ days: values.endTimePeriod }),
              },
              daysOfWeek: [...values.daysOfWeek] as Array<DaysOfWeek>,
              months: [...values.months] as Array<Months>,
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
                <FormSelect
                  name="months"
                  label={t("months")}
                  options={{
                    JANUARY: t("January"),
                    FEBRUARY: t("February"),
                    MARCH: t("March"),
                    APRIL: t("April"),
                    MAY: t("May"),
                    JUNE: t("June"),
                    JULY: t("July"),
                    AUGUST: t("August"),
                    SEPTEMBER: t("September"),
                    OCTOBER: t("October"),
                    NOVEMBER: t("November"),
                    DECEMBER: t("December"),
                  }}
                />
                <FormSelect
                  name="daysOfWeek"
                  label={t("days")}
                  options={{
                    MONDAY: t("Monday"),
                    TUESDAY: t("Tuesday"),
                    WEDNESDAY: t("Wednesday"),
                    THURSDAY: t("Thursday"),
                    FRIDAY: t("Friday"),
                    SATURDAY: t("Saturday"),
                    SUNDAY: t("Sunday"),
                  }}
                />
                <Row gap="10px">
                  <Row w="50%">
                    <IntField name="slotQuantity" label={t("services.bookings-per-day")} />
                  </Row>
                </Row>
                <Row gap="10px">
                  <Box w="50%">
                    <FormSelect
                      name="startType"
                      label={t("services.service-starts")}
                      options={{
                        DATE: t("services.on-date"),
                        DAYS_FROM_NOW: t("services.days-from-now"),
                      }}
                    />
                  </Box>
                  <Box w="50%">
                    {values.startType === "DATE" && <FormDataPicker label={t("start-date")} name="startDateTime" />}
                    {values.startType === "DAYS_FROM_NOW" && <IntField name="start.timeOffset" label={t("days")} />}
                  </Box>
                </Row>
                <Row gap="10px">
                  <Box w="50%">
                    <FormSelect
                      name="endType"
                      label={t("services.service-ends")}
                      options={{
                        DATE: t("services.on-date"),
                        NEVER: t("services.never"),
                      }}
                    />
                  </Box>
                  <Box w="50%">
                    {values.endType === "DATE" && <FormDataPicker label={t("end-date")} name="endDateTime" />}
                  </Box>
                </Row>
                <Row gap="10px">
                  <Row w="50%">
                    <IntField name="endTimePeriod" label={t("services.booking-window-days")} />
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
