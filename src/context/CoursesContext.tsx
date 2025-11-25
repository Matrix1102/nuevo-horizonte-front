// src/context/CoursesContext.tsx

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Course, Student, DayAttendance, CourseGrades } from '../types/Course';

interface CoursesContextType {
  courses: Course[];
  addCourse: (course: Omit<Course, 'id' | 'students'>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  addStudentToCourse: (courseId: string, student: Omit<Student, 'id'>) => void;
  removeStudentFromCourse: (courseId: string, studentId: string) => void;
  attendance: DayAttendance[];
  saveAttendance: (data: DayAttendance) => void;
  courseGrades: CourseGrades[];
  saveCourseGrades: (data: CourseGrades) => void;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

// Datos iniciales de ejemplo
const initialCourses: Course[] = [
  {
    id: 'c1',
    name: 'Matemáticas',
    level: '5to Primaria',
    section: 'A',
    teacherId: '2',
    teacherName: 'Profesora Rivera',
    students: [
      { id: 's1', name: 'Jose Bayona', dni: '12345678', email: 'alumno@colegio.com' },
      { id: 's2', name: 'Ana García', dni: '23456789', email: 'ana.garcia@colegio.com' },
      { id: 's3', name: 'Carlos Pérez', dni: '34567890', email: 'carlos.perez@colegio.com' },
      { id: 's4', name: 'María López', dni: '45678901', email: 'maria.lopez@colegio.com' },
      { id: 's5', name: 'Laura Díaz', dni: '56789012', email: 'laura.diaz@colegio.com' },
      { id: 's6', name: 'Pedro Silva', dni: '67890123', email: 'pedro.silva@colegio.com' },
      { id: 's7', name: 'Sofia Rojas', dni: '78901234', email: 'sofia.rojas@colegio.com' },
      { id: 's8', name: 'Diego Castro', dni: '89012345', email: 'diego.castro@colegio.com' },
      { id: 's9', name: 'Valentina Ruiz', dni: '90123456', email: 'valentina.ruiz@colegio.com' },
      { id: 's10', name: 'Mateo Flores', dni: '01234567', email: 'mateo.flores@colegio.com' },
    ],
  },
  {
    id: 'c2',
    name: 'Comunicación',
    level: '5to Primaria',
    section: 'A',
    teacherId: '2',
    teacherName: 'Profesora Torres',
    students: [
      { id: 's1', name: 'Jose Bayona', dni: '12345678', email: 'alumno@colegio.com' },
      { id: 's2', name: 'Ana García', dni: '23456789', email: 'ana.garcia@colegio.com' },
      { id: 's3', name: 'Carlos Pérez', dni: '34567890', email: 'carlos.perez@colegio.com' },
      { id: 's4', name: 'María López', dni: '45678901', email: 'maria.lopez@colegio.com' },
      { id: 's5', name: 'Laura Díaz', dni: '56789012', email: 'laura.diaz@colegio.com' },
      { id: 's6', name: 'Pedro Silva', dni: '67890123', email: 'pedro.silva@colegio.com' },
      { id: 's7', name: 'Sofia Rojas', dni: '78901234', email: 'sofia.rojas@colegio.com' },
      { id: 's8', name: 'Diego Castro', dni: '89012345', email: 'diego.castro@colegio.com' },
      { id: 's9', name: 'Valentina Ruiz', dni: '90123456', email: 'valentina.ruiz@colegio.com' },
      { id: 's10', name: 'Mateo Flores', dni: '01234567', email: 'mateo.flores@colegio.com' },
    ],
  },
  {
    id: 'c3',
    name: 'Ciencias',
    level: '5to Primaria',
    section: 'A',
    teacherId: '2',
    teacherName: 'Profesor Gómez',
    students: [
      { id: 's1', name: 'Jose Bayona', dni: '12345678', email: 'alumno@colegio.com' },
      { id: 's2', name: 'Ana García', dni: '23456789', email: 'ana.garcia@colegio.com' },
      { id: 's3', name: 'Carlos Pérez', dni: '34567890', email: 'carlos.perez@colegio.com' },
      { id: 's4', name: 'María López', dni: '45678901', email: 'maria.lopez@colegio.com' },
      { id: 's5', name: 'Laura Díaz', dni: '56789012', email: 'laura.diaz@colegio.com' },
      { id: 's6', name: 'Pedro Silva', dni: '67890123', email: 'pedro.silva@colegio.com' },
      { id: 's7', name: 'Sofia Rojas', dni: '78901234', email: 'sofia.rojas@colegio.com' },
      { id: 's8', name: 'Diego Castro', dni: '89012345', email: 'diego.castro@colegio.com' },
      { id: 's9', name: 'Valentina Ruiz', dni: '90123456', email: 'valentina.ruiz@colegio.com' },
      { id: 's10', name: 'Mateo Flores', dni: '01234567', email: 'mateo.flores@colegio.com' },
    ],
  },
  {
    id: 'c4',
    name: 'Historia',
    level: '5to Primaria',
    section: 'A',
    teacherId: '2',
    teacherName: 'Profesora Ruiz',
    students: [
      { id: 's1', name: 'Jose Bayona', dni: '12345678', email: 'alumno@colegio.com' },
      { id: 's2', name: 'Ana García', dni: '23456789', email: 'ana.garcia@colegio.com' },
      { id: 's3', name: 'Carlos Pérez', dni: '34567890', email: 'carlos.perez@colegio.com' },
      { id: 's4', name: 'María López', dni: '45678901', email: 'maria.lopez@colegio.com' },
      { id: 's5', name: 'Laura Díaz', dni: '56789012', email: 'laura.diaz@colegio.com' },
      { id: 's6', name: 'Pedro Silva', dni: '67890123', email: 'pedro.silva@colegio.com' },
      { id: 's7', name: 'Sofia Rojas', dni: '78901234', email: 'sofia.rojas@colegio.com' },
      { id: 's8', name: 'Diego Castro', dni: '89012345', email: 'diego.castro@colegio.com' },
      { id: 's9', name: 'Valentina Ruiz', dni: '90123456', email: 'valentina.ruiz@colegio.com' },
      { id: 's10', name: 'Mateo Flores', dni: '01234567', email: 'mateo.flores@colegio.com' },
    ],
  },
  {
    id: 'c5',
    name: 'Inglés',
    level: '5to Primaria',
    section: 'A',
    teacherId: '2',
    teacherName: 'Profesora Lee',
    students: [
      { id: 's1', name: 'Jose Bayona', dni: '12345678', email: 'alumno@colegio.com' },
      { id: 's2', name: 'Ana García', dni: '23456789', email: 'ana.garcia@colegio.com' },
      { id: 's3', name: 'Carlos Pérez', dni: '34567890', email: 'carlos.perez@colegio.com' },
      { id: 's4', name: 'María López', dni: '45678901', email: 'maria.lopez@colegio.com' },
      { id: 's5', name: 'Laura Díaz', dni: '56789012', email: 'laura.diaz@colegio.com' },
      { id: 's6', name: 'Pedro Silva', dni: '67890123', email: 'pedro.silva@colegio.com' },
      { id: 's7', name: 'Sofia Rojas', dni: '78901234', email: 'sofia.rojas@colegio.com' },
      { id: 's8', name: 'Diego Castro', dni: '89012345', email: 'diego.castro@colegio.com' },
      { id: 's9', name: 'Valentina Ruiz', dni: '90123456', email: 'valentina.ruiz@colegio.com' },
      { id: 's10', name: 'Mateo Flores', dni: '01234567', email: 'mateo.flores@colegio.com' },
    ],
  },
  {
    id: 'c6',
    name: 'Arte',
    level: '5to Primaria',
    section: 'A',
    teacherId: '2',
    teacherName: 'Profesora Díaz',
    students: [
      { id: 's1', name: 'Jose Bayona', dni: '12345678', email: 'alumno@colegio.com' },
      { id: 's2', name: 'Ana García', dni: '23456789', email: 'ana.garcia@colegio.com' },
      { id: 's3', name: 'Carlos Pérez', dni: '34567890', email: 'carlos.perez@colegio.com' },
      { id: 's4', name: 'María López', dni: '45678901', email: 'maria.lopez@colegio.com' },
      { id: 's5', name: 'Laura Díaz', dni: '56789012', email: 'laura.diaz@colegio.com' },
      { id: 's6', name: 'Pedro Silva', dni: '67890123', email: 'pedro.silva@colegio.com' },
      { id: 's7', name: 'Sofia Rojas', dni: '78901234', email: 'sofia.rojas@colegio.com' },
      { id: 's8', name: 'Diego Castro', dni: '89012345', email: 'diego.castro@colegio.com' },
      { id: 's9', name: 'Valentina Ruiz', dni: '90123456', email: 'valentina.ruiz@colegio.com' },
      { id: 's10', name: 'Mateo Flores', dni: '01234567', email: 'mateo.flores@colegio.com' },
    ],
  },
  {
    id: 'c7',
    name: 'Educación Física',
    level: '5to Primaria',
    section: 'A',
    teacherId: '2',
    teacherName: 'Profesor Soto',
    students: [
      { id: 's1', name: 'Jose Bayona', dni: '12345678', email: 'alumno@colegio.com' },
      { id: 's2', name: 'Ana García', dni: '23456789', email: 'ana.garcia@colegio.com' },
      { id: 's3', name: 'Carlos Pérez', dni: '34567890', email: 'carlos.perez@colegio.com' },
      { id: 's4', name: 'María López', dni: '45678901', email: 'maria.lopez@colegio.com' },
      { id: 's5', name: 'Laura Díaz', dni: '56789012', email: 'laura.diaz@colegio.com' },
      { id: 's6', name: 'Pedro Silva', dni: '67890123', email: 'pedro.silva@colegio.com' },
      { id: 's7', name: 'Sofia Rojas', dni: '78901234', email: 'sofia.rojas@colegio.com' },
      { id: 's8', name: 'Diego Castro', dni: '89012345', email: 'diego.castro@colegio.com' },
      { id: 's9', name: 'Valentina Ruiz', dni: '90123456', email: 'valentina.ruiz@colegio.com' },
      { id: 's10', name: 'Mateo Flores', dni: '01234567', email: 'mateo.flores@colegio.com' },
    ],
  },
];

// Datos iniciales de asistencia
const initialAttendance: DayAttendance[] = [
  {
    date: '2025-11-03',
    courseId: 'c1',
    attendance: [
      { studentId: 's1', status: 'Presente' },
      { studentId: 's2', status: 'Presente' },
      { studentId: 's3', status: 'Ausente' },
      { studentId: 's4', status: 'Presente' },
      { studentId: 's5', status: 'Presente' },
      { studentId: 's6', status: 'Presente' },
      { studentId: 's7', status: 'Tardanza' },
      { studentId: 's8', status: 'Presente' },
      { studentId: 's9', status: 'Presente' },
      { studentId: 's10', status: 'Presente' },
    ],
  },
  {
    date: '2025-11-04',
    courseId: 'c1',
    attendance: [
      { studentId: 's1', status: 'Presente' },
      { studentId: 's2', status: 'Presente' },
      { studentId: 's3', status: 'Presente' },
      { studentId: 's4', status: 'Tardanza' },
      { studentId: 's5', status: 'Presente' },
      { studentId: 's6', status: 'Presente' },
      { studentId: 's7', status: 'Presente' },
      { studentId: 's8', status: 'Falta justificada' },
      { studentId: 's9', status: 'Presente' },
      { studentId: 's10', status: 'Presente' },
    ],
  },
  {
    date: '2025-11-05',
    courseId: 'c2',
    attendance: [
      { studentId: 's1', status: 'Presente' },
      { studentId: 's2', status: 'Presente' },
      { studentId: 's3', status: 'Presente' },
      { studentId: 's4', status: 'Presente' },
      { studentId: 's5', status: 'Presente' },
      { studentId: 's6', status: 'Ausente' },
      { studentId: 's7', status: 'Presente' },
      { studentId: 's8', status: 'Presente' },
      { studentId: 's9', status: 'Tardanza' },
      { studentId: 's10', status: 'Presente' },
    ],
  },
  {
    date: '2025-11-06',
    courseId: 'c3',
    attendance: [
      { studentId: 's1', status: 'Presente' },
      { studentId: 's2', status: 'Tardanza' },
      { studentId: 's3', status: 'Presente' },
      { studentId: 's4', status: 'Presente' },
      { studentId: 's5', status: 'Presente' },
      { studentId: 's6', status: 'Presente' },
      { studentId: 's7', status: 'Presente' },
      { studentId: 's8', status: 'Presente' },
      { studentId: 's9', status: 'Presente' },
      { studentId: 's10', status: 'Falta justificada' },
    ],
  },
  {
    date: '2025-11-07',
    courseId: 'c4',
    attendance: [
      { studentId: 's1', status: 'Presente' },
      { studentId: 's2', status: 'Presente' },
      { studentId: 's3', status: 'Presente' },
      { studentId: 's4', status: 'Presente' },
      { studentId: 's5', status: 'Ausente' },
      { studentId: 's6', status: 'Presente' },
      { studentId: 's7', status: 'Presente' },
      { studentId: 's8', status: 'Presente' },
      { studentId: 's9', status: 'Presente' },
      { studentId: 's10', status: 'Presente' },
    ],
  },
  {
    date: '2025-11-10',
    courseId: 'c5',
    attendance: [
      { studentId: 's1', status: 'Presente' },
      { studentId: 's2', status: 'Presente' },
      { studentId: 's3', status: 'Tardanza' },
      { studentId: 's4', status: 'Presente' },
      { studentId: 's5', status: 'Presente' },
      { studentId: 's6', status: 'Presente' },
      { studentId: 's7', status: 'Presente' },
      { studentId: 's8', status: 'Presente' },
      { studentId: 's9', status: 'Presente' },
      { studentId: 's10', status: 'Ausente' },
    ],
  },
  {
    date: '2025-11-11',
    courseId: 'c6',
    attendance: [
      { studentId: 's1', status: 'Presente' },
      { studentId: 's2', status: 'Presente' },
      { studentId: 's3', status: 'Presente' },
      { studentId: 's4', status: 'Presente' },
      { studentId: 's5', status: 'Presente' },
      { studentId: 's6', status: 'Presente' },
      { studentId: 's7', status: 'Falta justificada' },
      { studentId: 's8', status: 'Presente' },
      { studentId: 's9', status: 'Presente' },
      { studentId: 's10', status: 'Presente' },
    ],
  },
  {
    date: '2025-11-12',
    courseId: 'c7',
    attendance: [
      { studentId: 's1', status: 'Presente' },
      { studentId: 's2', status: 'Presente' },
      { studentId: 's3', status: 'Presente' },
      { studentId: 's4', status: 'Tardanza' },
      { studentId: 's5', status: 'Presente' },
      { studentId: 's6', status: 'Presente' },
      { studentId: 's7', status: 'Presente' },
      { studentId: 's8', status: 'Presente' },
      { studentId: 's9', status: 'Presente' },
      { studentId: 's10', status: 'Presente' },
    ],
  },
];

// Datos iniciales de notas por bimestre (4 bimestres, escala 0-20)
const initialGrades: CourseGrades[] = [
  {
    courseId: 'c1',
    grades: [
      { studentId: 's1', grades: [16, 17, 18, null] },
      { studentId: 's2', grades: [18, 19, 18, null] },
      { studentId: 's3', grades: [14, 15, 16, null] },
      { studentId: 's4', grades: [15, 16, 17, null] },
      { studentId: 's5', grades: [17, 18, 18, null] },
      { studentId: 's6', grades: [16, 17, 16, null] },
      { studentId: 's7', grades: [13, 14, 15, null] },
      { studentId: 's8', grades: [19, 20, 19, null] },
      { studentId: 's9', grades: [15, 16, 17, null] },
      { studentId: 's10', grades: [14, 15, 16, null] },
    ],
  },
  {
    courseId: 'c2',
    grades: [
      { studentId: 's1', grades: [17, 18, 17, null] },
      { studentId: 's2', grades: [16, 17, 18, null] },
      { studentId: 's3', grades: [15, 16, 16, null] },
      { studentId: 's4', grades: [18, 17, 18, null] },
      { studentId: 's5', grades: [16, 17, 17, null] },
      { studentId: 's6', grades: [14, 15, 16, null] },
      { studentId: 's7', grades: [17, 18, 19, null] },
      { studentId: 's8', grades: [18, 19, 19, null] },
      { studentId: 's9', grades: [16, 16, 17, null] },
      { studentId: 's10', grades: [15, 16, 17, null] },
    ],
  },
  {
    courseId: 'c3',
    grades: [
      { studentId: 's1', grades: [15, 16, 17, null] },
      { studentId: 's2', grades: [17, 18, 18, null] },
      { studentId: 's3', grades: [16, 17, 17, null] },
      { studentId: 's4', grades: [14, 15, 16, null] },
      { studentId: 's5', grades: [18, 19, 19, null] },
      { studentId: 's6', grades: [15, 16, 17, null] },
      { studentId: 's7', grades: [16, 17, 18, null] },
      { studentId: 's8', grades: [17, 18, 17, null] },
      { studentId: 's9', grades: [19, 19, 20, null] },
      { studentId: 's10', grades: [13, 14, 15, null] },
    ],
  },
  {
    courseId: 'c4',
    grades: [
      { studentId: 's1', grades: [18, 17, 18, null] },
      { studentId: 's2', grades: [16, 17, 17, null] },
      { studentId: 's3', grades: [17, 18, 18, null] },
      { studentId: 's4', grades: [15, 16, 17, null] },
      { studentId: 's5', grades: [14, 15, 16, null] },
      { studentId: 's6', grades: [18, 19, 19, null] },
      { studentId: 's7', grades: [16, 17, 17, null] },
      { studentId: 's8', grades: [17, 18, 19, null] },
      { studentId: 's9', grades: [15, 16, 16, null] },
      { studentId: 's10', grades: [16, 17, 18, null] },
    ],
  },
  {
    courseId: 'c5',
    grades: [
      { studentId: 's1', grades: [16, 17, 18, null] },
      { studentId: 's2', grades: [18, 18, 19, null] },
      { studentId: 's3', grades: [14, 15, 16, null] },
      { studentId: 's4', grades: [17, 18, 18, null] },
      { studentId: 's5', grades: [15, 16, 17, null] },
      { studentId: 's6', grades: [19, 19, 20, null] },
      { studentId: 's7', grades: [16, 17, 17, null] },
      { studentId: 's8', grades: [18, 19, 19, null] },
      { studentId: 's9', grades: [14, 15, 16, null] },
      { studentId: 's10', grades: [13, 14, 15, null] },
    ],
  },
  {
    courseId: 'c6',
    grades: [
      { studentId: 's1', grades: [19, 19, 20, null] },
      { studentId: 's2', grades: [18, 19, 19, null] },
      { studentId: 's3', grades: [17, 18, 18, null] },
      { studentId: 's4', grades: [16, 17, 18, null] },
      { studentId: 's5', grades: [18, 18, 19, null] },
      { studentId: 's6', grades: [17, 18, 18, null] },
      { studentId: 's7', grades: [19, 20, 20, null] },
      { studentId: 's8', grades: [16, 17, 18, null] },
      { studentId: 's9', grades: [18, 19, 19, null] },
      { studentId: 's10', grades: [15, 16, 17, null] },
    ],
  },
  {
    courseId: 'c7',
    grades: [
      { studentId: 's1', grades: [18, 18, 19, null] },
      { studentId: 's2', grades: [17, 18, 18, null] },
      { studentId: 's3', grades: [16, 17, 17, null] },
      { studentId: 's4', grades: [19, 19, 20, null] },
      { studentId: 's5', grades: [18, 18, 19, null] },
      { studentId: 's6', grades: [17, 18, 18, null] },
      { studentId: 's7', grades: [16, 16, 17, null] },
      { studentId: 's8', grades: [18, 19, 19, null] },
      { studentId: 's9', grades: [17, 18, 19, null] },
      { studentId: 's10', grades: [19, 19, 20, null] },
    ],
  },
];

export function CoursesProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [attendance, setAttendance] = useState<DayAttendance[]>(() => {
    const saved = localStorage.getItem('attendance');
    return saved ? JSON.parse(saved) : initialAttendance;
  });

  const [courseGrades, setCourseGrades] = useState<CourseGrades[]>(() => {
    const saved = localStorage.getItem('courseGrades');
    return saved ? JSON.parse(saved) : initialGrades;
  });

  const addCourse = (course: Omit<Course, 'id' | 'students'>) => {
    const newCourse: Course = {
      ...course,
      id: `c${Date.now()}`,
      students: [],
    };
    const updated = [...courses, newCourse];
    setCourses(updated);
    localStorage.setItem('courses', JSON.stringify(updated));
  };

  const updateCourse = (id: string, courseData: Partial<Course>) => {
    const updated = courses.map((c) => (c.id === id ? { ...c, ...courseData } : c));
    setCourses(updated);
    localStorage.setItem('courses', JSON.stringify(updated));
  };

  const deleteCourse = (id: string) => {
    const updated = courses.filter((c) => c.id !== id);
    setCourses(updated);
    localStorage.setItem('courses', JSON.stringify(updated));
  };

  const addStudentToCourse = (courseId: string, student: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...student,
      id: `s${Date.now()}`,
    };
    const updated = courses.map((c) =>
      c.id === courseId ? { ...c, students: [...c.students, newStudent] } : c
    );
    setCourses(updated);
    localStorage.setItem('courses', JSON.stringify(updated));
  };

