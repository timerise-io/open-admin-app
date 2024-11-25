import { useEffect } from "react";
import { useTimeriseQuery } from "features/api/hooks/useTimeriseQuery";
import { AssetsQueryResult, AssetsQueryVariables } from "features/assets/api/queries/models";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ASSETS } from "../api/queries/assets";
import { Asset } from "../models/asset";
import { assetsAtom } from "../state/assetsAtom";
import { assetsFilterSelector } from "../state/assetsFilterAtom";

export const useAssets = () => {
  const filters = useRecoilValue(assetsFilterSelector);
  const selectedProject = useRecoilValue(selectedProjectAtom);

  const { data } = useTimeriseQuery<AssetsQueryResult, AssetsQueryVariables>({
    query: ASSETS,
    loader: "ASSETS",
    variables: {
      query: filters.text,
      projectId: selectedProject ?? "",
      locationId: filters.locationId,
    },
    skip: !selectedProject,
    trigger: "ASSETS",
  });

  const setAssets = useSetRecoilState(assetsAtom);

  useEffect(() => {
    const assetsData: Record<string, Asset> | undefined = data?.assets.reduce((acc, item) => {
      return { ...acc, [item.assetId]: { ...item } };
    }, {});
    setAssets(assetsData);
  }, [data, setAssets]);
};
