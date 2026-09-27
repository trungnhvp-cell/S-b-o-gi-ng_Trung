import React, { useState, useRef } from 'react';
import {
  X,
  Printer,
  Download,
  FileSpreadsheet,
  Settings2,
  CheckCircle,
  FileText,
  Calendar,
  User,
  Building,
  GraduationCap
} from 'lucide-react';
import { WeekSchedule, TimetableSlot } from '../types/curriculum';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PrintReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  schedule: WeekSchedule;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({
  isOpen,
  onClose,
  schedule
}) => {
  // Configurable metadata for official report
  const [soGiaoDuc, setSoGiaoDuc] = useState('SỞ GD&ĐT PHÚ THỌ');
  const [truong, setTruong] = useState(schedule.schoolName || 'TRƯỜNG THPT TRẦN PHÚ');
  const [toChuyenMon, setToChuyenMon] = useState(schedule.department || 'TỔ: TOÁN - TIN');
  const [giaoVien, setGiaoVien] = useState(schedule.teacherName || 'Nguyễn Hữu Trung');
  const [toTruong, setToTruong] = useState(schedule.deanName || 'Đỗ Thị Thanh Huyền');
  const [includeBGH, setIncludeBGH] = useState(true);
  const [locationDate, setLocationDate] = useState(`Phú Thọ, ngày ${new Date().getDate()} tháng ${new Date().getMonth() + 1} năm ${new Date().getFullYear()}`);
  const [showSettings, setShowSettings] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const reportRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Chronologically sort slots
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

  // Calculate statistics
  const totalSlots = sortedSlots.length;
  const toanSlots = sortedSlots.filter((s) => s.subjectType === 'Toán').length;
  const cdSlots = sortedSlots.filter((s) => s.subjectType === 'CĐ Toán').length;
  const onTnSlots = sortedSlots.filter((s) => s.subjectType === 'Ôn tốt nghiệp').length;
  const uniqueClasses = Array.from(new Set(sortedSlots.map((s) => s.className)));

  // 1. Direct Print using Browser Print Dialog (High-precision Vector PDF)
  const handleBrowserPrint = () => {
    // Set document title temporarily so saved PDF filename is clean
    const originalTitle = document.title;
    const cleanFileName = `So_Bao_Giang_Tuan_${schedule.week}_${giaoVien.replace(/\s+/g, '_')}_THPT_TranPhu`;
    document.title = cleanFileName;
    window.print();
    // restore title
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  // 2. Direct Download as PDF file using html2canvas & jsPDF
  const handleDownloadDirectPdf = async () => {
    if (!reportRef.current) return;
    setIsExportingPdf(true);

    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2.5, // High DPI for crisp text
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 16; // 8mm margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (imgHeight <= pdfHeight - 16) {
        // Fits on single page
        pdf.addImage(imgData, 'JPEG', 8, 8, imgWidth, imgHeight);
      } else {
        // Multi-page
        let position = 8;
        let remainingHeight = imgHeight;
        while (remainingHeight > 0) {
          pdf.addImage(imgData, 'JPEG', 8, position, imgWidth, imgHeight);
          remainingHeight -= pdfHeight;
          if (remainingHeight > 0) {
            pdf.addPage();
            position -= pdfHeight;
          }
        }
      }

      pdf.save(`So_Bao_Giang_Tuan_${schedule.week}_${giaoVien.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Không thể tạo file PDF tự động, vui lòng dùng chức năng "In / Lưu PDF qua Trình duyệt".');
    } finally {
      setIsExportingPdf(false);
    }
  };

  // 3. Export CSV for Excel
  const handleExportCsv = () => {
    const headers = ['STT', 'Thứ / Ngày', 'Buổi', 'Tiết', 'Lớp', 'Phân môn', 'Tên bài dạy', 'Tiết PPCT'];
    const rows = sortedSlots.map((s, idx) => [
      idx + 1,
      `"${s.day} ${s.date ? `(${s.date})` : ''}"`,
      `"${s.session}"`,
      s.period,
      `"${s.className}"`,
      `"${s.subjectType}"`,
      `"${s.lessonName.replace(/"/g, '""')}"`,
      s.ppct
    ]);

    // Prepend UTF-8 BOM so Excel opens Vietnamese characters correctly
    const csvContent = '\uFEFF' + [
      `"SỔ BÁO GIẢNG ĐIỆN TỬ - TUẦN ${schedule.week} (${schedule.schoolYear})"`,
      `"Giáo viên: ${giaoVien} | Tổ: ${toChuyenMon} | Đơn vị: ${truong}"`,
      '',
      headers.join(','),
      ...rows.map((r) => r.join(','))
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `So_Bao_Giang_Tuan_${schedule.week}_${giaoVien.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-100 rounded-2xl shadow-2xl border border-slate-300 max-w-5xl w-full max-h-[96vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Top Control Bar (Hidden on print) */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 print:hidden shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/30 text-blue-400 border border-blue-500/30">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Xuất Báo Cáo & In Sổ Báo Giảng PDF
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">
                  Tuần {schedule.week}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Định dạng chuẩn văn bản hành chính theo quy định Sở GD&ĐT • Khổ giấy A4
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="Tùy chỉnh thông tin hành chính, người ký"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>{showSettings ? 'Đóng Tùy Chỉnh' : 'Tùy Chỉnh Báo Cáo'}</span>
            </button>

            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="Xuất bảng Excel/CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Xuất CSV</span>
            </button>

            <button
              onClick={handleDownloadDirectPdf}
              disabled={isExportingPdf}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer shadow-sm disabled:opacity-50"
              title="Tải tệp PDF trực tiếp về máy"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExportingPdf ? 'Đang tạo PDF...' : 'Tải File PDF'}</span>
            </button>

            <button
              onClick={handleBrowserPrint}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer shadow-md shadow-blue-600/30 ring-1 ring-blue-400/40"
              title="Mở hộp thoại in trình duyệt (In hoặc Lưu PDF vector sắc nét nhất)"
            >
              <Printer className="w-4 h-4" />
              <span>In / Lưu PDF (A4)</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Collapsible Metadata Settings Panel (Print hidden) */}
        {showSettings && (
          <div className="bg-slate-50 border-b border-slate-300 p-4 print:hidden text-xs space-y-3 shrink-0">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Settings2 className="w-4 h-4 text-blue-600" />
              Cấu hình thông tin hành chính hiển thị trên văn bản báo cáo:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Cơ quan quản lý:</label>
                <input
                  type="text"
                  value={soGiaoDuc}
                  onChange={(e) => setSoGiaoDuc(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Tên trường:</label>
                <input
                  type="text"
                  value={truong}
                  onChange={(e) => setTruong(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Tổ chuyên môn:</label>
                <input
                  type="text"
                  value={toChuyenMon}
                  onChange={(e) => setToChuyenMon(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Họ tên giáo viên:</label>
                <input
                  type="text"
                  value={giaoVien}
                  onChange={(e) => setGiaoVien(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Họ tên Tổ trưởng chuyên môn:</label>
                <input
                  type="text"
                  value={toTruong}
                  onChange={(e) => setToTruong(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Địa danh & Ngày ký:</label>
                <input
                  type="text"
                  value={locationDate}
                  onChange={(e) => setLocationDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-slate-800 outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeBGH}
                  onChange={(e) => setIncludeBGH(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Bao gồm vị trí xác nhận của Ban Giám Hiệu nhà trường</span>
              </label>
            </div>
          </div>
        )}

        {/* Scrollable Printable Document Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-slate-200 print:bg-white print:p-0 print:overflow-visible">
          {/* A4 Sheet Container */}
          <div
            ref={reportRef}
            id="print-report-container"
            className="bg-white w-full max-w-[210mm] min-h-[297mm] p-[12mm] sm:p-[15mm] text-slate-900 shadow-xl border border-slate-300 print:shadow-none print:border-none print:w-full print:max-w-none print:p-0 leading-normal"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            {/* OFFICIAL ADMINISTRATIVE HEADER (Nghị định 30/2020/NĐ-CP) */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-black text-center">
              {/* Left Column */}
              <div className="text-center">
                <p className="font-semibold text-xs tracking-wide uppercase text-black">
                  {soGiaoDuc}
                </p>
                <p className="font-bold text-sm tracking-wide uppercase text-black">
                  {truong}
                </p>
                <p className="font-bold text-xs uppercase text-black">
                  {toChuyenMon}
                </p>
                <div className="w-20 h-0.5 bg-black mx-auto mt-1"></div>
              </div>

              {/* Right Column */}
              <div className="text-center">
                <p className="font-bold text-xs uppercase tracking-wider text-black">
                  CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                </p>
                <p className="font-bold text-xs text-black">
                  Độc lập - Tự do - Hạnh phúc
                </p>
                <div className="w-28 h-0.5 bg-black mx-auto mt-1"></div>
                <p className="text-[11px] italic text-slate-800 mt-2">
                  {locationDate}
                </p>
              </div>
            </div>

            {/* DOCUMENT TITLE */}
            <div className="text-center my-5">
              <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-black">
                SỔ BÁO GIẢNG ĐIỆN TỬ
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">
                Năm học: {schedule.schoolYear} | Tuần {schedule.week} (Từ ngày {schedule.startDate} đến ngày {schedule.endDate})
              </p>
            </div>

            {/* TEACHER & SCHOOL INFORMATION */}
            <div className="border border-black p-3 mb-4 text-xs text-black rounded-none">
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-4">
                <div>
                  <span className="font-semibold">Họ và tên giáo viên:</span>{' '}
                  <strong className="text-black uppercase">{giaoVien}</strong>
                </div>
                <div>
                  <span className="font-semibold">Tổ chuyên môn:</span>{' '}
                  <span>{toChuyenMon}</span>
                </div>
                <div>
                  <span className="font-semibold">Môn giảng dạy:</span>{' '}
                  <span>Toán (Khối 10, Khối 11, Khối 12)</span>
                </div>
                <div>
                  <span className="font-semibold">Đơn vị công tác:</span>{' '}
                  <span>{truong}</span>
                </div>
                <div className="col-span-2 pt-1 border-t border-slate-300 flex flex-wrap items-center justify-between text-[11px] italic">
                  <span>Các lớp phụ trách: {uniqueClasses.sort().join(', ')}</span>
                  <span>Tổng định mức tuần: {totalSlots} tiết (Toán chính khóa: {toanSlots}, CĐ: {cdSlots}{onTnSlots > 0 ? `, Ôn TN: ${onTnSlots}` : ''})</span>
                </div>
              </div>
            </div>

            {/* SUMMARY STATS BAR */}
            <div className="text-[11px] mb-3 text-slate-800 flex items-center justify-between font-semibold border-b border-slate-300 pb-1.5">
              <span className="uppercase tracking-wider">
                Lịch giảng dạy chi tiết tuần {schedule.week}:
              </span>
              <span>Tổng cộng: {sortedSlots.length} tiết dạy</span>
            </div>

            {/* OFFICIAL TIMETABLE TABLE */}
            <div className="w-full mb-4">
              <table className="w-full text-left border-collapse border border-black text-xs text-black">
                <thead>
                  <tr className="bg-slate-100 font-bold uppercase tracking-wider text-[11px] border-b border-black text-center">
                    <th className="py-2 px-1.5 border border-black w-24">Thứ / Ngày</th>
                    <th className="py-2 px-1 border border-black w-14">Buổi</th>
                    <th className="py-2 px-1 border border-black w-12">Tiết</th>
                    <th className="py-2 px-1.5 border border-black w-14">Lớp</th>
                    <th className="py-2 px-1.5 border border-black w-20">Phân môn</th>
                    <th className="py-2 px-2 border border-black text-left">Tên bài dạy theo PPCT</th>
                    <th className="py-2 px-1 border border-black w-16">Tiết PPCT</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedSlots.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-slate-500 italic border border-black">
                        Chưa có lịch giảng dạy trong tuần này.
                      </td>
                    </tr>
                  ) : (
                    sortedSlots.map((slot, index) => {
                      return (
                        <tr
                          key={slot.id || index}
                          className="border-b border-black hover:bg-slate-50/50"
                        >
                          <td className="py-1.5 px-1.5 border border-black text-center font-bold">
                            <div>{slot.day}</div>
                            {slot.date && <div className="text-[10px] font-normal text-slate-700">({slot.date})</div>}
                          </td>
                          <td className="py-1.5 px-1 border border-black text-center font-medium">
                            {slot.session}
                          </td>
                          <td className="py-1.5 px-1 border border-black text-center font-bold">
                            {slot.period}
                          </td>
                          <td className="py-1.5 px-1.5 border border-black text-center font-bold">
                            {slot.className}
                          </td>
                          <td className="py-1.5 px-1.5 border border-black text-center font-semibold">
                            {slot.subjectType}
                          </td>
                          <td className="py-1.5 px-2 border border-black">
                            <span className="font-medium">{slot.lessonName}</span>
                          </td>
                          <td className="py-1.5 px-1 border border-black text-center font-bold">
                            {slot.ppct}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* OFFICIAL NOTES */}
            <div className="text-[11px] text-black italic border border-black p-2.5 mb-6">
              <p>
                <strong>* Ghi chú chuyên môn:</strong> Đã đảm bảo nguyên tắc mỗi lớp học tối đa 3 tiết Toán chính khóa và bắt buộc 1 tiết chuyên đề học tập môn Toán trong tuần theo đúng phân phối chương trình của tổ chuyên môn. Riêng khối lớp 12 có thêm 2 tiết ôn thi tốt nghiệp THPT. Chuyển tiếp chính xác tiến độ bài dạy từ tuần liền trước.
              </p>
              <p className="mt-1">
                (Các buổi sinh hoạt chi bộ, họp tổ chuyên môn và sinh hoạt ngoại khóa không tính là tiết giảng dạy trực tiếp trên lớp).
              </p>
            </div>

            {/* OFFICIAL SIGNATURES BLOCK */}
            <div className={`grid ${includeBGH ? 'grid-cols-3' : 'grid-cols-2'} gap-4 text-center pt-2`}>
              {includeBGH && (
                <div>
                  <p className="font-bold text-xs uppercase text-black">
                    Ban Giám Hiệu
                  </p>
                  <p className="text-[11px] italic text-slate-700">(Ký duyệt và đóng dấu)</p>
                  <div className="h-20 flex items-end justify-center">
                    <span className="text-xs text-slate-500 italic">[Đã duyệt kế hoạch]</span>
                  </div>
                </div>
              )}

              <div>
                <p className="font-bold text-xs uppercase text-black">
                  Tổ Trưởng Chuyên Môn
                </p>
                <p className="text-[11px] italic text-slate-700">(Ký và ghi rõ họ tên)</p>
                <div className="h-20 flex items-end justify-center">
                  <span className="font-bold text-black text-xs sm:text-sm">{toTruong}</span>
                </div>
              </div>

              <div>
                <p className="font-bold text-xs uppercase text-black">
                  Giáo Viên Lập Sổ
                </p>
                <p className="text-[11px] italic text-slate-700">(Ký và ghi rõ họ tên)</p>
                <div className="h-20 flex items-end justify-center">
                  <span className="font-bold text-black text-xs sm:text-sm">{giaoVien}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
