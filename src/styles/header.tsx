import styled from "styled-components";
import {
    BorderRadius,
    BorderColor,
    DefaultTextFontSize,
} from './'

export const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem 0;
    padding-left: ${BorderRadius};
    padding-right: ${BorderRadius};
    min-height: 2rem;
    border-radius: ${BorderRadius};
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid ${BorderColor};
`

export const HeaderItem = styled.a`
    padding: 20px 10px;
    text-align: center;
    text-decoration: none;
    color: #FFF;
    font-size: ${DefaultTextFontSize};
    &:hover {
        background: rgba(255, 255, 255, 0.15);
    }
`
