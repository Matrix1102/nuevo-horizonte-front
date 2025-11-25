import { useMemo, useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useMessaging } from '../hooks/useMessaging';
import type { Message } from '../context/MessagingContext';
import {
  MdMessage,
  MdCreate,
  MdInbox,
  MdSend,
  MdDrafts,
  MdDelete,
  MdClose,
  MdReply,
} from 'react-icons/md';

type Folder = 'recibidos' | 'enviados' | 'borradores' | 'papelera';

export function Mensajeria() {
  const { user } = useAuth();
  const { messages, setMessages, markAsRead, addMessage } = useMessaging();
  const [activeFolder, setActiveFolder] = useState<Folder>('recibidos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const folders = useMemo(
    () => [
      { key: 'recibidos', label: 'Recibidos', icon: MdInbox },
      { key: 'enviados', label: 'Enviados', icon: MdSend },
      { key: 'borradores', label: 'Borradores', icon: MdDrafts },
      { key: 'papelera', label: 'Papelera', icon: MdDelete },
    ],
    []
  );

  const visible = messages.filter((m) => {
    if (m.folder !== activeFolder) return false;
    
    // Filtrar por usuario según la carpeta
    if (activeFolder === 'recibidos') {
      return m.to === user?.name;
    } else if (activeFolder === 'enviados') {
      return m.from === user?.name;
    } else if (activeFolder === 'borradores' || activeFolder === 'papelera') {
      return m.from === user?.name;
    }
    
    return true;
  });

  useEffect(() => {
    if (selectedMessage && selectedMessage.folder === 'recibidos' && !selectedMessage.read) {
      markAsRead(selectedMessage.id);
    }
  }, [selectedMessage, markAsRead]);

  function openCreate() {
    setTo('');
    setSubject('');
    setBody('');
    setIsModalOpen(true);
  }

  function sendMessage() {
    addMessage({
      from: user?.name || 'Usuario',
      to: to || 'Destinatario',
      subject: subject || '(sin asunto)',
      body: body || '',
      date: new Date().toISOString(),
      folder: 'enviados',
    });
    setIsModalOpen(false);
  }

  return (
    <Layout>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl text-accent-500"><MdMessage /></span>
        <h2 className="text-primary-500 text-2xl font-bold">Mensajería</h2>
      </div>

      <div className="bg-white rounded-xl shadow-md border-l-4 border-accent-500 overflow-hidden">
        <div className="grid grid-cols-12">
          {/* Middle column (folders + create) - left menu removed (provided by Layout) */}
          <div className="col-span-4 border-r p-6">
            <button
              onClick={openCreate}
              className="w-full flex items-center gap-2 justify-center px-4 py-2 mb-4 rounded bg-accent-500 text-white hover:opacity-95"
            >
              <MdCreate /> Crear Mensaje
            </button>

            <ul className="space-y-2">
              {folders.map((f) => (
                <li
                  key={f.key}
                  className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 cursor-pointer ${
                    activeFolder === (f.key as Folder) ? 'bg-gray-100 font-semibold' : ''
                  }`}
                  onClick={() => setActiveFolder(f.key as Folder)}
                >
                  <span className="text-lg">
                    <f.icon />
                  </span>
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column (message list) */}
          <main className="col-span-8 p-6">
            <div className="space-y-4">
              {visible.length === 0 ? (
                <div className="text-gray-500">No hay mensajes en {activeFolder}.</div>
              ) : (
                visible.map((m) => (
                  <div
                    key={m.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedMessage(m)}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedMessage(m)}
                    className={`flex items-center gap-4 border-b pb-4 cursor-pointer hover:bg-gray-50 ${!m.read && m.folder === 'recibidos' ? 'bg-blue-50' : ''}`}
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xl">✉️</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className={`${!m.read && m.folder === 'recibidos' ? 'font-bold' : 'font-semibold'}`}>
                          {!m.read && m.folder === 'recibidos' && <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>}
                          {m.subject}
                        </div>
                        <div className="text-sm text-gray-500">{new Date(m.date).toLocaleDateString('es-PE')}</div>
                      </div>
                      <div className="text-sm text-gray-600">{m.from} — {m.body}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Modal Crear Mensaje */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-lg w-full max-w-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2"><MdCreate /> Crear Mensaje</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded hover:bg-gray-100">
                <MdClose />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600">Para</label>
                <input value={to} onChange={(e) => setTo(e.target.value)} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Asunto</label>
                <input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Mensaje</label>
                <textarea value={body} onChange={(e) => setBody(e.target.value)} className="w-full border rounded px-3 py-2 h-40" />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded border">Cancelar</button>
              <button onClick={sendMessage} className="px-4 py-2 rounded bg-accent-500 text-white">Enviar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal / Drawer: Message detail (open when a message is selected) */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-40" onClick={() => setSelectedMessage(null)} />
          <div className="relative bg-white rounded-lg w-full max-w-2xl p-6 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm text-gray-500">De: <span className="font-medium">{selectedMessage.from}</span></div>
                <div className="text-sm text-gray-500">Para: <span className="font-medium">{selectedMessage.to}</span></div>
                <div className="text-xs text-gray-400">{new Date(selectedMessage.date).toLocaleString('es-PE')}</div>
                <h3 className="text-lg font-semibold mt-2">{selectedMessage.subject}</h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    // Reply: prefill create modal
                    setTo(selectedMessage.from);
                    setSubject(`RE: ${selectedMessage.subject}`);
                    setBody(`\n\n---\n${selectedMessage.body}`);
                    setSelectedMessage(null);
                    setIsModalOpen(true);
                  }}
                  className="px-3 py-2 rounded bg-accent-100 text-accent-700 flex items-center gap-2"
                >
                  <MdReply /> Responder
                </button>
                <button
                  onClick={() => {
                    // move to papelera
                    setMessages((s) => s.map((mm) => (mm.id === selectedMessage.id ? { ...mm, folder: 'papelera' } : mm)));
                    setSelectedMessage(null);
                  }}
                  className="px-3 py-2 rounded border text-red-600 flex items-center gap-2"
                >
                  <MdDelete /> Eliminar
                </button>
                <button onClick={() => setSelectedMessage(null)} className="p-2 rounded hover:bg-gray-100">
                  <MdClose />
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-700 whitespace-pre-wrap">{selectedMessage.body}</div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Mensajeria;
