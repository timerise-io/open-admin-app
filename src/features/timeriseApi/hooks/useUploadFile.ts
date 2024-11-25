import { useEffect, useState } from "react";
import axios from "axios";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { toastAtom } from "features/toast/state/toastAtom";
import { useRecoilState, useRecoilValue } from "recoil";

export const useUploadFile = () => {
  const projectId = useRecoilValue(selectedProjectAtom);
  const [filePath, setFilePath] = useState<string | undefined>();
  const [fileToUpload, setFileToUpload] = useState<ArrayBuffer | undefined>();
  const [fileToUploadExtension, setFileToUploadExtension] = useState<string | undefined>();
  const [currentToast, setCurrentToast] = useRecoilState(toastAtom);

  const upload = (file: ArrayBuffer, extension: string) => {
    setFilePath(undefined);
    setFileToUpload(file);
    setFileToUploadExtension(extension);
  };

  useEffect(() => {
    if (projectId === undefined || fileToUpload === undefined || fileToUploadExtension === undefined) return;

    axios
      .post<{ filePath: string }>(
        `${process.env.REACT_APP_TIMERISE_TOOLS_API}/upload?extension=${fileToUploadExtension}&projectId=${projectId}`,
        fileToUpload,
        {
          headers: {
            "content-type": "application/octet-stream",
          },
        },
      )
      .then((response) => {
        setFilePath(response.data.filePath);
      })
      .catch((err) => {
        setCurrentToast([
          ...currentToast,
          {
            variant: "ERROR",
            type: "file-upload",
            date: new Date().getTime(),
          },
        ]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, fileToUpload, fileToUploadExtension]);

  return { filePath, upload };
};
