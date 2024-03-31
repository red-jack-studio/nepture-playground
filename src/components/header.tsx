import {
    HeaderWrapper,
    HeaderItem,
} from '../styles/header'

export function Header() {
    return (
        <>
            <HeaderWrapper>
                <HeaderItem href='/' target='_self'>
                    AI Simulation Room
                </HeaderItem>
            </HeaderWrapper>
        </>
    )
}

export default Header