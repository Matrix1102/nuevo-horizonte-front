// src/types/Course.ts

export type Student = {
  id: string;
  name: string;
  dni: string;
  email: string;
};

export type Course = {
  id: string;
  name: string;
  level: string;
  section: string;
  students: Student[];
  teacherId?: string;
  teacherName?: string;
};

export type AttendanceRecord = {
  studentId: string;
  status: 'Presente' | 'Ausente' | 'Falta justificada' | 'Tardanza';
};

export type DayAttendance = {
  date: string;
  courseId: string;
  attendance: AttendanceRecord[];
};

export type GradeRecord = {
  studentId: string;
  grades: (number | null)[]; // 4 periods
};

export type CourseGrades = {
  courseId: string;
  grades: GradeRecord[];
};