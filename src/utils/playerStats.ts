/* eslint-disable */

export function getPlayerStats(playerName: string, matches: any[]) {
    let goals = 0
    let totalMatches = 0
    let points = 0
    let goalsSuffered = 0

    matches.forEach((match) => {
        const isHome = match.home === playerName
        const isAway = match.away === playerName
        if (!isHome && !isAway) return

        totalMatches++

        if (isHome) {
            goals += match.goalsHome
            goalsSuffered += match.goalsAway
        }
        if (isAway) {
            goals += match.goalsAway
            goalsSuffered += match.goalsHome
        }

        if (match.completed) {
            if (isHome) {
                if (match.goalsHome > match.goalsAway) points += 3
                else if (match.goalsHome === match.goalsAway) points += 1
            }
            if (isAway) {
                if (match.goalsAway > match.goalsHome) points += 3
                else if (match.goalsAway === match.goalsHome) points += 1
            }
        }
    })

    return { goals, goalsSuffered, totalMatches, points }
}
