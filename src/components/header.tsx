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
                <HeaderItem href='/p2' target='_self'>
                    Nepture Playground II
                </HeaderItem>
            </HeaderWrapper>
        </>
    )
}

export default Header