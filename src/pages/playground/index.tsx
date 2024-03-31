import React, { useState, useRef } from 'react'
import callApi from '../../utils/gptApiCall'
import {
    Subject1Engine,
    Subject1ApiEndpoint,
    Subject2Engine,
    Subject2ApiEndpoint,
} from '../../constants/settings'
import {
    ParametersWrapper,
    TextInput, TextInputTitle,
} from '../../styles/simulationRoom'
import {
    FormattedResponse,
    FormattedResponseContainer,
    TextBox,
    TextBoxHeader,
} from '../../styles/chatBox'
import {
    Button,
    ButtonWrapper,
} from '../../styles'

interface Message {
    subject: number
    content: string
}

export function Playground() {
    const [subject1Params, setSubject1Params] = useState<string>('')
    const [subject2Params, setSubject2Params] = useState<string>('')
    const [initialMessage, setInitialMessage] = useState<string>('')
    const [promptCount, setPromptCount] = useState<number>(parseInt(process.env.REACT_APP_EXCHANGE_LIMIT || '20'))
    const [messages, setMessages] = useState<Message[]>([])
    const currentSubject = useRef<number>(2)
    const messageCount = useRef<number>(0)

    const apiKeySubject1 = process.env.REACT_APP_API_KEY_SUBJECT1 || ''
    const apiKeySubject2 = process.env.REACT_APP_API_KEY_SUBJECT2 || ''
    const maxMessageCount = parseInt(process.env.REACT_APP_EXCHANGE_LIMIT || '20')

    async function handleExchange(apiMessage: string) {
        if (messageCount.current >= promptCount) return

        const isSubject1 = currentSubject.current === 1
        const engine = isSubject1 ? Subject1Engine : Subject2Engine
        const parameters = isSubject1 ? subject1Params : subject2Params
        const endpoint = isSubject1 ? Subject1ApiEndpoint : Subject2ApiEndpoint
        const apiKey = isSubject1 ? apiKeySubject1 : apiKeySubject2

        try {
            const rawResponse = await callApi({
                apiEngine: engine,
                apiParameters: parameters,
                apiMessage: apiMessage,
                apiKey: apiKey,
                apiEndpoint: endpoint,
            });
            const response = JSON.parse(rawResponse)
            const content = response.choices[0].message.content

            console.log('Full API Response:', rawResponse)

            setMessages(oldMessages => [...oldMessages, { subject: currentSubject.current, content }])
            currentSubject.current = isSubject1 ? 2 : 1
            messageCount.current += 1

            handleExchange(content)
        } catch (error) {
            console.error('API Call Failed:', error)
        }
    }

    function startExchange() {
        if (messages.length === 0 && promptCount >= 2 && promptCount <= maxMessageCount) {
            messageCount.current = 0
            handleExchange(initialMessage)
        }
    }

    return (
        <>
            <ParametersWrapper>
                <TextInputTitle>Define Parameters for S1:</TextInputTitle>
                <TextInput placeholder="AI 1 Parameters..." value={subject1Params} onChange={e => setSubject1Params(e.target.value)} />
                <TextInputTitle>Define Parameters for S2</TextInputTitle>
                <TextInput placeholder="AI 2 Parameters..." value={subject2Params} onChange={e => setSubject2Params(e.target.value)} />
                <TextInputTitle>Define Trigger Message for S2</TextInputTitle>
                <TextInput placeholder="Trigger Message..." value={initialMessage} onChange={e => setInitialMessage(e.target.value)} />
                <TextInputTitle>Define Number of Prompts for Simulation</TextInputTitle>
                <TextInput type="number" value={promptCount} onChange={e => setPromptCount(Math.max(2, Math.min(maxMessageCount, parseInt(e.target.value) || 0)))} />
            </ParametersWrapper>
            <ButtonWrapper>
                <Button onClick={startExchange}>Start Simulation</Button>
            </ButtonWrapper>
            <TextBox>
                <TextBoxHeader>
                    Simulation Box
                </TextBoxHeader>
                {messages.map((msg, index) => (
                    <>
                        <FormattedResponseContainer key={index}>
                            <b>Subject {msg.subject}:</b> <FormattedResponse>{msg.content}</FormattedResponse>
                        </FormattedResponseContainer>
                    </>
                ))}
            </TextBox>
        </>
    );
}

export default Playground;
