import React, { useState } from 'react';
import callApi from '../../utils/gptApiCall';
import {
    FormattedResponse,
    FormattedResponseContainer,
    TextBox,
    TextBoxHeader,
    TextInput,
} from '../../styles/chatBox';
import {
    Button,
    ButtonWrapper,
} from '../../styles';

// Define the type for chat messages
interface ChatMessage {
    subject: string;
    content: string;
}

const Chatbot = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]); // Specify the type for messages state
    const [userResponse, setUserResponse] = useState(''); // State to store user input

    // Function to start chat exchange
    const startExchange = async () => {
        // Append user's initial message to messages array
        setMessages(prevMessages => [...prevMessages, { subject: 'User', content: userResponse }]);
        
        // Call the ChatGPT API to get the response
        const response = await callApi(userResponse);

        // Append response to messages array
        setMessages(prevMessages => [...prevMessages, { subject: 'Chatbot', content: response }]);

        // Clear user response input
        setUserResponse('');
    };

    return (
        <>
            <TextBoxHeader>
                Simulation Box
            </TextBoxHeader>
            <TextBox>
                {messages.map((msg, index) => (
                    <FormattedResponseContainer key={index}>
                        <b>Subject {msg.subject}:</b> <FormattedResponse>{msg.content}</FormattedResponse>
                    </FormattedResponseContainer>
                ))}
                <TextInput
                    placeholder="Please input your inquiry here..."
                    value={userResponse}
                    onChange={e => setUserResponse(e.target.value)}
                />
                <ButtonWrapper>
                    <Button onClick={startExchange}>Start Chat</Button>
                </ButtonWrapper>
            </TextBox>
        </>
    );
};

export default Chatbot;
