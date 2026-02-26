import Header from "@components/header/header";
import Sidebar from "@components/sidebar/sidebar";

import { LayoutContainer, ContentWrapper } from "./homepage.styles";
import { Outlet } from "react-router-dom";
import Toast from "@components/Toast/Toast";

const HomePage = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <ContentWrapper>
        <Header />
        <Outlet />
      </ContentWrapper>
      <Toast />
    </LayoutContainer>
  );
};

export default HomePage;
