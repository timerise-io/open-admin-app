import React from "react";
import AddLocation from "features/locations/components/AddLocation/AddLocation";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { Helmet } from "react-helmet-async";

const LocationAddPage = () => {
  const whitelabel = useWhitelabel();
  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/png" href={whitelabel.iconSrc} />
      </Helmet>
      <AddLocation />
    </div>
  );
};

export default LocationAddPage;
