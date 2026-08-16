import React from 'react'
import { Link } from 'react-router-dom'

export default function DashboardOverview() {
  const stats = [
    { title: 'Products Listed', value: '5 Items', to: '/admin/dashboard/products', color: 'border-blue-500' },
    { title: 'Active Services', value: '3 Services', to: '/admin/dashboard/services', color: 'border-gold' },
    { title: 'Team Members', value: '3 People', to: '/admin/dashboard/team', color: 'border-emerald-500' },
    { title: 'New Enquiries', value: '3 Leads', to: '/admin/dashboard/inquiries', color: 'border-purple-500', highlight: true },
  ]

  const recentInquiries = [
    { name: 'Rashid Al Nuaimi', company: 'Emirates Seafood Grill', phone: '+971 50 123 4567', requirement: 'Fresh Fish', date: 'Just now' },
    { name: 'Sarah Jenkins', company: 'Marina Bistro', phone: '+971 55 987 6543', requirement: 'Bulk Order', date: '2 hours ago' },
    { name: 'Mohammed Tariq', company: 'Prime Supermarket LLC', phone: '+971 52 444 8899', requirement: 'Regular Supply', date: 'Yesterday' },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="bg-[#071D33] text-white p-6 sm:p-8 rounded-[4px] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="text-gold text-[11px] font-extrabold uppercase tracking-[0.16em] manrope-extrabold mb-1">
            CONTROL PANEL
          </div>
          <h1 className="font-serif cormorant-garamond-extrabold text-[28px] sm:text-[34px] font-semibold">
            Welcome to Pareed CMS
          </h1>
          <p className="text-[#C8D6DF] text-[13px] sm:text-[14px] mt-1 max-w-xl">
            Update content across the website in real-time, manage product listings, edit team members, and view incoming customer inquiries.
          </p>
        </div>
        <Link
          to="/admin/dashboard/settings"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-white font-extrabold text-[12px] uppercase tracking-wider px-5 py-3 rounded-[2px] transition-all"
        >
          <span>Website Settings →</span>
        </Link>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <Link
            key={stat.title}
            to={stat.to}
            className={`bg-white border border-[#DCE6EC] border-l-4 ${stat.color} p-5 rounded-[3px] shadow-xs hover:shadow-md transition-all block`}
          >
            <div className="text-[11px] font-bold text-[#647483] uppercase tracking-wider">
              {stat.title}
            </div>
            <div className="text-[26px] font-serif font-bold text-navy mt-1">
              {stat.value}
            </div>
            <div className="text-[11px] font-bold text-[#1976A8] mt-2 flex items-center gap-1">
              <span>Manage section</span>
              <span>→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Content Shortcuts & Recent Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Section Editors Quick Links */}
        <div className="lg:col-span-1 bg-white border border-[#DCE6EC] p-6 rounded-[3px] shadow-xs space-y-4">
          <h2 className="font-serif text-[20px] font-bold text-navy border-b border-slate-100 pb-3">
            Section Editors
          </h2>
          <div className="space-y-2">
            {[
              { to: '/admin/dashboard/hero', label: 'Hero Banner & Since 1990' },
              { to: '/admin/dashboard/about', label: 'About Us & History' },
              { to: '/admin/dashboard/services', label: 'Our 3 Core Services' },
              { to: '/admin/dashboard/products', label: 'Product Catalog Slider' },
              { to: '/admin/dashboard/why-us', label: 'Why Businesses Choose Us' },
              { to: '/admin/dashboard/team', label: 'Management Team Cards' },
              { to: '/admin/dashboard/settings', label: 'Logo & Contact Info' },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center justify-between p-2.5 rounded-[2px] hover:bg-[#F7F9FA] text-[13px] text-ink font-medium transition-colors border border-transparent hover:border-slate-200"
              >
                <span>{item.label}</span>
                <span className="text-gold font-bold">Edit ✎</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Inquiries List */}
        <div className="lg:col-span-2 bg-white border border-[#DCE6EC] p-6 rounded-[3px] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-serif text-[20px] font-bold text-navy">
              Recent Leads &amp; Inquiries
            </h2>
            <Link
              to="/admin/dashboard/inquiries"
              className="text-[12px] font-bold text-[#1976A8] hover:text-navy"
            >
              View All ({recentInquiries.length}) →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-[#F7F9FA] text-gold uppercase text-[10px] font-extrabold tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Name / Company</th>
                  <th className="py-2.5 px-3">Phone</th>
                  <th className="py-2.5 px-3">Requirement</th>
                  <th className="py-2.5 px-3">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentInquiries.map((inq, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 px-3">
                      <div className="font-bold text-navy">{inq.name}</div>
                      <div className="text-[11px] text-[#647483]">{inq.company}</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-[12px]">{inq.phone}</td>
                    <td className="py-3 px-3">
                      <span className="bg-[#EEF3F5] text-navy px-2 py-0.5 rounded-[2px] font-semibold text-[11px]">
                        {inq.requirement}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[#647483] text-[12px]">{inq.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
