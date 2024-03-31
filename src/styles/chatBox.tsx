import styled from "styled-components"
import {
    BorderColor,
    BorderRadius,
    DefaultTextFontSize,
    PrimaryColor,
    PrimaryFontColor,
} from './'

export const TextBox = styled.div`
    width: calc(100% - 3rem);
    min-height: 2rem;
    font-size: ${DefaultTextFontSize};
    color: ${PrimaryFontColor};
    margin: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border: 1px solid ${BorderColor};
    border-radius: ${BorderRadius};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.025);
    @media (max-width: 769px) {
        width: 90%;
    }
`

export const TextBoxHeader = styled.div`
  width: 100%;
  background: ${PrimaryColor};
  border-radius: 16px 16px 0px 0px;
  padding: 1rem;
  margin: -1rem -1rem 1rem -1rem;
  color: #fff;
  font-weight: bold;
`

export const ResponseContainer = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  padding: 1rem;
  scrollbar-width: thin;
  scrollbar-color: #e5274e rgba(255, 255, 255, 0.025);

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
`

export const FormattedResponseContainer = styled.div`
  margin-bottom: 1rem;
  padding-top: 1rem;
  text-align: left;
  border-top: 1px solid ${BorderColor};
`

export const FormattedResponse = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
`