/* eslint-disable */

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import type { Player } from "../components/ProfileInfo"

export function useAddMatch() {
    const { id } = useParams<{ id: string }>()
    const [player, setPlayer] = useState<Player | null>(null)

    useEffect(() => {
        const stored: Player[] = JSON.parse(
            localStorage.getItem("players") || "[]"
        )
        const found = stored.find((p) => p.id === id)
        setPlayer(found || null)
    }, [id])

    function handleAddMatch() {
        if (!player) return

        const storedMatches = JSON.parse(
            localStorage.getItem("matches") || "[]"
        )

        const updatedOldMatches = storedMatches.map((match: any) => ({
            ...match,
            completed: true,
        }))

        const newMatch = {
            id: crypto.randomUUID(),
            home: player.name,
            away: "",
            goalsHome: 0,
            goalsAway: 0,
            date: new Date().toISOString(),
            completed: false,
        }

        const updatedMatches = [newMatch, ...updatedOldMatches]
        localStorage.setItem("matches", JSON.stringify(updatedMatches))

        window.dispatchEvent(new Event("matchesUpdated"))
    }

    return { player, setPlayer, handleAddMatch }
}
