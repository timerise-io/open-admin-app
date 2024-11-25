import React from "react";
import DeleteModalInfo from "components/DeleteModalInfo";
import { Typography } from "components/Typography";
import DestructiveButton from "components/buttons/DestructiveButton";
import { ROUTES } from "constans/routes";
import { useLocationDelete } from "features/locations/hooks/useLocationDelete";
import { selectedLocationAtom } from "features/locations/state/selectedLocationsAtom";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const DeleteLocationButton = () => {
  const { t } = useTranslation();
  const selectedProject = useRecoilValue(selectedProjectSelector);
  const selectedLocation = useRecoilValue(selectedLocationAtom);
  const navigate = useNavigate();
  const { mutation } = useLocationDelete({
    successCallback: () => {
      navigate(ROUTES.locations, { replace: true });
    },
  });

  return (
    <DestructiveButton
      buttonText={t("delete")}
      modalTitle={t("locations.delete-location")}
      onDestruction={() => {
        if (selectedProject === undefined || selectedLocation === undefined) return;

        mutation({
          projectId: selectedProject.projectId,
          locationId: selectedLocation.locationId,
        });
      }}
      customWidth={600}
      context
    >
      <Typography typographyType="body" as="span">
        {t("locations.delete-location-info", { locationTitle: selectedLocation?.title })}
      </Typography>
      <DeleteModalInfo text={t("locations.delete-location-warning")}></DeleteModalInfo>
    </DestructiveButton>
  );
};

export default DeleteLocationButton;
