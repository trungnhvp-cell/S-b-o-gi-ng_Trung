import React, { useState } from 'react';
import {
  CURRICULUM_TOAN_10,
  CURRICULUM_CD_10,
  CURRICULUM_TOAN_11,
  CURRICULUM_CD_11,
  CURRICULUM_TOAN_12,
  CURRICULUM_CD_12,
  CURRICULUM_ON_TN_12
} from '../data/curriculumData';
import { CurriculumLesson } from '../types/curriculum';
import { Search, BookCheck, GraduationCap, CheckCircle } from 'lucide-react';

export const CurriculumBrowser: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<
    'toan10' | 'cd10' | 'toan11' | 'cd11' | 'toan12' | 'cd12' | 'ontn12'
  >('toan11');
  const [searchTerm, setSearchTerm] = useState('');

  const getDataset = (): { title: string; subtitle: string; lessons: CurriculumLesson[] } => {
    switch (activeCategory) {
      case 'toan10':
        return {
          title: 'Phân Phối Chương Trình Toán 10',
          subtitle: 'Cả năm: 35 tuần (105 tiết) • HK1: 18 tuần (54 tiết) • HK2: 17 tuần (51 tiết)',
          lessons: CURRICULUM_TOAN_10
        };
      case 'cd10':
        return {
          title: 'Chuyên Đề Lựa Chọn Toán 10',
          subtitle: 'Tổng 35 tiết / năm học (Mỗi tuần 1 tiết) • Hệ PT 3 ẩn, Quy nạp & Nhị thức Newton, 3 đường conic',
          lessons: CURRICULUM_CD_10
        };
      case 'toan11':
        return {
          title: 'Phân Phối Chương Trình Toán 11 (Trường THPT Trần Phú)',
          subtitle: 'Cả năm: 35 tuần (105 tiết) • HK1: 18 tuần (54 tiết) • HK2: 17 tuần (51 tiết) - Kèm mã NLS',
          lessons: CURRICULUM_TOAN_11
        };
      case 'cd11':
        return {
          title: 'Chuyên Đề Lựa Chọn Toán 11',
          subtitle: 'Tổng 35 tiết / năm học (Mỗi tuần 1 tiết) • Phép biến hình, Lý thuyết đồ thị, Vẽ kĩ thuật',
          lessons: CURRICULUM_CD_11
        };
      case 'toan12':
        return {
          title: 'Phân Phối Chương Trình Toán 12',
          subtitle: 'Cả năm: 35 tuần (105 tiết: Tối đa 3 tiết/tuần) • Đạo hàm, Vectơ không gian, Oxyz, Tích phân, Xác suất',
          lessons: CURRICULUM_TOAN_12
        };
      case 'cd12':
        return {
          title: 'Chuyên Đề Lựa Chọn Toán 12',
          subtitle: 'Tổng 35 tiết / năm học (Mỗi tuần 1 tiết) • Toán tối ưu kinh tế, Tài chính tiền tệ, Đồ họa 3D',
          lessons: CURRICULUM_CD_12
        };
      case 'ontn12':
        return {
          title: 'Kế Hoạch Dạy Ôn Thi Tốt Nghiệp Môn Toán 12',
          subtitle: 'Năm học 2026 - 2027 • 35 tuần, mỗi tuần 2 tiết (Tổng cộng 70 tiết chuẩn cấu trúc thi tốt nghiệp)',
          lessons: CURRICULUM_ON_TN_12
        };
      default:
        return { title: '', subtitle: '', lessons: [] };
    }
  };

  const { title, subtitle, lessons } = getDataset();

  const filteredLessons = lessons.filter(
    (l) =>
      l.lessonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.requirements && l.requirements.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 max-w-6xl mx-auto space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
        <button
          onClick={() => setActiveCategory('toan10')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeCategory === 'toan10'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Toán 10 (105 tiết)
        </button>
        <button
          onClick={() => setActiveCategory('cd10')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeCategory === 'cd10'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          CĐ Toán 10 (35 tiết)
        </button>
        <button
          onClick={() => setActiveCategory('toan11')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeCategory === 'toan11'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Toán 11 (105 tiết)
        </button>
        <button
          onClick={() => setActiveCategory('cd11')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeCategory === 'cd11'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          CĐ Toán 11 (35 tiết)
        </button>
        <button
          onClick={() => setActiveCategory('toan12')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeCategory === 'toan12'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Toán 12 (105 tiết)
        </button>
        <button
          onClick={() => setActiveCategory('cd12')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeCategory === 'cd12'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          CĐ Toán 12 (35 tiết)
        </button>
        <button
          onClick={() => setActiveCategory('ontn12')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeCategory === 'ontn12'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          Ôn Tốt Nghiệp 12 (70 tiết)
        </button>
      </div>

      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookCheck className="w-5 h-5 text-indigo-600" />
            {title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Tìm kiếm bài học, chương..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-800 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <th className="py-2.5 px-3 border-r border-slate-200 text-center w-20">Tiết PPCT</th>
              <th className="py-2.5 px-4 border-r border-slate-200">Chương / Chủ đề</th>
              <th className="py-2.5 px-4 border-r border-slate-200">Tên bài học</th>
              <th className="py-2.5 px-3 border-r border-slate-200 text-center w-20">Thời lượng</th>
              <th className="py-2.5 px-3 border-r border-slate-200 text-center w-24">Mã NLS</th>
              <th className="py-2.5 px-4">Yêu cầu cần đạt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredLessons.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400 italic">
                  Không tìm thấy bài học phù hợp.
                </td>
              </tr>
            ) : (
              filteredLessons.map((l) => (
                <tr key={`${l.type}_${l.ppct}`} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 border-r border-slate-200 text-center font-bold text-indigo-700 bg-slate-50/50">
                    {l.ppct}
                  </td>
                  <td className="py-2.5 px-4 border-r border-slate-200 text-slate-600 font-medium">
                    {l.chapter}
                  </td>
                  <td className="py-2.5 px-4 border-r border-slate-200 text-slate-900 font-semibold">
                    {l.lessonName}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-center text-slate-600">
                    {l.periodCount} tiết
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-center text-slate-500 font-mono text-[11px]">
                    {l.competencyCode || '-'}
                  </td>
                  <td className="py-2.5 px-4 text-slate-600 text-[11px] leading-relaxed">
                    {l.requirements || 'Nắm vững kiến thức trọng tâm, rèn luyện kỹ năng giải toán và vận dụng thực tiễn.'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
