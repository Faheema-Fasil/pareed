import React from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom'

/**
 * ProtectedRoute component to guard admin dashboard routes
 * Prevents unauthenticated users from accessing CMS inner pages
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation()
  const token = localStorage.getItem('token')

  if (!token || !token.trim()) {
    // Redirect to admin login while remembering where they tried to go
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children ? children : <Outlet />
}
