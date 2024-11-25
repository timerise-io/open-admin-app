import React from "react";
import AddService from "features/services/components/AddService/AddService";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { Helmet } from "react-helmet-async";

const ServiceAddPage = () => {
  const whitelabel = useWhitelabel();
  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/png" href={whitelabel.iconSrc} />
      </Helmet>
      <AddService />
    </div>
  );
};

export default ServiceAddPage;
