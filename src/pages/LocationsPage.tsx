import React from "react";
import { Locations } from "features/locations/components/Locations";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { Helmet } from "react-helmet-async";

const LocationsPage = () => {
  const whitelabel = useWhitelabel();
  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/png" href={whitelabel.iconSrc} />
      </Helmet>
      <Locations />
    </div>
  );
};

export default LocationsPage;
