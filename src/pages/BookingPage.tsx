import React from "react";
import { Booking } from "features/bookings/components/Booking/Booking";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { Helmet } from "react-helmet-async";

const BookingPage = () => {
  const whitelabel = useWhitelabel();
  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/png" href={whitelabel.iconSrc} />
      </Helmet>
      <Booking />
    </div>
  );
};

export default BookingPage;
