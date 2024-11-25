import React, { PropsWithChildren } from "react";
import { Typography } from "components/Typography";
import TextField from "components/forms/TextField";
import { Box } from "components/layout/Box";
import { Row } from "components/layout/Row";
import ConfirmFormModal from "components/modals/ConfirmFormModal";
import { useEditShortUrl } from "features/services/hooks/useEditShortUrl";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

export const getValidationSchemaForBookingLink = () => {
  return Yup.object({
    alias: Yup.string().required("Can’t be blank!").max(64, "Maximum length is 64 characters"),
  });
};

interface BookingLinkFormPops {
  alias: string;
}

interface EditBookingLinkModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  currentUrl: string;
  serviceId: string;
  projectId: string;
}

const EditBookingLinkModal: React.FC<PropsWithChildren<EditBookingLinkModalProps>> = ({
  isModalOpen,
  onClose,
  currentUrl,
  serviceId,
  projectId,
}) => {
  const alias = currentUrl.split("/").reverse()[0];
  const { mutation } = useEditShortUrl();
  const { t } = useTranslation();
  return (
    <ConfirmFormModal
      open={isModalOpen}
      title={t("services.edit-booking-page-link")}
      confirmText={t("save")}
      confirmButtonType="primary"
      abortText={t("discard")}
      onClose={() => {
        onClose();
      }}
      onAbort={() => {
        onClose();
      }}
      onConfirm={() => {}}
      customWidth={380}
      initialValues={{ alias }}
      onSubmit={(values: BookingLinkFormPops) => {
        mutation({
          alias: values.alias,
          serviceId,
          projectId,
        });
        onClose();
      }}
      validationSchema={getValidationSchemaForBookingLink()}
    >
      <Row gap="10px" ai="flex-start">
        <Box mt={1}>
          <Typography typographyType="body" as="span">
            {"tmrs.io/"}
          </Typography>
        </Box>
        <TextField name="alias" hideLabel />
      </Row>
    </ConfirmFormModal>
  );
};

export default EditBookingLinkModal;
