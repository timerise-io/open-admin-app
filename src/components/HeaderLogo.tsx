import React from "react";
import { ROUTES } from "constans/routes";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LogoLink = styled(Link)`
  height: 100px;
  padding: 32px;
`;

const HeaderLogo = () => {
  const whitelabel = useWhitelabel();

  return (
    <LogoLink to={ROUTES.home}>
      <img src={whitelabel.logoSrc} width={whitelabel.logoWidth} alt={whitelabel.alt} />
    </LogoLink>
  );
};

export default HeaderLogo;
