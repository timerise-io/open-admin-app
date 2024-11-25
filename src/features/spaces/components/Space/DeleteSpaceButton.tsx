// import { IconAlertCircle } from "@tabler/icons";
import React from "react";
import DeleteModalInfo from "components/DeleteModalInfo";
import { Typography } from "components/Typography";
import DestructiveButton from "components/buttons/DestructiveButton";
import { ROUTES } from "constans/routes";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { useSpaceDelete } from "features/spaces/hooks/useSpaceDelete";
import { selectedSpaceAtom } from "features/spaces/state/selectedSpaceAtom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const DeleteSpaceButton = () => {
  const { t } = useTranslation();
  const selectedProject = useRecoilValue(selectedProjectSelector);
  const selectedSpace = useRecoilValue(selectedSpaceAtom);
  const navigate = useNavigate();
  const { mutation } = useSpaceDelete({
    successCallback: () => {
      navigate(ROUTES.spaces, { replace: true });
    },
  });

  return (
    <DestructiveButton
      buttonText={t("delete")}
      modalTitle={t("spaces.delete-space")}
      onDestruction={() => {
        if (selectedProject === undefined || selectedSpace === undefined) return;

        mutation({
          projectId: selectedProject.projectId,
          spaceId: selectedSpace.spaceId,
        });
      }}
      customWidth={600}
      context
    >
      <Typography typographyType="body" as="span">
        {t("spaces.delete-space-info", { spaceTitle: selectedSpace?.title })}
      </Typography>
      <DeleteModalInfo text={t("spaces.delete-space-warning")}></DeleteModalInfo>
    </DestructiveButton>
  );
};

export default DeleteSpaceButton;
