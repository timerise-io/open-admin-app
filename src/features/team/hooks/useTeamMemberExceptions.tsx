import { useEffect } from "react";
import { useTimeriseQuery } from "features/api/hooks/useTimeriseQuery";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  TEAM_MEMBER_SLOTS,
  TeamMemberSlotsQueryResult,
  TeamMemberSlotsQueryVariables,
} from "../api/queries/teamMemberSlots";
import { selectedTeamMemberExceptionsAtom } from "../state/selectedTeamMemberExceptionsAtom";

export const useTeamMemberExceptions = (userId: string) => {
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const { data } = useTimeriseQuery<TeamMemberSlotsQueryResult, TeamMemberSlotsQueryVariables>({
    query: TEAM_MEMBER_SLOTS,
    loader: "TEAM_MEMBER_SLOTS",
    variables: {
      userId,
      slotType: "EXCEPTION",
      projectId: selectedProject ?? "",
    },
    skip: userId === "" || selectedProject === undefined,
    trigger: "TEAM_MEMBER_SLOTS",
  });

  const setExceptions = useSetRecoilState(selectedTeamMemberExceptionsAtom);

  useEffect(() => {
    const newData = data?.teamMember.slots && [...data.teamMember.slots];

    setExceptions(newData ?? []);

    return () => {
      setExceptions([]);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setExceptions]);
};
