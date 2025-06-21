import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import HistoryPage from "./pages/HistoryPage";
import GeneratePage from "./pages/GeneratePage";
import HomePage from "./pages/HomePage";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <header
                style={{
                    display: "flex",
                    gap: 10,
                    padding: 10,
                    borderBottom: "1px solid #ccc",
                }}
            >
                <Link to="/">CSV Аналитик</Link>
                <Link to="/generate">CSV Генератор</Link>
                <Link to="/history">История</Link>
            </header>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/generate" element={<GeneratePage />} />
                <Route path="/history" element={<HistoryPage />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
