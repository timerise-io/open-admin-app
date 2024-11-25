import { useEffect } from "react";
import { useTimeriseQuery } from "features/api/hooks/useTimeriseQuery";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { INVITATIONS } from "../api/invitations";
import { InvitationsQueryResult, InvitationsQueryVariables } from "../api/models";
import { Invitation } from "../models/invitation";
import { invitationsAtom } from "../state/invitationsAtom";

export const useInvitations = () => {
  const setApiState = useSetRecoilState(apiStatusAtom("GET_TEAM"));

  const selectedProject = useRecoilValue(selectedProjectAtom);

  const { data, loading } = useTimeriseQuery<InvitationsQueryResult, InvitationsQueryVariables>({
    query: INVITATIONS,
    loader: "INVITATIONS",
    variables: { projectId: selectedProject ?? "" },
    skip: !selectedProject,
    trigger: "INVITATIONS",
  });

  const setInvitation = useSetRecoilState(invitationsAtom);

  useEffect(() => {
    setApiState({ isLoading: loading });
  }, [loading, setApiState]);

  useEffect(() => {
    const invitationsData: Record<string, Invitation> | undefined = data?.invitations.reduce((acc, item) => {
      return { ...acc, [item.invitationId]: { ...item } };
    }, {});
    setInvitation(invitationsData);
  }, [data, setInvitation]);
};
