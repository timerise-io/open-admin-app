import { PropsWithChildren } from "react";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import styled from "styled-components";

const StyledCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  width: 100%;
  padding: 20px;
  margin-top: 4px;
  margin-bottom: 20px;
`;

const DashboardCardWrapper = styled(Column)`
  flex-basis: 1px;
  flex-grow: 1;
  align-items: flex-start;
`;

interface DashboardCardProps {
  title: string;
}

export const DashboardCard: React.FC<PropsWithChildren<DashboardCardProps>> = ({ title, children }) => {
  return (
    <DashboardCardWrapper>
      <Typography typographyType="body" as="h6" displayType="contents">
        {title}
      </Typography>
      <StyledCard>{children}</StyledCard>
    </DashboardCardWrapper>
  );
};
