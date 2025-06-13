/* eslint-disable */
import { useMatches } from "../hooks/useMatches"

export function useGoalsChange() {
    const { setMatches } = useMatches()

    function handleGoalsChange(
        matchId: string,
        field: "goalsHome" | "goalsAway",
        value: string
    ) {
        if (!/^\d*$/.test(value)) return

        const storedMatches = JSON.parse(
            localStorage.getItem("matches") || "[]"
        )
        const updatedMatches = storedMatches.map((match: any) =>
            match.id === matchId ? { ...match, [field]: Number(value) } : match
        )
        localStorage.setItem("matches", JSON.stringify(updatedMatches))
        setMatches(updatedMatches)
        window.dispatchEvent(new Event("matchesUpdated"))
    }

    return handleGoalsChange
}
