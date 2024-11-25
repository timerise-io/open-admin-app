import React from "react";
import FormSelect from "components/forms/FormSelect";
import PriceField from "components/forms/PriceField";
import TextField from "components/forms/TextField";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { CURRENCY } from "constans/currency";
import { TAXBEHAVIOR } from "constans/tax";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { ServiceDetailsFormContentProps } from "./ServiceDetailsFormContent";

interface ServicePaymentFormFieldProps extends Pick<ServiceDetailsFormContentProps, "payment" | "paymentProviders"> {}

const ServicePaymentFormField = ({ payment }: ServicePaymentFormFieldProps) => {
  const { t } = useTranslation();
  const project = useRecoilValue(selectedProjectSelector);

  let providersOptions: any = { OFFLINE: t("services.offline") };
  if (project?.stripeConfig?.isConfigured === true) {
    providersOptions["STRIPE"] = "Stripe";
  }
  if (project?.adyenConfig?.isConfigured === true) {
    providersOptions["ADYEN"] = "Adyen";
  }

  return (
    <Column ai="stretch" gap="10px" mb={2} mt={2}>
      <Row jc="center" ai="flex-start" gap="10px">
        <FormSelect
          label={t("payment")}
          name={"payment"}
          options={{ paid: t("services.paid"), free: t("services.free") }}
          hideErrors
        />
        <FormSelect
          label={t("payment-method")}
          name="paymentProviders"
          options={providersOptions}
          disabled={payment === "free"}
          hideErrors
        />
      </Row>
      <Row jc="center" ai="flex-start" gap="10px" mt={1}>
        <TextField label={"Stripe Tax ID"} name="stripeTaxId" disabled={payment === "free"} />
      </Row>
      <Row jc="center" ai="flex-start" gap="10px" mt={-2}>
        <PriceField label={t("price")} name="price" disabled={payment === "free"} />
        <FormSelect
          label={t("currency")}
          name={"currency"}
          options={CURRENCY}
          hideErrors
          disabled={payment === "free"}
        />
      </Row>
      <Row jc="center" ai="flex-start" gap="10px" mt={-2}>
        <PriceField label={t("tax-rate")} name="taxRate" disabled={payment === "free"} />
        <FormSelect
          label={t("tax-behavior")}
          name={"taxBehavior"}
          options={TAXBEHAVIOR}
          hideErrors
          disabled={payment === "free"}
        />
      </Row>
    </Column>
  );
};

export default ServicePaymentFormField;
