import { useEffect } from "react";
import { useTimeriseQuery } from "features/api/hooks/useTimeriseQuery";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ASSET, AssetQueryResult, AssetQueryVariables } from "../api/queries/asset";
import { selectedAssetAtom } from "../state/selectedAssetAtom";

export const useAsset = (assetId: string) => {
  const selectedProjectId = useRecoilValue(selectedProjectAtom);

  const { loading, error, data } = useTimeriseQuery<AssetQueryResult, AssetQueryVariables>({
    query: ASSET,
    loader: "ASSET",
    variables: {
      assetId,
      projectId: selectedProjectId ?? "",
    },
  });

  const setSelectedAtom = useSetRecoilState(selectedAssetAtom);

  useEffect(() => {
    if (!loading && !error && data?.asset) {
      setSelectedAtom(data.asset);
    }

    return () => {
      setSelectedAtom(undefined);
    };
  }, [data, error, loading, setSelectedAtom]);
};
