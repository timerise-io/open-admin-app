import React from "react";
import { Typography } from "components/Typography";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IconWorld } from "@tabler/icons";
import { selectedProjectSelector } from "../state/selectedProjectSelector";

const Wrapper = styled.div`
  color: #999999;
  display: flex;
  justify-content: center;
  gap: 4px;
`;

const ProjectTimezone = () => {
  const timezone = useRecoilValue(selectedProjectSelector)?.localTimeZone;

  if (!timezone) return null;

  return (
    <Wrapper>
      <IconWorld size={12} color="#999999" />
      <Typography typographyType="label" color="inherit" as="span">
        {timezone}
      </Typography>
    </Wrapper>
  );
};

export default ProjectTimezone;
