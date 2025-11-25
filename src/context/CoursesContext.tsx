// src/context/CoursesContext.tsx

import { createContext, useContext, useState, ReactNode } from 'react';
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
    teacherName: 'María García',
    students: [
      { id: 's1', name: 'Ana García', dni: '12345678', email: 'ana@ejemplo.com' },
      { id: 's2', name: 'Carlos Pérez', dni: '23456789', email: 'carlos@ejemplo.com' },
      { id: 's3', name: 'María López', dni: '34567890', email: 'maria@ejemplo.com' },
      { id: 's4', name: 'José Bayona', dni: '45678901', email: 'jose@ejemplo.com' },
      { id: 's5', name: 'Laura Díaz', dni: '56789012', email: 'laura@ejemplo.com' },
    ],
  },
  {
    id: 'c2',
    name: 'Comunicación',
    level: '5to Primaria',
    section: 'B',
    teacherId: '2',
    teacherName: 'María García',
    students: [
      { id: 's6', name: 'Pedro Silva', dni: '67890123', email: 'pedro@ejemplo.com' },
      { id: 's7', name: 'Sofia Rojas', dni: '78901234', email: 'sofia@ejemplo.com' },
      { id: 's8', name: 'Diego Castro', dni: '89012345', email: 'diego@ejemplo.com' },
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
    return saved ? JSON.parse(saved) : [];
  });

  const [courseGrades, setCourseGrades] = useState<CourseGrades[]>(() => {
    const saved = localStorage.getItem('courseGrades');
    return saved ? JSON.parse(saved) : [];
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

export function useCourses() {
  const context = useContext(CoursesContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }
  return context;
}