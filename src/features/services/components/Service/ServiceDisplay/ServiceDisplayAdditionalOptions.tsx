import React from "react";
import { Card } from "components/Card";
import { MinMax } from "components/MinMax";
import Switch from "components/Switch";
import { Typography } from "components/Typography";
import { DisplayType, ViewConfig } from "features/services/api/mutations/models";
import { selectedServiceAtom } from "features/services/state/selectedServiceAtom";
import { useField } from "formik";
import { parse } from "iso8601-duration";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const StyledHeader = styled(Typography)`
  margin-top: 32px;
`;

export const ServiceDisplayAdditionalOptions = () => {
  const { t } = useTranslation();
  const service = useRecoilValue(selectedServiceAtom);
  const [field, , helpers] = useField<ViewConfig>({ name: "viewConfig" });

  if (!service || !service.viewConfig.displayType) return null;

  const displayType = field.value.displayType as DisplayType;
  const displayConfigViewType = displayType.toLocaleLowerCase() as keyof ViewConfig;

  const onChange = (value: boolean | number, key: string) => {
    const updatedViewConfig = {
      ...field.value,
      [displayConfigViewType]: {
        ...(field.value[displayConfigViewType] as any),
        [key]: value,
      },
    };

    helpers.setValue(updatedViewConfig);
  };

  const onChangeDuration = (value: number | string, key: string) => {
    const updatedViewConfig = {
      ...field.value,
      [displayConfigViewType]: {
        ...(field.value[displayConfigViewType] as any),
        [key]: `P${value}D`,
      },
    };

    helpers.setValue(updatedViewConfig);
  };

  if (displayType === DisplayType.PREORDER) return null;

  return (
    <>
      <StyledHeader typographyType="h3" as="h3">
        {t("services.additional-options")}
      </StyledHeader>
      <Card>
        {displayType === DisplayType.DAYS && field.value?.days && (
          <>
            <Switch
              label={t("services.show-available-slots")}
              value={field.value.days.quantity}
              onChange={(value) => {
                onChange(value, "quantity");
              }}
            />
            <Switch
              label={t("services.show-hours-range")}
              value={field.value.days.duration}
              onChange={(value) => {
                onChange(value, "duration");
              }}
            />
            <Switch
              label="Allow to select multiple slots"
              value={field.value.days.multiSelect}
              onChange={(value) => {
                onChange(value, "multiSelect");
              }}
            />
            {/*
            <MinMax
              min={field.value.days.minSelect ?? 1}
              max={field.value.days.maxSelect ?? 10}
              minName="minSelect"
              maxName="maxSelect"
              disabled={!field.value.days.multiSelect}
              onChange={onChange}
            /> */}
          </>
        )}
        {displayType === DisplayType.CALENDAR && field.value?.calendar && (
          <>
            <Switch
              label={t("services.show-available-slots-per-day")}
              value={field.value.calendar.quantity}
              onChange={(value) => {
                onChange(value, "quantity");
              }}
            />
            <Switch
              label={t("services.allow-select-range-dates")}
              value={field.value.calendar.rangeSelect}
              onChange={(value) => {
                onChange(value, "rangeSelect");
              }}
            />
            <MinMax
              min={parse(field.value.calendar.minRange ?? "P1D").days ?? 1}
              max={parse(field.value.calendar.maxRange ?? "P10D").days ?? 10}
              minName="minRange"
              maxName="maxRange"
              disabled={!field.value.calendar.rangeSelect}
              onChange={onChangeDuration}
            />
            {/* <Switch
              label="Allow to select multiple days"
              value={field.value.calendar.multiSelect}
              onChange={(value) => {
                onChange(value, "multiSelect");
              }}
              disable={field.value.calendar.rangeSelect}
            /> */}
            {/* <MinMax
              min={field.value.calendar.minSelect ?? 1}
              max={field.value.calendar.maxSelect ?? 10}
              minName="minSelect"
              maxName="maxSelect"
              disabled={!field.value.calendar.multiSelect}
              onChange={onChange}
            /> */}
          </>
        )}
        {displayType === DisplayType.LIST && field.value?.list && (
          <>
            <Switch
              label={t("services.show-available-slots")}
              value={field.value.list.quantity}
              onChange={(value) => {
                onChange(value, "quantity");
              }}
            />
            <Switch
              label={t("services.show-hours-range")}
              value={field.value.list.showTime}
              onChange={(value) => {
                onChange(value, "showTime");
              }}
            />
            {/* <Switch
              label="Show the event duration"
              value={field.value.list.duration}
              onChange={(value) => {
                onChange(value, "duration");
              }}
            /> */}
            <Switch
              label={t("services.allow-multiple-slots")}
              value={field.value.list.multiSelect}
              onChange={(value) => {
                onChange(value, "multiSelect");
              }}
            />
            {/*<MinMax
              min={field.value.list.minSelect ?? 1}
              max={field.value.list.maxSelect ?? 10}
              minName="minSelect"
              maxName="maxSelect"
              disabled={!field.value.list.multiSelect}
              onChange={onChange}
            /> */}
          </>
        )}
      </Card>
    </>
  );
};
