import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  Message,
  ButtonGroup,
  PrimaryButton,
} from "./ForbiddenPage.styles";

const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>403 – Forbidden</Title>
      <Message>You do not have permission to view this page.</Message>

      <ButtonGroup>
        <PrimaryButton onClick={() => navigate("/login")}>
          Go to Login
        </PrimaryButton>
      </ButtonGroup>
    </Container>
  );
};

export default ForbiddenPage;
