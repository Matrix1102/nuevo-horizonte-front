import { useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { MdAppRegistration, MdFileDownload, MdUploadFile, MdArrowForward, MdArrowBack } from 'react-icons/md';

type DocItem = { id: string; name: string; required?: boolean; uploadedName?: string };

const docs: DocItem[] = [
  { id: 'd1', name: 'Contrato de Prestación de Servicio', required: true },
  { id: 'd2', name: 'Documento de Identidad (DNI)', required: true },
  { id: 'd3', name: 'Certificado de Estudios', required: false },
  { id: 'd4', name: 'Fotografía reciente', required: false },
];

const steps = ['Documentos', 'Validar', 'Datos Familiares', 'Datos Alumno', 'Finalizar'];

export function MatriculaWeb() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [items, setItems] = useState<DocItem[]>(docs);
  const [successOpen, setSuccessOpen] = useState(false);

  // Datos simulados (editable)
  const [familyData, setFamilyData] = useState({
    fatherName: 'Carlos Bayona',
    fatherDni: '12345678',
    fatherPhone: '+51 987654321',
    motherName: 'María López',
    motherDni: '87654321',
    motherPhone: '+51 987654322',
    address: 'Av. Los Olivos 123, Lima',
  });

  const [studentData, setStudentData] = useState({
    name: 'Jose Bayona',
    grade: '5to - Primaria',
    dni: '43210987',
    birthdate: '2012-04-15',
  });
  const [guardianData, setGuardianData] = useState({
    name: 'Ana Torres',
    relationship: 'Tía',
    dni: '55443322',
    phone: '+51 976543210',
  });

  const allRequiredUploaded = useMemo(() => items.filter((i) => i.required).every((r) => !!r.uploadedName), [items]);

  function handleFileSelected(file: File | null, id: string) {
    if (!file) return;
    // mark uploadedName and keep timestamp-like suffix to indicate change
    setItems((s) => s.map((it) => (it.id === id ? { ...it, uploadedName: file.name } : it)));
  }

  const familyValid =
    !!familyData.fatherName && !!familyData.motherName && !!familyData.fatherPhone && !!familyData.motherPhone;
  const studentValid = studentData.name && studentData.dni && studentData.birthdate;

  function goNext() {
    // guardas simples por paso
    if (currentStep === 1 && !allRequiredUploaded) return;
    if (currentStep === 2 && !familyValid) return;
    if (currentStep === 3 && !studentValid) return;
    setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
  }

  function goPrev() {
    setCurrentStep((s) => Math.max(0, s - 1));
  }

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-accent-500"><MdAppRegistration /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Matrícula Web</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-accent-500">
        {/* Stepper */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto">
          {steps.map((s, idx) => (
            <div key={s} className={`flex items-center gap-3 px-3 py-2 rounded-full ${idx === currentStep ? 'bg-accent-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
              <span className="font-semibold">{idx + 1}</span>
              <span className="text-sm">{s}</span>
            </div>
          ))}
        </div>

        {/* Content area */}
        <div className="min-h-[280px]">
          {currentStep === 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Documentos requeridos</h3>
              <ul className="space-y-3">
                {items.map((it) => (
                  <li key={it.id} className="flex items-center justify-between border p-3 rounded">
                    <div>
                      <div className="font-medium">{it.name} {it.required && <span className="text-red-500">*</span>}</div>
                      {it.uploadedName ? (
                        <div className="text-sm text-green-700">Documento cargado · <span className="text-gray-500">{it.uploadedName}</span></div>
                      ) : (
                        <div className="text-sm text-gray-500">No cargado</div>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <a className="text-sm text-blue-600 flex items-center gap-1" href="#" onClick={(e) => e.preventDefault()}>
                        <MdFileDownload /> Descargar
                      </a>

                      <label className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded cursor-pointer">
                        <MdUploadFile />
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => handleFileSelected(e.target.files?.[0] ?? null, it.id)}
                        />
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Validación</h3>
              <p className="text-sm text-gray-600 mb-4">Revise que todos los documentos obligatorios estén cargados antes de continuar.</p>
              <div className="mb-4">
                <div className={`inline-block px-3 py-2 rounded ${allRequiredUploaded ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {allRequiredUploaded ? 'Todos los documentos obligatorios han sido cargados' : 'Faltan documentos obligatorios'}
                </div>
              </div>
            </div>
          )}


          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Datos Familiares</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Nombre del padre</label>
                  <input value={familyData.fatherName} onChange={(e) => setFamilyData((f) => ({ ...f, fatherName: e.target.value }))} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">DNI del padre</label>
                  <input value={familyData.fatherDni} onChange={(e) => setFamilyData((f) => ({ ...f, fatherDni: e.target.value }))} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Teléfono del padre</label>
                  <input value={familyData.fatherPhone} onChange={(e) => setFamilyData((f) => ({ ...f, fatherPhone: e.target.value }))} className="w-full border rounded px-3 py-2" />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Nombre de la madre</label>
                  <input value={familyData.motherName} onChange={(e) => setFamilyData((f) => ({ ...f, motherName: e.target.value }))} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">DNI de la madre</label>
                  <input value={familyData.motherDni} onChange={(e) => setFamilyData((f) => ({ ...f, motherDni: e.target.value }))} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Teléfono de la madre</label>
                  <input value={familyData.motherPhone} onChange={(e) => setFamilyData((f) => ({ ...f, motherPhone: e.target.value }))} className="w-full border rounded px-3 py-2" />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Dirección</label>
                  <input value={familyData.address} onChange={(e) => setFamilyData((f) => ({ ...f, address: e.target.value }))} className="w-full border rounded px-3 py-2" />
                </div>
                
                {/* Apoderado */}
                <div className="md:col-span-2 mt-2">
                  <h4 className="font-semibold">Datos del Apoderado</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-2">
                    <div>
                      <label className="block text-sm text-gray-600">Nombre</label>
                      <input value={guardianData.name} onChange={(e) => setGuardianData((g) => ({ ...g, name: e.target.value }))} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Parentesco</label>
                      <input value={guardianData.relationship} onChange={(e) => setGuardianData((g) => ({ ...g, relationship: e.target.value }))} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">DNI</label>
                      <input value={guardianData.dni} onChange={(e) => setGuardianData((g) => ({ ...g, dni: e.target.value }))} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Teléfono</label>
                      <input value={guardianData.phone} onChange={(e) => setGuardianData((g) => ({ ...g, phone: e.target.value }))} className="w-full border rounded px-3 py-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Datos del Alumno</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Nombre completo</label>
                  <input value={studentData.name} onChange={(e) => setStudentData((s) => ({ ...s, name: e.target.value }))} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Grado</label>
                  <input value={studentData.grade} onChange={(e) => setStudentData((s) => ({ ...s, grade: e.target.value }))} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">DNI</label>
                  <input value={studentData.dni} onChange={(e) => setStudentData((s) => ({ ...s, dni: e.target.value }))} className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Fecha de nacimiento</label>
                  <input type="date" value={studentData.birthdate} onChange={(e) => setStudentData((s) => ({ ...s, birthdate: e.target.value }))} className="w-full border rounded px-3 py-2" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Finalizar</h3>
              <p className="text-sm text-gray-600 mb-4">Revise la información y confirme la matrícula.</p>

              <div className="space-y-4">
                <div className="border p-3 rounded">
                  <div className="font-semibold mb-2">Documentos</div>
                  <ul className="text-sm">
                    {items.map((it) => (
                      <li key={it.id} className="flex justify-between">
                        <span>{it.name}</span>
                        <span className={`font-medium ${it.uploadedName ? 'text-green-700' : 'text-red-500'}`}>{it.uploadedName ? 'Cargado' : 'Faltante'}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border p-3 rounded">
                  <div className="font-semibold mb-2">Datos Familiares</div>
                  <div className="text-sm">
                    <div>Padre: {familyData.fatherName} · DNI: {familyData.fatherDni} · Tel: {familyData.fatherPhone}</div>
                    <div>Madre: {familyData.motherName} · DNI: {familyData.motherDni} · Tel: {familyData.motherPhone}</div>
                    <div>Dirección: {familyData.address}</div>
                  </div>
                </div>

                <div className="border p-3 rounded">
                  <div className="font-semibold mb-2">Apoderado</div>
                  <div className="text-sm">
                    <div>Nombre: {guardianData.name} · Relación: {guardianData.relationship}</div>
                    <div>DNI: {guardianData.dni} · Tel: {guardianData.phone}</div>
                  </div>
                </div>

                <div className="border p-3 rounded">
                  <div className="font-semibold mb-2">Datos del Alumno</div>
                  <div className="text-sm">
                    <div>Nombre: {studentData.name}</div>
                    <div>Grado: {studentData.grade}</div>
                    <div>DNI: {studentData.dni} · Nac.: {studentData.birthdate}</div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button onClick={() => setCurrentStep(0)} className="px-4 py-2 rounded border">Editar</button>
                  <button
                    onClick={() => {
                      // abrir modal de confirmación (simulado)
                      setSuccessOpen(true);
                    }}
                    className="px-4 py-2 rounded bg-accent-500 text-white"
                  >
                    Confirmar matrícula
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-end items-center gap-3 mt-6">
          <button
            onClick={goPrev}
            className="flex items-center gap-2 px-3 py-2 rounded border bg-white"
            aria-label="Anterior"
          >
            <MdArrowBack />
          </button>

          {/** compute disabled state for Next button */}
          <div>
            {/** nextDisabled mirrors goNext guards */}
            {
              (() => {
                // ocultar Siguiente en el paso Finalizar
                if (currentStep === 4) return null;
                const nextDisabled = (currentStep === 1 && !allRequiredUploaded) || (currentStep === 2 && !familyValid) || (currentStep === 3 && !studentValid);
                return (
                  <button
                    onClick={goNext}
                    className="flex items-center gap-2 px-3 py-2 rounded bg-accent-500 text-white disabled:opacity-50"
                    aria-label="Siguiente"
                    disabled={nextDisabled}
                  >
                    Siguiente <MdArrowForward />
                  </button>
                );
              })()
            }
          </div>
        </div>

        {/* Success modal */}
        {successOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-40" onClick={() => setSuccessOpen(false)} />
            <div className="relative bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3">Matrícula realizada</h3>
              <p className="text-sm text-gray-700 mb-4">La matrícula se ha realizado satisfactoriamente (simulado).</p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setSuccessOpen(false)} className="px-4 py-2 rounded border">Cerrar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MatriculaWeb;
