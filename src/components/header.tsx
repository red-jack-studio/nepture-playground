import {
    HeaderWrapper,
    HeaderItem,
} from '../styles/HeaderStyles'

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