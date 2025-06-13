import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import type { Player } from "../components/ProfileInfo"

export function usePlayers() {
    const { id } = useParams<{ id: string }>()
    const [player, setPlayer] = useState<Player | null>(null)

    useEffect(() => {
        if (!id) return

        const stored: Player[] = JSON.parse(
            localStorage.getItem("players") || "[]"
        )
        const found = stored.find((p) => p.id === id)
        setPlayer(found || null)
    }, [id])

    return { id, player, setPlayer }
}
