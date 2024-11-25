import { useEffect } from "react";
import { useDefaultQueryOptions } from "features/api/hooks/useDefaultQueryOptions";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery } from "@apollo/client";
import { ASSETS_SLOTS, AssetSlotQueryResult, AssetSlotsQueryVariables } from "../api/queries/assetsSlots";
import { selectedAssetsExceptionsAtom } from "../state/selectedAssetExceptionsAtom";

export const useAssetExceptions = (assetId: string) => {
  const queryOptions = useDefaultQueryOptions<AssetSlotsQueryVariables>();
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const { data } = useQuery<AssetSlotQueryResult, AssetSlotsQueryVariables>(ASSETS_SLOTS, {
    ...queryOptions,
    variables: {
      assetId,
      slotType: "EXCEPTION",
      projectId: selectedProject ?? "",
    },
    skip: assetId === "" || selectedProject === undefined,
  });

  const setExceptions = useSetRecoilState(selectedAssetsExceptionsAtom);

  useEffect(() => {
    const newData = data?.asset.slots && [...data.asset.slots];

    setExceptions(newData ?? []);

    return () => {
      setExceptions([]);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setExceptions]);
};
