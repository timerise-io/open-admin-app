import React from "react";
import { Spaces } from "features/spaces/components/Spaces";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { Helmet } from "react-helmet-async";

const SpacesPage = () => {
  const whitelabel = useWhitelabel();
  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/png" href={whitelabel.iconSrc} />
      </Helmet>
      <Spaces />
    </div>
  );
};

export default SpacesPage;
