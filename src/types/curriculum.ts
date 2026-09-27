export type GradeLevel = 10 | 11 | 12;
export type SubjectType = 'Toán' | 'CĐ Toán' | 'Ôn tốt nghiệp';
export type DayOfWeek = 'Thứ 2' | 'Thứ 3' | 'Thứ 4' | 'Thứ 5' | 'Thứ 6' | 'Thứ 7';
export type Session = 'Sáng' | 'Chiều';

export interface CurriculumLesson {
  ppct: number;
  grade: GradeLevel;
  type: SubjectType;
  chapter: string;
  lessonName: string;
  periodCount: number;
  periodsRange?: string;
  competencyCode?: string;
  requirements?: string;
  note?: string;
}

export interface TimetableSlot {
  id: string;
  day: DayOfWeek;
  date?: string;
  session: Session;
  period: number; // 1 to 5
  className: string;
  grade: GradeLevel;
  subjectType: SubjectType;
  ppct: number;
  lessonName: string;
  note?: string;
}

export interface ClassProgress {
  className: string;
  grade: GradeLevel;
  lastToanPpct: number;
  lastCdPpct: number;
  lastOnTnPpct?: number;
}

export interface WeekSchedule {
  week: number;
  startDate: string;
  endDate: string;
  schoolYear: string;
  teacherName: string;
  department: string;
  schoolName: string;
  deanName: string;
  slots: TimetableSlot[];
  note?: string;
}
