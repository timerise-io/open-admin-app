import React from "react";
import { Card } from "components/Card";
import { DisplayField } from "components/DisplayField";
import FormSelect from "components/forms/FormSelect";
import MarkdownField from "components/forms/MarkdownField";
import MediaField from "components/forms/MediaField";
import TextField from "components/forms/TextField";
import { Box } from "components/layout/Box";
import { Row } from "components/layout/Row";
import { assetsOptionsSelector } from "features/assets/state/assetsOptionsSelector";
import { locationsOptionsSelector } from "features/locations/state/locationsOptionsSelector";
import { TaxBehavior } from "features/services/model/service";
import { spacesOptionsSelector } from "features/spaces/state/spacesOptionsSelector";
import { hostsOptionsSelector } from "features/team/state/hostsOptionsSelector";
import { TFunction, useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import * as Yup from "yup";
import DraftField from "./DraftField";
import FeaturedField from "./FeaturedField";
import OnlyServiceListInfo from "./OnlyServiceListInfo";
import ServicePaymentFormField from "./ServicePaymentFormField";

export const getValidationSchemaForServiceDetails = (t: TFunction<"common"[]>) => {
  return Yup.object({
    title: Yup.string().required(t("common:validation.required")),
  });
};

export interface ServiceDetailsFormContentProps {
  title: string;
  shortDescription: string;
  description: string;
  media: Array<string>;
  payment: "free" | "paid";
  currency: string;
  instructions: string;
  assets: Array<string>;
  spaces: Array<string>;
  locations: Array<string>;
  hosts: Array<string>;
  price: number;
  taxRate: number;
  taxBehavior: TaxBehavior;
  paymentProviders: Array<string>;
  stripeTaxId: string;
  featured: boolean;
  duration: string;
  draft: boolean;
  labels: Array<string>;
}

export const ServiceDetailsFormContent = (
  values: ServiceDetailsFormContentProps & {
    serviceId?: string;
    shortId?: string;
  },
) => {
  const { t } = useTranslation();
  const assetsOptions = useRecoilValue(assetsOptionsSelector);
  const spacesOptions = useRecoilValue(spacesOptionsSelector);
  const locationsOptions = useRecoilValue(locationsOptionsSelector);
  const hostsOptions = useRecoilValue(hostsOptionsSelector);

  return (
    <Card>
      <Row gap="10px">
        <DisplayField label={t("services.service-id")} text={values?.serviceId} showCopyButton />
        <DisplayField label={t("short-id")} text={values?.shortId} showCopyButton />
      </Row>
      <TextField name="title" />
      <TextField name="shortDescription" label={t("short-description")} multiline hideErrors />
      <Box mt={1} mb={3}>
        <OnlyServiceListInfo />
      </Box>
      <MarkdownField name="description" label={t("full-description")} />
      <MediaField name="media" label={t("photos-optional")} rectangle />
      <ServicePaymentFormField payment={values.payment} paymentProviders={values.paymentProviders} />
      <Box mt={0} mb={3}>
        <FormSelect label={t("hosts")} name={"hosts"} options={hostsOptions} placeholder={t("select-placeholder")} />
        <FormSelect
          label={t("spaces.spaces")}
          name={"spaces"}
          options={spacesOptions}
          placeholder={t("select-placeholder")}
        />
        <FormSelect
          label={t("locations.locations")}
          name={"locations"}
          options={locationsOptions}
          placeholder={t("select-placeholder")}
        />
        <FormSelect
          label={t("assets.assets")}
          name={"assets"}
          options={assetsOptions}
          placeholder={t("select-placeholder")}
        />
      </Box>
      <TextField name="duration" label={t("services.duration")} hideErrors />
      <Box mt={1} mb={3}>
        <OnlyServiceListInfo />
      </Box>
      {/* <TextField
        name="instructions"
        label="Instructions (visible to your customers after booking this service)"
        multiline
      /> */}
      <FeaturedField />
      <DraftField />
    </Card>
  );
};

export default ServiceDetailsFormContent;
