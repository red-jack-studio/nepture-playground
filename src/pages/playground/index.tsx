import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { NeptureAPI, NeptureEngineEndpoint } from "../../constants/settings";
import { CornerDownLeft } from "react-feather";

/* Style Imports */
import {
  ChatBoxContentWrapper,
  FormattedAuthorHeader,
  FormattedResponse,
  FormattedResponseContainer,
  TextBox,
  TextBoxHeader,
  TextInput,
  TrainingDataBox
} from "../../styles/chatBox";
import { PrimaryButton, ButtonWrapper, LineBreak, Spacer1Rem } from "../../styles";

interface ChatMessage {
  subject: "User" | "AI";
  content: string;
}

const Playground: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userResponse, setUserResponse] = useState<string>("");
  const [trainingData, setTrainingData] = useState<string>("");
  const [isChatEnabled, setIsChatEnabled] = useState<boolean>(false);
  const [isAwaitingResponse, setIsAwaitingResponse] = useState<boolean>(false);

  const chatInputRef = useRef<HTMLInputElement>(null);

  // Ensure focus is reset to chat input after each new message
  useEffect(() => {
    if (isChatEnabled) {
      chatInputRef.current?.focus();
    }
  }, [messages, isChatEnabled]);

  const startChat = () => {
    setIsChatEnabled(true);
    setTimeout(() => chatInputRef.current?.focus(), 0); // Ensure focus after state update
  };

  const sendMessage = async () => {
    if (!userResponse.trim()) return;
    setIsAwaitingResponse(true); // Start loading state

    const userMessage = userResponse.trim();
    setMessages((prev) => [...prev, { subject: "User", content: userMessage }]);
    setUserResponse(""); // Clear the input immediately

    try {
      const payload = {
        content: userMessage,
        trainingData: trainingData.trim()
      };
      const fullApiUrl = `${NeptureAPI}${NeptureEngineEndpoint}`;
      const response = await axios.post(fullApiUrl, payload);

      const aiTextResponse = response.data.choices[0].message.content;
      setMessages((prev) => [
        ...prev,
        { subject: "AI", content: aiTextResponse }
      ]);
    } catch (error) {
      console.error("Error sending message to API:", error);
    } finally {
      setIsAwaitingResponse(false); // End loading state
    }
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
              onKeyPress={(e) => e.key === "Enter" && startChat()}
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
                <FormattedAuthorHeader>{msg.subject}:</FormattedAuthorHeader><LineBreak />
                <FormattedResponse>{msg.content}</FormattedResponse>
              </FormattedResponseContainer>
            ))}
            <Spacer1Rem />
            <TextInput
              ref={chatInputRef}
              placeholder="Type your message..."
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && !isAwaitingResponse && sendMessage()
              }
              disabled={isAwaitingResponse}
            />
            <ButtonWrapper>
              <PrimaryButton
                onClick={sendMessage}
                disabled={
                  isAwaitingResponse || userResponse.trim().length === 0
                }
              >
                {isAwaitingResponse ? "Awaiting response..." : "Send"}{" "}
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
