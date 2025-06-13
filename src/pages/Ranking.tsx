import styled from "styled-components"

import NavBar from "../components/NavBar"
import RankingTable from "../components/RankingTable"
import Podium from "../components/Podium"
import { useRanking } from "../hooks/useRanking"

const RankingStyled = styled.main`
    background: black url("/assets/black-bg.webp") top center/cover;
    background-attachment: fixed;
    min-height: 100dvh;
    color: white;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: inherit;
        filter: blur(8px) brightness(0.4);
        z-index: 0;
    }

    position: relative;
    z-index: 1;

    & section {
        backdrop-filter: blur(0) brightness(100%);
    }
`

export default function Ranking() {
    const ranking = useRanking()

    return (
        <RankingStyled>
            <section>
                <NavBar backIcon={true}>Player Stats</NavBar>
                {ranking.length > 2 && <Podium />}
                <RankingTable />
            </section>
        </RankingStyled>
    )
}
