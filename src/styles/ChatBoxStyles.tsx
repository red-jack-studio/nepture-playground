import styled, { keyframes } from "styled-components";
import {
  BorderColor,
  BorderRadius,
  BubbleBackgroundAi,
  BubbleBackgroundUser,
  DefaultTextFontSize,
  HeaderColor,
  PrimaryBackgroundColor,
  PrimaryColor,
  PrimaryFontColor,
  SecondaryBackgroundColor,
  SecondaryColor
} from ".";

type StyledProps = {
  subject: "User" | "AI";
};

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ChatBoxContentWrapper = styled.div`
  margin: 0;
  animation: ${fadeUp} 0.1s ease-out 0s;
`;

export const WelcomeImage = styled.img`
  width: 128px;
  height: 128px;
  margin: 10px;
`;

export const HeaderLogo = styled.img`
  width: 24px;
  height: 24px;
  margin: 0 10px -3px 10px;
`;

export const TextBox = styled.div`
  width: calc(100% - 3rem);
  max-width: 1150px;
  min-height: 2rem;
  height: 80vh;
  font-size: ${DefaultTextFontSize};
  color: ${PrimaryFontColor};
  margin: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border: 1px solid ${BorderColor};
  border-radius: ${BorderRadius};
  background: ${SecondaryBackgroundColor};
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  @media (max-width: 1024px) {
    height: 84vh;
  }
`;

export const TrainingDataBox = styled.div`
  width: calc(100% - 3rem);
  max-width: 1150px;
  min-height: 2rem;
  height: auto;
  font-size: ${DefaultTextFontSize};
  color: ${PrimaryFontColor};
  margin: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border: 1px solid ${BorderColor};
  border-radius: ${BorderRadius};
  background: ${PrimaryBackgroundColor};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

export const WelcomeTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.2rem;
`

export const StarterWrapper = styled.div`
  padding: 1.2rem;
  background: ${SecondaryBackgroundColor};
  border-radius: ${BorderRadius};
`

export const TextBoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 3rem);
  background: ${HeaderColor};
  border: 1px solid ${BorderColor};
  border-radius: ${BorderRadius} ${BorderRadius} 0 0;
  padding: 1.2rem 1rem;
  margin: auto;
  color: ${PrimaryFontColor};
  font-weight: normal;
  text-align: center;
  position: relative;

  /* Logo styles */
  ${HeaderLogo} {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const TextInput = styled.input`
  padding: 10px;
  font-size: 16px;
  color: ${PrimaryFontColor};
  border: 1px solid ${PrimaryColor};
  border-radius: ${BorderRadius};
  background: transparent;
  margin-bottom: 1rem;
  padding: 1rem;
`;

export const ResponseContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 40px;
  overflow-y: auto;
  padding: 0;
  scrollbar-width: thin;
  scrollbar-color: ${BorderColor} ${PrimaryBackgroundColor};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #e5274e;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #ff0000;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.025);
    border-radius: 6px;
  }
`;

export const FormattedResponseContainer = styled.div<StyledProps>`
  display: flex;
  justify-content: ${({ subject }) =>
    subject === "User" ? "flex-end" : "flex-start"};
  padding: 7px 0;
`;

export const FormattedResponse = styled.span`
  font-size: 1rem;
  font-weight: 400;
`;

export const MessageBubble = styled.div<StyledProps>`
  max-width: 90%;
  background-color: ${({ subject }) =>
    subject === "User" ? `${BubbleBackgroundUser}` : `${BubbleBackgroundAi}`};
  color: ${({ subject }) => (subject === "User" ? `${PrimaryFontColor}` : `${PrimaryFontColor}`)};
  padding: 1.2rem 1rem;
  border-radius: 18px;
  margin: 2px 0;
  ${({ subject }) =>
    subject === "User" ? "margin-right: 0;" : "margin-left: 0;"}
  word-wrap: break-word;
  text-align: left;
  animation: ${fadeUp} 0.3s ease-out 0s;
`;
