import type React from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

const NavStyled = styled.nav`
    width: 100%;
    text-align: center;
    position: fixed;
    top: -1px;
    padding: 2rem 0 0.3rem;
    font-weight: 500;
    position: relative;
`

const BackStyled = styled.p`
    cursor: pointer;
    padding: 0 0.4rem 0.4rem;
    position: absolute;
    left: 3%;

    & svg {
        color: white;
        width: 1.3rem;
        height: 1.3rem;
    }
`

type NavProps = {
    children: React.ReactNode
    backIcon?: boolean
}

export default function NavBar({ children, backIcon }: NavProps) {
    const navigate = useNavigate()

    return (
        <NavStyled>
            {backIcon && (
                <BackStyled onClick={() => navigate(-1)}>
                    <ArrowLeft />
                </BackStyled>
            )}
            {children}
        </NavStyled>
    )
}
