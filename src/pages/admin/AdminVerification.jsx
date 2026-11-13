import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import craftspeople from '../../data/craftspeople'

export const adminLinks = [
  { to: '/admin/verification', label: 'Verification' },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/crafts', label: 'Crafts' },
]

export default function AdminVerification() {
  const [pending, setPending] = useState(craftspeople.filter((p) => !p.verified))
  const [rejecting, setRejecting] = useState(null)
  const [reason, setReason] = useState('')
  const [message, setMessage] = useState('')

  function approve(person) {
    setPending(pending.filter((p) => p.id !== person.id))
    setMessage(`${person.name} was approved and is now verified.`)
  }

  function confirmReject() {
    setPending(pending.filter((p) => p.id !== rejecting.id))
    setMessage(`${rejecting.name} was rejected.`)
    setRejecting(null)
    setReason('')
  }

  return (
    <div className="md:flex">
      <Sidebar title="ADMIN" links={adminLinks} />
      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-light text-ink">Verification requests</h1>
        {message && <p className="mt-4 rounded-lg bg-[#DCE6D4] p-3 text-sm text-[#3F5A3A]">{message}</p>}

        {pending.length === 0 ? (
          <p className="mt-8 text-muted">No pending requests. 🎉</p>
        ) : (
          <div className="mt-8 space-y-4">
            {pending.map((p) => (
              <div key={p.id} className="flex flex-col gap-4 rounded-2xl border border-cream p-5 sm:flex-row sm:items-center">
                <img src={p.img} alt={p.name} className="h-14 w-14 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="font-medium text-ink">{p.name}</p>
                  <p className="text-sm text-muted">{p.craftName} · {p.city}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => approve(p)} className="rounded-full bg-clay px-5 py-2 text-sm text-white">Approve</button>
                  <button onClick={() => setRejecting(p)} className="rounded-full border border-ink px-5 py-2 text-sm">Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {rejecting && (
        <div className="fixed inset-0 flex items-center justify-center bg-clay/50 p-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-8">
            <h2 className="text-xl font-medium text-ink">Reject {rejecting.name}?</h2>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for rejection (sent to the craftsperson)"
              className="mt-4 h-28 w-full rounded-xl border border-blush p-3" />
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setRejecting(null)} className="rounded-full border border-ink px-5 py-2 text-sm">Cancel</button>
              <button onClick={confirmReject} disabled={!reason.trim()}
                className="rounded-full bg-red-700 px-5 py-2 text-sm text-white disabled:opacity-40">Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}