import React, { useEffect } from "react";
import { Typography } from "components/Typography";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toastAtom } from "../state/toastAtom";
import Toast from "./Toast";

const ToastWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 1000;
  pointer-events: none;
  padding-top: 4px;
`;

const ToastHolder = () => {
  const [currentToast, setCurrentToast] = useRecoilState(toastAtom);
  const { t } = useTranslation();

  useEffect(() => {
    const now = new Date().getTime();
    const activeToast = currentToast.filter((item) => now - item.date < 3000);
    if (activeToast.length < currentToast.length) {
      setCurrentToast([...activeToast]);
    }
  }, [currentToast, setCurrentToast]);

  return (
    <ToastWrapper>
      {[...currentToast].reverse().map((item) => {
        if (item.type === "file-upload") {
          return (
            <Toast key={`toast-item-${item.date}`} text="Ooops... something went wrong. Try again." type="ERROR" />
          );
        }
        if (item.type === "copied") {
          return <Toast key={`toast-item-${item.date}`} text={t("copied")} type="SUCCESS" />;
        }
        if (item.type === "project-changed") {
          return (
            <Toast key={`toast-item-${item.date}`} type={item.variant}>
              <Typography typographyType="body" as="span" color="inherit">
                {`Project changed to `}
              </Typography>
              <Typography typographyType="body" as="span" weight="700" color="inherit">
                {item.projectName}
              </Typography>
            </Toast>
          );
        }
        if (item.type === "booking-accepted") {
          return <Toast key={`toast-item-${item.date}`} text={t("bookings-accepted")} type="SUCCESS" />;
        }
        if (item.type === "booking-canceled" || item.type === "booking-rejected") {
          return <Toast key={`toast-item-${item.date}`} text={t("booking-canceled")} type="SUCCESS" />;
        }
        if (item.type === "data-save" && item.variant === "SUCCESS") {
          return <Toast key={`toast-item-${item.date}`} text={t("saved")} type="SUCCESS" />;
        }
        if (item.type === "team-member-deleted" && item.variant === "SUCCESS") {
          return <Toast key={`toast-item-${item.date}`} text={t("team.team-member-deleted")} type="SUCCESS" />;
        }
        if (item.variant === "ERROR") {
          return <Toast key={`toast-item-${item.date}`} text={t("ooops-something-went-wrong")} type="ERROR" />;
        }
        return null;
      })}
    </ToastWrapper>
  );
};

export default ToastHolder;
