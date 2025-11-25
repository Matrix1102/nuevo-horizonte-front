import { useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { MdAppRegistration, MdFileDownload, MdUploadFile, MdArrowForward, MdArrowBack } from 'react-icons/md';
import { jsPDF } from 'jspdf';

type DocItem = { id: string; name: string; required?: boolean; uploadedName?: string };

const docs: DocItem[] = [
  { id: 'd1', name: 'Contrato de Prestación de Servicio', required: true },
  { id: 'd2', name: 'Documento de Identidad (DNI)', required: true },
  { id: 'd3', name: 'Certificado de Estudios', required: false },
  { id: 'd4', name: 'Fotografía reciente', required: false },
];

const steps = ['Documentos', 'Validar', 'Datos Familiares', 'Datos Alumno', 'Finalizar'];

// Función para generar PDF del contrato
function generateContractPDF() {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Título
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('CONTRATO DE PRESTACIÓN DE SERVICIO', pageWidth / 2, 20, { align: 'center' });
  
  // Subtítulo
  doc.setFontSize(14);
  doc.text('COLEGIO NUEVO HORIZONTE', pageWidth / 2, 30, { align: 'center' });
  
  // Contenido
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  let y = 45;
  const lineHeight = 7;
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  
  const sections = [
    {
      title: 'PRIMERA: PARTES CONTRATANTES',
      content: 'Conste por el presente documento el Contrato de Prestación de Servicios Educativos que celebran de una parte COLEGIO NUEVO HORIZONTE, con RUC N° 20123456789, en adelante EL COLEGIO; y de la otra parte, los padres o apoderados del estudiante, en adelante LOS CONTRATANTES.'
    },
    {
      title: 'SEGUNDA: OBJETO DEL CONTRATO',
      content: 'Por el presente contrato, EL COLEGIO se compromete a brindar el servicio educativo al estudiante de acuerdo al nivel y grado solicitado, conforme a las normas establecidas por el Ministerio de Educación y el Proyecto Educativo Institucional.'
    },
    {
      title: 'TERCERA: DURACIÓN',
      content: 'El presente contrato tiene vigencia durante el año escolar 2025, iniciando en enero y concluyendo en diciembre del mismo año.'
    },
    {
      title: 'CUARTA: OBLIGACIONES DEL COLEGIO',
      content: 'EL COLEGIO se compromete a: a) Brindar una educación de calidad. b) Proporcionar las facilidades necesarias para el desarrollo académico. c) Mantener informados a los padres sobre el progreso del estudiante. d) Cumplir con el plan curricular establecido.'
    },
    {
      title: 'QUINTA: OBLIGACIONES DE LOS CONTRATANTES',
      content: 'LOS CONTRATANTES se comprometen a: a) Cancelar puntualmente las pensiones mensuales. b) Asistir a las reuniones convocadas por el colegio. c) Apoyar el proceso educativo del estudiante. d) Cumplir con el reglamento interno del colegio.'
    },
    {
      title: 'SEXTA: PENSIÓN EDUCATIVA',
      content: 'La pensión mensual acordada es de S/. 500.00 (Quinientos con 00/100 Soles), a cancelarse dentro de los primeros 10 días de cada mes. La matrícula tiene un costo de S/. 300.00 (Trescientos con 00/100 Soles).'
    }
  ];
  
  sections.forEach((section) => {
    // Título de sección
    doc.setFont('helvetica', 'bold');
    const titleLines = doc.splitTextToSize(section.title, maxWidth);
    titleLines.forEach((line: string) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });
    
    // Contenido de sección
    doc.setFont('helvetica', 'normal');
    const contentLines = doc.splitTextToSize(section.content, maxWidth);
    contentLines.forEach((line: string) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });
    
    y += lineHeight; // Espacio entre secciones
  });
  
  // Firmas
  if (y > 230) {
    doc.addPage();
    y = 20;
  }
  
  y += 20;
  doc.setFont('helvetica', 'bold');
  doc.text('_________________________', margin, y);
  doc.text('_________________________', pageWidth - margin - 60, y);
  y += 7;
  doc.setFontSize(10);
  doc.text('FIRMA DEL PADRE/MADRE', margin, y);
  doc.text('FIRMA DEL DIRECTOR', pageWidth - margin - 60, y);
  
  return doc;
}

