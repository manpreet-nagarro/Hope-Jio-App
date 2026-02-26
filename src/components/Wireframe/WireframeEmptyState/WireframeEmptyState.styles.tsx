import styled from "styled-components";

export const Container = styled.div`
  min-height: 70vh;
  width: 100%;
  background: #fafbff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Illustration = styled.img`
  width: 320px;
  max-width: 100%;
  margin-bottom: 24px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  margin: 0;
  font-style: bold;
  height: 23px;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: #595959;
  margin: 6px 0 32px;
  font-style: medium;
  line-height: 21px;
  font-weight: 500;
  height: 21px;
  padding-top: 10px;
`;

export const ActionsRow = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }

  button {
    text-transform: capitalize;
    border-radius: 1000px;
    height: 56px;
    width: 213px;
    padding: 16px 24px;
    background-color: #3535F3;
    color: #FFFFFF;
    gap: 8px;
  }
`;