import React from "react";
import { Dashboard } from "features/dashboard/components/Dashboard";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { Helmet } from "react-helmet-async";

const DashboardPage = () => {
  const whitelabel = useWhitelabel();
  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/png" href={whitelabel.iconSrc} />
      </Helmet>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
