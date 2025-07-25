import styled from "styled-components"
import { motion } from "framer-motion"

import { useRanking } from "../hooks/useRanking"
import { Link } from "react-router-dom"

const PodiumStyled = styled.section`
    width: 90%;
    margin: 4rem auto;
    display: flex;
    gap: 0.6rem;
    justify-content: center;

    & a {
        color: white;
        width: 100%;
        display: grid;
        gap: 0.6rem;
        align-self: end;
        height: fit-content;

        & article {
            display: flex;
            justify-content: center;
            position: relative;

            & img {
                background-color: white;
                width: 5.2rem;
                height: 5.2rem;
                object-fit: cover;
                object-position: top center;
                border-radius: 50%;
                justify-self: center;
                align-self: end;
            }

            & span {
                position: absolute;
            }

            .trophy {
                font-size: 2rem;
                bottom: 0;
                right: -10%;
            }

            .medal {
                font-size: 1.4rem;
                bottom: 0%;
                right: 8%;
            }
        }

        div {
            align-self: end;
            display: flex;
            align-items: center;
            justify-content: center;
            border-top: 0.4rem solid #b5b4b4;
            background-color: #1a1d20;
            width: 100%;

            & span {
                font-size: 1.4rem;
                font-weight: 700;
                color: #b5b4b4;
            }
        }

        .podium {
            &--1 {
                height: 8.3rem;
            }

            &--2 {
                height: 5.5rem;
            }

            &--3 {
                height: 3.8rem;
            }
        }

        & p {
            text-transform: capitalize;
            text-align: center;
        }
    }

    & a:nth-child(2) {
        & p {
            font-weight: 600;
        }
    }
`

export default function Podium() {
    const ranking = useRanking()

    const podiumOrder = [1, 0, 2]
    const podiumClass = [`podium--2`, `podium--1`, `podium--3`]
    const position = [2, 1, 3]
    const medals = ["🥈", "🏆", "🥉"]

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <PodiumStyled>
                {ranking.slice(0, 3).map((_, idx) => {
                    const playerIdx = podiumOrder[idx]
                    const p = ranking[playerIdx]

                    return (
                        <Link to={`/player/${p.id}`} key={p.id}>
                            <article>
                                <img
                                    src={
                                        p.photo
                                            ? p.photo
                                            : p.name === "makene"
                                            ? "/assets/makenedev.webp"
                                            : `https://api.dicebear.com/7.x/lorelei/svg?seed=${p.name}`
                                    }
                                    alt={p.name}
                                />
                                <span
                                    className={idx === 1 ? "trophy" : "medal"}
                                >
                                    {medals[idx]}
                                </span>
                            </article>

                            <div className={podiumClass[idx]}>
                                <span>{position[idx]}</span>
                            </div>

                            <p>{p.name}</p>
                        </Link>
                    )
                })}
            </PodiumStyled>
        </motion.section>
    )
}
