import styled from "styled-components"
import StartButton from "../components/ui/StartButton"

const NotFoundStyled = styled.main`
    background: black url("/assets/world-bg.webp") top center/cover;
    background-attachment: fixed;
    min-height: 100dvh;
    color: white;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: inherit;
        z-index: 0;
    }

    position: relative;
    z-index: 1;

    & div {
        backdrop-filter: blur(0) brightness(100%);
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;

        display: grid;
        gap: 1rem;

        & h1 {
            line-height: 1.5;
            position: relative;
        }
    }
`

export default function NotFoundPage() {
    return (
        <NotFoundStyled>
            <div>
                <h1>
                    You're
                    <br />
                    Lost!
                </h1>
                <StartButton>Home</StartButton>
            </div>
        </NotFoundStyled>
    )
}
