import { useEffect, useState } from "react"
import { getPlayerStats } from "../utils/playerStats"
import type { Player } from "../components/ProfileInfo"

type PlayerStats = {
    id: string
    photo: string
    name: string
    goals: number
    goalsConceded: number
    totalMatches: number
    points: number
}

export function useRanking() {
    const [ranking, setRanking] = useState<PlayerStats[]>([])

    useEffect(() => {
        const players: Player[] = JSON.parse(
            localStorage.getItem("players") || "[]"
        )

        const matches = JSON.parse(localStorage.getItem("matches") || "[]")

        const stats = players.map((player) => {
            const s = getPlayerStats(player.name, matches)

            return {
                id: player.id,
                photo: player.photo,
                name: player.name,
                goals: s.goals,
                goalsConceded: s.goalsSuffered,
                totalMatches: s.totalMatches,
                points: s.points,
            }
        })

        stats.sort((a, b) => {
            if (b.points !== a.points) {
                return b.points - a.points
            }
            return b.goals - a.goals
        })

        setRanking(stats)
    }, [])

    return ranking
}
