import styled from "styled-components"
import { motion } from "framer-motion"

import CarouselStart from "../components/CarouselStart"
import StartButton from "../components/ui/StartButton"

const StartStyled = styled.main`
    width: 100vw;
    display: grid;
    gap: 3rem;
`

const StartHeader = styled.header`
    background-image: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0) 26%,
            rgba(0, 0, 0, 1) 74%
        ),
        url("/assets/intro-image.webp");
    background-size: cover;
    background-position: top center;
    width: 100vw;
    height: 57dvh;
    position: relative;

    & div {
        display: grid;
        width: 80%;
        position: absolute;
        bottom: 4%;
        left: 50%;
        text-align: center;

        & h1 {
            text-transform: uppercase;
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
        }

        & p {
            font-size: 0.9rem;
            line-height: 1.1rem;
        }
    }
`

export default function Start() {
    return (
        <StartStyled>
            <StartHeader>
                <motion.div
                    layout
                    initial={{ opacity: 0, y: 7, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 translate="no">Finix</h1>
                    <p>
                        Welcome to Finix, one place you can compete your place
                        at the top
                    </p>
                    <StartButton>Start</StartButton>
                </motion.div>
            </StartHeader>

            <CarouselStart />
        </StartStyled>
    )
}
