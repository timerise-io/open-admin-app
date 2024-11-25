import React from "react";
import TeamMember from "features/team/components/TeamMember/TeamMember";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const TeamMemberPage = () => {
  const whitelabel = useWhitelabel();
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/png" href={whitelabel.iconSrc} />
      </Helmet>
      <TeamMember id={id} />
    </div>
  );
};

export default TeamMemberPage;
