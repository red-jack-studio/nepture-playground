import {
    FooterWrapper,
    FooterSection,
    FooterSectionTitle,
    FooterItem,
    ComponentWrapper,
    CopyrightWrapper,
} from '../styles/FooterStyles'

export function Footer() {
    return (
        <>
            <ComponentWrapper>
                <FooterWrapper>
                    <FooterSection>
                        <FooterSectionTitle>Nepture Playground</FooterSectionTitle>
                        <FooterItem href='https://github.com/znx-x/nepture-playground' target='_blank'>Github Repository</FooterItem>
                        <FooterItem href='https://github.com/znx-x/nepture-playground/blob/main/LICENSE' target='_blank'>Usage License</FooterItem>
                    </FooterSection>
                </FooterWrapper>
                <CopyrightWrapper>
                    Copyright © 2024 Paulo Baronceli & Luis Baronceli. Distributed under the GPL-3.0 lincense.
                </CopyrightWrapper>
            </ComponentWrapper>
        </>
    )
}

export default Footer