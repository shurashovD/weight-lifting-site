import { Navigate, Route, Routes } from 'react-router-dom'

import { CompetitionPage, OperatingPage } from '../pages'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<OperatingPage />} />
      <Route path="/competition" element={<CompetitionPage />} />
      <Route path="/operation" element={<OperatingPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
