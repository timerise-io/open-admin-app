import React, { useEffect } from "react";
import { ROUTES } from "constans/routes";
import { Bookings } from "features/bookings/components/Bookings";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";

const BookingsPage = () => {
  const whitelabel = useWhitelabel();
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigation(ROUTES.bookings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/png" href={whitelabel.iconSrc} />
      </Helmet>
      <Bookings />
    </div>
  );
};

export default BookingsPage;
