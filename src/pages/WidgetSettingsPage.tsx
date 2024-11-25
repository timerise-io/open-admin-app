import React from "react";
import WidgetSettings from "features/widget/components/WidgetSettings";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { Helmet } from "react-helmet-async";

const WidgetSettingsPage = () => {
  const whitelabel = useWhitelabel();
  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/png" href={whitelabel.iconSrc} />
      </Helmet>
      <WidgetSettings />
    </div>
  );
};

export default WidgetSettingsPage;
