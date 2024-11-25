import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useRecoilState } from "recoil";
import { CREATE_SPACE, SpaceCreateMutationResult, SpaceCreateMutationVariables } from "../api/mutations/createSpace";
import { spacesDictionaryAtom } from "../state/spacesDictionaryAtom";

export const useSpaceCreate = () => {
  const { mutation, data, error, loading } = useTimeriseMutation<
    SpaceCreateMutationResult,
    SpaceCreateMutationVariables
  >({
    mutation: CREATE_SPACE,
    loader: "CREATE_SPACE",
    trigger: "SPACES",
  });

  const [spaces, setSpaces] = useRecoilState(spacesDictionaryAtom);

  useEffect(() => {
    if (!error && !loading && data?.spaceCreate.spaceId) {
      setSpaces({
        ...spaces,
        [data.spaceCreate.spaceId]: { ...data.spaceCreate },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  return {
    mutation: (values: SpaceCreateMutationVariables) => {
      mutation(values);
    },
    data,
  };
};
