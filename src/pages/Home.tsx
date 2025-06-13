import styled from "styled-components"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { ArrowBigDownDash, ExternalLink, X } from "lucide-react"
import { motion } from "framer-motion"

import NavBar from "../components/NavBar"
import { useRemovePlayers } from "../hooks/useRemovePlayer"
import { useRanking } from "../hooks/useRanking"
import { positionEmojis } from "../utils/emojis"

const HomeStyled = styled.main`
    background: black url("/assets/world-bg.webp") top center/cover;
    background-attachment: fixed;
    width: 100%;
    height: 100dvh;
    position: relative;
    display: grid;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: inherit;
        filter: blur(3px);
        z-index: 0;
    }

    position: relative;
    z-index: 1;

    & p {
        margin-top: 4rem;
    }

    & form {
        text-align: center;
        display: grid;
        gap: 1.5rem;

        & div {
            display: flex;
            gap: 0.8rem;

            & label {
                display: grid;
                gap: 0.8rem;

                & input {
                    border-radius: 0.6rem;
                    padding: 0.9rem 1.4rem;
                    font-size: 1.1rem;
                    background-color: black;
                    color: white;
                    border: 2px solid white;
                    text-transform: capitalize;

                    &::placeholder {
                        text-transform: none;
                    }
                }

                & span {
                    justify-self: flex-start;
                    color: red;
                    font-size: 0.8rem;
                }
            }

            & button {
                width: 3rem;
                height: 3rem;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease-in;

                & svg {
                    width: 1.6rem;
                    height: 1.6rem;
                }

                &:hover {
                    background-color: #dddcdc;
                }
            }
        }
    }
`

const RankingLink = styled(Link)`
    padding-inline: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    color: #263dbf;

    & svg {
        width: 0.7rem;
        height: 0.7rem;
    }

    &:hover {
        text-decoration: underline;
    }
`

type PlayersProps = {
    isRanking: boolean
}

const Players = styled.section<PlayersProps>`
    background: white;
    color: black;
    width: 91%;
    max-height: 36%;
    position: fixed;
    top: 58%;
    left: 50%;
    transform: translate(-50%);
    padding: ${({ isRanking }) =>
        isRanking ? "1.5rem 1rem 0.5rem" : "0.5rem 1rem"};
    border-radius: 0.5rem;
    display: grid;
    gap: 1rem;
    overflow: auto;
    box-shadow: 0 0 12px 6px #00000026;

    &::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    & div:not(:last-child) {
        border-bottom: 1px solid #e0e0e0f4;
    }

    & div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        padding: 0.9rem 1rem;

        & a {
            color: black;

            & span {
                font-size: 1.1rem;
                font-weight: 500;
                text-transform: capitalize;
            }
        }

        & button {
            background: none;
            border: none;
            color: #d00;
            padding: 0;
            display: flex;
            align-items: center;
        }
    }
`

type Player = {
    id: string
    photo: string
    name: string
    goals: number
    totalMatches: number
    points: number
    created_at: string
}

type FormData = {
    player: string
}

export default function Home() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>()

    const { players, setPlayers, handleRemove } = useRemovePlayers()
    const ranking = useRanking()

    function onSubmit(data: FormData) {
        const stored: Player[] = JSON.parse(
            localStorage.getItem("players") || "[]"
        )

        const newPlayer: Player = {
            id: crypto.randomUUID(),
            photo: "",
            name: data.player.toLowerCase(),
            goals: 0,
            totalMatches: 0,
            points: 0,
            created_at: new Date().toISOString(),
        }

        const updated = [newPlayer, ...stored]
        localStorage.setItem("players", JSON.stringify(updated))
        setPlayers(updated)

        reset()
        console.log(updated)
    }

    return (
        <HomeStyled>
            <NavBar backIcon={false}>Home</NavBar>

            <motion.form
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                    position: "absolute",
                    top: "15%",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            >
                <h1>Players</h1>
                <div>
                    <label htmlFor="player">
                        <input
                            type="text"
                            placeholder="Player name"
                            id="player"
                            autoComplete="off"
                            {...register("player", {
                                required: "The player name is required",
                                minLength: {
                                    value: 3,
                                    message:
                                        "The name must have at least 3 letters",
                                },
                                pattern: {
                                    value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
                                    message: "Use only letters and spaces",
                                },
                            })}
                        />

                        {errors.player && <span>{errors.player.message}</span>}
                    </label>

                    <button type="submit">
                        <ArrowBigDownDash />
                    </button>
                </div>
            </motion.form>

            {players.length > 0 && (
                <motion.article
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <Players isRanking={players.length > 1}>
                        {players.length > 1 && (
                            <RankingLink to="/ranking">
                                Player Stats <ExternalLink />
                            </RankingLink>
                        )}

                        <section>
                            {players.map((player) => {
                                const rankingIndex = ranking.findIndex(
                                    (r) => r.id === player.id
                                )

                                return (
                                    <div key={player.id}>
                                        <Link to={`/player/${player.id}`}>
                                            <span>
                                                {positionEmojis[rankingIndex] ??
                                                    ""}{" "}
                                                {player.name}
                                            </span>
                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleRemove(player.id)
                                            }
                                            aria-label={`Remover ${player.name}`}
                                        >
                                            <X />
                                        </button>
                                    </div>
                                )
                            })}
                        </section>
                    </Players>
                </motion.article>
            )}
        </HomeStyled>
    )
}
