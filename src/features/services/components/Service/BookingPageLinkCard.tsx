import React, { useState } from "react";
import { Card } from "components/Card";
import { ContextButton } from "components/ContextButton";
import { DisplayField } from "components/DisplayField";
import { Typography } from "components/Typography";
import { Row } from "components/layout/Row";
import { selectedServiceAtom } from "features/services/state/selectedServiceAtom";
import { useToast } from "features/toast/hooks/useToast";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import EditBookingLinkModal from "./EditBookingLinkModal";

const StyledHeader = styled(Typography)`
  margin-top: 32px;
`;

const DisplayFieldStyled = styled(DisplayField)`
  .display-field-custom-text-style {
    width: -webkit-fill-available;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const BookingPageLinkCard = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const service = useRecoilValue(selectedServiceAtom);
  const addToast = useToast();
  const whitelabel = useWhitelabel();

  return (
    <>
      <StyledHeader typographyType="h3" as="h3">
        {t("services.booking-page-link")}
      </StyledHeader>
      <Card>
        <DisplayFieldStyled
          label={t("link")}
          text={
            whitelabel.shortUrls === true
              ? service?.shortUrl
              : whitelabel.bookingAppUrl + "/service/" + service?.serviceId
          }
          disableBottomMargin
        />
        <Row mt={1.25}>
          <Row gap="10px">
            <ContextButton
              type="button"
              onClick={() => {
                if (!service) return;
                navigator.clipboard.writeText(
                  whitelabel.shortUrls === true
                    ? service.shortUrl
                    : whitelabel.bookingAppUrl + "/service/" + service.serviceId,
                );
                addToast({
                  variant: "SUCCESS",
                  type: "copied",
                  date: new Date().getTime(),
                });
              }}
            >
              {t("copy")}
            </ContextButton>
            <ContextButton
              type="button"
              onClick={() => {
                service &&
                  window.open(
                    whitelabel.shortUrls === true
                      ? service.shortUrl
                      : whitelabel.bookingAppUrl + "/service/" + service.serviceId,
                    "_blank",
                  );
              }}
            >
              {t("open")}
            </ContextButton>
          </Row>
          {whitelabel.shortUrls === true && (
            <ContextButton
              type="button"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              {t("edit")}
            </ContextButton>
          )}
        </Row>
      </Card>
      <EditBookingLinkModal
        isModalOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        currentUrl={service?.shortUrl ?? ""}
        serviceId={service?.serviceId ?? ""}
        projectId={service?.project.projectId ?? ""}
      ></EditBookingLinkModal>
    </>
  );
};

export default BookingPageLinkCard;
