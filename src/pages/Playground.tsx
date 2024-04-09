import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  NeptureAPI,
  NeptureEngineEndpoint,
  ContextFactor
} from "../constants/settings";
import { CornerDownLeft } from "react-feather";
import textFormatter from "../utils/useTextFormatter";
import NeptureLogo from "../assets/images/nepture-64.png";
import WelcomeImg from "../assets/images/nepture-1000.png";

/* Style Imports */
import {
  ChatBoxContentWrapper,
  ResponseContainer,
  FormattedResponse,
  FormattedResponseContainer,
  TextBox,
  TextBoxHeader,
  TextInput,
  TrainingDataBox,
  HeaderLogo,
  MessageBubble,
  WelcomeImage,
  StarterWrapper,
  WelcomeTextWrapper
} from "../styles/ChatBoxStyles";
import {
  PrimaryButton,
  ButtonWrapper,
  LineBreak,
  Spacer1Rem,
  Spinner,
  Spacer05Rem,
  RedCircle,
  Link
} from "../styles";
import {
  ProcessingJsxWrapper,
  TextArea,
  UploadFileTextWrapper
} from "../styles/PlaygroundStyles";

interface ChatMessage {
  subject: "User" | "AI";
  content: string;
}

const isMobileOrTablet = () => window.innerWidth <= 1024;

const Playground: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userResponse, setUserResponse] = useState<string>("");
  const [trainingData, setTrainingData] = useState<string>("{}");
  const [isChatEnabled, setIsChatEnabled] = useState<boolean>(false);
  const [isAwaitingResponse, setIsAwaitingResponse] = useState<boolean>(false);
  const [uploadButtonLabel, setUploadButtonLabel] =
    useState<string>("Load File...");

  const autoResizeTextareaRef = useRef<HTMLTextAreaElement>(null);
  const responseContainerRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const textarea = autoResizeTextareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height to recalculate
      const maxHeight = 80; // Adjust based on the line height and maximum lines
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    }
  }, [userResponse]);

  useEffect(() => {
    // Automatically scroll to the bottom of the response container when messages change
    const scroll = responseContainerRef.current;
    if (scroll) {
      scroll.scrollTop = scroll.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Ensure focus is reset to chat input after each new message ONLY for desktops
    if (isChatEnabled && !isMobileOrTablet()) {
      chatInputRef.current?.focus();
    }
  }, [messages, isChatEnabled]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result?.toString() || "{}";
          const jsonData = JSON.parse(text); // Validate JSON
          setTrainingData(JSON.stringify(jsonData)); // Store it as a string
          setUploadButtonLabel(file.name);
        } catch (error) {
          console.log("Invalid JSON file.");
          setTrainingData("{}"); // Ensure this is a string representation of an empty object
          setUploadButtonLabel("Invalid JSON, try a different file.");
        }
      };
      reader.readAsText(file);
    } else {
      console.log("No file selected or the file is not a JSON.");
      setTrainingData("{}");
      setUploadButtonLabel("Load File..."); // Reset label if no or invalid file selected
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const startChat = () => {
    setIsChatEnabled(true);
    setTimeout(() => chatInputRef.current?.focus(), 0); // Ensure focus after state update
  };

  const sendMessage = async () => {
    if (!userResponse.trim()) return;
    setIsAwaitingResponse(true); // Start loading state

    const userMessage = userResponse.trim();

    // Calculate the start index for slicing the messages array based on ContextFactor
    const startIndex = Math.max(messages.length - parseInt(ContextFactor), 0);
    // Extract the last 'ContextFactor' number of messages for context
    const contextMessages = messages.slice(startIndex).map((message) => ({
      role: message.subject.toLowerCase(),
      content: message.content
    }));

    setMessages((prev) => [...prev, { subject: "User", content: userMessage }]);
    setUserResponse(""); // Clear the input immediately

    try {
      const payload = {
        content: userMessage,
        trainingData: trainingData.trim(),
        // Include contextMessages in the request
        context: contextMessages
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
          <TextBoxHeader>Nepture AI</TextBoxHeader>
          <TrainingDataBox>
            <WelcomeTextWrapper>
              <WelcomeImage src={WelcomeImg} />
              <h1>Welcome to Nepture AI Playground</h1>
              <p style={{ marginTop: '-10px' }}>
                This application is an early implementation of Arcadia, Nepture AI's LMM engine.
              </p>
            </WelcomeTextWrapper>
            <StarterWrapper>
              <UploadFileTextWrapper>
                You can select a custom Training Data File (.json) or just click
                on <b>Start Chat</b> to use the standard AI dataset.
              </UploadFileTextWrapper>
              <TextInput
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept=".json"
              />
              <PrimaryButton onClick={triggerFileInput}>
                {uploadButtonLabel}
              </PrimaryButton>
              <Spacer05Rem />
              <PrimaryButton onClick={startChat} disabled={isChatEnabled}>
                <b>Start Chat</b>
              </PrimaryButton>
            </StarterWrapper>
          </TrainingDataBox>
        </ChatBoxContentWrapper>
      )}

      {/*
        After capturing the custom "training data" (if any) we now render the
        actual chat box. Here the user will interact with the AI.
       */}
      {isChatEnabled && (
        <ChatBoxContentWrapper>
          <TextBoxHeader>
            <Link href="https://neptureai.com" target="_blank">
              <HeaderLogo src={NeptureLogo} alt="Nepture Logo" />
            </Link>
            <span>Nepture AI</span>
            <Link href="/" target="_self">
              <RedCircle />
            </Link>
          </TextBoxHeader>
          <TextBox>
            <ResponseContainer ref={responseContainerRef}>
              {messages.map((msg, index) => (
                <FormattedResponseContainer key={index} subject={msg.subject}>
                  <MessageBubble subject={msg.subject}>
                    <FormattedResponse>
                      {textFormatter(msg.content)}
                    </FormattedResponse>
                  </MessageBubble>
                </FormattedResponseContainer>
              ))}
            </ResponseContainer>
            <Spacer1Rem />
            <TextArea
              ref={chatInputRef}
              placeholder="Type your message..."
              value={userResponse}
              onChange={(e) => {
                setUserResponse(e.target.value);
              }}
              onKeyDown={(e) => {
                // Check for Enter without Shift
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // Prevent the default action (newline) only for Enter alone
                  if (!isAwaitingResponse && userResponse.trim().length > 0) {
                    sendMessage();
                  }
                }
              }}
              disabled={isAwaitingResponse}
            />
            <ButtonWrapper>
              <PrimaryButton
                onClick={sendMessage}
                disabled={
                  isAwaitingResponse || userResponse.trim().length === 0
                }
              >
                {isAwaitingResponse ? (
                  <ProcessingJsxWrapper>
                    <Spinner />
                  </ProcessingJsxWrapper>
                ) : (
                  <ProcessingJsxWrapper>
                    Send{" "}
                    <CornerDownLeft
                      size={16}
                      style={{ marginBottom: "-2px", marginLeft: "5px" }}
                    />
                  </ProcessingJsxWrapper>
                )}{" "}
              </PrimaryButton>
            </ButtonWrapper>
          </TextBox>
        </ChatBoxContentWrapper>
      )}
    </>
  );
};

export default Playground;
