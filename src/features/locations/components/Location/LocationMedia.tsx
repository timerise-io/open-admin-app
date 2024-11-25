import React, { useEffect } from "react";
import { Card } from "components/Card";
import { ContextButton } from "components/ContextButton";
import { Typography } from "components/Typography";
import { Row } from "components/layout/Row";
import { useUploadFile } from "features/timeriseApi/hooks/useUploadFile";
import { useField } from "formik";
import styled from "styled-components";
import { IconPhoto, IconX } from "@tabler/icons";

const StyledHeader = styled(Typography)`
  margin-top: 32px;
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

const ImgWrapper = styled.div`
  position: relative;
  width: 90px;

  & > .loader-wrapper {
    position: absolute;
    background: #64646457;
    display: grid;
    place-items: center;
    top: 0;
    width: 90px;
    height: 90px;
  }
  & > .loader-wrapper > div {
    transform: scale(2);
  }
`;

const StyledImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 4px;
  margin-bottom: 20px;
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

const NoImage = () => {
  return (
    <NoImageWrapper>
      <IconPhoto size={50} />
    </NoImageWrapper>
  );
};

const LocationMedia = () => {
  const [field, , helpers] = useField<Array<string>>({ name: "media" });
  const { filePath, upload } = useUploadFile();

  const { setValue } = helpers;

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
    if (filePath !== undefined) {
      const index = field.value.findIndex((item) => item === filePath);
      if (index !== -1) return;
      setValue([...field.value, filePath]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath]);

  return (
    <>
      <StyledHeader typographyType="h3" as="h3">
        Details
      </StyledHeader>
      <Card>
        {field.value.length > 0 ? (
          <StyledImgRow jc="flex-start">
            {field.value.map((url, index) => (
              <ImgWrapper key={`location-img-${index}`}>
                <StyledImage src={url} alt="Location media" />
                <RemoveMediaButton
                  onClick={() => {
                    const filtered = field.value.filter((item) => item !== url);
                    setValue([...filtered]);
                  }}
                >
                  <IconX size={16} />
                </RemoveMediaButton>
              </ImgWrapper>
            ))}
          </StyledImgRow>
        ) : (
          <NoImage />
        )}
        <UploadInput
          id="fileUploadInput"
          type="file"
          accept="image/*"
          onChange={(event: { target: HTMLInputElement }) => {
            const files = event.target.files;

            if (files === null || files.length === 0) return;
            uploadLogo(files[0]);
          }}
        />
        <ContextButton
          onClick={() => {
            document.getElementById("fileUploadInput")?.click();
          }}
        >
          Upload photo
        </ContextButton>
      </Card>
    </>
  );
};

export default LocationMedia;
