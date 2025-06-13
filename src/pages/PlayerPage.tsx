/* eslint-disable */

import { useEffect, useState } from "react"
import styled from "styled-components"
import { useParams, Link } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"

import ProfileInfo, { type Player } from "../components/ProfileInfo"
import GamerInfo from "./GamerInfo"
import Match from "../components/Match"
import MatchControls from "../components/ui/MatchControls"
import { useMatches } from "../hooks/useMatches"

const PlayerStyled = styled.main`
    background: black url("/assets/black-bg.webp") top center/cover;
    background-attachment: fixed;
    min-height: 100dvh;
    color: white;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: inherit;
        filter: blur(3px) brightness(0.4);
        z-index: 0;
    }

    position: relative;
    z-index: 1;
`

const BackLink = styled(Link)`
    width: fit-content;
    background-color: #3b3a3a;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.1rem;

    margin-bottom: 3rem;
    text-decoration: underline;
    border-radius: 0.6rem;
    border: 2px solid #ffffffb4;

    & svg {
        width: 1.44rem;
        height: 1.44rem;
    }
`

const InfoBox = styled.section`
    padding: 2rem;
    max-width: 500px;
    margin: 0 auto;
    backdrop-filter: blur(0) brightness(100%);
    height: 100dvh;

    & h1 {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 1.2rem;

        & img {
            background-color: transparent !important;
            width: 1rem;
            height: 1rem;
        }
    }

    p {
        margin: 0.5rem 0;
        font-size: 1.1rem;
        font-weight: 500;
    }
`

const Matches = styled.section`
    margin-top: 5.6rem;
`

const MatchesContainer = styled.section`
    margin-top: 2rem;

    & header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.3rem;
        padding-inline: 1rem;

        & p {
            font-size: 0.8rem;
            color: #b5b5b5;
            text-transform: uppercase;
        }
    }
`

export default function PlayerPage() {
    const { id } = useParams<{ id: string }>()
    const [player, setPlayer] = useState<Player | null>(null)
    const matches = useMatches()

    useEffect(() => {
        const stored: Player[] = JSON.parse(
            localStorage.getItem("players") || "[]"
        )
        const found = stored.find((p) => p.id === id)
        setPlayer(found || null)
    }, [id])

    const playerMatches = player
        ? matches.matches.filter(
              (match: any) =>
                  match.home === player.name || match.away === player.name
          )
        : []

    return (
        <PlayerStyled>
            <InfoBox>
                <BackLink to="/home">
                    <ChevronLeft />
                </BackLink>
                <ProfileInfo />
                <GamerInfo />
                <Matches>
                    <MatchControls />
                    <MatchesContainer>
                        {playerMatches.length > 0 && (
                            <motion.header
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                <p>Home</p>
                                <p>Away</p>
                            </motion.header>
                        )}

                        <Match />
                    </MatchesContainer>
                </Matches>
            </InfoBox>
        </PlayerStyled>
    )
}
