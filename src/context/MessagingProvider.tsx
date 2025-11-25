import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { MessagingContext, type Message } from './MessagingContext';

const initialMessages: Message[] = [
  // Mensajes para el alumno Jose Bayona
  {
    id: 'm1',
    from: 'Prof. María García',
    to: 'Jose Bayona',
    subject: 'Recordatorio: Examen de Matemáticas',
    body: 'Hola Jose,\n\nTe recuerdo que este viernes 29 tendremos el examen bimestral. Repasa los ejercicios de las páginas 45-60 del libro.\n\nSi tienes dudas, estoy disponible martes y jueves de 2:00-3:00 PM.\n\nSaludos,\nProf. María',
    date: '2025-11-25T08:30:00',
    folder: 'recibidos',
    read: false,
  },
  {
    id: 'm2',
    from: 'Secretaría Académica',
    to: 'Jose Bayona',
    subject: 'Pago de pensión - Mes de Diciembre',
    body: 'Estimado Jose,\n\nTe recordamos que el pago de la pensión de diciembre vence el 30 de noviembre.\n\nPuedes realizar el pago en tesorería o mediante transferencia bancaria.\n\nGracias.',
    date: '2025-11-24T14:15:00',
    folder: 'recibidos',
    read: false,
  },
  {
    id: 'm3',
    from: 'Biblioteca',
    to: 'Jose Bayona',
    subject: 'Libro pendiente de devolución',
    body: 'Hola Jose,\n\nTienes pendiente la devolución del libro "Cien años de soledad" desde el 24 de noviembre.\n\nPor favor devuélvelo lo antes posible.\n\nGracias.',
    date: '2025-11-23T10:00:00',
    folder: 'recibidos',
    read: false,
  },

  // Mensajes para la profesora María García
  {
    id: 'm4',
    from: 'Carlos Pérez',
    to: 'María García',
    subject: 'Reunión pedagógica - Jueves 28',
    body: 'Estimada Profesora García,\n\nConvocamos a reunión de coordinación pedagógica:\n\nFecha: Jueves 28 de noviembre\nHora: 3:00 PM\nLugar: Sala de profesores\n\nTemas: Evaluación bimestral y planificación de cierre.\n\nSaludos.',
    date: '2025-11-25T09:00:00',
    folder: 'recibidos',
    read: false,
  },
  {
    id: 'm5',
    from: 'Sr. Carlos Bayona',
    to: 'María García',
    subject: 'Solicitud de reunión',
    body: 'Estimada Profesora,\n\nSoy el padre de Jose Bayona. Me gustaría reunirme con usted para hablar sobre su desempeño en Matemáticas.\n\n¿Podría indicarme su disponibilidad esta semana?\n\nEstoy disponible después de las 5:00 PM.\n\nGracias,\nCarlos Bayona',
    date: '2025-11-24T18:30:00',
    folder: 'recibidos',
    read: false,
  },
  {
    id: 'm6',
    from: 'Recursos Humanos',
    to: 'María García',
    subject: 'Confirmación: Certificado de capacitación',
    body: 'Estimada Profesora García,\n\nConfirmamos la recepción de su certificado del curso "Metodologías Activas" (40 horas).\n\nHa sido registrado en su expediente.\n\nFelicitaciones por su desarrollo profesional.\n\nSaludos.',
    date: '2025-11-22T11:45:00',
    folder: 'recibidos',
    read: false,
  },

  // Mensaje para el admin Carlos Pérez
  {
    id: 'm7',
    from: 'Ministerio de Educación',
    to: 'Carlos Pérez',
    subject: 'Actualización: Normativa educativa 2026',
    body: 'Estimado Director,\n\nLe informamos sobre las nuevas normativas para el año escolar 2026:\n\n- Nuevo currículo nacional modificado\n- Requisitos actualizados de infraestructura\n- Cambios en evaluación estudiantil\n\nDocumentos adjuntos disponibles en la plataforma MINEDU.\n\nSaludos cordiales.',
    date: '2025-11-25T07:00:00',
    folder: 'recibidos',
    read: false,
  },
];

export function MessagingProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const unreadCount = messages.filter(
    (m) => m.folder === 'recibidos' && !m.read
  ).length;

  const getUnreadCountForUser = (userName: string) => {
    return messages.filter(
      (m) => m.folder === 'recibidos' && !m.read && m.to === userName
    ).length;
  };

  const markAsRead = (messageId: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, read: true } : m))
    );
  };

  const addMessage = (message: Omit<Message, 'id'>) => {
    const newMessage: Message = {
      ...message,
      id: `m${Date.now()}`,
      read: message.folder === 'enviados',
    };
    setMessages((prev) => [newMessage, ...prev]);
  };

  return (
    <MessagingContext.Provider
      value={{
        messages,
        setMessages,
        unreadCount,
        markAsRead,
        addMessage,
        getUnreadCountForUser,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
}
