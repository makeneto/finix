import { useEffect, useState } from "react"

import type { Player } from "../components/ProfileInfo"

export function useRemovePlayers() {
    const [players, setPlayers] = useState<Player[]>([])

    useEffect(() => {
        const stored: Player[] = JSON.parse(
            localStorage.getItem("players") || "[]"
        )
        setPlayers(stored)
    }, [])

    function handleRemove(id: string) {
        const updated = players.filter((player) => player.id !== id)
        localStorage.setItem("players", JSON.stringify(updated))
        setPlayers(updated)
    }

    return { players, setPlayers, handleRemove }
}
