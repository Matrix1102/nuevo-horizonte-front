import { useState } from 'react';
import { Layout } from '../components/Layout';
import { MdCampaign, MdAdd, MdDelete } from 'react-icons/md';
import { usePublications } from '../context/PublicationsContext';
import { useAuth } from '../context/AuthContext';
import { PublicationModal } from '../components/PublicationModal';

export function Publicaciones() {
  const { user } = useAuth();
  const { getPublicationsForUser, addPublication, deletePublication } = usePublications();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) return null;

  const userPublications = getPublicationsForUser(user.id, user.type);
  const canCreatePublication = user.type === 'administrativo' || user.type === 'profesor';

  const handleDelete = (id: string) => {
    if (window.confirm('¿Está seguro de eliminar esta publicación?')) {
      deletePublication(id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getPublicationColor = (authorType: 'administrativo' | 'profesor') => {
    return authorType === 'administrativo' ? 'border-accent-500' : 'border-warm-500';
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="text-3xl text-accent-500"><MdCampaign /></span>
          <h2 className="text-primary-500 text-2xl font-bold">Publicaciones</h2>
        </div>
        {canCreatePublication && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-accent-500 text-white px-4 py-2 rounded-lg hover:bg-accent-600 transition-colors flex items-center gap-2"
          >
            <MdAdd size={20} />
            Nueva Publicación
          </button>
        )}
      </div>

      <div className="bg-white p-8 rounded-xl shadow-md">
        {userPublications.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No hay publicaciones disponibles
          </p>
        ) : (
          <div className="flex flex-col gap-5">
            {userPublications.map((publication) => (
              <div
                key={publication.id}
                className={`bg-soft-100 p-5 rounded-lg border-l-4 ${getPublicationColor(publication.authorType)}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-primary-500 text-xl font-semibold">
                    {publication.title}
                  </h3>
                  {user.id === publication.authorId && (
                    <button
                      onClick={() => handleDelete(publication.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Eliminar publicación"
                    >
                      <MdDelete size={20} />
                    </button>
                  )}
                </div>
                <p className="text-gray-500 text-sm mb-1 italic">
                  {formatDate(publication.date)} - {publication.authorName}
                </p>
                {publication.targetAudience === 'students' && publication.targetCourses && (
                  <p className="text-accent-600 text-xs mb-2 font-medium">
                    📚 Dirigido a cursos específicos
                  </p>
                )}
                <p className="text-gray-600 leading-relaxed">
                  {publication.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {canCreatePublication && (
        <PublicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={addPublication}
          authorId={user.id}
          authorName={user.name}
          authorType={user.type as 'administrativo' | 'profesor'}
        />
      )}
    </Layout>
  );
}
