import React, { useEffect, useState } from "react";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { Spinner } from "components/loaders/Spinner";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useUploadFile } from "features/timeriseApi/hooks/useUploadFile";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IconPhoto } from "@tabler/icons";

const ImgWrapper = styled.div`
  position: relative;

  & > .loader-wrapper {
    position: absolute;
    background: #64646457;
    display: grid;
    place-items: center;
    top: 0;
    width: 100px;
    height: 100px;
  }
  & > .loader-wrapper > div {
    transform: scale(2);
  }
`;

const UploadInput = styled.input`
  display: none;
`;

const NoImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  margin-bottom: 20px;
  display: grid;
  place-items: center;
  color: #999999;
`;

const StyledImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  object-fit: cover;
`;

const NoImage = () => {
  return (
    <NoImageWrapper>
      <IconPhoto size={50} />
    </NoImageWrapper>
  );
};

const getLogoImg = (logoUrl: string, preview: string) => {
  if (preview !== "") return <StyledImage src={preview} alt="Project logo" />;

  if (logoUrl === "") return <NoImage />;

  return <StyledImage src={logoUrl} alt="Project logo" />;
};

interface BookingPageLogoProps {
  logoUrl: string;
  onChange: (logoUrl: string) => void;
}

export const BookingPageLogo: React.FC<BookingPageLogoProps> = ({ logoUrl, onChange }) => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState("");
  const selectedProjectId = useRecoilValue(selectedProjectAtom);
  const { filePath, upload } = useUploadFile();

  const setImagePreview = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (this) {
      setPreview(this.result?.toString() ?? "");
    };
  };
  const uploadLogo = (file: File) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (this) {
      if (this.result instanceof ArrayBuffer) {
        upload(this.result, file.type.split("/")[1]);
      }
    };
  };

  useEffect(() => {
    if (filePath !== undefined) onChange(filePath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath]);

  if (selectedProjectId === undefined) return null;

  return (
    <Column ai="flex-start" mb={2}>
      <Typography typographyType="h3" as="h3">
        {t("logo")}
      </Typography>
      <ImgWrapper>
        {getLogoImg(logoUrl, preview)}
        {preview !== "" && filePath === undefined ? (
          <div className="loader-wrapper">
            <Spinner />
          </div>
        ) : null}
      </ImgWrapper>
      <UploadInput
        id="fileUploadInput"
        type="file"
        accept="image/*"
        onChange={(event: { target: HTMLInputElement }) => {
          const files = event.target.files;

          if (files === null || files.length === 0) return;

          setImagePreview(files[0]);
          uploadLogo(files[0]);
        }}
      />
      <Row gap="20px" jc="flex-start">
        <Box>
          <Button
            buttonType="secondary"
            onClick={() => {
              document.getElementById("fileUploadInput")?.click();
            }}
          >
            {t("upload-logo")}
          </Button>
        </Box>
        <Typography typographyType="label">{t("maximum-file-size")}</Typography>
      </Row>
    </Column>
  );
};