// Función para generar formato de DNI
function generateDNIFormat() {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('FORMATO DE DOCUMENTO DE IDENTIDAD', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  let y = 40;
  doc.text('Instrucciones:', 20, y);
  y += 10;
  doc.setFontSize(11);
  
  const instructions = [
    '1. Escanear o fotografiar ambos lados del DNI del estudiante',
    '2. El documento debe estar vigente y en buen estado',
    '3. La imagen debe ser legible y en color',
    '4. Formato aceptado: PDF, JPG o PNG',
    '5. Tamaño máximo: 5 MB'
  ];
  
  instructions.forEach(instruction => {
    doc.text(instruction, 25, y);
    y += 8;
  });
  
  y += 15;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Datos a verificar en el DNI:', 20, y);
  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  
  const fields = [
    'Nombres completos: _________________________________________',
    'Apellidos: _________________________________________',
    'Número de DNI: _________________________________________',
    'Fecha de nacimiento: _________________________________________',
    'Fecha de emisión: _________________________________________'
  ];
  
  fields.forEach(field => {
    doc.text(field, 25, y);
    y += 10;
  });
  
  return doc;
}

// Función para generar formato de certificado de estudios
function generateStudyCertificateFormat() {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('SOLICITUD DE CERTIFICADO DE ESTUDIOS', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  let y = 40;
  const fields = [
    'Yo, __________________________________ identificado con DNI N° ______________',
    'Padre/Madre/Apoderado del estudiante: ________________________________________',
    'Solicito el certificado de estudios correspondiente al año escolar: __________',
    'Del colegio: _____________________________________________________________',
    '',
    'Declaro que la información proporcionada es verídica.',
    '',
    '',
    'Firma: _______________________',
    'Fecha: _______________________',
  ];
  
  fields.forEach(field => {
    doc.text(field, 20, y);
    y += 10;
  });
  
  y += 20;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.text('Nota: Este documento debe ser llenado y firmado por el padre/madre o apoderado.', 20, y);
  
  return doc;
}

// Función para generar formato de fotografía
function generatePhotoFormat() {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('REQUISITOS PARA LA FOTOGRAFÍA', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  let y = 40;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Especificaciones técnicas:', 20, y);
  y += 10;
  doc.setFont('helvetica', 'normal');
  
  const specs = [
    '• Tamaño: 3x4 cm (foto carnet)',
    '• Fondo: Blanco liso',
    '• Vestimenta: Formal (camisa blanca o uniforme)',
    '• Posición: Rostro de frente, sin inclinación',
    '• Expresión: Seria, boca cerrada',
    '• Reciente: No mayor a 3 meses',
    '• Formato digital: JPG o PNG',
    '• Resolución mínima: 600 x 800 píxeles',
    '• Sin accesorios: Gorros, lentes de sol, etc.'
  ];
  
  specs.forEach(spec => {
    doc.text(spec, 25, y);
    y += 8;
  });
  
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Importante:', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.text('La fotografía será utilizada para el carnet estudiantil y documentos oficiales.', 25, y);
  y += 7;
  doc.text('Debe reflejar la apariencia actual del estudiante.', 25, y);
  
  return doc;
}

// Función para descargar documentos según el tipo
function downloadDocument(docId: string) {
  let pdf: jsPDF;
  let filename: string;
  
  switch(docId) {
    case 'd1':
      pdf = generateContractPDF();
      filename = 'Contrato_Prestacion_Servicio.pdf';
      break;
    case 'd2':
      pdf = generateDNIFormat();
      filename = 'Formato_DNI.pdf';
      break;
    case 'd3':
      pdf = generateStudyCertificateFormat();
      filename = 'Formato_Certificado_Estudios.pdf';
      break;
    case 'd4':
      pdf = generatePhotoFormat();
      filename = 'Requisitos_Fotografia.pdf';
      break;
    default:
      return;
  }
  
  pdf.save(filename);
}

// Función para generar constancia de matrícula
function generateEnrollmentReceipt(
  studentData: { name: string; grade: string; dni: string; birthdate: string },
  familyData: {
    fatherName: string;
    fatherDni: string;
    fatherPhone: string;
    motherName: string;
    motherDni: string;
    motherPhone: string;
    address: string;
  },
  guardianData: { name: string; relationship: string; dni: string; phone: string }
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Encabezado
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('CONSTANCIA DE MATRÍCULA', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.text('COLEGIO NUEVO HORIZONTE', pageWidth / 2, 30, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('RUC: 20123456789', pageWidth / 2, 37, { align: 'center' });
  doc.text('Av. La Educación 456, Lima - Perú', pageWidth / 2, 43, { align: 'center' });
  
  // Número de constancia
  const enrollmentNumber = 'MAT-2025-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`N° ${enrollmentNumber}`, pageWidth / 2, 53, { align: 'center' });
  
  let y = 70;
  doc.setFont('helvetica', 'normal');
  doc.text(`Fecha: ${new Date().toLocaleDateString('es-PE')}`, 20, y);
  
  y += 15;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('DATOS DEL ESTUDIANTE', 20, y);
  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  
  const studentInfo = [
    `Nombres y Apellidos: ${studentData.name}`,
    `DNI: ${studentData.dni}`,
    `Fecha de Nacimiento: ${new Date(studentData.birthdate).toLocaleDateString('es-PE')}`,
    `Grado: ${studentData.grade}`,
  ];
  
  studentInfo.forEach(info => {
    doc.text(info, 25, y);
    y += 7;
  });
  
  y += 8;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('DATOS DE LOS PADRES', 20, y);
  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  
  const parentsInfo = [
    `Padre: ${familyData.fatherName} - DNI: ${familyData.fatherDni}`,
    `Teléfono: ${familyData.fatherPhone}`,
    `Madre: ${familyData.motherName} - DNI: ${familyData.motherDni}`,
    `Teléfono: ${familyData.motherPhone}`,
    `Dirección: ${familyData.address}`,
  ];
  
  parentsInfo.forEach(info => {
    doc.text(info, 25, y);
    y += 7;
  });
  
  y += 8;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('APODERADO', 20, y);
  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  
  const guardianInfo = [
    `Nombres y Apellidos: ${guardianData.name}`,
    `Parentesco: ${guardianData.relationship}`,
    `DNI: ${guardianData.dni}`,
    `Teléfono: ${guardianData.phone}`,
  ];
  
  guardianInfo.forEach(info => {
    doc.text(info, 25, y);
    y += 7;
  });
  
  y += 15;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('INFORMACIÓN FINANCIERA', 20, y);
  y += 10;
  doc.setFont('helvetica', 'normal');
  
  const financialInfo = [
    'Matrícula: S/. 300.00',
    'Pensión Mensual: S/. 500.00',
    'Periodo: Enero - Diciembre 2025',
  ];
  
  financialInfo.forEach(info => {
    doc.text(info, 25, y);
    y += 7;
  });
  
  y += 15;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  const declaration = doc.splitTextToSize(
    'El presente documento certifica que el estudiante ha completado exitosamente el proceso de matrícula web para el año escolar 2025. Los padres/apoderados se comprometen a cumplir con el reglamento interno y las obligaciones económicas acordadas.',
    pageWidth - 40
  );
  
  declaration.forEach((line: string) => {
    doc.text(line, 20, y);
    y += 6;
  });
  
  y += 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('_________________________', 20, y);
  doc.text('_________________________', pageWidth - 70, y);
  y += 7;
  doc.setFontSize(10);
  doc.text('Firma del Director', 20, y);
  doc.text('Firma del Padre/Madre', pageWidth - 70, y);
  
  return doc;
}

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
                      <button 
                        className="text-sm text-blue-600 flex items-center gap-1 hover:text-blue-800" 
                        onClick={() => downloadDocument(it.id)}
                      >
                        <MdFileDownload /> Descargar
                      </button>

                      <label className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded cursor-pointer hover:bg-gray-100">
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
                      // Generar constancia de matrícula
                      const receipt = generateEnrollmentReceipt(studentData, familyData, guardianData);
                      receipt.save('Constancia_Matricula.pdf');
                      // abrir modal de confirmación
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
