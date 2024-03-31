import styled from "styled-components";
import {
    BorderColor,
    BorderRadius,
} from ".";

export const ParametersWrapper = styled.div`
    margin: auto;
    width: 100%;
`

export const TextInput = styled.input`
    min-width: 50%;
    margin: 0.5rem auto;
    padding: 10px;
    border: 1px solid ${BorderColor};
    border-radius: ${BorderRadius};
    background: transparent;
    color: #fff;
`

export const TextInputTitle = styled.div`
    color: #666;
    margin: 0.3rem 0
`