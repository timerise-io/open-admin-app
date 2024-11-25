import React from "react";
import { DisplayField } from "components/DisplayField";
import { BookingStatus } from "features/bookings/model/booking";
import styled, { css } from "styled-components";

const statusToColor: Record<BookingStatus, string> = {
  NEW: `#333333`,
  CONFIRMED: `#267D3D`,
  ACCEPTED: `#267D3D`,
  CANCELED: `#C83A2D`,
  REJECTED: `#C83A2D`,
};

const Wrapper = styled.div<{
  status: BookingStatus;
}>`
  ${({ status }) => {
    return css`
      .display-field-custom-text-style {
        color: ${statusToColor[status]};
        font-weight: 700;
      }
    `;
  }}
`;

interface DisplayStatusFieldProps {
  status: BookingStatus;
}

const DisplayStatusField: React.FC<DisplayStatusFieldProps> = ({ status }) => {
  return (
    <Wrapper status={status}>
      <DisplayField label="Booking status" text={`${status.charAt(0)}${status.slice(1).toLowerCase()}`} />
    </Wrapper>
  );
};

export default DisplayStatusField;
