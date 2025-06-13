/* eslint-disable */

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import type { Player } from "../components/ProfileInfo"

export function useDeleteAllMatch() {
    const { id } = useParams<{ id: string }>()
    const [player, setPlayer] = useState<Player | null>(null)
    const [matches, setMatches] = useState<any[]>([])

    useEffect(() => {
        const stored: Player[] = JSON.parse(
            localStorage.getItem("players") || "[]"
        )
        const found = stored.find((p) => p.id === id)
        setPlayer(found || null)
    }, [id])

    function handleDeleteAllMatches() {
        if (!player) return
        const storedMatches = JSON.parse(
            localStorage.getItem("matches") || "[]"
        )
        const filteredMatches = storedMatches.filter(
            (match: any) =>
                match.home !== player.name && match.away !== player.name
        )

        localStorage.setItem("matches", JSON.stringify(filteredMatches))

        setMatches(filteredMatches)

        window.dispatchEvent(new Event("matchesUpdated"))
    }

    return { matches, handleDeleteAllMatches }
}
