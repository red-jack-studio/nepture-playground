import styled from 'styled-components'

/* default styling parameters */

export const BorderRadius = `16px`;
export const BorderColor = `rgba(255, 255, 255, 0.1)`;
export const DefaultTextFontSize = `0.9rem`;
export const PrimaryColor = `rgba(255, 255, 255, 0.15)`;
export const PrimaryColorDimmed = `rgba(255, 255, 255, 0.1)`;
export const PrimaryFontColor = `rgba(255, 255, 255, 1)`;
export const SecondaryColor = `rgba(255, 255, 255, 0.2)`;
export const SecondaryColorDimmed = `rgba(255, 255, 255, 0.15)`;

/* wrappers */

export const AppWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    text-align: center;
    margin: 0 auto;
    padding: 0;
    background: rgba(22, 22, 22, 1);
    overflow-x: hidden;
`

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1320px;
    margin: auto;
    padding: auto;
`

// General Styles

export const ButtonWrapper = styled.a`
    text-decoration: none;
    cursor: pointer;
    margin: 2rem 1rem;
`

export const Button = styled.div`
    max-width: 320px;
    margin: auto;
    padding: 1rem 2rem;
    color: ${PrimaryFontColor};
    background: ${PrimaryColor};
    border-radius: ${BorderRadius};
    border: 1px solid ${BorderColor};
    &:hover {
        background: ${PrimaryColorDimmed};
    }
`