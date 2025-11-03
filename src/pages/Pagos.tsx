import { useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { MdPayment, MdDownload, MdCheckCircle } from 'react-icons/md';

type Payment = {
  month: number; // 1-12
  year: number;
  amount: number;
  status: 'Pagado' | 'Pendiente';
  paidAt?: string;
  receipt?: string;
};

// Simular pagos para 2025: pagado hasta septiembre
const simulatedPayments: Payment[] = Array.from({ length: 12 }).map((_, i) => {
  const month = i + 1;
  const paidThrough = 9; // hasta septiembre pagado
  const paid = month <= paidThrough;
  return {
    month,
    year: 2025,
    amount: 180.0,
    status: paid ? 'Pagado' : 'Pendiente',
    paidAt: paid ? `2025-${String(month).padStart(2, '0')}-05T10:00:00` : undefined,
    receipt: paid ? `recibo-${month}-2025.pdf` : undefined,
  } as Payment;
});

function monthLabel(m: number) {
  return new Date(2025, m - 1, 1).toLocaleString('es-PE', { month: 'long' });
}

export function Pagos() {
  const [payments, setPayments] = useState<Payment[]>(simulatedPayments);
  const [selected, setSelected] = useState<Payment | null>(null);
  const [payModalOpen, setPayModalOpen] = useState(false);

  const totals = useMemo(() => {
    const paid = payments.filter((p) => p.status === 'Pagado').reduce((s, p) => s + p.amount, 0);
    const pending = payments.filter((p) => p.status === 'Pendiente').reduce((s, p) => s + p.amount, 0);
    return { paid, pending, balance: pending };
  }, [payments]);

  function openPay(p: Payment) {
    setSelected(p);
    setPayModalOpen(true);
  }

  function confirmPay() {
    if (!selected) return;
    setPayments((s) => s.map((x) => (x.month === selected.month ? { ...x, status: 'Pagado', paidAt: new Date().toISOString(), receipt: `recibo-${x.month}-2025.pdf` } : x)));
    setPayModalOpen(false);
    setSelected(null);
  }

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-accent-500"><MdPayment /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Pagos</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent-500">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <div className="text-sm text-gray-600">Pagos mensuales 2025</div>
            <div className="text-xl font-semibold">Mensualidad: S/ 180.00</div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-sm">
              <div>Total pagado: <span className="font-semibold text-green-700">S/ {totals.paid.toFixed(2)}</span></div>
              <div>Total pendiente: <span className="font-semibold text-red-600">S/ {totals.pending.toFixed(2)}</span></div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-2 border">Mes</th>
                <th className="text-center px-4 py-2 border">Monto (S/)</th>
                <th className="text-center px-4 py-2 border">Estado</th>
                <th className="text-center px-4 py-2 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.month} className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-3 border">{monthLabel(p.month)} {p.year}</td>
                  <td className="text-center px-4 py-3 border">{p.amount.toFixed(2)}</td>
                  <td className="text-center px-4 py-3 border">
                    {p.status === 'Pagado' ? (
                      <span className="inline-flex items-center gap-2 text-green-700 font-semibold"><MdCheckCircle /> Pagado</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Pendiente</span>
                    )}
                  </td>
                  <td className="text-center px-4 py-3 border">
                    <div className="flex items-center justify-center gap-3">
                      {p.status === 'Pagado' ? (
                        <a className="flex items-center gap-2 text-blue-600" href="#" onClick={(e) => e.preventDefault()}>
                          <MdDownload /> Descargar recibo
                        </a>
                      ) : (
                        <button onClick={() => openPay(p)} className="px-3 py-1 rounded bg-accent-500 text-white">Pagar</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Pay modal */}
      {payModalOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setPayModalOpen(false)} />
          <div className="relative bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Pagar mensualidad</h3>
            <div className="mb-3 text-sm text-gray-700">Mes: <span className="font-medium">{monthLabel(selected.month)} {selected.year}</span></div>
            <div className="mb-3 text-sm text-gray-700">Monto: <span className="font-medium">S/ {selected.amount.toFixed(2)}</span></div>
            <div className="mb-4 text-sm text-gray-600">Simule el pago y se generará un recibo.</div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setPayModalOpen(false)} className="px-4 py-2 rounded border">Cancelar</button>
              <button onClick={confirmPay} className="px-4 py-2 rounded bg-accent-500 text-white">Confirmar pago</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Pagos;
