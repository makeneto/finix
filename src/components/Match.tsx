/* eslint-disable */

import styled from "styled-components"

import { Link } from "react-router-dom"
import { usePlayers } from "../hooks/usePlayers"
import { useMatches } from "../hooks/useMatches"
import { useGoalsChange } from "../utils/goalsChange"

const MatchStyled = styled.article`
    display: grid;
    gap: 4rem;
    height: 35dvh;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    & div {
        display: flex;
        justify-content: space-between;
        height: fit-content;
    }
`

const ProfileTeam = styled(Link)`
    display: grid;
    gap: 1rem;
    justify-content: center;

    & img {
        background-color: #ffffff;
        justify-self: center;
        width: 3.6rem;
        height: 3.6rem;
        border-radius: 50%;
        object-fit: cover;
        object-position: top center;
    }

    & input {
        font-size: 1rem;
        width: 6.7rem;
        font-weight: 500;
        border: none;
        color: white;
        background-color: transparent;
        text-align: center;
        text-transform: capitalize;
    }
`

const MatchResult = styled.aside`
    display: grid;
    justify-content: center;

    & div,
    & span {
        font-size: 2rem;
        display: flex;
        align-items: center;
        justify-self: center;
        font-size: 0.7rem;
        text-transform: uppercase;
    }

    & div > input {
        font-size: 1.5rem;
        text-align: center;
        width: 3rem;
        background-color: transparent;
        border: none;
        color: white;
    }

    & span:first-child {
        font-size: 1rem;
    }
`

type IsCompletedProps = {
    isCompleted: boolean
}

const ResultHyphen = styled.span<IsCompletedProps>`
    font-weight: bolder;
    font-size: 1rem !important;
    color: ${({ isCompleted }) => isCompleted && "gray"};
`

const IsCompletedStyled = styled.span<IsCompletedProps>`
    font-size: ${({ isCompleted }) => isCompleted && "0.6rem !important"};
    color: ${({ isCompleted }) => (isCompleted ? "white" : "#30F261")};
    background-color: ${({ isCompleted }) => isCompleted && "#D90404"};
    padding-inline: ${({ isCompleted }) => isCompleted && "0.5rem"};
    border: ${({ isCompleted }) => isCompleted && "1px solid white"};
`

interface Match {
    id: string
    completed: boolean
    goalsHome: number
    goalsAway: number
}

