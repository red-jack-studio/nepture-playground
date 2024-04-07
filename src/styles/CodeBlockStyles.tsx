import styled from "styled-components";
import {
    BorderRadius,
    DarkGreyColor,
    HeaderColor,
    PrimaryColorDimmed,
    PrimaryFontColor,
    SecondaryColor
} from ".";

export const CodeBlockWrapper = styled.div`
    margin: 1rem 0;
    padding: 0;
    border-radius: ${BorderRadius};
    background: ${DarkGreyColor};
`

export const CodeBlockHeader = styled.div`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    alignItems: center;
    background: ${PrimaryColorDimmed};
    border-radius: ${BorderRadius} ${BorderRadius} 0 0;
`

export const CodeBlockTitle = styled.span`
    margin: 0;
`

export const CopyToClipboardButton = styled.button`
    border: none;
    color: ${PrimaryFontColor};
    cursor: pointer;
    font-size: 8pt;
    background: transparent;
`

export const ProcessedCodeWrapper = styled.div`
    background: ${DarkGreyColor};
    border-radius: 0 0 ${BorderRadius} ${BorderRadius};
    padding: 1rem;
    white-space: pre-wrap;
`

export const ProcessedCode = styled.code`
    color: ${PrimaryFontColor};
    padding: 1rem;
    margin: 0;
    display: block;
    text-align: left;
`

