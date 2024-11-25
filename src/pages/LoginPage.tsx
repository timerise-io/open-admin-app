import React from "react";
import { LogIn } from "features/auth/components/LogIn/LogIn";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { Helmet } from "react-helmet-async";

const LoginPage = () => {
  const whitelabel = useWhitelabel();
  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/png" href={whitelabel.iconSrc} />
      </Helmet>
      <LogIn />
    </div>
  );
};

export default LoginPage;
