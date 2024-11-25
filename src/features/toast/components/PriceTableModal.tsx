import React, { useState } from "react";
import { IconButton } from "components/IconButton";
import { Typography } from "components/Typography";
import BaseModal from "components/modals/BaseModal";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IconX } from "@tabler/icons";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const ContentWrapper = styled.div`
  background: #ffffff;
  border-radius: 4px;
  padding-bottom: 25px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 5px 0px 20px;
  border-radius: 4px;
`;

const StyledAnchor = styled.a<{ isAlert?: boolean }>`
  color: ${({ isAlert }) => (isAlert ? "#fff" : "#333")};
  text-decoration: none;
`;

interface PriceTableModalProps {
  stripeId?: string;
  open?: boolean;
  isAlert?: boolean;
}

const PriceTableModal = ({ stripeId, open = false, isAlert = false }: PriceTableModalProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <StyledAnchor
        href="#price-table-modal"
        onClick={() => {
          setIsOpen(true);
        }}
        isAlert={isAlert}
      >
        {t("billings.upgrade-now")}
      </StyledAnchor>
      <BaseModal open={isOpen} customWidth={700}>
        <ContentWrapper>
          <HeaderWrapper>
            <Typography typographyType="h3">{t("billings.select-plan")}</Typography>
            <IconButton onClick={() => setIsOpen(false)} type="button">
              <IconX />
            </IconButton>
          </HeaderWrapper>
          <stripe-pricing-table
            pricing-table-id="prctbl_1PBLu2Ds5q03hFzEdS8MZcH7"
            publishable-key={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
            stripe-id={stripeId}
          ></stripe-pricing-table>
        </ContentWrapper>
      </BaseModal>
    </>
  );
};

export default PriceTableModal;
