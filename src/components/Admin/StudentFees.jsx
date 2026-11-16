import { useCallback, useEffect, useState } from "react";
import api, { errorMessage } from "../../utils/api";

const CURRENCY = import.meta.env.VITE_CURRENCY || "₦";
const money = (n) => `${CURRENCY}${Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

// Registrar tool: add charges to a student's account and record payments.
export default function StudentFees({ student, onClose }) {
  const studentId = student.studentId;
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ item: "", amount: "", dueDate: "" });
  const [pay, setPay] = useState({});

  const load = useCallback(async () => {
    try {
      const { data } = await api.get("/academics/fees", { params: { studentId } });
      setData(data);
      setError("");
    } catch (e) {
      setError(errorMessage(e, "Could not load fees"));
    }
  }, [studentId]);
  useEffect(() => { load(); }, [load]);

  const run = async (fn) => {
    setBusy(true);
    try { await fn(); await load(); } catch (e) { setError(errorMessage(e)); } finally { setBusy(false); }
  };

  const input = "w-full px-3 py-2 border rounded-lg text-sm text-gray-900";
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Fees: {student.firstName} {student.lastName}</h2>
            <p className="text-sm text-gray-500">{studentId}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 text-xl" aria-label="Close">×</button>
        </div>
        {error && <div className="mb-3 p-2 rounded bg-red-100 text-red-800 text-sm">{error}</div>}
        {data && (
          <>
            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              {[["Total", data.total], ["Paid", data.paid], ["Balance", data.balance]].map(([l, v]) => (
                <div key={l} className="p-3 rounded-lg bg-gray-50"><div className="text-xs text-gray-500">{l}</div><div className="font-bold text-gray-900">{money(v)}</div></div>
              ))}
            </div>
            <div className="space-y-2 mb-6">
              {!data.fees.length && <p className="text-sm text-gray-500">No charges yet.</p>}
              {data.fees.map((f) => (
                <div key={f._id} className="p-3 rounded-lg bg-gray-50">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-900">{f.item}</span>
                    <span className="text-gray-700">{money(f.paid)} / {money(f.amount)}</span>
                  </div>
                  {f.balance > 0 ? (
                    <div className="flex gap-2 mt-2">
                      <input type="number" min="0" className={input} placeholder={`Payment (max ${f.balance})`} value={pay[f._id] || ""} onChange={(e) => setPay({ ...pay, [f._id]: e.target.value })} />
                      <button disabled={busy || !pay[f._id]} className="px-3 py-2 rounded-lg bg-green-600 text-white text-sm disabled:opacity-50" onClick={() => run(async () => { await api.post(`/academics/fees/${f._id}/payments`, { amount: Number(pay[f._id]) }); setPay({ ...pay, [f._id]: "" }); })}>Record</button>
                    </div>
                  ) : <div className="text-xs text-green-600 mt-1">Paid in full</div>}
                  {f.paid === 0 && <button className="text-xs text-red-500 underline mt-1" onClick={() => window.confirm("Delete this charge?") && run(() => api.delete(`/academics/fees/${f._id}`))}>Delete charge</button>}
                </div>
              ))}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Add a charge</h3>
            <div className="grid grid-cols-6 gap-2">
              <input className={`${input} col-span-3`} placeholder="e.g. Tuition" value={form.item} onChange={(e) => setForm({ ...form, item: e.target.value })} maxLength={120} />
              <input type="number" min="0" className={`${input} col-span-3`} placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
              <input type="date" className={`${input} col-span-4`} value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
              <button disabled={busy || !form.item.trim() || !form.amount} className="col-span-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm disabled:opacity-50" onClick={() => run(async () => { await api.post("/academics/fees", { studentId, ...form, amount: Number(form.amount) }); setForm({ item: "", amount: "", dueDate: "" }); })}>Add</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
