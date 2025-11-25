import { useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { MdPayment, MdDownload, MdCheckCircle } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CoursesContext';

type Payment = {
  month: number; // 1-12
  year: number;
  amount: number;
  status: 'Pagado' | 'Pendiente';
  paidAt?: string;
  receipt?: string;
};

type StudentPayment = {
  studentId: string;
  studentName: string;
  level: string;
  section: string;
  payments: Payment[];
};

// Generar pagos simulados para un estudiante
function generateStudentPayments(studentId: string): Payment[] {
  return Array.from({ length: 12 }).map((_, i) => {
    const month = i + 1;
    // Diferentes estudiantes tienen diferentes estados de pago
    const paidThrough = studentId === 's1' ? 9 : studentId === 's2' ? 11 : studentId === 's3' ? 7 : studentId === 's4' ? 10 : studentId === 's5' ? 6 : 8;
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
}

function monthLabel(m: number) {
  return new Date(2025, m - 1, 1).toLocaleString('es-PE', { month: 'long' });
}

export function Pagos() {
  const { user } = useAuth();
  const { courses } = useCourses();
  const [selectedStudent, setSelectedStudent] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'Pagado' | 'Pendiente'>('all');

  // Obtener todos los estudiantes únicos de todos los cursos
  const allStudents = useMemo(() => {
    const studentMap = new Map<string, { id: string; name: string; level: string; section: string }>();
    courses.forEach(course => {
      course.students.forEach(student => {
        if (!studentMap.has(student.id)) {
          studentMap.set(student.id, {
            id: student.id,
            name: student.name,
            level: course.level,
            section: course.section,
          });
        }
      });
    });
    return Array.from(studentMap.values());
  }, [courses]);

  // Generar pagos por estudiante
  const studentPayments: StudentPayment[] = useMemo(() => {
    return allStudents.map(student => ({
      studentId: student.id,
      studentName: student.name,
      level: student.level,
      section: student.section,
      payments: generateStudentPayments(student.id),
    }));
  }, [allStudents]);

  // Vista de alumno (mantener funcionalidad original)
  const myPayments = useMemo(() => {
    if (user?.type === 'alumno') {
      return generateStudentPayments(user.id);
    }
    return [];
  }, [user]);

  const [payments, setPayments] = useState<Payment[]>(myPayments);
  const [selected, setSelected] = useState<Payment | null>(null);
  const [payModalOpen, setPayModalOpen] = useState(false);

  // Filtrar pagos para la vista de admin
  const filteredPayments = useMemo(() => {
    let filtered = studentPayments;
    
    if (selectedStudent !== 'all') {
      filtered = filtered.filter(sp => sp.studentId === selectedStudent);
    }
    
    return filtered;
  }, [studentPayments, selectedStudent]);

  // Calcular totales para admin
  const adminTotals = useMemo(() => {
    let totalPaid = 0;
    let totalPending = 0;

    filteredPayments.forEach(sp => {
      sp.payments.forEach(p => {
        if (selectedStatus === 'all' || p.status === selectedStatus) {
          if (p.status === 'Pagado') {
            totalPaid += p.amount;
          } else {
            totalPending += p.amount;
          }
        }
      });
    });

    return { paid: totalPaid, pending: totalPending };
  }, [filteredPayments, selectedStatus]);

  // Totales para alumno
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

  // Vista para administrador
  if (user?.type === 'administrativo') {
    return (
      <Layout>
        <div className="flex items-center gap-3 mb-5">
          <span className="text-3xl text-accent-500"><MdPayment /></span>
          <h2 className="text-primary-500 text-2xl font-bold">Gestión de Pagos - Todos los Estudiantes</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent-500 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="text-sm text-gray-600">Pagos mensuales 2025</div>
              <div className="text-xl font-semibold">Mensualidad: S/ 180.00</div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-sm">
                <div>Total recaudado: <span className="font-semibold text-green-700">S/ {adminTotals.paid.toFixed(2)}</span></div>
                <div>Total por cobrar: <span className="font-semibold text-red-600">S/ {adminTotals.pending.toFixed(2)}</span></div>
              </div>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Filtrar por estudiante:</label>
              <select 
                value={selectedStudent} 
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="border rounded px-3 py-2 text-sm"
              >
                <option value="all">Todos los estudiantes</option>
                {allStudents.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} - {student.level} {student.section}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Filtrar por estado:</label>
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'Pagado' | 'Pendiente')}
                className="border rounded px-3 py-2 text-sm"
              >
                <option value="all">Todos los estados</option>
                <option value="Pagado">Pagado</option>
                <option value="Pendiente">Pendiente</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-3 py-2 border">Estudiante</th>
                  <th className="text-left px-3 py-2 border">Nivel/Sección</th>
                  <th className="text-center px-3 py-2 border">Mes</th>
                  <th className="text-center px-3 py-2 border">Monto (S/)</th>
                  <th className="text-center px-3 py-2 border">Estado</th>
                  <th className="text-center px-3 py-2 border">Fecha de Pago</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((sp) => 
                  sp.payments
                    .filter(p => selectedStatus === 'all' || p.status === selectedStatus)
                    .map((p) => (
                      <tr key={`${sp.studentId}-${p.month}`} className="odd:bg-white even:bg-gray-50">
                        <td className="px-3 py-2 border">{sp.studentName}</td>
                        <td className="px-3 py-2 border">{sp.level} {sp.section}</td>
                        <td className="text-center px-3 py-2 border">{monthLabel(p.month)}</td>
                        <td className="text-center px-3 py-2 border">{p.amount.toFixed(2)}</td>
                        <td className="text-center px-3 py-2 border">
                          {p.status === 'Pagado' ? (
                            <span className="inline-flex items-center gap-1 text-green-700 font-semibold text-xs">
                              <MdCheckCircle /> Pagado
                            </span>
                          ) : (
                            <span className="text-red-600 font-semibold text-xs">Pendiente</span>
                          )}
                        </td>
                        <td className="text-center px-3 py-2 border text-xs">
                          {p.paidAt ? new Date(p.paidAt).toLocaleDateString('es-PE') : '-'}
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    );
  }

  // Vista para alumno (mantener funcionalidad original)
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
