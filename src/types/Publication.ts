export interface Publication {
  id: string;
  title: string;
  content: string;
  date: string;
  authorId: string;
  authorName: string;
  authorType: 'administrativo' | 'profesor';
  targetAudience: 'all' | 'students'; // all = todos, students = solo alumnos de cursos específicos
  targetCourses?: string[]; // IDs de cursos (solo si targetAudience = 'students')
}
