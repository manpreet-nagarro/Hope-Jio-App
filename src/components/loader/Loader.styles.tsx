import styled from "styled-components";

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InlineLoaderWrapper = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(255,255,255,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  border-radius: 12px;
`;
