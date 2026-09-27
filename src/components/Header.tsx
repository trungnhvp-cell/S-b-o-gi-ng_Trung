import React from 'react';
import { BookOpen, Calendar, Bot, Printer, FileSpreadsheet, PlusCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { GradeLevel } from '../types/curriculum';

interface HeaderProps {
  currentWeek: number;
  totalWeeks: number;
  onSelectWeek: (week: number) => void;
  activeTab: 'baogiang' | 'columns' | 'progress' | 'curriculum';
  onSelectTab: (tab: 'baogiang' | 'columns' | 'progress' | 'curriculum') => void;
  onOpenAiDrawer: () => void;
  onPrint: () => void;
  onAutoGenerateNextWeek: () => void;
  ruleStatus: {
    totalClasses: number;
    validClasses: number;
    hasErrors: boolean;
  };
}

export const Header: React.FC<HeaderProps> = ({
  currentWeek,
  totalWeeks,
  onSelectWeek,
  activeTab,
  onSelectTab,
  onOpenAiDrawer,
  onPrint,
  onAutoGenerateNextWeek,
  ruleStatus
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & School Info */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                Kế Hoạch & Sổ Báo Giảng Toán THPT
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                2026 - 2027
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Trường THPT Trần Phú, Phú Thọ • Tổ Toán - Tin • GV: Nguyễn Hữu Trung
            </p>
          </div>
        </div>

        {/* Quick Rule Tag & Actions */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Rules status badge */}
          <div className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${
            ruleStatus.hasErrors
              ? 'bg-amber-950/60 border-amber-600/40 text-amber-200'
              : 'bg-emerald-950/60 border-emerald-600/40 text-emerald-200'
          }`}>
            {ruleStatus.hasErrors ? (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            ) : (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            )}
            <span>
              {ruleStatus.validClasses}/{ruleStatus.totalClasses} lớp chuẩn định mức (Toán: ≤3, CĐ: 1, 12 có +2 Ôn TN)
            </span>
          </div>

          {/* Action buttons */}
          <button
            onClick={onAutoGenerateNextWeek}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-colors cursor-pointer"
            title="Tự động xếp lịch tuần kế tiếp theo tiến độ PPCT"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Lập Tuần Kế Tiếp</span>
          </button>

          <button
            onClick={onOpenAiDrawer}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-600/20 transition-all cursor-pointer ring-1 ring-purple-400/30"
          >
            <Bot className="w-4 h-4" />
            <span>Trợ Lý AI & Tải TKB</span>
          </button>

          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all cursor-pointer ring-1 ring-emerald-400/40"
            title="In hoặc Xuất Sổ Báo Giảng dạng PDF chính thức"
          >
            <Printer className="w-4 h-4 text-white" />
            <span>Print to PDF</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Bar & Week Picker */}
      <div className="bg-slate-950/80 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Week Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              Chọn tuần:
            </span>
            <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5">
              <button
                onClick={() => onSelectWeek(Math.max(1, currentWeek - 1))}
                disabled={currentWeek <= 1}
                className="px-2 py-1 text-xs text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ‹
              </button>
              <select
                value={currentWeek}
                onChange={(e) => onSelectWeek(Number(e.target.value))}
                className="bg-transparent text-xs font-semibold text-white px-2 py-1 outline-none cursor-pointer"
              >
                {Array.from({ length: totalWeeks }, (_, i) => i + 1).map((w) => (
                  <option key={w} value={w} className="bg-slate-900 text-white">
                    Tuần {w} {w <= 3 ? '(Đã có dữ liệu)' : ''}
                  </option>
                ))}
              </select>
              <button
                onClick={() => onSelectWeek(Math.min(totalWeeks, currentWeek + 1))}
                disabled={currentWeek >= totalWeeks}
                className="px-2 py-1 text-xs text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ›
              </button>
            </div>
          </div>

          {/* Tab buttons */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => onSelectTab('baogiang')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'baogiang'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Sổ Báo Giảng Chuẩn Mẫu
            </button>
            <button
              onClick={() => onSelectTab('columns')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'columns'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Theo Cột Khối Lớp (10 - 11 - 12)
            </button>
            <button
              onClick={() => onSelectTab('progress')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'progress'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Báo Số Tiết Đã Dạy
            </button>
            <button
              onClick={() => onSelectTab('curriculum')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'curriculum'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              Tra Cứu PPCT (10-11-12 & Ôn TN)
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
