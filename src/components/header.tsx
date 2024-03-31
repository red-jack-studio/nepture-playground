import {
    HeaderWrapper,
    HeaderItem,
} from '../styles/header'

export function Header() {
    return (
        <>
            <HeaderWrapper>
                <HeaderItem href='/' target='_self'>
                    Nepture Playground
                </HeaderItem>
            </HeaderWrapper>
        </>
    )
}

export default Header