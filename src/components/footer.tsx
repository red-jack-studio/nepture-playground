import {
    FooterWrapper,
    FooterSection,
    FooterSectionTitle,
    FooterItem,
    ComponentWrapper,
    CopyrightWrapper,
} from '../styles/footer'

export function Footer() {
    return (
        <>
            <ComponentWrapper>
                <FooterWrapper>
                    <FooterSection>
                        <FooterSectionTitle>MindCrafter</FooterSectionTitle>
                        <FooterItem href='https://github.com/znx-x/MindCrafter/tree/main' target='_blank'>Github Repository</FooterItem>
                        <FooterItem href='https://github.com/znx-x/MindCrafter/blob/main/LICENSE' target='_blank'>Usage License</FooterItem>
                    </FooterSection>
                    <FooterSection>
                        <FooterSectionTitle>GPT API</FooterSectionTitle>
                        <FooterItem href='https://platform.openai.com/docs/overview' target='_blank'>Documentation</FooterItem>
                    </FooterSection>
                </FooterWrapper>
                <CopyrightWrapper>
                    Copyright © 2024 Paulo Baronceli & Luis Baronceli. Distributed under the MIT lincense.
                </CopyrightWrapper>
            </ComponentWrapper>
        </>
    )
}

export default Footer