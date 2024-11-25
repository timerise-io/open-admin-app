import React, { useEffect, useState } from "react";
import { ContextButton } from "components/ContextButton";
import StyledLabel from "components/StyledLabel";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Row } from "components/layout/Row";
import { Spinner } from "components/loaders/Spinner";
import { useUploadFile } from "features/timeriseApi/hooks/useUploadFile";
import { useField } from "formik";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IconPhoto, IconX } from "@tabler/icons";

const NoImageWrapper = styled.div<{ rectangle: boolean }>`
  width: 90px;
  height: ${({ rectangle }) => (rectangle ? 67 : 90)}px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  margin-bottom: 20px;
  display: grid;
  place-items: center;
  color: #999999;
`;

const ImgWrapper = styled.div<{ rectangle: boolean }>`
  position: relative;
  width: 90px;
  height: ${({ rectangle }) => (rectangle ? 67 : 90)}px;
  margin-bottom: 20px;

  & > .loader-wrapper {
    position: absolute;
    background: #ffffff94;
    display: grid;
    place-items: center;
    border-radius: 4px;
    top: 0;
    width: 90px;
    height: ${({ rectangle }) => (rectangle ? 67 : 90)}px;
  }
  & > .loader-wrapper > div {
    transform: scale(2);
  }
`;

const StyledImage = styled.img<{ rectangle: boolean }>`
  width: 90px;
  height: ${({ rectangle }) => (rectangle ? 67 : 90)}px;
  border-radius: 4px;
  object-fit: cover;
`;

const UploadInput = styled.input`
  display: none;
`;

const RemoveMediaButton = styled.button`
  all: unset;
  box-sizing: border-box;
  position: absolute;
  width: 20px;
  height: 20px;
  right: 4px;
  top: 4px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;

  background: #ffffff;
`;

const StyledImgRow = styled(Row)`
  gap: 10px;
  flex-wrap: wrap;
`;

const NoImage = ({ rectangle }: { rectangle: boolean }) => {
  return (
    <NoImageWrapper rectangle={rectangle}>
      <IconPhoto size={48} strokeWidth="1" />
    </NoImageWrapper>
  );
};

interface MediaFieldProps {
  name: string;
  label: string;
  disableBottomMargin?: boolean;
  rectangle?: boolean;
}

const MediaField = ({ name, label, disableBottomMargin, rectangle = false }: MediaFieldProps) => {
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [field, , helpers] = useField<Array<string>>({ name });
  const { filePath, upload } = useUploadFile();

  const { setValue } = helpers;

  const { t } = useTranslation();

  const setImagePreview = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (this) {
      setPreview(this.result?.toString() ?? "");
    };
  };

  const uploadLogo = (file: File) => {
    setImagePreview(file);
    setIsLoading(true);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function (this) {
      if (this.result instanceof ArrayBuffer) {
        upload(this.result, file.type.split("/")[1]);
      }
    };
  };

  useEffect(() => {
    if (filePath !== undefined) {
      const index = field.value.findIndex((item) => item === filePath);
      if (index !== -1) return;
      setValue([...field.value, filePath]);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath]);

  const noImageCount = field.value.length > 4 ? 0 : 5 - field.value.length;

  return (
    <>
      <Box mb={0.5}>
        <StyledLabel>{label}</StyledLabel>
      </Box>
      <StyledImgRow jc="flex-start">
        {field.value.map((url, index) => (
          <ImgWrapper key={`location-img-${index}`} rectangle={rectangle}>
            <StyledImage src={url} alt="Location media" rectangle={rectangle} />
            <RemoveMediaButton
              onClick={() => {
                const filtered = field.value.filter((item) => item !== url);
                setValue([...filtered]);
              }}
              type="button"
            >
              <IconX size={16} />
            </RemoveMediaButton>
          </ImgWrapper>
        ))}
        {isLoading && preview !== "" && (
          <ImgWrapper rectangle={rectangle}>
            <StyledImage src={preview} alt="Media" rectangle={rectangle} />
            <div className="loader-wrapper">
              <Spinner />
            </div>
          </ImgWrapper>
        )}
        {new Array(noImageCount - (isLoading ? 1 : 0)).fill(1).map((_, index) => {
          return <NoImage key={`no-img-media-${index}`} rectangle={rectangle} />;
        })}
      </StyledImgRow>
      <UploadInput
        id="fileUploadInput"
        type="file"
        accept="image/*"
        value={""}
        onChange={(event: { target: HTMLInputElement }) => {
          const files = event.target.files;

          if (files === null || files.length === 0) return;

          uploadLogo(files[0]);
        }}
      />
      <Row gap="20px" jc="flex-start">
        <ContextButton
          onClick={() => {
            document.getElementById("fileUploadInput")?.click();
          }}
          disabled={field.value.length > 4 || isLoading}
          type="button"
        >
          {t("common:upload-photo")}
        </ContextButton>
        <Typography typographyType="label">{t("common:maximum-file-size")}</Typography>
      </Row>
      {!disableBottomMargin && <Box h="24px" />}
    </>
  );
};

export default MediaField;
