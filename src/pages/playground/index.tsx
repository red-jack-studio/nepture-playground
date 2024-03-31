import React, { useState } from 'react';
import axios from 'axios';
import { NeptureAPI, NeptureEngineEndpoint } from '../../constants/settings';

/* Style Imports */
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

// Define the structure of a chat message
interface ChatMessage {
    subject: 'User' | 'AI';
    content: string;
}

const Chatbot: React.FC = () => {
    // Use the ChatMessage type for the state
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userResponse, setUserResponse] = useState<string>('');

    const sendMessage = async () => {
        const userMessage = userResponse.trim();
        if (!userMessage) return; // Prevent sending empty messages
    
        // Add user's message to chat
        setMessages(prev => [...prev, { subject: 'User', content: userMessage }]);
    
        try {
            const fullApiUrl = `${NeptureAPI}${NeptureEngineEndpoint}`;
            const response = await axios.post(fullApiUrl, { content: userMessage });
    
            // Correctly accessing the AI response text based on the provided response structure
            const aiTextResponse = response.data.choices[0].message.content;
    
            // Add AI's response to chat
            setMessages(prev => [...prev, { subject: 'AI', content: aiTextResponse }]);
        } catch (error) {
            console.error('Error sending message to API:', error);
            // Optionally, handle/display error messages in the UI
        }
    
        // Clear the input after sending
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
                        <b>{msg.subject}:</b> <FormattedResponse>{msg.content}</FormattedResponse>
                    </FormattedResponseContainer>
                ))}
                <TextInput
                    placeholder="Please input your inquiry here..."
                    value={userResponse}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserResponse(e.target.value)}
                    onKeyPress={(e: React.KeyboardEvent) => e.key === 'Enter' && sendMessage()}
                />
                <ButtonWrapper>
                    <Button onClick={sendMessage}>Start Chat</Button>
                </ButtonWrapper>
            </TextBox>
        </>
    );
};

export default Chatbot;
