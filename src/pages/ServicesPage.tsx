import React from "react";
import { Services } from "features/services/components/Services";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { Helmet } from "react-helmet-async";

const ServicesPage = () => {
  const whitelabel = useWhitelabel();
  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/png" href={whitelabel.iconSrc} />
      </Helmet>
      <Services />
    </div>
  );
};

export default ServicesPage;
