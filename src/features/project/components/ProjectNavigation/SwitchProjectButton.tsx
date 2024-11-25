import React from "react";
import { Typography } from "components/Typography";
import { Project } from "features/project/model/project";
import ProjectNavigationTooltip from "../ProjectNavigationTooltip";
import { ProjectButton } from "./ProjectButton.styled";

const getProjectShortName = (title: string) => {
  const regex = new RegExp(/(\p{L}{1})\p{L}+/, "gu");
  const initials = Array.from(title.matchAll(regex));
  if (initials.length <= 1) {
    return title.length < 1 ? title[1].toUpperCase() : (title[0] + "" + title[1]).toUpperCase();
  }
  return ((initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")).toUpperCase();
};

interface SwitchProjectButtonProps extends Pick<Project, "title" | "pendingTeamMemberInvite" | "logoUrl"> {
  selected: boolean;
  onClick: () => void;
}

const SwitchProjectButton = ({
  title,
  pendingTeamMemberInvite,
  selected,
  onClick,
  logoUrl,
}: SwitchProjectButtonProps) => {
  return (
    <ProjectButton
      selected={selected}
      showBadge={pendingTeamMemberInvite}
      onClick={() => {
        onClick();
      }}
    >
      <Typography typographyType="body" align="center" displayType="contents">
        {logoUrl ? <img src={logoUrl} alt={title} /> : getProjectShortName(title)}
      </Typography>
      <ProjectNavigationTooltip projectName={title} />
    </ProjectButton>
  );
};

export default SwitchProjectButton;
