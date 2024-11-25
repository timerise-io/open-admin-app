import React from "react";
import AddSpace from "features/spaces/components/Space/AddSpace";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { Helmet } from "react-helmet-async";

const SpaceAddPage = () => {
  const whitelabel = useWhitelabel();
  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/png" href={whitelabel.iconSrc} />
      </Helmet>
      <AddSpace />
    </div>
  );
};

export default SpaceAddPage;
