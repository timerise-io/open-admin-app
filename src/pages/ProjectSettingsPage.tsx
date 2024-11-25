import React from "react";
import { ProjectSettings } from "features/project/components/settings/ProjectSettings";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { Helmet } from "react-helmet-async";

const ProjectSettingsPage = () => {
  const whitelabel = useWhitelabel();
  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/png" href={whitelabel.iconSrc} />
      </Helmet>
      <ProjectSettings />
    </div>
  );
};

export default ProjectSettingsPage;
