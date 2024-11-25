import React from "react";
import DeleteModalInfo from "components/DeleteModalInfo";
import { Typography } from "components/Typography";
import DestructiveButton from "components/buttons/DestructiveButton";
import { ROUTES } from "constans/routes";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { useServiceDelete } from "features/services/hooks/useServiceDelete";
import { selectedServiceAtom } from "features/services/state/selectedServiceAtom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const DeleteServiceButton = () => {
  const { t } = useTranslation();
  const selectedProject = useRecoilValue(selectedProjectSelector);
  const selectedService = useRecoilValue(selectedServiceAtom);
  const navigate = useNavigate();
  const { mutation } = useServiceDelete({
    successCallback: () => {
      navigate(ROUTES.services, { replace: true });
    },
  });

  return (
    <DestructiveButton
      buttonText={t("delete")}
      modalTitle={t("services.delete-service")}
      onDestruction={() => {
        if (selectedProject === undefined || selectedService === undefined) return;

        mutation({
          projectId: selectedProject.projectId,
          serviceId: selectedService.serviceId,
        });
      }}
      customWidth={600}
      context
    >
      <Typography typographyType="body" as="span">
        {t("services.delete-confirm", { serviceTitle: selectedService?.title })}
      </Typography>
      <DeleteModalInfo text={t("services.delete-service-info")}></DeleteModalInfo>
    </DestructiveButton>
  );
};

export default DeleteServiceButton;
