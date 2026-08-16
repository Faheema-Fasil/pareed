import React from 'react'

function Footer() {
  return (
    <footer className="w-full bg-[#071D33] border-t border-white/10 py-4 px-6 sm:px-12 text-[#8FA5B3] text-[12px] flex flex-col sm:flex-row justify-between items-center gap-2">
      <div>
        © 2026 Pareed Fish Trading L.L.C. All Rights Reserved.
      </div>
      <div className="flex items-center gap-4 text-[11px]">
        <span>Protected by SSL Encryption</span>
        <span>•</span>
        <span>Admin Portal</span>
      </div>
    </footer>
  )
}

export default Footer