import React from "react";
import { ForgotPassword } from "features/auth/components/ForgotPassword/ForgotPassword";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { Helmet } from "react-helmet-async";

const ForgotPasswordPage = () => {
  const whitelabel = useWhitelabel();
  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/png" href={whitelabel.iconSrc} />
      </Helmet>
      <ForgotPassword />
    </div>
  );
};

export default ForgotPasswordPage;
