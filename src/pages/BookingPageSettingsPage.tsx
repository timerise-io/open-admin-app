import React from "react";
import { BookingPageSettings } from "features/project/components/settings/BookingPageSettings";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { Helmet } from "react-helmet-async";

const BookingPageSettingsPage = () => {
  const whitelabel = useWhitelabel();
  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/png" href={whitelabel.iconSrc} />
      </Helmet>
      <BookingPageSettings />
    </div>
  );
};

export default BookingPageSettingsPage;
