import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HistoryPage from './pages/HistoryPage';
import GeneratePage from './pages/GeneratePage';
import HomePage from './pages/HomePage';
import Header from './shared/components/Header';
import './main.css';
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/generate" element={<GeneratePage />} />
                <Route path="/history" element={<HistoryPage />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
