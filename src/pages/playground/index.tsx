import React, { useState, useRef } from "react";
import axios from "axios";
import { NeptureAPI, NeptureEngineEndpoint } from "../../constants/settings";
import { CornerDownLeft } from "react-feather";

/* Style Imports */
import {
  ChatBoxContentWrapper,
  FormattedResponse,
  FormattedResponseContainer,
  TextBox,
  TextBoxHeader,
  TextInput,
  TrainingDataBox
} from "../../styles/chatBox";
import { PrimaryButton, ButtonWrapper } from "../../styles";

interface ChatMessage {
  subject: "User" | "AI";
  content: string;
}

const Playground: React.FC = () => {
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
      // Constructing the payload with trainingData
      const payload = {
        content: userMessage,
        trainingData: trainingData.trim() // Ensure trainingData is trimmed
      };

      const response = await axios.post(fullApiUrl, payload);

      // Extract the AI response from the choices array
      const aiTextResponse = response.data.choices[0].message.content;

      setMessages((prev) => [
        ...prev,
        { subject: "AI", content: aiTextResponse }
      ]);
    } catch (error) {
      console.error("Error sending message to API:", error);
    }

    // Clear the input after sending
    setUserResponse("");
  };

  return (
    <>
      {/*
        In this section we use conditional rendering to first give the user the
        option to insert additional custom training information into the prompt,
        and then redirects it to the actual chat box. If the user leaves the
        custom "training data" field blank, the chat will run with the standard
        dataset used by the AI engine in use.
        */}
      {!isChatEnabled && (
        <ChatBoxContentWrapper>
          <TextBoxHeader>Custom Training Information</TextBoxHeader>
          <TrainingDataBox>
            <TextInput
              placeholder="Please insert your training data here..."
              value={trainingData}
              onChange={(e) => setTrainingData(e.target.value)}
              disabled={isChatEnabled}
            />
            <PrimaryButton onClick={startChat} disabled={isChatEnabled}>
              Start Chat
            </PrimaryButton>{" "}
          </TrainingDataBox>
        </ChatBoxContentWrapper>
      )}

      {/*
        After capturing the custom "training data" (if any) we now render the
        actual chat box. Here the user will interact with the AI.
       */}
      {isChatEnabled && (
        <ChatBoxContentWrapper>
          <TextBoxHeader>Nepture Chat Box</TextBoxHeader>
          <TextBox>
            {messages.map((msg, index) => (
              <FormattedResponseContainer key={index}>
                <b>{msg.subject}:</b>{" "}
                <FormattedResponse>{msg.content}</FormattedResponse>
              </FormattedResponseContainer>
            ))}
            <TextInput
              ref={chatInputRef}
              placeholder="Type your message..."
              value={userResponse}
              disabled={!isChatEnabled}
              onChange={(e) => setUserResponse(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <ButtonWrapper>
              <PrimaryButton onClick={sendMessage} disabled={!isChatEnabled}>
                Send{" "}
                <CornerDownLeft size={16} style={{ marginBottom: "-4px" }} />
              </PrimaryButton>
            </ButtonWrapper>
          </TextBox>
        </ChatBoxContentWrapper>
      )}
    </>
  );
};

export default Playground;
