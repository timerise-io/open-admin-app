import React, { PropsWithChildren } from "react";
import { ApolloWrapper } from "features/api/components/ApolloWrapper";
import { ThemeWrapper } from "features/theme/ThemeWrapper";
import { useFirebaseStreams } from "firebase-config/useFirebaseStreams";
import { PageSwitcher } from "pages/PageSwitcher";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import GlobalStyles from "styles/GlobalStyles";
import "./i18n";

const FirebaseSubs = () => {
  useFirebaseStreams();
  return null;
};

const AppWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <HelmetProvider>
      <RecoilRoot>
        <BrowserRouter>
          <ApolloWrapper>
            <ThemeWrapper>
              <GlobalStyles />
              <FirebaseSubs />
              <Helmet>
                <title>Admin App</title>
              </Helmet>
              {children}
            </ThemeWrapper>
          </ApolloWrapper>
        </BrowserRouter>
      </RecoilRoot>
    </HelmetProvider>
  );
};

function App() {
  return (
    <AppWrapper>
      <PageSwitcher />
    </AppWrapper>
  );
}

export default App;
