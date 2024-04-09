import styled, { keyframes } from "styled-components";
import AppBackgorundImage from "../assets/images/app-background.jpg";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

/* Exports all default colors to be used across the application. */

export const BorderRadius = `10px`;
export const AppBackgroundColor = `#1E1E1E;`;
export const HeaderColor = `#393939`;
export const BorderColor = `rgba(43, 41, 45, 1)`;
export const DefaultTextFontSize = `0.9rem`;
export const PrimaryColor = `rgba(35, 33, 38, 0.95)`;
export const PrimaryColorDimmed = `rgba(255, 255, 255, 0.01)`;
export const PrimaryBackgroundColor = `rgba(35, 35, 40, 0.95)`;
export const PrimaryFontColor = `rgba(230, 230, 250, 1)`;
export const SecondaryColor = `rgba(255, 255, 255, 0.2)`;
export const SecondaryColorDimmed = `rgba(255, 255, 255, 0.15)`;
export const SecondaryBackgroundColor = `rgba(30, 31, 35, 0.95)`;
export const AccentColor = `rgba(0, 101, 255, 0.95)`;
export const AccentColorPressed = `rgba(0, 87, 207, 0.95)`;

export const DarkGreyColor = `#111`;
export const RedColor = `#FE5F56`;
export const RedColorPressed = `#D74039`;

export const BubbleBackgroundUser = `#0B7EF5`;
export const BubbleBackgroundAi = `#292929`;

/* Exports all major wrappers. */

export const AppWrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  padding: 0;
  background: url(${AppBackgorundImage}) no-repeat center center fixed;
  background-size: cover;
  overflow-x: hidden;
  position: relative;
  z-index: 1;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: -1;
  }
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1150px;
  margin: auto;
  padding: auto;
  width: 100vw;
`;

/* Text and Links. */

export const Link = styled.a`
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

/* General styled components to be exported and used in the application. */

export const ButtonWrapper = styled.a`
  text-decoration: none;
  cursor: pointer;
  margin: 0;
`;

export const Button = styled.div`
  width: 100%;
  margin: auto;
  padding: 1rem 2rem;
  font-size: 0.9rem;
  color: ${PrimaryFontColor};
  background: ${AccentColor};
  border-radius: ${BorderRadius};
  border: 1px solid ${BorderColor};
  &:hover {
    background: ${AccentColorPressed};
  }
`;

export const PrimaryButton = styled(Button).attrs({ as: "button" })`
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const LineBreak = styled.br`
  margin: auto;
`;

export const Spacer05Rem = styled.div`
  margin: 0.5rem 0;
`;

export const Spacer1Rem = styled.div`
  margin: 1rem 0;
`;

export const Spinner = styled.div`
  border: 4px solid ${AccentColorPressed};
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border-left-color: ${PrimaryFontColor};
  animation: ${spin} 1s linear infinite;
`;

export const RedCircle = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${RedColor};
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  &:hover {
    background-color: ${RedColorPressed};
  }
`;
