import React from "react";
import { DisplayField } from "components/DisplayField";
import { Booking, PaymentStatus } from "features/bookings/model/booking";
import styled, { css } from "styled-components";

const statusToColor: Record<PaymentStatus, string> = {
  NEW: `#333333`,
  PROCESSING: `#333333`,
  SUCCEEDED: `#267D3D`,
  CANCELED: `#C83A2D`,
};

const statusToText: Record<PaymentStatus, string> = {
  NEW: `New`,
  PROCESSING: `Pending`,
  SUCCEEDED: `Succeeded`,
  CANCELED: `Canceled`,
};

const Wrapper = styled.div<{
  status: PaymentStatus;
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

type DisplayPaymentStatusFieldProps = Pick<Booking, "paymentStatus">;

const DisplayPaymentStatusField: React.FC<DisplayPaymentStatusFieldProps> = ({ paymentStatus }) => {
  if (paymentStatus === null) return null;

  return (
    <Wrapper status={paymentStatus}>
      <DisplayField label="Payment status" text={statusToText[paymentStatus]} />
    </Wrapper>
  );
};

export default DisplayPaymentStatusField;
