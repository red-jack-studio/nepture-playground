import React, { useState } from 'react';
import useNeptureApi from '../../utils/useNeptureApi';

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

interface ChatMessage {
    subject: string;
    content: string;
}

const Chatbot = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userResponse, setUserResponse] = useState('');

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
                    <Button>Start Chat</Button>
                </ButtonWrapper>
            </TextBox>
        </>
    );
};

export default Chatbot;