export default function Match() {
    const { player } = usePlayers()
    const { matches, setMatches } = useMatches()
    const handleGoalsChange = useGoalsChange()

    if (!player) return null

    const playerMatches = matches.filter(
        (match) => match.home === player.name || match.away === player.name
    )

    return (
        <MatchStyled>
            {playerMatches.map((match) => {
                const homeIsLoser =
                    match.completed && match.goalsHome < match.goalsAway
                const awayIsLoser =
                    match.completed && match.goalsAway < match.goalsHome

                return (
                    <div key={match.id}>
                        <ProfileTeam
                            to={
                                match.home === player.name
                                    ? `/player/${player.id}`
                                    : (() => {
                                          const players = JSON.parse(
                                              localStorage.getItem("players") ||
                                                  "[]"
                                          )
                                          const found = players.find(
                                              (p: any) => p.name === match.home
                                          )
                                          return found
                                              ? `/player/${found.id}`
                                              : "#"
                                      })()
                            }
                        >
                            <img
                                src={(() => {
                                    const players = JSON.parse(
                                        localStorage.getItem("players") || "[]"
                                    )
                                    const found = players.find(
                                        (p: any) => p.name === match.home
                                    )
                                    if (
                                        (match.home === "makene" ||
                                            match.home === "makenedev") &&
                                        (!found || !found.photo)
                                    )
                                        return "/assets/makenedev.webp"
                                    return found && found.photo
                                        ? found.photo
                                        : `https://api.dicebear.com/7.x/lorelei/svg?seed=${match.home}`
                                })()}
                                alt="Profile Team"
                            />
                            <input
                                type="text"
                                name=""
                                id=""
                                value={match.home}
                                disabled
                            />
                        </ProfileTeam>

                        <MatchResult>
                            <div>
                                <input
                                    type="text"
                                    name="home"
                                    id={`home-${match.id}`}
                                    value={match.goalsHome}
                                    onChange={(e) =>
                                        handleGoalsChange(
                                            match.id,
                                            "goalsHome",
                                            e.target.value
                                        )
                                    }
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    autoComplete="off"
                                    disabled={match.completed}
                                    className={homeIsLoser ? "loser" : ""}
                                />

                                <ResultHyphen isCompleted={match.completed}>
                                    -
                                </ResultHyphen>

                                <input
                                    type="text"
                                    name="away"
                                    id={`away-${match.id}`}
                                    value={match.goalsAway}
                                    onChange={(e) =>
                                        handleGoalsChange(
                                            match.id,
                                            "goalsAway",
                                            e.target.value
                                        )
                                    }
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    autoComplete="off"
                                    disabled={match.completed}
                                    className={awayIsLoser ? "loser" : ""}
                                />
                            </div>

                            {match.completed && (
                                <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        setMatches((prevMatches) =>
                                            prevMatches.map((m) =>
                                                m.id === match.id
                                                    ? {
                                                          ...m,
                                                          showTime: !m.showTime,
                                                      }
                                                    : m
                                            )
                                        )
                                    }}
                                >
                                    {match.showTime
                                        ? new Date(
                                              match.date
                                          ).toLocaleTimeString("en-GB", {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                              hour12: false,
                                          })
                                        : new Date(
                                              match.date
                                          ).toLocaleDateString("en-US", {
                                              day: "numeric",
                                              month: "long",
                                              year: "numeric",
                                          })}
                                </span>
                            )}

                            <IsCompletedStyled
                                isCompleted={match.completed}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    const storedMatches = JSON.parse(
                                        localStorage.getItem("matches") || "[]"
                                    )
                                    const updatedMatches = storedMatches.map(
                                        (m: any) =>
                                            m.id === match.id
                                                ? {
                                                      ...m,
                                                      completed: !m.completed,
                                                  }
                                                : m
                                    )
                                    localStorage.setItem(
                                        "matches",
                                        JSON.stringify(updatedMatches)
                                    )
                                    setMatches(updatedMatches)
                                    window.dispatchEvent(
                                        new Event("matchesUpdated")
                                    )
                                }}
                            >
                                {match.completed ? "Full-time" : "In play"}
                            </IsCompletedStyled>
                        </MatchResult>

                        <ProfileTeam
                            to={
                                match.away === player.name
                                    ? `/player/${player.id}`
                                    : (() => {
                                          const players = JSON.parse(
                                              localStorage.getItem("players") ||
                                                  "[]"
                                          )
                                          const found = players.find(
                                              (p: any) => p.name === match.away
                                          )
                                          return found
                                              ? `/player/${found.id}`
                                              : "#"
                                      })()
                            }
                        >
                            <img
                                src={(() => {
                                    const players = JSON.parse(
                                        localStorage.getItem("players") || "[]"
                                    )

                                    const found = players.find(
                                        (p: any) => p.name === match.away
                                    )

                                    if (
                                        (match.away === "makene" ||
                                            match.away === "makenedev") &&
                                        (!found || !found.photo)
                                    )
                                        return "/assets/makenedev.webp"

                                    return found && found.photo
                                        ? found.photo
                                        : `https://api.dicebear.com/7.x/lorelei/svg?seed=${match.away}`
                                })()}
                                alt="Profile Team"
                            />

                            <input
                                type="text"
                                name="player"
                                id="player2"
                                value={match.away}
                                placeholder="---"
                                onChange={(e) => {
                                    const newValue = e.target.value
                                    const storedMatches = JSON.parse(
                                        localStorage.getItem("matches") || "[]"
                                    )
                                    const updatedMatches = storedMatches.map(
                                        (m: any) =>
                                            m.id === match.id
                                                ? {
                                                      ...m,
                                                      away: newValue.toLowerCase(),
                                                  }
                                                : m
                                    )
                                    localStorage.setItem(
                                        "matches",
                                        JSON.stringify(updatedMatches)
                                    )
                                    setMatches(updatedMatches)
                                    window.dispatchEvent(
                                        new Event("matchesUpdated")
                                    )
                                }}
                                autoComplete="off"
                            />
                        </ProfileTeam>
                    </div>
                )
            })}
        </MatchStyled>
    )
}
