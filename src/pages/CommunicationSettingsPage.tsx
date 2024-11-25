import React from "react";
import { CommunicationSettings } from "features/project/components/settings/CommunicationSettings";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { Helmet } from "react-helmet-async";

const CommunicationSettingsPage = () => {
  const whitelabel = useWhitelabel();
  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/png" href={whitelabel.iconSrc} />
      </Helmet>
      <CommunicationSettings />
    </div>
  );
};

export default CommunicationSettingsPage;
