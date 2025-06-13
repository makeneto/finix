import styled from "styled-components"
import { motion } from "framer-motion"

import { useRanking } from "../hooks/useRanking"
import { Link } from "react-router-dom"

const Table = styled.table`
    width: 95%;
    border-collapse: collapse;
    margin: 6rem auto;

    th,
    td {
        padding: 0.5rem 1rem;
        text-align: center;
    }

    th {
        padding: 0.7rem 1rem;
        border-right: none;
        background: #1a1d20;
        color: #b5b4b4;
        font-size: 0.8rem;
    }

    & th:first-child {
        text-align: start;
    }

    td,
    a {
        color: #d5d3d3;
    }

    a:hover {
        text-decoration: underline;
    }

    td {
        padding: 0.8rem 1rem;
        font-size: 0.8rem;
    }

    tbody tr:not(:last-child) {
        border-bottom: 1px solid #121212;
    }
`

const PositionRow = styled.td`
    font-weight: 700;
    padding-right: 0 !important;
`

const NameRow = styled.td`
    text-transform: capitalize;
    text-align: start !important;
`

export default function RankingTable() {
    const ranking = useRanking()

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <Table>
                <thead>
                    <tr>
                        <th colSpan={2}>Players</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>Matches</th>
                        <th>XP</th>
                    </tr>
                </thead>
                <tbody>
                    {ranking.map((p, i) => (
                        <tr key={p.name}>
                            <PositionRow>{i + 1}</PositionRow>
                            <NameRow>
                                <Link to={`/player/${p.id}`}>{p.name}</Link>
                            </NameRow>
                            <td>{p.goals}</td>
                            <td>{p.goalsConceded}</td>
                            <td>{p.totalMatches}</td>
                            <td>{p.points}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </motion.section>
    )
}
