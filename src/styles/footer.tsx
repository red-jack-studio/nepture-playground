import styled from "styled-components";
import {
    BorderColor,
    DefaultTextFontSize,
} from './'

export const ComponentWrapper = styled.div`
    width: 100%;
    background: rgba(255, 255, 255, 0.015);
    border-top: 1px solid ${BorderColor};
    margin-top: 2rem;
    padding-bottom: 1rem;
`

export const FooterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem 0.5rem;
    min-height: 2rem;
    background: transparent;
`

export const CopyrightWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem 0.5rem;
    background: transparent;
    color: #666666;
`

export const FooterSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-items: start;
    padding: 1rem 3rem;
    align-items: start;
`

export const FooterSectionTitle = styled.h4`
    font-size: 1rem;
    font-weight: 500;
    color: #FFF;
`

export const FooterItem = styled.a`
    font-size: ${DefaultTextFontSize};
    color: rgba(150, 150, 150, 1);
    text-decoration: none;
    &:hover {
        color: rgba(255, 255, 255, 1);
    }
`