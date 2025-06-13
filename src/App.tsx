import { useMediaQuery } from "@mui/material"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Suspense } from "react"
import Start from "./pages/Start"
import Home from "./pages/Home"
import Ranking from "./pages/Ranking"
import PlayerPage from "./pages/PlayerPage"
import NotFoundPage from "./pages/NotFoundPage"
import LoadingComponent from "./components/ui/LoadingComponent"
import NotCompatible from "./pages/NotCompatible"

export default function App() {
    const isMobile = useMediaQuery("(max-width:768px)")

    if (!isMobile) {
        return <NotCompatible />
    }

    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingComponent />}>
                <Routes>
                    <Route index element={<Start />} />
                    <Route path="home" element={<Home />} />
                    <Route path="ranking" element={<Ranking />} />
                    <Route path="/player/:id" element={<PlayerPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}
