import React from "react";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { selectedServiceAtom } from "features/services/state/selectedServiceAtom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ServiceDetailsFormContent, {
  ServiceDetailsFormContentProps,
} from "../ServiceDetailsFormContent/ServiceDetailsFormContent";
import BookingPageLinkCard from "./BookingPageLinkCard";
import { ServiceLabels } from "./ServiceLabels";

const StyledColumn = styled(Column)`
  width: 530px;
`;

const StyledHeader = styled(Typography)`
  margin-top: 32px;
`;

interface ServiceDetailsProps {
  formValues: ServiceDetailsFormContentProps;
}

export const ServiceDetails = ({ formValues }: ServiceDetailsProps) => {
  const service = useRecoilValue(selectedServiceAtom);

  return (
    <Row gap="32px" ai="flex-start" jc="flex-start">
      <StyledColumn ai="flex-start">
        <StyledHeader typographyType="h3" as="h3">
          Details
        </StyledHeader>

        <ServiceDetailsFormContent {...formValues} serviceId={service?.serviceId} shortId={service?.shortId} />
      </StyledColumn>
      <Column ai="flex-start" jc="flex-start" w="334px">
        <BookingPageLinkCard />
        <ServiceLabels />
      </Column>
    </Row>
  );
};
