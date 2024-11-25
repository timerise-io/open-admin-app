import React, { PropsWithChildren, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IconArrowNarrowDown, IconArrowNarrowUp } from "@tabler/icons";
import InvitationModal from "../InvitationModal";
import SwitchProjectButton from "../SwitchProjectButton";
import ArrowButton from "./ArrowButton";
import { NavigationStyledWrapper } from "./NavigationStyledWrapper.styled";
import { useProjectNavigation } from "./useProjectNavigation.hook";

const NavigationWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    observe,
    height,
    switchProject,
    selectedProjectId,
    projects,
    projectInvite,
    setProjectInvite,
    acceptInvitation,
    declineInvitation,
  } = useProjectNavigation();
  const [offset, setOffset] = useState(0);

  const currentSize = Math.floor(height / 36);

  const showArrows = currentSize < projects.length;

  const possibleDownStep = Math.min(3, projects.length + offset - currentSize + 2);

  useEffect(() => {
    if (!showArrows && offset !== 0) {
      setOffset(0);
    } else if (showArrows && possibleDownStep < 0) {
      setOffset((val) => val - possibleDownStep);
    }
  }, [offset, possibleDownStep, showArrows]);

  return (
    <NavigationStyledWrapper ref={observe}>
      {showArrows && (
        <ArrowButton
          className="arrow-up"
          onClick={() => {
            setOffset(offset < -3 ? offset + 3 : 0);
          }}
          disabled={offset === 0}
        >
          <IconArrowNarrowUp size={16} />
        </ArrowButton>
      )}
      <div className="projects-buttons-wrapper">
        <motion.div
          className="projects-buttons"
          whileInView={{ transform: `translateY(${offset * 36}px) translateZ(0px)` }}
          initial={{ transform: "translateY(0px) translateZ(0px)" }}
        >
          {projects.map((project) => {
            return (
              <SwitchProjectButton
                key={`key-project-${project.projectId}`}
                selected={project.projectId === selectedProjectId}
                pendingTeamMemberInvite={project.pendingTeamMemberInvite}
                title={project.title}
                onClick={() => {
                  if (!project.pendingTeamMemberInvite) {
                    switchProject(project);
                  } else {
                    setProjectInvite(project);
                  }
                }}
                logoUrl={project.logoUrl}
              />
            );
          })}
        </motion.div>
      </div>
      {showArrows && (
        <ArrowButton
          className="arrow-down"
          onClick={() => {
            setOffset(offset - possibleDownStep);
          }}
          disabled={possibleDownStep <= 0}
        >
          <IconArrowNarrowDown size={16} />
        </ArrowButton>
      )}
      <InvitationModal
        open={!!projectInvite}
        onAccept={function (): void {
          acceptInvitation();
        }}
        onDecline={function (): void {
          declineInvitation();
        }}
        onCancel={function (): void {
          setProjectInvite(null);
        }}
        projectId={projectInvite?.projectId ?? ""}
        title={projectInvite?.title ?? ""}
      />
    </NavigationStyledWrapper>
  );
};

export default NavigationWrapper;
