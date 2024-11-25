import React from "react";
import AddAsset from "features/assets/components/AddAsset/AddAsset";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { Helmet } from "react-helmet-async";

const AssetAddPage = () => {
  const whitelabel = useWhitelabel();
  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/png" href={whitelabel.iconSrc} />
      </Helmet>
      <AddAsset />
    </div>
  );
};

export default AssetAddPage;
