import styled from "styled-components"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import type React from "react"

const StartButtonStyled = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    background-color: white;
    color: black;
    padding: 0.4rem 1.7rem 0.4rem 1.1rem;
    border-radius: 60rem;
    border: 2px solid white;
    margin: 0.9rem auto 0;
    font-weight: 500;
    font-size: 1rem;
    transition: all 0.2s ease-in;

    &:hover {
        background-color: transparent;
        border: 2px solid white;
        color: white;
    }
`

type ButtonProp = {
    children: React.ReactNode
}

export default function StartButton({ children }: ButtonProp) {
    return (
        <StartButtonStyled to="/home">
            <ArrowRight />
            {children}
        </StartButtonStyled>
    )
}
