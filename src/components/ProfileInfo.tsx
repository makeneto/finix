import { useRef } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import { useRanking } from "../hooks/useRanking"
import { ordinalSuffix } from "../utils/ordinalSuffix"
import { usePlayers } from "../hooks/usePlayers"

const ProfileInfoStyled = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;

    & img {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        background-color: #ffffff;
    }

    & > div:first-child {
        position: relative;

        & label {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;

            & img {
                object-fit: cover;
                object-position: top center;
            }

            & input {
                display: none;
            }
        }

        & img:nth-child(2) {
            position: absolute;
            bottom: 9%;
            right: 5%;
            width: 0.8rem;
            height: 0.8rem;
        }
    }

    & > div:last-child {
        display: grid;
        gap: 0.5rem;

        & h1 {
            font-size: 1.7rem;
            text-transform: capitalize;

            & img {
                width: 0.9rem;
                height: 0.9rem;
            }
        }

        /* & input {
            text-transform: capitalize;
            background-color: transparent;
            color: white;
            width: 100%;
            border: none;
        } */

        & a {
            color: #dbdbdb;
            font-size: 0.8rem;
        }
    }
`

export type Player = {
    id: string
    photo: string
    name: string
    goals: number
    totalMatches: number
    points: number
    created_at: string
}

export default function ProfileInfo() {
    const { player, setPlayer } = usePlayers()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const ranking = useRanking()

    const rankingIndex = player
        ? ranking.findIndex((r) => r.id === player.id)
        : -1

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || !player) return

        if (file.name.endsWith(".heic")) {
            alert(
                "Format .Hheic not supported.Please select a .JPG or .png image."
            )
            return
        }

        const reader = new FileReader()
        reader.onload = () => {
            const photo = reader.result as string
            const players: Player[] = JSON.parse(
                localStorage.getItem("players") || "[]"
            )
            const updatedPlayers = players.map((p) =>
                p.id === player.id ? { ...p, photo } : p
            )
            localStorage.setItem("players", JSON.stringify(updatedPlayers))
            setPlayer((prev) => (prev ? { ...prev, photo } : prev))

            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
        reader.readAsDataURL(file)
    }

    if (!player) return null

    return (
        <ProfileInfoStyled>
            <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <label>
                    <img
                        src={
                            player.photo
                                ? player.photo
                                : player.name === "makene"
                                ? "/assets/makenedev.webp"
                                : `https://api.dicebear.com/7.x/lorelei/svg?seed=${player.name}`
                        }
                        alt="Profile"
                        onClick={handleImageClick}
                    />
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </label>
                <img src="/assets/checked.webp" alt="" />
            </motion.div>

            <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {/* <input
                    type="text"
                    value={player.name || ""}
                    autoComplete="off"
                    onChange={(e) => {
                        const newName = e.target.value
                        setPlayer((prev) =>
                            prev ? { ...prev, name: newName } : prev
                        )
                        const players: Player[] = JSON.parse(
                            localStorage.getItem("players") || "[]"
                        )
                        const updatedPlayers = players.map((p) =>
                            p.id === player.id ? { ...p, name: newName } : p
                        )
                        localStorage.setItem(
                            "players",
                            JSON.stringify(updatedPlayers)
                        )
                    }}
                /> */}

                <h1>
                    {player.name}
                    {(player.name === "makene" ||
                        player.name === "makenedev") && (
                        <img
                            src="/assets/verified-icon.webp"
                            alt="Verified Icon"
                        />
                    )}
                </h1>

                <Link
                    to={
                        ranking.length > 1 ? "/ranking" : `/player/${player.id}`
                    }
                >
                    {ranking.length > 1
                        ? `Ranking: ${ordinalSuffix(rankingIndex + 1)} Place`
                        : "Show your talent ⚽"}
                </Link>
            </motion.div>
        </ProfileInfoStyled>
    )
}
