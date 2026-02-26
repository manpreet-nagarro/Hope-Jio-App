import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  margin-top: 80px;
`;

export const Title = styled.h1`
  font-size: 32px;
  color: #faad14;
  margin-bottom: 10px;
`;

export const Message = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 30px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export const PrimaryButton = styled.button`
  padding: 10px 18px;
  background-color: #1677ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0d6ae6;
  }
`;

