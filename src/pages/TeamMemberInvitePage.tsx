import React from "react";
import TeamMemberInvite from "features/team/components/TeamMemberInvite/TeamMemberInvite";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { Helmet } from "react-helmet-async";

const TeamMemberInvitePage = () => {
  const whitelabel = useWhitelabel();
  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/png" href={whitelabel.iconSrc} />
      </Helmet>
      <TeamMemberInvite />
    </div>
  );
};

export default TeamMemberInvitePage;
