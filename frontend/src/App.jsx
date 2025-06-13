import React from 'react'
import {ClerkProviderWithRoutes} from './auth/ClerkProviderWithRoutes.jsx'
import { Route, Routes } from 'react-router-dom'
import {Layout} from './layout/Layout.jsx'
import {ChallengeGenerator} from './challenge/ChallengeGenerator.jsx'
import {HistoryPanel} from './history/HistoryPanel.jsx'
import {AuthenticatorPage} from './auth/AuthenticatorPage.jsx'
import './App.css'

function App() {
  return (
    <ClerkProviderWithRoutes>
      <Routes>
        {/* Strony logowania/rejestracji */}
        <Route path="/sign-in/*" element={<AuthenticatorPage />} />
        <Route path="/sign-up/*" element={<AuthenticatorPage />} />

        {/* Wszystko, co wymaga layoutu */}
        <Route element={<Layout />}>
          <Route path="/" element={<ChallengeGenerator />} />
          <Route path="/history" element={<HistoryPanel />} />
        </Route>
      </Routes>
    </ClerkProviderWithRoutes>
  )
}

export default App