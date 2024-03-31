import styled from "styled-components";
import {
    BorderColor,
    BorderRadius,
    DefaultTextFontSize,
    PrimaryColor,
    PrimaryFontColor,
    SecondaryColor,
} from './';

export const ChatBoxContentWrapper = styled.div`
    margin: 1rem 0;
`

export const TextBox = styled.div`
    width: calc(100% - 3rem);
    max-width: 1150px;
    min-height: 2rem;
    height: 70vh;
    font-size: ${DefaultTextFontSize};
    color: ${PrimaryFontColor};
    margin: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border: 1px solid ${BorderColor};
    border-radius: ${BorderRadius};
    background: rgba(255, 255, 255, 0.1);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
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
    background: rgba(255, 255, 255, 0.1);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
`;

export const TextBoxHeader = styled.div`
    width: calc(100% - 3rem); 
    background: ${PrimaryColor};
    border: 1px solid transparent;
    border-radius: 16px 16px 0 0;
    padding: 1rem;
    margin: auto; /* Center horizontally */
    color: #fff;
    font-weight: bold;
    text-align: center; /* Center align text */
`;

export const TextInput = styled.input`
    padding: 10px;
    font-size: 16px;
    color: ${PrimaryFontColor};
    border: 1px solid ${PrimaryColor};
    border-radius: 16px;
    background: transparent;
    margin-bottom: 1rem;
    padding: 1rem;
`;

export const ResponseContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: bottom;
    flex-grow: 1;
    min-height: 40px;
    overflow-y: auto;
    padding: 1rem;
    scrollbar-width: thin;
    scrollbar-color: ${PrimaryColor} rgba(255, 255, 255, 0.025);
    
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

export const FormattedResponseContainer = styled.div`
    margin: 0.75rem 0;
    text-align: left;
`;

export const FormattedResponse = styled.span`
    font-size: 1rem;
    font-weight: 400;
`;

export const FormattedAuthorHeader = styled.span`
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    color: ${SecondaryColor};
`

export const Button = styled.button`
    /* Your button styles here */
`;

export const ButtonWrapper = styled.div`
    /* Your button wrapper styles here */
`;
