import React from "react";
import { currentUserAtom } from "features/auth/state/currentUserAtom";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { useRecoilValue } from "recoil";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import ProjectBookings from "./ProjectBookings/ProjectBookings";
import SubscriptionOverview from "./SubscriptionOverview/SubscriptionOverview";

const AdminDashboardContent = () => {
  useAdminDashboard();
  const whitelabel = useWhitelabel();
  return (
    <>
      <ProjectBookings />
      {whitelabel.billingSection === true && <SubscriptionOverview />}
    </>
  );
};

const AdminDashboard = () => {
  const user = useRecoilValue(currentUserAtom);

  if (["MANAGER", "STAFF", "USER"].includes(user?.role ?? "")) {
    return null;
  }

  return <AdminDashboardContent />;
};

export default AdminDashboard;
