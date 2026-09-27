import { TimetableSlot, GradeLevel, SubjectType, WeekSchedule, ClassProgress } from '../types/curriculum';
import { getLessonByPPCT, CURRICULUM_TOAN_10, CURRICULUM_CD_10, CURRICULUM_TOAN_11, CURRICULUM_CD_11, CURRICULUM_TOAN_12, CURRICULUM_CD_12, CURRICULUM_ON_TN_12 } from '../data/curriculumData';

// Generate next week schedule based on previous week or progress
export function generateNextWeekSchedule(
  currentWeekNumber: number,
  classesProgress: ClassProgress[],
  templateSlots?: TimetableSlot[]
): WeekSchedule {
  const nextWeekNum = currentWeekNumber + 1;
  const newSlots: TimetableSlot[] = [];

  // Clone progress to track within the week
  const progressMap = new Map<string, { toan: number; cd: number; onTn: number }>();
  classesProgress.forEach(c => {
    progressMap.set(c.className, {
      toan: c.lastToanPpct,
      cd: c.lastCdPpct,
      onTn: c.lastOnTnPpct || 0
    });
  });

  if (templateSlots && templateSlots.length > 0) {
    // Keep timetable slot structure (Day, Period, Class, SubjectType) but advance PPCT and lesson
    templateSlots.forEach((slot, index) => {
      const prog = progressMap.get(slot.className) || { toan: 0, cd: 0, onTn: 0 };
      let newPpct = slot.ppct;

      if (slot.subjectType === 'Toán') {
        prog.toan += 1;
        newPpct = prog.toan;
      } else if (slot.subjectType === 'CĐ Toán') {
        prog.cd += 1;
        newPpct = prog.cd;
      } else if (slot.subjectType === 'Ôn tốt nghiệp') {
        prog.onTn += 1;
        newPpct = prog.onTn;
      }

      const lesson = getLessonByPPCT(slot.grade, slot.subjectType, newPpct);
      const lessonName = lesson ? lesson.lessonName : `${slot.subjectType} - Tiết ${newPpct}`;

      newSlots.push({
        ...slot,
        id: `w${nextWeekNum}_${index + 1}`,
        ppct: newPpct,
        lessonName: lessonName
      });
    });
  }

  // Calculate dates assuming 7 days step from Week 1 (07/09/2026)
  const baseStart = new Date(2026, 8, 7); // Sept 7, 2026
  const weekStart = new Date(baseStart.getTime() + (nextWeekNum - 1) * 7 * 24 * 60 * 60 * 1000);
  const weekEnd = new Date(weekStart.getTime() + 5 * 24 * 60 * 60 * 1000);

  const formatDate = (d: Date) => {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return {
    week: nextWeekNum,
    startDate: formatDate(weekStart),
    endDate: formatDate(weekEnd),
    schoolYear: '2026 - 2027',
    teacherName: 'Nguyễn Hữu Trung',
    department: 'Toán - Tin',
    schoolName: 'Trường THPT Trần Phú, Phú Thọ',
    deanName: 'Đỗ Thị Thanh Huyền',
    slots: newSlots,
    note: `Đã đảm bảo nguyên tắc mỗi lớp học 3 tiết chính và 1 tiết chuyên đề học tập trong tuần theo đúng phân phối chương trình của tổ chuyên môn. Chuyển tiếp chính xác tiến độ bài dạy từ Tuần ${currentWeekNumber}.`
  };
}

// Validate rules for a week's slots
export interface ValidationResult {
  className: string;
  grade: GradeLevel;
  toanCount: number;
  cdCount: number;
  onTnCount: number;
  isValid: boolean;
  warnings: string[];
}

export function validateWeekSchedule(slots: TimetableSlot[]): ValidationResult[] {
  const classMap = new Map<string, { grade: GradeLevel; toan: number; cd: number; onTn: number }>();

  slots.forEach(slot => {
    if (!classMap.has(slot.className)) {
      classMap.set(slot.className, { grade: slot.grade, toan: 0, cd: 0, onTn: 0 });
    }
    const current = classMap.get(slot.className)!;
    if (slot.subjectType === 'Toán') current.toan += 1;
    if (slot.subjectType === 'CĐ Toán') current.cd += 1;
    if (slot.subjectType === 'Ôn tốt nghiệp') current.onTn += 1;
  });

  const results: ValidationResult[] = [];

  classMap.forEach((counts, className) => {
    const warnings: string[] = [];
    if (counts.toan > 3) {
      warnings.push(`Vượt quá 3 tiết Toán chính khóa (${counts.toan}/3 tiết)`);
    } else if (counts.toan < 3) {
      warnings.push(`Chưa đủ 3 tiết Toán chính khóa (${counts.toan}/3 tiết)`);
    }

    if (counts.cd !== 1) {
      warnings.push(`Quy định bắt buộc đúng 1 tiết Chuyên đề môn Toán (hiện tại: ${counts.cd} tiết)`);
    }

    if (counts.grade === 12) {
      if (counts.onTn !== 2) {
        warnings.push(`Lớp 12 bắt buộc 2 tiết Ôn tốt nghiệp môn Toán (hiện tại: ${counts.onTn}/2 tiết)`);
      }
    }

    results.push({
      className,
      grade: counts.grade,
      toanCount: counts.toan,
      cdCount: counts.cd,
      onTnCount: counts.onTn,
      isValid: warnings.length === 0,
      warnings
    });
  });

  return results;
}
