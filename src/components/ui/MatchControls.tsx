import styled from "styled-components"
import { BadgePlus, Trash2 } from "lucide-react"

import { useDeleteAllMatch } from "../../hooks/useDeleteAllMatches"
import { useAddMatch } from "../../hooks/useAddMatch"
import { usePlayers } from "../../hooks/usePlayers"
import { useMatches } from "../../hooks/useMatches"

type MatchControlsProp = {
    isMatch: number
}

const MatchControlsStyled = styled.section<MatchControlsProp>`
    display: flex;
    align-items: center;
    justify-content: ${({ isMatch }) => (isMatch ? "space-between" : "center")};

    & h1 {
        font-size: 1.3rem;
    }

    & span {
        display: flex;
        gap: 2rem;

        & svg {
            cursor: pointer;
        }
    }
`

export default function MatchControls() {
    const { matches } = useMatches()
    const { player } = usePlayers()
    const { handleAddMatch } = useAddMatch()
    const { handleDeleteAllMatches } = useDeleteAllMatch()

    const playerMatches =
        player && player.name
            ? matches.filter(
                  (match: { home: string; away: string }) =>
                      match.home === player.name || match.away === player.name
              )
            : []

    return (
        <MatchControlsStyled isMatch={playerMatches.length}>
            {playerMatches.length > 0 && <h1>Matches</h1>}

            <span>
                {playerMatches.length > 0 && (
                    <Trash2 onClick={handleDeleteAllMatches} />
                )}
                <BadgePlus onClick={handleAddMatch} />
            </span>
        </MatchControlsStyled>
    )
}
