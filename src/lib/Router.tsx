import { useEffect } from 'react'

import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import ym from 'react-yandex-metrika'

import { CompetitionPage, OperatingPage } from '../pages'

export const Router = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/') {
      ym('96580340', 'reachGoal', 'opearatingIsVisited')
    }
  }, [pathname])

  return (
    <Routes>
      <Route path="/" element={<OperatingPage />} />
      <Route path="/competition" element={<CompetitionPage />} />
      <Route path="/operation" element={<OperatingPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
