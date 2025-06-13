/* eslint-disable */

import { useEffect, useState } from "react"

export function useMatches() {
    const [matches, setMatches] = useState<any[]>([])

    useEffect(() => {
        const storedMatches = JSON.parse(
            localStorage.getItem("matches") || "[]"
        )
        setMatches(storedMatches)

        const handleMatchesUpdated = () => {
            const updatedMatches = JSON.parse(
                localStorage.getItem("matches") || "[]"
            )
            setMatches(updatedMatches)
        }

        window.addEventListener("matchesUpdated", handleMatchesUpdated)
        return () => {
            window.removeEventListener("matchesUpdated", handleMatchesUpdated)
        }
    }, [])

    return { matches, setMatches }
}
