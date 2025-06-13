import { ChevronRight } from "lucide-react"
import styled from "styled-components"
import { motion } from "framer-motion"

const CarouselStyled = styled.section`
    width: 100vw;
    background-color: black;
    padding: 2.5rem 1.12rem;
    margin-top: -3.7rem;
    position: relative;
    z-index: 3;

    & h1 {
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 0.3rem;

        & svg {
            width: 1.1rem;
            height: 1.1rem;
        }
    }

    & div {
        margin-top: 1.5rem;
        display: flex;
        gap: 1.1rem;
        overflow: scroll;

        &::-webkit-scrollbar {
            display: none;
        }

        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */

        & img {
            width: 13rem;
            height: 13rem;
            border-radius: 0.3rem;
        }
    }
`

export default function CarouselStart() {
    return (
        <CarouselStyled>
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h1>
                    Despite your place in <ChevronRight />
                </h1>
                <div>
                    <img src="/assets/fc25-cover.webp" alt="FC 25" />
                    <img src="/assets/nba2k25-cover.webp" alt="NBA 2K25" />
                    <img
                        src="/assets/madden-nfl-25-cover.webp"
                        alt="Madden NFL 25"
                    />
                </div>
            </motion.section>
        </CarouselStyled>
    )
}
