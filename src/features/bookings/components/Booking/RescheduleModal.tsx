import React, { useState } from "react";
import { Button } from "components/Button";
import { IconButton } from "components/IconButton";
import { Typography } from "components/Typography";
import BaseModal from "components/modals/BaseModal";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IconX } from "@tabler/icons";

const ContentWrapper = styled.div`
  background: #ffffff;
  border-radius: 4px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 5px 0px 20px;
  border-radius: 4px;
`;

interface RescheduleModalProps {
  bookingId: string;
  open?: boolean;
  disabled?: boolean;
}

const RescheduleModal = ({ bookingId, open = false, disabled = false }: RescheduleModalProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const whitelabel = useWhitelabel();
  const bookingPageUrl = whitelabel.bookingAppUrl + "/embedded/reschedule/" + bookingId;
  return (
    <>
      <Button
        buttonType="secondary"
        disabled={disabled}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {t("bookings.reschedule")}
      </Button>
      <BaseModal open={isOpen} customWidth={600}>
        <ContentWrapper>
          <HeaderWrapper>
            <Typography typographyType="h3">{t("bookings.reschedule")}</Typography>
            <IconButton onClick={() => setIsOpen(false)} type="button">
              <IconX />
            </IconButton>
          </HeaderWrapper>
          <iframe
            title="iFrame"
            style={{
              width: "100%",
              height: "50vh",
              border: "none",
            }}
            src={bookingPageUrl}
          />
        </ContentWrapper>
      </BaseModal>
    </>
  );
};

export default RescheduleModal;
