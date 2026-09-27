import React, { useState } from 'react';
import { ClassProgress, GradeLevel } from '../types/curriculum';
import { getLessonByPPCT } from '../data/curriculumData';
import { CheckCircle2, ArrowRight, Sparkles, Plus, Trash2, BookOpen } from 'lucide-react';

interface ProgressManagerProps {
  classes: ClassProgress[];
  currentWeek: number;
  onUpdateProgress: (updated: ClassProgress[]) => void;
  onAutoGenerateNextWeek: () => void;
}

export const ProgressManager: React.FC<ProgressManagerProps> = ({
  classes,
  currentWeek,
  onUpdateProgress,
  onAutoGenerateNextWeek
}) => {
  const [classList, setClassList] = useState<ClassProgress[]>(classes);
  const [newClassName, setNewClassName] = useState('');
  const [newGrade, setNewGrade] = useState<GradeLevel>(10);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleUpdate = (index: number, field: keyof ClassProgress, value: any) => {
    const updated = [...classList];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setClassList(updated);
  };

  const handleSave = () => {
    onUpdateProgress(classList);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleAddClass = () => {
    if (!newClassName.trim()) return;
    const newClass: ClassProgress = {
      className: newClassName.trim().toUpperCase(),
      grade: newGrade,
      lastToanPpct: 0,
      lastCdPpct: 0,
      lastOnTnPpct: newGrade === 12 ? 0 : undefined
    };
    const updated = [...classList, newClass];
    setClassList(updated);
    onUpdateProgress(updated);
    setNewClassName('');
  };

  const handleDeleteClass = (className: string) => {
    const updated = classList.filter((c) => c.className !== className);
    setClassList(updated);
    onUpdateProgress(updated);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 max-w-5xl mx-auto space-y-6">
      {/* Header Info */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Báo Cáo Tiến Độ: Đã Dạy Tới Tiết Bao Nhiêu?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Nhập số tiết đã hoàn thành khi kết thúc tuần trước ({currentWeek > 1 ? `Tuần ${currentWeek - 1}` : 'Tuần 0'}). Hệ thống sẽ tự động tính toán số tiết PPCT và tự động khớp tên bài dạy cho Tuần {currentWeek}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Lưu Tiến Độ</span>
            </button>
            <button
              onClick={onAutoGenerateNextWeek}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs rounded-lg transition-all cursor-pointer shadow-md shadow-purple-600/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Tự Động Lập Lịch Tuần Này</span>
            </button>
          </div>
        </div>

        {saveSuccess && (
          <div className="mt-3 p-2 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Đã cập nhật tiến độ giảng dạy thành công!
          </div>
        )}
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {classList.map((cls, index) => {
          const currentToanLesson = getLessonByPPCT(cls.grade, 'Toán', cls.lastToanPpct);
          const currentCdLesson = getLessonByPPCT(cls.grade, 'CĐ Toán', cls.lastCdPpct);
          const currentOnTnLesson = cls.grade === 12 && cls.lastOnTnPpct ? getLessonByPPCT(12, 'Ôn tốt nghiệp', cls.lastOnTnPpct) : null;

          const nextToanLesson = getLessonByPPCT(cls.grade, 'Toán', cls.lastToanPpct + 1);
          const nextCdLesson = getLessonByPPCT(cls.grade, 'CĐ Toán', cls.lastCdPpct + 1);

          return (
            <div
              key={cls.className}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors relative group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-blue-900 bg-blue-100 px-2.5 py-1 rounded-lg">
                    Lớp {cls.className}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                    Khối {cls.grade}
                  </span>
                </div>

                <button
                  onClick={() => handleDeleteClass(cls.className)}
                  className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 transition-opacity p-1 rounded"
                  title="Xóa lớp này"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Inputs */}
              <div className="space-y-3">
                {/* Toán chính khóa */}
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-1">
                    <span>Toán chính khóa (Đã dạy đến tiết PPCT):</span>
                    <input
                      type="number"
                      min={0}
                      max={105}
                      value={cls.lastToanPpct}
                      onChange={(e) => handleUpdate(index, 'lastToanPpct', Number(e.target.value))}
                      className="w-16 px-2 py-1 text-center font-bold text-blue-700 bg-slate-100 rounded border border-slate-300 outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-1 italic">
                    Đã dạy: {currentToanLesson ? currentToanLesson.lessonName : 'Chưa bắt đầu'}
                  </p>
                  <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
                    <ArrowRight className="w-3 h-3 inline" />
                    Dự kiến tuần mới: Tiết {cls.lastToanPpct + 1} - {nextToanLesson?.lessonName || '...'}
                  </p>
                </div>

                {/* Chuyên đề Toán */}
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-1">
                    <span>Chuyên đề môn Toán (Đã dạy đến tiết):</span>
                    <input
                      type="number"
                      min={0}
                      max={35}
                      value={cls.lastCdPpct}
                      onChange={(e) => handleUpdate(index, 'lastCdPpct', Number(e.target.value))}
                      className="w-16 px-2 py-1 text-center font-bold text-indigo-700 bg-slate-100 rounded border border-slate-300 outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-1 italic">
                    Đã dạy: {currentCdLesson ? currentCdLesson.lessonName : 'Chưa bắt đầu'}
                  </p>
                  <p className="text-[11px] text-indigo-700 font-medium flex items-center gap-1 mt-0.5">
                    <ArrowRight className="w-3 h-3 inline" />
                    Dự kiến tuần mới: Tiết {cls.lastCdPpct + 1} - {nextCdLesson?.lessonName || '...'}
                  </p>
                </div>

                {/* Ôn tốt nghiệp (Nếu là khối 12) */}
                {cls.grade === 12 && (
                  <div className="bg-amber-50/60 p-3 rounded-lg border border-amber-200">
                    <div className="flex items-center justify-between text-xs font-semibold text-amber-900 mb-1">
                      <span>Ôn tốt nghiệp Toán (Đã dạy đến tiết / 70):</span>
                      <input
                        type="number"
                        min={0}
                        max={70}
                        value={cls.lastOnTnPpct || 0}
                        onChange={(e) => handleUpdate(index, 'lastOnTnPpct', Number(e.target.value))}
                        className="w-16 px-2 py-1 text-center font-bold text-amber-800 bg-white rounded border border-amber-300 outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-1 italic">
                      Đã dạy: {currentOnTnLesson ? currentOnTnLesson.lessonName : 'Chưa bắt đầu'}
                    </p>
                    <p className="text-[11px] text-amber-800 font-medium flex items-center gap-1 mt-0.5">
                      <ArrowRight className="w-3 h-3 inline" />
                      Dự kiến tuần mới: Tiết {(cls.lastOnTnPpct || 0) + 1}, {(cls.lastOnTnPpct || 0) + 2}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add new class bar */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center gap-3">
        <span className="text-xs font-bold text-slate-700">Thêm lớp giảng dạy mới:</span>
        <input
          type="text"
          placeholder="Tên lớp (ví dụ: 12A1, 10A2...)"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          className="text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
        />
        <select
          value={newGrade}
          onChange={(e) => setNewGrade(Number(e.target.value) as GradeLevel)}
          className="text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value={10}>Khối 10</option>
          <option value={11}>Khối 11</option>
          <option value={12}>Khối 12 (Có thêm 2 tiết Ôn TN)</option>
        </select>
        <button
          onClick={handleAddClass}
          className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Thêm Lớp</span>
        </button>
      </div>
    </div>
  );
};
