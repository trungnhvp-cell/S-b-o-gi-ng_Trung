import React from 'react';
import { WeekSchedule, TimetableSlot, GradeLevel } from '../types/curriculum';
import { Plus, CheckCircle, AlertCircle, Calendar, BookOpen, GraduationCap } from 'lucide-react';

interface ColumnByGradeViewProps {
  schedule: WeekSchedule;
  onEditSlot: (slot: TimetableSlot) => void;
  onDeleteSlot: (slotId: string) => void;
  onAddSlotForGrade: (grade: GradeLevel) => void;
}

export const ColumnByGradeView: React.FC<ColumnByGradeViewProps> = ({
  schedule,
  onEditSlot,
  onDeleteSlot,
  onAddSlotForGrade
}) => {
  const grades: GradeLevel[] = [10, 11, 12];

  // Group slots by grade
  const slotsByGrade = {
    10: schedule.slots.filter((s) => s.grade === 10),
    11: schedule.slots.filter((s) => s.grade === 11),
    12: schedule.slots.filter((s) => s.grade === 12)
  };

  const getStats = (gradeSlots: TimetableSlot[], grade: GradeLevel) => {
    // Group by class to verify rules
    const classes = Array.from(new Set(gradeSlots.map((s) => s.className)));
    const classStats = classes.map((cls) => {
      const clsSlots = gradeSlots.filter((s) => s.className === cls);
      const toanCount = clsSlots.filter((s) => s.subjectType === 'Toán').length;
      const cdCount = clsSlots.filter((s) => s.subjectType === 'CĐ Toán').length;
      const onTnCount = clsSlots.filter((s) => s.subjectType === 'Ôn tốt nghiệp').length;

      let isCompliant = toanCount <= 3 && toanCount >= 1 && cdCount === 1;
      if (grade === 12) {
        isCompliant = isCompliant && onTnCount === 2;
      }

      return {
        className: cls,
        toanCount,
        cdCount,
        onTnCount,
        isCompliant
      };
    });

    const totalToan = gradeSlots.filter((s) => s.subjectType === 'Toán').length;
    const totalCd = gradeSlots.filter((s) => s.subjectType === 'CĐ Toán').length;
    const totalOnTn = gradeSlots.filter((s) => s.subjectType === 'Ôn tốt nghiệp').length;

    return {
      classes,
      classStats,
      totalSlots: gradeSlots.length,
      totalToan,
      totalCd,
      totalOnTn
    };
  };

  return (
    <div className="space-y-6">
      {/* Top Description & Guidelines */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Phân Bổ Kế Hoạch Dạy Học Chi Tiết Theo Từng Cột Khối Lớp (Tuần {schedule.week})
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Quy định chuyên môn: Khối 10, 11, 12 bắt buộc <strong>1 tiết Chuyên đề</strong> + tối đa <strong>3 tiết Toán chính khóa</strong>/lớp. Riêng Khối 12 có thêm <strong>2 tiết Ôn thi tốt nghiệp</strong>.
          </p>
        </div>
      </div>

      {/* 3 Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {grades.map((grade) => {
          const gradeSlots = slotsByGrade[grade];
          const stats = getStats(gradeSlots, grade);
          const isGrade12 = grade === 12;

          // Theme colors per grade
          const colorStyles =
            grade === 10
              ? {
                  border: 'border-blue-200',
                  headerBg: 'bg-gradient-to-r from-blue-700 to-indigo-700',
                  badge: 'bg-blue-100 text-blue-800'
                }
              : grade === 11
              ? {
                  border: 'border-teal-200',
                  headerBg: 'bg-gradient-to-r from-teal-700 to-emerald-700',
                  badge: 'bg-teal-100 text-teal-800'
                }
              : {
                  border: 'border-purple-200',
                  headerBg: 'bg-gradient-to-r from-purple-700 to-indigo-800',
                  badge: 'bg-purple-100 text-purple-800'
                };

          return (
            <div
              key={grade}
              className={`bg-white rounded-xl border ${colorStyles.border} shadow-sm overflow-hidden flex flex-col`}
            >
              {/* Column Header */}
              <div className={`${colorStyles.headerBg} p-4 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black tracking-wider uppercase">
                      Khối Lớp {grade}
                    </span>
                    {isGrade12 && (
                      <span className="flex items-center gap-1 text-[11px] bg-amber-400/20 text-amber-200 border border-amber-300/30 px-2 py-0.5 rounded-full font-semibold">
                        <GraduationCap className="w-3 h-3" />
                        Ôn Thi TN
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onAddSlotForGrade(grade)}
                    className="p-1 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer text-xs flex items-center gap-1 px-2 font-medium"
                    title={`Thêm tiết dạy cho khối ${grade}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm</span>
                  </button>
                </div>

                {/* Sub info */}
                <div className="mt-2 text-xs text-white/90 flex flex-wrap gap-2">
                  <span>Tổng: <strong>{stats.totalSlots}</strong> tiết</span>
                  <span>• Toán: <strong>{stats.totalToan}</strong></span>
                  <span>• CĐ: <strong>{stats.totalCd}</strong></span>
                  {isGrade12 && <span>• Ôn TN: <strong>{stats.totalOnTn}</strong></span>}
                </div>
              </div>

              {/* Class-by-class compliance badge */}
              <div className="p-3 bg-slate-50 border-b border-slate-200 text-xs space-y-1.5">
                <span className="text-slate-500 font-medium block">
                  Định mức theo từng lớp:
                </span>
                {stats.classStats.length === 0 ? (
                  <p className="text-slate-400 italic">Chưa có lớp nào thuộc khối {grade} trong tuần này.</p>
                ) : (
                  stats.classStats.map((cs) => (
                    <div
                      key={cs.className}
                      className="flex items-center justify-between p-1.5 bg-white rounded border border-slate-200"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-800">{cs.className}:</span>
                        <span className="text-slate-600">
                          {cs.toanCount}/3 Toán • {cs.cdCount}/1 CĐ
                          {isGrade12 && ` • ${cs.onTnCount}/2 Ôn TN`}
                        </span>
                      </div>
                      <div>
                        {cs.isCompliant ? (
                          <span className="inline-flex items-center gap-0.5 text-emerald-600 font-semibold text-[11px]">
                            <CheckCircle className="w-3.5 h-3.5" /> Chuẩn
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 text-amber-600 font-semibold text-[11px]">
                            <AlertCircle className="w-3.5 h-3.5" /> Chưa chuẩn
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Slot Cards List */}
              <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[700px]">
                {gradeSlots.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs italic">
                    Chưa có lịch giảng dạy khối {grade}.
                    <button
                      onClick={() => onAddSlotForGrade(grade)}
                      className="block mx-auto mt-2 text-blue-600 hover:underline font-semibold"
                    >
                      + Thêm tiết ngay
                    </button>
                  </div>
                ) : (
                  gradeSlots.map((slot) => {
                    const isChuyenDe = slot.subjectType === 'CĐ Toán';
                    const isOnTn = slot.subjectType === 'Ôn tốt nghiệp';

                    return (
                      <div
                        key={slot.id}
                        className={`rounded-lg border p-3 transition-all hover:shadow-md ${
                          isOnTn
                            ? 'bg-amber-50/50 border-amber-200'
                            : isChuyenDe
                            ? 'bg-indigo-50/50 border-indigo-200'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        {/* Card top */}
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-white">
                              {slot.day}
                            </span>
                            <span className="text-xs font-semibold text-slate-600">
                              {slot.session} • Tiết {slot.period}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <span className="text-xs font-black px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                              Lớp {slot.className}
                            </span>
                            <button
                              onClick={() => onEditSlot(slot)}
                              className="text-xs text-slate-400 hover:text-blue-600 p-1 rounded"
                              title="Sửa"
                            >
                              ✎
                            </button>
                            <button
                              onClick={() => onDeleteSlot(slot.id)}
                              className="text-xs text-slate-400 hover:text-rose-600 p-1 rounded"
                              title="Xóa"
                            >
                              ✕
                            </button>
                          </div>
                        </div>

                        {/* Subject Badge & PPCT */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              isOnTn
                                ? 'bg-rose-100 text-rose-800'
                                : isChuyenDe
                                ? 'bg-indigo-100 text-indigo-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {slot.subjectType}
                          </span>
                          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                            Tiết PPCT: {slot.ppct}
                          </span>
                        </div>

                        {/* Lesson name */}
                        <p className="text-xs font-semibold text-slate-900 leading-snug">
                          {slot.lessonName}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
