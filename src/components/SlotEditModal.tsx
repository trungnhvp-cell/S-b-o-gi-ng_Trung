import React, { useState, useEffect } from 'react';
import { TimetableSlot, GradeLevel, SubjectType, DayOfWeek, Session } from '../types/curriculum';
import { getLessonByPPCT } from '../data/curriculumData';
import { X, Check, BookOpen } from 'lucide-react';

interface SlotEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (slot: TimetableSlot) => void;
  initialSlot?: TimetableSlot | null;
  defaultGrade?: GradeLevel;
}

export const SlotEditModal: React.FC<SlotEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialSlot,
  defaultGrade
}) => {
  const [day, setDay] = useState<DayOfWeek>('Thứ 3');
  const [date, setDate] = useState('');
  const [session, setSession] = useState<Session>('Sáng');
  const [period, setPeriod] = useState<number>(1);
  const [className, setClassName] = useState('10M');
  const [grade, setGrade] = useState<GradeLevel>(10);
  const [subjectType, setSubjectType] = useState<SubjectType>('Toán');
  const [ppct, setPpct] = useState<number>(1);
  const [lessonName, setLessonName] = useState('');

  useEffect(() => {
    if (initialSlot) {
      setDay(initialSlot.day);
      setDate(initialSlot.date || '');
      setSession(initialSlot.session);
      setPeriod(initialSlot.period);
      setClassName(initialSlot.className);
      setGrade(initialSlot.grade);
      setSubjectType(initialSlot.subjectType);
      setPpct(initialSlot.ppct);
      setLessonName(initialSlot.lessonName);
    } else {
      const g = defaultGrade || 10;
      setGrade(g);
      setClassName(g === 10 ? '10M' : g === 11 ? '11A' : '12A1');
      setSubjectType('Toán');
      setPpct(1);
      const lesson = getLessonByPPCT(g, 'Toán', 1);
      setLessonName(lesson ? lesson.lessonName : '');
    }
  }, [initialSlot, defaultGrade, isOpen]);

  // When grade, subjectType or ppct changes, suggest lesson name if not manually modified
  const handlePpctChange = (newPpct: number) => {
    setPpct(newPpct);
    const lesson = getLessonByPPCT(grade, subjectType, newPpct);
    if (lesson) {
      setLessonName(lesson.lessonName);
    }
  };

  const handleSubjectTypeChange = (newType: SubjectType) => {
    setSubjectType(newType);
    const lesson = getLessonByPPCT(grade, newType, ppct);
    if (lesson) {
      setLessonName(lesson.lessonName);
    }
  };

  const handleGradeChange = (newGrade: GradeLevel) => {
    setGrade(newGrade);
    if (newGrade === 10) setClassName('10M');
    if (newGrade === 11) setClassName('11A');
    if (newGrade === 12) setClassName('12A1');
    const lesson = getLessonByPPCT(newGrade, subjectType, ppct);
    if (lesson) {
      setLessonName(lesson.lessonName);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlot: TimetableSlot = {
      id: initialSlot ? initialSlot.id : `slot_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      day,
      date,
      session,
      period,
      className,
      grade,
      subjectType,
      ppct,
      lessonName: lessonName.trim() || `${subjectType} - Tiết ${ppct}`
    };
    onSave(newSlot);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <h3 className="text-base font-bold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            {initialSlot ? 'Chỉnh Sửa Tiết Dạy' : 'Thêm Tiết Giảng Dạy Mới'}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          {/* Thứ & Buổi & Tiết */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Thứ:</label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value as DayOfWeek)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Buổi:</label>
              <select
                value={session}
                onChange={(e) => setSession(e.target.value as Session)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Sáng">Sáng</option>
                <option value="Chiều">Chiều</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Tiết:</label>
              <select
                value={period}
                onChange={(e) => setPeriod(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {[1, 2, 3, 4, 5].map((p) => (
                  <option key={p} value={p}>
                    Tiết {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Khối lớp & Lớp */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Khối lớp:</label>
              <select
                value={grade}
                onChange={(e) => handleGradeChange(Number(e.target.value) as GradeLevel)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium"
              >
                <option value={10}>Khối 10</option>
                <option value={11}>Khối 11</option>
                <option value={12}>Khối 12</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Tên lớp:</label>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value.toUpperCase())}
                placeholder="Ví dụ: 10M, 11A, 12A1"
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white font-bold text-blue-700"
              />
            </div>
          </div>

          {/* Phân môn & Tiết PPCT */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Phân môn:</label>
              <select
                value={subjectType}
                onChange={(e) => handleSubjectTypeChange(e.target.value as SubjectType)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white font-semibold"
              >
                <option value="Toán">Toán (Chính khóa - max 3)</option>
                <option value="CĐ Toán">CĐ Toán (Chuyên đề - 1 tiết)</option>
                {grade === 12 && (
                  <option value="Ôn tốt nghiệp">Ôn tốt nghiệp 12 (2 tiết)</option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Tiết PPCT:</label>
              <input
                type="number"
                min={1}
                max={subjectType === 'CĐ Toán' ? 35 : subjectType === 'Ôn tốt nghiệp' ? 70 : 105}
                value={ppct}
                onChange={(e) => handlePpctChange(Number(e.target.value))}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white font-bold text-indigo-700"
              />
            </div>
          </div>

          {/* Tên bài học */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-slate-700 font-semibold">Tên bài dạy:</label>
              <button
                type="button"
                onClick={() => {
                  const lesson = getLessonByPPCT(grade, subjectType, ppct);
                  if (lesson) setLessonName(lesson.lessonName);
                }}
                className="text-[11px] text-blue-600 hover:underline font-medium"
              >
                Lấy từ chuẩn PPCT
              </button>
            </div>
            <textarea
              rows={2}
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
              placeholder="Nhập tên bài học..."
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors cursor-pointer shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>{initialSlot ? 'Lưu Thay Đổi' : 'Thêm Tiết'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
