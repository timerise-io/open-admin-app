import { useEffect } from "react";
import { useTimeriseQuery } from "features/api/hooks/useTimeriseQuery";
import { AssetsQueryResult, AssetsQueryVariables } from "features/assets/api/queries/models";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ASSETS } from "../api/queries/assets";
import { Asset } from "../models/asset";
import { assetsDictionaryAtom } from "../state/assetsDictionaryAtom";

export const useAssetsDictionary = () => {
  const setApiState = useSetRecoilState(apiStatusAtom("GET_ASSETS"));
  const selectedProject = useRecoilValue(selectedProjectAtom);

  const { data, loading } = useTimeriseQuery<AssetsQueryResult, AssetsQueryVariables>({
    query: ASSETS,
    loader: "ASSETS",
    variables: { query: "", projectId: selectedProject ?? "" },
    skip: !selectedProject,
    trigger: "ASSETS",
  });

  const setAssets = useSetRecoilState(assetsDictionaryAtom);

  useEffect(() => {
    setApiState({ isLoading: loading });
  }, [loading, setApiState]);

  useEffect(() => {
    const assetsData: Record<string, Asset> | undefined = data?.assets.reduce((acc, item) => {
      return { ...acc, [item.assetId]: { ...item } };
    }, {});
    setAssets(assetsData);
  }, [data, setAssets]);
};
