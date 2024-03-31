import React, { useState, useRef } from "react";
import axios from "axios";
import { NeptureAPI, NeptureEngineEndpoint } from "../../constants/settings";

/* Style Imports */
import {
  FormattedResponse,
  FormattedResponseContainer,
  TextBox,
  TextBoxHeader,
  TextInput
} from "../../styles/chatBox";
import { Button, ButtonWrapper } from "../../styles";
import styled from "styled-components";

interface ChatMessage {
  subject: "User" | "AI";
  content: string;
}

export const ChatButton = styled(Button).attrs({ as: 'button' })`
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Playground2: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userResponse, setUserResponse] = useState<string>("");
  const [trainingData, setTrainingData] = useState<string>("");
  const [isChatEnabled, setIsChatEnabled] = useState<boolean>(false);

  const chatInputRef = useRef<HTMLInputElement>(null); // Reference to the chat input

  const startChat = () => {
    if (!trainingData.trim()) return; // Ensure there's training data before enabling chat
    setIsChatEnabled(true);
    chatInputRef.current?.focus(); // Focus on the chat input
  };

  const sendMessage = async () => {
    const userMessage = userResponse.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { subject: "User", content: userMessage }]);

    try {
      const fullApiUrl = `${NeptureAPI}${NeptureEngineEndpoint}`;
      const response = await axios.post(fullApiUrl, { 
        content: userMessage, 
        trainingData // Including trainingData in the API request
      });

      const aiTextResponse = response.data.choices[0].message.content;
      setMessages((prev) => [...prev, { subject: "AI", content: aiTextResponse }]);
    } catch (error) {
      console.error("Error sending message to API:", error);
    }

    setUserResponse("");
  };

  return (
    <>
      <TextInput
        placeholder="Please insert your training data here..."
        value={trainingData}
        onChange={(e) => setTrainingData(e.target.value)}
        disabled={isChatEnabled} // Disable this input once chat starts
      />
      <ChatButton onClick={startChat} disabled={isChatEnabled}>Start Chat</ChatButton> {/* Button to enable chat */}

      <TextBoxHeader>Nepture Chat Box</TextBoxHeader>
      <TextBox>
        {messages.map((msg, index) => (
          <FormattedResponseContainer key={index}>
            <b>{msg.subject}:</b> <FormattedResponse>{msg.content}</FormattedResponse>
          </FormattedResponseContainer>
        ))}
        <TextInput
          ref={chatInputRef}
          placeholder="Please input your inquiry here..."
          value={userResponse}
          disabled={!isChatEnabled} // Only enable this input after start chat is clicked
          onChange={(e) => setUserResponse(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <ButtonWrapper>
          <ChatButton onClick={sendMessage} disabled={!isChatEnabled}>Send Message</ChatButton>
        </ButtonWrapper>
      </TextBox>
    </>
  );
};

export default Playground2;
