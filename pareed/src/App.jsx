import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import WebsitePage from './pages/WebsitePage'

// Admin Auth Layout & Components
import AdminLayout from './Admin/AdminLayout/AdminLayout'
import LogIn from './Admin/components/logpage/LogIn'
import ForgotPassword from './Admin/components/logpage/ForgotPassword'
import ResetPassword from './Admin/components/logpage/ResetPassword'

// Admin Dashboard CMS Layout & Pages
import DashboardLayout from './Admin/AdminLayout/DashboardLayout'
import DashboardOverview from './Admin/pages/DashboardOverview'
import HeroSettings from './Admin/pages/HeroSettings'
import AboutSettings from './Admin/pages/AboutSettings'
import MissionVisionSettings from './Admin/pages/MissionVisionSettings'
import ServicesManager from './Admin/pages/ServicesManager'
import ProductsManager from './Admin/pages/ProductsManager'
import WhyChooseUsManager from './Admin/pages/WhyChooseUsManager'
import TeamManager from './Admin/pages/TeamManager'
import ContactInquiries from './Admin/pages/ContactInquiries'
import GeneralSettings from './Admin/pages/GeneralSettings'
import AdminProfileSettings from './Admin/pages/AdminProfileSettings'

export default function App() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<WebsitePage />} />

      {/* Admin Auth Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<LogIn />} />
        <Route path="login" element={<LogIn />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      {/* Admin CMS Dashboard Routes */}
      <Route path="/admin/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="hero" element={<HeroSettings />} />
        <Route path="about" element={<AboutSettings />} />
        <Route path="mission-vision" element={<MissionVisionSettings />} />
        <Route path="mission" element={<MissionVisionSettings />} />
        <Route path="services" element={<ServicesManager />} />
        <Route path="products" element={<ProductsManager />} />
        <Route path="why-us" element={<WhyChooseUsManager />} />
        <Route path="team" element={<TeamManager />} />
        <Route path="inquiries" element={<ContactInquiries />} />
        <Route path="settings" element={<GeneralSettings />} />
        <Route path="account" element={<AdminProfileSettings />} />
        <Route path="profile" element={<AdminProfileSettings />} />
      </Route>

      {/* Fallback to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
