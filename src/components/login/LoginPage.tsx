import { login } from "@store/authSlice/authThunks";
import type { AppDispatch } from "@store/store";
import { useDispatch } from "react-redux";
import {
  BoxContainer,
  Button,
  Card,
  Highlight,
  LoginContainer,
  Logo,
  Message,
  PageWrapper,
  Title,
} from "./LoginPage.styles";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <LoginContainer>
      <PageWrapper>
        <Card>
          <Logo />
          <Title>
            Welcome to <Highlight>Sales Planning System</Highlight>
          </Title>
          <BoxContainer>
            <Message>
              Sales planning system helps to manage & launch the sales campaigns
              effortlessly.
            </Message>
            <Button onClick={() => dispatch(login())}>Login with SSO</Button>
          </BoxContainer>
        </Card>
      </PageWrapper>
    </LoginContainer>
  );
};

export default LoginPage;
