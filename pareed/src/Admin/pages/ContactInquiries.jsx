import React, { useEffect, useState } from 'react'
import {
  getAllInquiriesAPI,
  updateInquiryStatusAPI,
  deleteInquiryAPI,
} from '../../services/functions/inquiryFunctions'

export default function ContactInquiries() {
  const [inquiries, setInquiries] = useState([])
  const [selectedLead, setSelectedLead] = useState(null)
  const [showMobileDetail, setShowMobileDetail] = useState(false)
  const [loading, setLoading] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [filterStatus, setFilterStatus] = useState('All')

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    setLoading(true)
    try {
      const res = await getAllInquiriesAPI()
      if (res && res.status >= 200 && res.status < 300) {
        const data = res.data?.data || res.data
        if (Array.isArray(data)) {
          // Sort newest inquiries first
          const sorted = [...data].sort((a, b) => {
            if (a.createdAt && b.createdAt) {
              return new Date(b.createdAt) - new Date(a.createdAt)
            }
            return (b._id || '').localeCompare(a._id || '')
          })

          const formatted = sorted.map((item, idx) => ({
            id: item._id || item.id || idx + 1,
            _id: item._id,
            name: item.name || '',
            company: item.company || '',
            phone: item.phone || '',
            email: item.email || '',
            business: item.business || '',
            requirement: item.requirement || '',
            message: item.message || '',
            date: item.createdAt
              ? new Date(item.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Recent',
            status: item.status || 'New',
          }))

          setInquiries(formatted)
          setSelectedLead((prev) => {
            if (!prev) return formatted[0] || null
            return formatted.find((f) => f.id === prev.id || f._id === prev._id) || formatted[0] || null
          })
          window.dispatchEvent(new Event('inquiry_updated'))
        }
      }
    } catch (err) {
      console.error('Error fetching inquiries:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectLead = (lead) => {
    setSelectedLead(lead)
    setShowMobileDetail(true)
  }

  const handleStatusChange = async (lead, newStatus) => {
    const updated = inquiries.map((item) =>
      item.id === lead.id || item._id === lead._id ? { ...item, status: newStatus } : item
    )
    setInquiries(updated)
    if (selectedLead && (selectedLead.id === lead.id || selectedLead._id === lead._id)) {
      setSelectedLead({ ...selectedLead, status: newStatus })
    }
    window.dispatchEvent(new Event('inquiry_updated'))

    if (lead._id) {
      try {
        await updateInquiryStatusAPI(lead._id, { status: newStatus })
      } catch (err) {
        console.error('Error updating inquiry status:', err)
      }
    }
  }

  const executeDeleteLead = async () => {
    if (!confirmDelete) return
    const lead = confirmDelete
    setConfirmDelete(null)

    if (lead._id) {
      try {
        await deleteInquiryAPI(lead._id)
      } catch (err) {
        console.error('Error deleting inquiry:', err)
      }
    }

    const updated = inquiries.filter((item) => item.id !== lead.id && item._id !== lead._id)
    setInquiries(updated)
    if (selectedLead && (selectedLead.id === lead.id || selectedLead._id === lead._id)) {
      setSelectedLead(updated[0] || null)
      setShowMobileDetail(false)
    }
    window.dispatchEvent(new Event('inquiry_updated'))
  }

  const filteredInquiries =
    filterStatus === 'All'
      ? inquiries
      : inquiries.filter((item) => item.status?.toLowerCase() === filterStatus.toLowerCase())

  // Lead Details Card JSX component used for both Desktop sidebar & Mobile Modal
  const renderLeadDetailsContent = (lead, isModal = false) => {
    if (!lead) {
      return <p className="text-gray-400 text-center py-8">Select an inquiry to view details</p>
    }

    return (
      <div className="space-y-4 text-[13px]">
        {/* Status Switcher */}
        <div>
          <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider block mb-1">
            STATUS
          </span>
          <select
            value={lead.status || 'New'}
            onChange={(e) => handleStatusChange(lead, e.target.value)}
            className="w-full border border-[#DCE6EC] px-3 py-2 text-[13px] font-bold text-navy rounded-[2px] outline-none focus:border-[#1976A8] bg-white cursor-pointer"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider block">NAME</span>
          <p className="font-bold text-navy text-[16px] break-words">{lead.name}</p>
        </div>

        <div>
          <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider block">COMPANY</span>
          <p className="font-semibold text-ink break-words">{lead.company || 'Not Specified'}</p>
        </div>

        <div>
          <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider block">PHONE</span>
          <p className="font-mono text-ink">
            <a href={`tel:${lead.phone}`} className="text-[#1976A8] font-bold hover:underline">
              {lead.phone}
            </a>
          </p>
        </div>

        <div>
          <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider block">EMAIL</span>
          <p className="font-mono text-ink break-all">
            <a href={`mailto:${lead.email}`} className="text-[#1976A8] font-bold hover:underline">
              {lead.email}
            </a>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          <div>
            <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider block">BUSINESS</span>
            <p className="font-bold text-navy break-words">{lead.business || 'Commercial'}</p>
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider block">REQUIREMENT</span>
            <p className="font-bold text-navy break-words">{lead.requirement || 'Seafood'}</p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100">
          <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider block mb-1">
            MESSAGE / REQUIREMENTS
          </span>
          <div className="p-3.5 bg-[#F7F9FA] border border-slate-200 rounded-[2px] text-ink leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto break-words">
            {lead.message || 'No additional message provided.'}
          </div>
        </div>

        <div className="pt-2 flex gap-2 flex-wrap">
          <a
            href={`tel:${lead.phone}`}
            className="flex-1 w-full text-center bg-gold hover:bg-gold/90 text-white font-extrabold text-[11px] py-2.5 rounded-[2px] uppercase tracking-wider transition-colors shadow-xs"
          >
            Call Client
          </a>
          <a
            href={`mailto:${lead.email}`}
            className="flex-1  w-full text-center border border-navy text-navy font-extrabold text-[11px] py-2.5 rounded-[2px] uppercase tracking-wider hover:bg-navy hover:text-white transition-colors"
          >
            Send Email
          </a>
          <button
            type="button"
            onClick={() => setConfirmDelete(lead)}
            className="text-red-600 hover:bg-red-50 border border-red-200 px-3.5 py-2.5 rounded-[2px] text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="adminContainer space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#DCE6EC] pb-5">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-gold manrope-extrabold">
            INQUIRIES &amp; LEADS
          </div>
          <h1 className="font-serif text-[28px] font-bold text-navy leading-tight">
            Commercial Inquiries
          </h1>
          <p className="text-[13px] text-[#647483]">
            Track, review, and manage wholesale inquiries received through the website contact form.
          </p>
        </div>

        <div className="flex justify-end w-full sm:w-auto items-center gap-3">
          <button
            type="button"
            onClick={fetchInquiries}
            disabled={loading}
            className="border border-[#DCE6EC] bg-white hover:bg-slate-50 text-navy font-extrabold text-[12px] uppercase tracking-wider px-4 py-2.5 rounded-[2px] transition-all cursor-pointer shadow-xs flex items-center gap-2"
          >
            <span>↻</span>
            <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {['All', 'New', 'Contacted', 'In Progress', 'Completed'].map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilterStatus(status)}
            className={`px-3.5 sm:px-4 py-2 rounded-[2px] text-[11px] sm:text-[12px] font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              filterStatus === status
                ? 'bg-navy text-white shadow-xs'
                : 'bg-white border border-[#DCE6EC] text-[#647483] hover:text-navy hover:bg-slate-50'
            }`}
          >
            {status}{' '}
            {status === 'All'
              ? `(${inquiries.length})`
              : `(${inquiries.filter((i) => i.status?.toLowerCase() === status.toLowerCase()).length})`}
          </button>
        ))}
      </div>

      {loading && inquiries.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
          <p className="text-[13px] font-bold text-navy uppercase tracking-wider">
            Loading Inquiries...
          </p>
        </div>
      ) : inquiries.length === 0 ? (
        <div className="bg-white border border-[#DCE6EC] rounded-[3px] p-12 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#EEF3F5] text-navy text-[28px] font-bold flex items-center justify-center mx-auto mb-2">
            ✉
          </div>
          <h3 className="font-serif text-[22px] font-bold text-navy">
            No Inquiries Received Yet
          </h3>
          <p className="text-[14px] text-[#647483] max-w-md mx-auto">
            When potential commercial seafood clients submit the contact form on your website, their inquiries will appear here in real time.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Leads List (Takes Full Width on Tablet/Phone & 1024px, 2/3 on Large Desktop) */}
          <div className="xl:col-span-2 bg-white border border-[#DCE6EC] rounded-[3px] shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-[#F7F9FA] flex justify-between items-center">
              <span className="text-[12px] font-bold uppercase tracking-wider text-navy">
                Inquiries List ({filteredInquiries.length})
              </span>
              <span className="text-[11px] text-[#647483]">
                Sorted by latest first
              </span>
            </div>

            <div className="divide-y divide-slate-100 max-h-[700px] overflow-y-auto">
              {filteredInquiries.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => handleSelectLead(lead)}
                  className={`p-4 transition-colors cursor-pointer hover:bg-slate-50 ${
                    selectedLead?.id === lead.id ? 'xl:bg-[#EEF3F5] xl:border-l-4 xl:border-gold' : ''
                  }`}
                >
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h4 className="font-bold text-navy text-[15px] truncate flex-1 min-w-0">
                      {lead.name}
                    </h4>
                    <span className="text-[11px] text-[#647483] shrink-0">{lead.date}</span>
                  </div>

                  <div className="text-[12px] text-[#647483] font-medium mb-2.5 flex items-center justify-between flex-wrap gap-1">
                    <span>
                      {lead.company || 'Individual'} • <span className="font-mono text-navy font-semibold">{lead.phone}</span>
                    </span>
                    <span className="xl:hidden text-gold font-bold text-[11px] tracking-wider uppercase">
                      View Details →
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-white border border-slate-200 text-[#1976A8] text-[10px] font-extrabold px-2.5 py-0.5 rounded-[2px] uppercase">
                      {lead.requirement || 'Seafood'}
                    </span>
                    <span className="bg-gold/15 text-gold text-[10px] font-extrabold px-2.5 py-0.5 rounded-[2px] uppercase">
                      {lead.business || 'Commercial'}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-[2px] uppercase ml-auto ${
                        lead.status === 'New'
                          ? 'bg-blue-100 text-blue-800'
                          : lead.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : lead.status === 'In Progress'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {lead.status || 'New'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Persistent Detail View (Active on Large Screens 1280px+) */}
          <div className="hidden xl:block bg-white border border-[#DCE6EC] p-6 rounded-[3px] shadow-xs space-y-4 h-fit sticky top-6">
            <h3 className="font-serif text-[20px] font-bold text-navy border-b border-slate-100 pb-3 flex justify-between items-center">
              <span>Lead Details</span>
              {selectedLead && (
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-1 rounded-[2px] uppercase ${
                    selectedLead.status === 'New'
                      ? 'bg-blue-100 text-blue-800'
                      : selectedLead.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : selectedLead.status === 'In Progress'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {selectedLead.status || 'New'}
                </span>
              )}
            </h3>

            {renderLeadDetailsContent(selectedLead, false)}
          </div>
        </div>
      )}

      {/* Mobile, Tablet & 1024px Modal Drawer (Opens smoothly when clicking an inquiry) */}
      {showMobileDetail && selectedLead && (
        <div className="xl:hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-xs modal-backdrop-animate">
          <div className="bg-white border border-[#DCE6EC] w-full max-w-lg max-h-[90vh] flex flex-col rounded-[4px] shadow-2xl overflow-hidden modal-card-animate">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 bg-[#F7F9FA] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowMobileDetail(false)}
                  className="text-[#1976A8] hover:text-navy font-bold text-[12px] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                >
                  <span>← Back</span>
                </button>
                <span className="text-slate-300">|</span>
                <span className="font-serif font-bold text-[17px] text-navy">
                  Inquiry Details
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowMobileDetail(false)}
                className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-700 flex items-center justify-center text-[14px] cursor-pointer"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {renderLeadDetailsContent(selectedLead, true)}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-xs p-4 modal-backdrop-animate">
          <div className="bg-white border border-[#DCE6EC] rounded-[4px] shadow-2xl p-6 sm:p-7 max-w-md w-full space-y-5 modal-card-animate">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-[20px] font-bold">
                ⚠️
              </div>
              <h3 className="font-serif text-[20px] font-bold text-navy">
                Delete Inquiry?
              </h3>
            </div>

            <p className="text-[14px] text-ink">
              Are you sure you want to delete the inquiry from{' '}
              <strong className="text-navy font-bold">"{confirmDelete.name}"</strong> (
              {confirmDelete.company})? This record will be permanently deleted.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2.5 rounded-[2px] border border-slate-200 text-ink font-bold text-[12px] uppercase tracking-wider hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeDeleteLead}
                className="px-5 py-2.5 rounded-[2px] bg-red-600 hover:bg-red-700 text-white font-bold text-[12px] uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

