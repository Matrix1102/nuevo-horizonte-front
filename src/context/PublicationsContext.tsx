import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Publication } from '../types/Publication';
import type { Course } from '../types/Course';

interface PublicationsContextType {
  publications: Publication[];
  addPublication: (publication: Omit<Publication, 'id'>) => void;
  deletePublication: (id: string) => void;
  getPublicationsForUser: (userId: string, userType: 'alumno' | 'profesor' | 'administrativo') => Publication[];
}

const PublicationsContext = createContext<PublicationsContextType | undefined>(undefined);

// Publicaciones iniciales de ejemplo
const initialPublications: Publication[] = [
  {
    id: 'p1',
    title: 'Inicio del Año Escolar 2025',
    content: 'Les recordamos que el inicio de clases será el 15 de enero del 2025. Por favor, estar atentos a las próximas comunicaciones.',
    date: '2025-10-25',
    authorId: '3',
    authorName: 'Carlos Pérez',
    authorType: 'administrativo',
    targetAudience: 'all',
  },
  {
    id: 'p2',
    title: 'Inscripciones Abiertas',
    content: 'Las inscripciones para el nuevo año escolar están abiertas. Pueden realizarlas a través del módulo de Matrícula Web.',
    date: '2025-11-01',
    authorId: '3',
    authorName: 'Carlos Pérez',
    authorType: 'administrativo',
    targetAudience: 'all',
  },
  {
    id: 'p3',
    title: 'Tarea de Matemáticas - Semana 10',
    content: 'Estimados alumnos, para la próxima semana deben completar los ejercicios de las páginas 45 a 50 del libro de texto. No olviden revisar los ejemplos que trabajamos en clase.',
    date: '2025-11-15',
    authorId: '2',
    authorName: 'Profesora Rivera',
    authorType: 'profesor',
    targetAudience: 'students',
    targetCourses: ['c1'], // Matemáticas 5to A
  },
  {
    id: 'p4',
    title: 'Reunión de Padres de Familia',
    content: 'Se convoca a todos los padres de familia a la reunión general que se realizará el día viernes 29 de noviembre a las 6:00 PM en el auditorio del colegio. Es de suma importancia su asistencia.',
    date: '2025-11-20',
    authorId: '3',
    authorName: 'Carlos Pérez',
    authorType: 'administrativo',
    targetAudience: 'all',
  },
];

export function PublicationsProvider({ children }: { children: ReactNode }) {
  const [publications, setPublications] = useState<Publication[]>(() => {
    const saved = localStorage.getItem('publications');
    return saved ? JSON.parse(saved) : initialPublications;
  });

  const addPublication = (publication: Omit<Publication, 'id'>) => {
    const newPublication: Publication = {
      ...publication,
      id: `p${Date.now()}`,
    };
    const updatedPublications = [newPublication, ...publications];
    setPublications(updatedPublications);
    localStorage.setItem('publications', JSON.stringify(updatedPublications));
  };

  const deletePublication = (id: string) => {
    const updatedPublications = publications.filter(p => p.id !== id);
    setPublications(updatedPublications);
    localStorage.setItem('publications', JSON.stringify(updatedPublications));
  };

  const getPublicationsForUser = (
    userId: string,
    userType: 'alumno' | 'profesor' | 'administrativo'
  ): Publication[] => {
    // Los administrativos ven todas las publicaciones
    if (userType === 'administrativo') {
      return publications;
    }

    // Los profesores ven todas las publicaciones generales y las suyas propias
    if (userType === 'profesor') {
      return publications.filter(
        p => p.targetAudience === 'all' || p.authorId === userId
      );
    }

    // Los alumnos ven publicaciones generales y las dirigidas a sus cursos
    if (userType === 'alumno') {
      // Obtener los cursos del alumno desde localStorage
      const savedCourses = localStorage.getItem('courses');
      const courses = savedCourses ? JSON.parse(savedCourses) : [];
      
      // Encontrar los IDs de los cursos donde está inscrito el alumno
      const studentCourseIds = courses
        .filter((course: Course) => 
          course.students.some((student) => student.id === `s${userId}`)
        )
        .map((course: Course) => course.id);

      return publications.filter(
        p =>
          p.targetAudience === 'all' ||
          (p.targetAudience === 'students' &&
            p.targetCourses?.some(courseId => studentCourseIds.includes(courseId)))
      );
    }

    return [];
  };

  return (
    <PublicationsContext.Provider
      value={{
        publications,
        addPublication,
        deletePublication,
        getPublicationsForUser,
      }}
    >
      {children}
    </PublicationsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePublications() {
  const context = useContext(PublicationsContext);
  if (context === undefined) {
    throw new Error('usePublications must be used within a PublicationsProvider');
  }
  return context;
}
