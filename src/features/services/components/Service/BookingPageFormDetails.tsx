import React from "react";
import { Card } from "components/Card";
import { DisplayField } from "components/DisplayField";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { selectedServiceAtom } from "features/services/state/selectedServiceAtom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

// import { useWhitelabel } from "helpers/hooks/useWhitelabel";

const Wrapper = styled(Row)`
  gap: 32px;
`;

const StyledColumn = styled(Column)`
  width: 530px;
`;
// const StyledColumnSmall = styled(Column)`
//   width: 334px;
// `;

const StyledHeader = styled(Typography)`
  margin-top: 32px;
`;

const FieldCard: React.FC<{
  title: string;
  enabled?: boolean;
  required?: boolean;
  label?: string;
  fieldType: string;
}> = ({ title, fieldType, label = "", required = false, enabled = false }) => {
  if (!enabled) return null;

  return (
    <>
      <StyledHeader typographyType="h3" as="h3">
        {title}
      </StyledHeader>
      <Card>
        <DisplayField label="Label" text={label} />
        <DisplayField label="Type" text={fieldType} />
        <DisplayField label="Required" text={required ? "Yes" : "No"} disableBottomMargin />
      </Card>
    </>
  );
};

export const BookingPageFormDetails = () => {
  const service = useRecoilValue(selectedServiceAtom);
  const formConfig = service?.formConfig;
  // const whitelabel = useWhitelabel();
  return (
    <Wrapper ai="flex-start" jc="flex-start">
      <StyledColumn ai="flex-start">
        <FieldCard
          title="Full name"
          enabled={formConfig?.fullName.enabled}
          required={formConfig?.fullName.required}
          label={formConfig?.fullName.label}
          fieldType="Text"
        />
        <FieldCard
          title="Phone number"
          enabled={formConfig?.phoneNumber.enabled}
          required={formConfig?.phoneNumber.required}
          label={formConfig?.phoneNumber.label}
          fieldType="Numbers"
        />
        <FieldCard
          title="Message"
          enabled={formConfig?.comment.enabled}
          required={formConfig?.comment.required}
          label={formConfig?.comment.label}
          fieldType="Text"
        />
        <FieldCard
          title="E-mail"
          enabled={formConfig?.emailAddress.enabled}
          required={formConfig?.emailAddress.required}
          label={formConfig?.emailAddress.label}
          fieldType="Text"
        />
      </StyledColumn>
      {/* {service?.shortUrl && (
        <StyledColumnSmall ai="flex-start">
          <StyledHeader typographyType="h3" as="h3">
            Booking link
          </StyledHeader>
          <Card>
            <DisplayField
              text={whitelabel.shortUrls === true ? service.shortUrl : whitelabel.bookingAppUrl + '/service/' + service.serviceId}
              customButtonText="Open"
              onClick={() => {
                window.open(whitelabel.shortUrls === true ? service.shortUrl : whitelabel.bookingAppUrl + '/service/' + service.serviceId, "_blank");
              }}
              showCustomButton
              disableBottomMargin
              showCopyButton
            />
          </Card>
        </StyledColumnSmall>
      )} */}
    </Wrapper>
  );
};
