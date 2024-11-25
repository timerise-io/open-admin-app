import React from "react";
import DeleteModalInfo from "components/DeleteModalInfo";
import { Typography } from "components/Typography";
import DestructiveButton from "components/buttons/DestructiveButton";
import { ROUTES } from "constans/routes";
import { useAssetDelete } from "features/assets/hooks/useAssetDelete";
import { selectedAssetAtom } from "features/assets/state/selectedAssetAtom";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const DeleteAssetButton = () => {
  const { t } = useTranslation();
  const selectedProject = useRecoilValue(selectedProjectSelector);
  const selectedAsset = useRecoilValue(selectedAssetAtom);
  const navigate = useNavigate();
  const { mutation } = useAssetDelete({
    successCallback: () => {
      navigate(ROUTES.assets, { replace: true });
    },
  });

  return (
    <DestructiveButton
      buttonText={t("delete")}
      modalTitle={t("assets.delete-asset")}
      onDestruction={() => {
        if (selectedProject === undefined || selectedAsset === undefined) return;

        mutation({
          projectId: selectedProject.projectId,
          assetId: selectedAsset.assetId,
        });
      }}
      customWidth={600}
      context
    >
      <Typography typographyType="body" as="span">
        {t("assets.delete-asset-info", { assetTitle: selectedAsset?.title })}
      </Typography>
      <DeleteModalInfo text={t("assets.delete-asset-warning")}></DeleteModalInfo>
    </DestructiveButton>
  );
};

export default DeleteAssetButton;
