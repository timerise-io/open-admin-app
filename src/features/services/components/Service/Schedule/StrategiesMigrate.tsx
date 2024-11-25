import { Typography } from "components/Typography";
import { Row } from "components/layout/Row";
import { useServiceStrategyMigrate } from "features/services/hooks/useServiceStrategyMigrate";
import { selectedServiceAtom } from "features/services/state/selectedServiceAtom";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const StyledWrapper = styled(Row)`
  border-top: 1px solid #e5e5e5;
  padding: 18px 0 0;
`;

const StyledMigrateLink = styled(Link)`
  color: #333333;
`;

export const StrategiesMigrate = () => {
  const service = useRecoilValue(selectedServiceAtom);
  const { mutation } = useServiceStrategyMigrate();

  const handleClick = () => {
    if (!service?.serviceId || !service?.project?.projectId) return;
    mutation({
      serviceId: service?.serviceId,
      projectId: service?.project.projectId,
    });
  };

  return (
    <StyledWrapper mt={2} w="100%">
      <Typography typographyType="body" as="span">
        Don’t see previously set availabilities?{" "}
        <StyledMigrateLink to={""} onClick={handleClick}>
          Click here
        </StyledMigrateLink>{" "}
        to refresh.
      </Typography>
    </StyledWrapper>
  );
};
