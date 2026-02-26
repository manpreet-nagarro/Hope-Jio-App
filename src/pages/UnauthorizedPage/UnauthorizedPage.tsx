import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  Message,
  ButtonGroup,
  PrimaryButton,
} from "./UnauthorizedPage.styles";

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>401 – Unauthorized</Title>
      <Message>You must log in to access this page.</Message>

      <ButtonGroup>
        <PrimaryButton onClick={() => navigate("/login")}>
          Go to Login
        </PrimaryButton>
      </ButtonGroup>
    </Container>
  );
};

export default UnauthorizedPage;
