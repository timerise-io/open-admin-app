import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { MainNavigation } from "components/MainNavigation";
import { SubNavigation } from "components/SubNavigation";
import { MainColumnLayoutWrapper, MainContent, MainLayoutWrapper } from "components/layout/MainLayout";
import { AuthorizedContent } from "features/auth/components/AuthorizedContent";
import { ExpirationTopBar } from "features/auth/components/ExpirationTopBar/ExpirationTopBar";
import { DemoAccountBar } from "features/billing/components/DemoAccountBar/DemoAccountBar";
import { topBarAtom } from "features/billing/state/topBarAtom";
import NavigationWrapper from "features/project/components/ProjectNavigation/NavigationWrapper/NavigationWrapper";
import { useRecoilValue } from "recoil";

const MainPageContent: React.FC<PropsWithChildren> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperOffsetTop, setWrapperOffsetTop] = useState(0);
  const topBarLoaded = useRecoilValue(topBarAtom);

  const getWrapperPosition = () => {
    const offsetTop = wrapperRef.current?.getBoundingClientRect().top;
    setWrapperOffsetTop(offsetTop ? offsetTop : 0);
  };

  useEffect(() => {
    getWrapperPosition();
    window.addEventListener("resize", getWrapperPosition);
  }, []);

  useEffect(() => {
    getWrapperPosition();
  }, [topBarLoaded]);

  return (
    <MainLayoutWrapper>
      <DemoAccountBar />
      <ExpirationTopBar />
      <MainColumnLayoutWrapper wrapperOffsetTop={wrapperOffsetTop} ref={wrapperRef}>
        <AuthorizedContent>
          <NavigationWrapper />
          <MainNavigation />
          <SubNavigation />
        </AuthorizedContent>
        <MainContent>{children}</MainContent>
      </MainColumnLayoutWrapper>
    </MainLayoutWrapper>
  );
};

export default MainPageContent;
