import React from 'react';
import { WeekSchedule, TimetableSlot } from '../types/curriculum';
import { Edit2, Trash2, Plus, Sparkles, AlertCircle, Printer } from 'lucide-react';
import { ValidationResult } from '../utils/scheduleHelper';

interface SoBaoGiangViewProps {
  schedule: WeekSchedule;
  validation: ValidationResult[];
  onEditSlot: (slot: TimetableSlot) => void;
  onDeleteSlot: (slotId: string) => void;
  onAddSlot: () => void;
  onOpenAiPlanner: () => void;
  onOpenPrintModal: () => void;
}

export const SoBaoGiangView: React.FC<SoBaoGiangViewProps> = ({
  schedule,
  validation,
  onEditSlot,
  onDeleteSlot,
  onAddSlot,
  onOpenAiPlanner,
  onOpenPrintModal
}) => {
  // Sort slots chronologically: day -> session -> period
  const dayOrder: Record<string, number> = {
    'Thứ 2': 1,
    'Thứ 3': 2,
    'Thứ 4': 3,
    'Thứ 5': 4,
    'Thứ 6': 5,
    'Thứ 7': 6
  };

  const sortedSlots = [...schedule.slots].sort((a, b) => {
    const dayDiff = (dayOrder[a.day] || 99) - (dayOrder[b.day] || 99);
    if (dayDiff !== 0) return dayDiff;
    if (a.session !== b.session) {
      return a.session === 'Sáng' ? -1 : 1;
    }
    return a.period - b.period;
  });

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden print:shadow-none print:border-none">
      {/* Sổ Báo Giảng Document Container */}
      <div className="p-6 sm:p-10 max-w-5xl mx-auto print:p-0">
        {/* Document Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-slate-200 text-center sm:text-left">
          {/* Left Header */}
          <div>
            <p className="font-semibold text-xs uppercase tracking-wide text-slate-700">
              Sở GD&ĐT Phú Thọ
            </p>
            <p className="font-bold text-sm uppercase text-slate-900">
              Trường THPT Trần Phú
            </p>
            <p className="font-bold text-xs uppercase text-slate-700">
              Tổ: Toán - Tin
            </p>
          </div>

          {/* Right Header */}
          <div className="sm:text-center sm:ml-auto">
            <p className="font-bold text-xs uppercase text-slate-800 tracking-wider">
              Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam
            </p>
            <p className="font-medium text-xs italic text-slate-700">
              Độc lập - Tự do - Hạnh phúc
            </p>
            <div className="w-24 h-0.5 bg-slate-300 mx-auto my-1"></div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center my-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-900">
            Sổ Báo Giảng Điện Tử
          </h2>
          <p className="text-sm font-semibold text-slate-600 mt-1">
            Năm học: {schedule.schoolYear} | Tuần {schedule.week} (Từ ngày {schedule.startDate} đến ngày {schedule.endDate})
          </p>
        </div>

        {/* Teacher Details */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6 text-xs sm:text-sm text-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2 print:border-none print:p-0 print:bg-transparent">
          <div>
            <span className="font-medium text-slate-500">Họ và tên giáo viên:</span>{' '}
            <strong className="text-slate-900">{schedule.teacherName}</strong>
          </div>
          <div>
            <span className="font-medium text-slate-500">Tổ chuyên môn:</span>{' '}
            <strong className="text-slate-900">{schedule.department}</strong>
          </div>
          <div>
            <span className="font-medium text-slate-500">Môn giảng dạy:</span>{' '}
            <strong className="text-slate-900">Toán THPT (Khối 10, 11, 12)</strong>
          </div>
          <div>
            <span className="font-medium text-slate-500">Đơn vị công tác:</span>{' '}
            <strong className="text-slate-900">{schedule.schoolName}</strong>
          </div>
        </div>

        {/* Action bar (Hide when printing) */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Lịch giảng dạy chi tiết tuần {schedule.week} ({sortedSlots.length} tiết)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPrintModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors cursor-pointer shadow-sm ring-1 ring-emerald-400/40"
              title="Xuất văn bản báo cáo & In Sổ Báo Giảng PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print to PDF</span>
            </button>
            <button
              onClick={onOpenAiPlanner}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>AI Tự Khớp Bài Theo PPCT</span>
            </button>
            <button
              onClick={onAddSlot}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-500 transition-colors cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm Tiết Dạy</span>
            </button>
          </div>
        </div>

        {/* Compliance Warnings Banner */}
        {validation.some((v) => !v.isValid) && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs flex items-start gap-2.5 print:hidden">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Lưu ý phân bổ thời lượng môn Toán trong tuần:</strong>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                {validation
                  .filter((v) => !v.isValid)
                  .map((v) => (
                    <li key={v.className}>
                      <strong>Lớp {v.className}</strong>: {v.warnings.join('; ')}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}

        {/* Official Table */}
        <div className="border border-slate-300 rounded-lg overflow-hidden mb-6">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold uppercase tracking-wider text-[11px] sm:text-xs border-b border-slate-300">
                <th className="py-2.5 px-3 border-r border-slate-300 text-center w-28">Thứ / Ngày</th>
                <th className="py-2.5 px-2 border-r border-slate-300 text-center w-16">Buổi</th>
                <th className="py-2.5 px-2 border-r border-slate-300 text-center w-14">Tiết</th>
                <th className="py-2.5 px-2 border-r border-slate-300 text-center w-16">Lớp</th>
                <th className="py-2.5 px-2 border-r border-slate-300 text-center w-24">Phân môn</th>
                <th className="py-2.5 px-3 border-r border-slate-300">Tên bài dạy</th>
                <th className="py-2.5 px-2 border-r border-slate-300 text-center w-20">Tiết PPCT</th>
                <th className="py-2.5 px-2 text-center w-16 print:hidden">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {sortedSlots.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 italic">
                    Chưa có tiết dạy nào được xếp cho tuần {schedule.week}. Hãy bấm "Thêm Tiết Dạy" hoặc dùng "Trợ Lý AI & Tải TKB" để tự động lập kế hoạch.
                  </td>
                </tr>
              ) : (
                sortedSlots.map((slot, index) => {
                  const isChuyenDe = slot.subjectType === 'CĐ Toán';
                  const isOnTn = slot.subjectType === 'Ôn tốt nghiệp';

                  return (
                    <tr
                      key={slot.id || index}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isOnTn
                          ? 'bg-amber-50/40'
                          : isChuyenDe
                          ? 'bg-indigo-50/40'
                          : ''
                      }`}
                    >
                      <td className="py-2 px-3 border-r border-slate-200 font-semibold text-slate-900 text-center">
                        <div>{slot.day}</div>
                        {slot.date && <div className="text-[11px] text-slate-500 font-normal">({slot.date})</div>}
                      </td>
                      <td className="py-2 px-2 border-r border-slate-200 text-center">
                        <span className={`px-1.5 py-0.5 rounded text-[11px] font-medium ${
                          slot.session === 'Sáng' ? 'bg-amber-100 text-amber-800' : 'bg-sky-100 text-sky-800'
                        }`}>
                          {slot.session}
                        </span>
                      </td>
                      <td className="py-2 px-2 border-r border-slate-200 text-center font-bold text-slate-900">
                        {slot.period}
                      </td>
                      <td className="py-2 px-2 border-r border-slate-200 text-center font-bold text-blue-700">
                        {slot.className}
                      </td>
                      <td className="py-2 px-2 border-r border-slate-200 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                          isOnTn
                            ? 'bg-rose-100 text-rose-800'
                            : isChuyenDe
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {slot.subjectType}
                        </span>
                      </td>
                      <td className="py-2 px-3 border-r border-slate-200 text-slate-900 font-medium">
                        {slot.lessonName}
                      </td>
                      <td className="py-2 px-2 border-r border-slate-200 text-center font-bold text-indigo-700">
                        {slot.ppct}
                      </td>
                      <td className="py-2 px-2 text-center print:hidden">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => onEditSlot(slot)}
                            className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Chỉnh sửa tiết này"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteSlot(slot.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                            title="Xóa tiết này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Note from official format */}
        <div className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded-lg border border-slate-200 mb-8 print:bg-transparent print:border-none print:p-0">
          <p>
            * <strong>Ghi chú:</strong> {schedule.note || 'Đã đảm bảo nguyên tắc mỗi lớp học tối đa 3 tiết chính và 1 tiết chuyên đề học tập trong tuần theo đúng phân phối chương trình của tổ chuyên môn. Riêng lớp 12 có thêm 2 tiết ôn thi tốt nghiệp môn Toán. Chuyển tiếp chính xác tiến độ bài dạy từ các tuần trước.'}
          </p>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-8 text-center pt-4 border-t border-slate-200">
          <div>
            <p className="font-bold text-xs uppercase text-slate-900">
              Tổ Trưởng Chuyên Môn
            </p>
            <p className="text-xs italic text-slate-500">(Ký và ghi rõ họ tên)</p>
            <div className="h-20 flex items-end justify-center">
              <span className="font-semibold text-slate-800 text-sm">{schedule.deanName}</span>
            </div>
          </div>

          <div>
            <p className="font-bold text-xs uppercase text-slate-900">
              Giáo Viên Lập Sổ
            </p>
            <p className="text-xs italic text-slate-500">(Ký và ghi rõ họ tên)</p>
            <div className="h-20 flex items-end justify-center">
              <span className="font-semibold text-slate-800 text-sm">{schedule.teacherName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