  const removeStudentFromCourse = (courseId: string, studentId: string) => {
    const updated = courses.map((c) =>
      c.id === courseId ? { ...c, students: c.students.filter((s) => s.id !== studentId) } : c
    );
    setCourses(updated);
    localStorage.setItem('courses', JSON.stringify(updated));
  };

  const saveAttendance = (data: DayAttendance) => {
    const existing = attendance.findIndex(
      (a) => a.date === data.date && a.courseId === data.courseId
    );
    let updated;
    if (existing >= 0) {
      updated = [...attendance];
      updated[existing] = data;
    } else {
      updated = [...attendance, data];
    }
    setAttendance(updated);
    localStorage.setItem('attendance', JSON.stringify(updated));
  };

  const saveCourseGrades = (data: CourseGrades) => {
    const existing = courseGrades.findIndex((g) => g.courseId === data.courseId);
    let updated;
    if (existing >= 0) {
      updated = [...courseGrades];
      updated[existing] = data;
    } else {
      updated = [...courseGrades, data];
    }
    setCourseGrades(updated);
    localStorage.setItem('courseGrades', JSON.stringify(updated));
  };

  return (
    <CoursesContext.Provider
      value={{
        courses,
        addCourse,
        updateCourse,
        deleteCourse,
        addStudentToCourse,
        removeStudentFromCourse,
        attendance,
        saveAttendance,
        courseGrades,
        saveCourseGrades,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCourses() {
  const context = useContext(CoursesContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }
  return context;
}