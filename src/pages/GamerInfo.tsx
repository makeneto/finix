import { useEffect, useState } from "react"
import styled from "styled-components"
import { getPlayerStats } from "../utils/playerStats"
import { ChevronRight } from "lucide-react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"

import type { Player } from "../components/ProfileInfo"
import { useMatches } from "../hooks/useMatches"

const GamerInfoStyled = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;

    & div {
        display: grid;
        gap: 0.4rem;

        & strong {
            font-size: 1rem;
        }

        & span {
            font-size: 1rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.3rem;
            color: #dbdbdb;

            & svg {
                width: 1.1rem;
                height: 1.1rem;
            }
        }
    }
`

export default function GamerInfo() {
    const { id } = useParams<{ id: string }>()
    const [player, setPlayer] = useState<Player | null>(null)
    const { matches } = useMatches()

    useEffect(() => {
        if (!id) return
        const stored: Player[] = JSON.parse(
            localStorage.getItem("players") || "[]"
        )
        const found = stored.find((p) => p.id === id)
        setPlayer(found || null)
    }, [id])

    const stats = player
        ? getPlayerStats(player.name, matches)
        : { goals: 0, totalMatches: 0, points: 0 }

    return (
        <GamerInfoStyled>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <strong>{stats.goals}</strong>
                <span>
                    Goals <ChevronRight />
                </span>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <strong>{stats.totalMatches}</strong>
                <span>
                    Matches <ChevronRight />
                </span>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
            >
                <strong>{stats.points}</strong>
                <span>Points</span>
            </motion.div>
        </GamerInfoStyled>
    )
}
