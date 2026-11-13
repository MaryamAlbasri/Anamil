import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { adminLinks } from './AdminVerification'

const initialReports = [
  { id: 1, user: 'Khalid Alghamdi', type: 'Product listing', reason: 'Price looks misleading' },
  { id: 2, user: 'Sara Mansour', type: 'Review', reason: 'Offensive language in a review reply' },
  { id: 3, user: 'Huda Alzahrani', type: 'Profile', reason: 'Profile photo is not her own work' },
]

export default function AdminReports() {
  const [reports, setReports] = useState(initialReports)
  const [suspending, setSuspending] = useState(null)
  const [log, setLog] = useState('')

  function dismiss(r) {
    setReports(reports.filter((x) => x.id !== r.id))
    setLog(`Report about ${r.user} was dismissed.`)
  }

  function confirmSuspend() {
    setReports(reports.filter((x) => x.id !== suspending.id))
    setLog(`${suspending.user}'s account was suspended. Action logged.`)
    setSuspending(null)
  }

  return (
    <div className="md:flex">
      <Sidebar title="ADMIN" links={adminLinks} />
      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-light text-ink">Reported content</h1>
        {log && <p className="mt-4 rounded-lg bg-cream p-3 text-sm text-ink">✓ {log}</p>}

        {reports.length === 0 ? (
          <p className="mt-8 text-muted">No open reports.</p>
        ) : (
          <div className="mt-8 space-y-4">
            {reports.map((r) => (
              <div key={r.id} className="flex flex-col gap-4 rounded-2xl border border-cream p-5 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <p className="font-medium text-ink">{r.user} <span className="ml-2 rounded-full bg-cream px-3 py-1 text-xs">{r.type}</span></p>
                  <p className="mt-1 text-sm text-muted">{r.reason}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => dismiss(r)} className="rounded-full border border-ink px-5 py-2 text-sm">Dismiss</button>
                  <button onClick={() => setSuspending(r)} className="rounded-full bg-red-700 px-5 py-2 text-sm text-white">Suspend</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {suspending && (
        <div className="fixed inset-0 flex items-center justify-center bg-clay/50 p-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-8">
            <h2 className="text-xl font-medium text-ink">Suspend {suspending.user}?</h2>
            <p className="mt-2 text-muted">They won't be able to log in, teach or sell until an admin restores the account.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setSuspending(null)} className="rounded-full border border-ink px-5 py-2 text-sm">Cancel</button>
              <button onClick={confirmSuspend} className="rounded-full bg-red-700 px-5 py-2 text-sm text-white">Suspend account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}