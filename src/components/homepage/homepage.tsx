import Header from "@components/header/header";
import Sidebar from "@components/sidebar/sidebar";

import { LayoutContainer, ContentWrapper } from "./homepage.styles";
import { Outlet } from "react-router-dom";
import Toast from "@components/Toast/Toast";
import CreativeWorkflow from "@components/creativeWorkflow/creativeWorkflow";

const HomePage = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <ContentWrapper>
        <Header />
        <CreativeWorkflow />
      </ContentWrapper>
      <Toast />
    </LayoutContainer>
  );
};

export default HomePage;
