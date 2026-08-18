import React, { useEffect, useState } from 'react'
import {
  getAllInquiriesAPI,
  updateInquiryStatusAPI,
  deleteInquiryAPI,
} from '../../services/functions/inquiryFunctions'

export default function ContactInquiries() {
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      name: 'Rashid Al Nuaimi',
      company: 'Emirates Seafood Grill LLC',
      phone: '+971 50 123 4567',
      email: 'rashid@emiratesgrill.ae',
      business: 'Restaurant',
      requirement: 'Fresh Fish',
      message: 'Looking for a daily delivery of 50kg fresh King Fish and Hamour for our branch in Deira.',
      date: 'Today, 10:24 AM',
      status: 'New',
    },
    {
      id: 2,
      name: 'Sarah Jenkins',
      company: 'Marina Waterfront Bistro',
      phone: '+971 55 987 6543',
      email: 's.jenkins@marinabistro.com',
      business: 'Hotel / Restaurant',
      requirement: 'Bulk Order',
      message: 'Need wholesale price list for Salmon, Pomfret and Jumbo Tiger Prawns.',
      date: 'Yesterday, 4:15 PM',
      status: 'Contacted',
    },
    {
      id: 3,
      name: 'Mohammed Tariq',
      company: 'Prime Mart Supermarkets',
      phone: '+971 52 444 8899',
      email: 'procurement@primemart.ae',
      business: 'Supermarket',
      requirement: 'Regular Supply',
      message: 'We operate 4 supermarkets across Sharjah & Dubai and are evaluating seafood supply contracts.',
      date: 'Aug 14, 2026',
      status: 'In Progress',
    },
  ])

  const [selectedLead, setSelectedLead] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    setLoading(true)
    try {
      const res = await getAllInquiriesAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const data = res.data?.data || res.data
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item, idx) => ({
            id: item._id || item.id || idx + 1,
            _id: item._id,
            name: item.name || '',
            company: item.company || '',
            phone: item.phone || '',
            email: item.email || '',
            business: item.business || '',
            requirement: item.requirement || '',
            message: item.message || '',
            date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent',
            status: item.status || 'New',
          }))
          setInquiries(formatted)
          setSelectedLead(formatted[0])
          return
        }
      }
    } catch (err) {
      console.error('Error fetching inquiries:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteLead = async (lead) => {
    if (lead._id) {
      try {
        await deleteInquiryAPI(lead._id)
      } catch (err) {
        console.error('Error deleting inquiry:', err)
      }
    }
    const updated = inquiries.filter((item) => item.id !== lead.id && item._id !== lead._id)
    setInquiries(updated)
    setSelectedLead(updated[0] || null)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#DCE6EC] pb-5">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold manrope-extrabold">
            INQUIRIES &amp; LEADS
          </div>
          <h1 className="font-serif text-[28px] font-bold text-navy leading-tight">
            Commercial Inquiries
          </h1>
          <p className="text-[13px] text-[#647483]">
            Track and review wholesale inquiries received through the contact form.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads Table / List */}
        <div className="lg:col-span-2 bg-white border border-[#DCE6EC] rounded-[3px] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-[#F7F9FA] flex justify-between items-center">
            <span className="text-[12px] font-bold uppercase tracking-wider text-navy">
              All Inquiries ({inquiries.length})
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {inquiries.map((lead) => (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className={`p-4 transition-colors cursor-pointer hover:bg-slate-50 ${
                  selectedLead?.id === lead.id ? 'bg-[#EEF3F5] border-l-4 border-gold' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-navy text-[14px]">{lead.name}</h4>
                  <span className="text-[11px] text-[#647483]">{lead.date}</span>
                </div>
                <div className="text-[12px] text-[#647483] font-medium mb-2">
                  {lead.company} • <span className="font-mono text-ink">{lead.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-white border border-slate-200 text-[#1976A8] text-[10px] font-extrabold px-2 py-0.5 rounded-[2px]">
                    {lead.requirement}
                  </span>
                  <span className="bg-gold/15 text-gold text-[10px] font-extrabold px-2 py-0.5 rounded-[2px]">
                    {lead.business}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Lead Detail View */}
        <div className="bg-white border border-[#DCE6EC] p-6 rounded-[3px] shadow-xs space-y-4">
          <h3 className="font-serif text-[20px] font-bold text-navy border-b border-slate-100 pb-3">
            Lead Details
          </h3>

          {selectedLead ? (
            <div className="space-y-4 text-[13px]">
              <div>
                <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider block">NAME</span>
                <p className="font-bold text-navy text-[15px]">{selectedLead.name}</p>
              </div>

              <div>
                <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider block">COMPANY</span>
                <p className="font-semibold text-ink">{selectedLead.company}</p>
              </div>

              <div>
                <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider block">PHONE</span>
                <p className="font-mono text-ink">
                  <a href={`tel:${selectedLead.phone}`} className="text-[#1976A8] hover:underline">
                    {selectedLead.phone}
                  </a>
                </p>
              </div>

              <div>
                <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider block">EMAIL</span>
                <p className="font-mono text-ink">
                  <a href={`mailto:${selectedLead.email}`} className="text-[#1976A8] hover:underline">
                    {selectedLead.email}
                  </a>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <div>
                  <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider block">BUSINESS</span>
                  <p className="font-medium text-navy">{selectedLead.business}</p>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider block">REQUIREMENT</span>
                  <p className="font-medium text-navy">{selectedLead.requirement}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider block mb-1">MESSAGE</span>
                <div className="p-3 bg-[#F7F9FA] border border-slate-200 rounded-[2px] text-ink leading-relaxed">
                  "{selectedLead.message}"
                </div>
              </div>

              <div className="pt-2 flex gap-2 flex-wrap">
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="flex-1 min-w-[100px] text-center bg-gold text-white font-extrabold text-[11px] py-2.5 rounded-[2px] uppercase tracking-wider"
                >
                  Call Lead
                </a>
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="flex-1 min-w-[100px] text-center border border-navy text-navy font-extrabold text-[11px] py-2.5 rounded-[2px] uppercase tracking-wider hover:bg-navy hover:text-white transition-colors"
                >
                  Send Email
                </a>
                <button
                  type="button"
                  onClick={() => handleDeleteLead(selectedLead)}
                  className="text-red-500 hover:bg-red-50 border border-red-200 px-3 py-2.5 rounded-[2px] text-[11px] font-bold uppercase transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">Select a lead to view details</p>
          )}
        </div>
      </div>
    </div>
  )
}
