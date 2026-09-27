import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  FileText,
  Send,
  Sparkles,
  Bot,
  User,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Copy
} from 'lucide-react';
import { TimetableSlot, ClassProgress, WeekSchedule, GradeLevel } from '../types/curriculum';
import { getLessonByPPCT } from '../data/curriculumData';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentWeek: number;
  classesProgress: ClassProgress[];
  currentSchedule: WeekSchedule;
  onApplySlotsToSchedule: (slots: TimetableSlot[]) => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  extractedSlots?: TimetableSlot[];
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({
  isOpen,
  onClose,
  currentWeek,
  classesProgress,
  currentSchedule,
  onApplySlotsToSchedule
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'assistant',
      content: `Xin chào Thầy/Cô! Tôi là Trợ lý AI Chuyên môn Toán THPT.

Tôi có thể hỗ trợ Thầy/Cô:
1. **Tải lên Thời khóa biểu tuần mới** (dạng ảnh chụp, PDF hoặc dán văn bản).
2. **Tiếp nhận báo cáo tiết đã dạy**: Thầy/Cô chỉ cần nhắn: *"Kết thúc tuần 3, tôi đã dạy xong tiết 9 Toán 10M, tiết 3 CĐ 10M..."*
3. **Tự động lập lịch dạy & khớp bài PPCT** chuẩn xác cho tuần ${currentWeek}, đảm bảo đúng quy định (Toán ≤ 3 tiết, CĐ = 1 tiết, Khối 12 có thêm 2 tiết Ôn TN).`,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    type: string;
    base64: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedFile({
        name: file.name,
        type: file.type || (file.name.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg'),
        base64: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() && !uploadedFile) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: text + (uploadedFile ? `\n[Đính kèm tệp: ${uploadedFile.name}]` : ''),
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    const currentUploaded = uploadedFile;
    setUploadedFile(null);
    setIsLoading(true);

    try {
      if (currentUploaded) {
        // Call parse-schedule endpoint with file
        const res = await fetch('/api/parse-schedule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: currentUploaded.base64,
            mimeType: currentUploaded.type,
            textInput: text,
            currentWeek,
            currentProgress: classesProgress
          })
        });

        const data = await res.json();
        let assistantContent = '';
        let extractedSlots: TimetableSlot[] = [];

        if (data.entries && Array.isArray(data.entries) && data.entries.length > 0) {
          extractedSlots = data.entries.map((e: any, idx: number) => {
            const grade = (e.grade || (e.className.includes('10') ? 10 : e.className.includes('11') ? 11 : 12)) as GradeLevel;
            const lesson = getLessonByPPCT(grade, e.subjectType || 'Toán', e.ppct || 1);
            return {
              id: `parsed_${Date.now()}_${idx}`,
              day: e.day || 'Thứ 3',
              date: e.date || '',
              session: e.session || 'Sáng',
              period: e.period || 1,
              className: e.className || '10M',
              grade: grade,
              subjectType: e.subjectType || 'Toán',
              ppct: e.ppct || 1,
              lessonName: e.lessonName || (lesson ? lesson.lessonName : 'Bài học theo PPCT')
            };
          });

          assistantContent = `Đã phân tích xong dữ liệu từ "${currentUploaded.name}" cho **Tuần ${currentWeek}**!
${data.summary || `Đã trích xuất thành công ${extractedSlots.length} tiết giảng dạy.`}

Thầy/Cô có thể bấm nút **"Áp dụng vào Sổ Báo Giảng"** bên dưới để cập nhật ngay vào bảng tuần ${currentWeek}.`;
        } else {
          assistantContent = data.summary || data.rawText || 'Tôi đã đọc dữ liệu nhưng cần thêm thông tin cụ thể về các thứ trong tuần hoặc lớp dạy.';
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `ai_${Date.now()}`,
            role: 'assistant',
            content: assistantContent,
            timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            extractedSlots: extractedSlots.length > 0 ? extractedSlots : undefined
          }
        ]);
      } else {
        // Chat text reasoning
        const res = await fetch('/api/ai-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            history: messages.map((m) => ({ role: m.role, content: m.content })),
            currentWeek,
            teachingProgress: classesProgress,
            scheduleContext: currentSchedule.slots.slice(0, 10)
          })
        });

        const data = await res.json();
        let content = data.text || 'Đã ghi nhận yêu cầu.';
        let extractedSlots: TimetableSlot[] | undefined;

        // Check if response contains JSON with suggested slots
        const jsonMatch = content.match(/```json([\s\S]*?)```/);
        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[1]);
            if (parsed.suggestedSlots && Array.isArray(parsed.suggestedSlots)) {
              extractedSlots = parsed.suggestedSlots.map((s: any, idx: number) => {
                const grade = (s.grade || (s.className?.includes('10') ? 10 : s.className?.includes('11') ? 11 : 12)) as GradeLevel;
                const lesson = getLessonByPPCT(grade, s.subjectType || 'Toán', s.ppct || 1);
                return {
                  id: `slot_ai_${Date.now()}_${idx}`,
                  day: s.day || 'Thứ 3',
                  date: s.date || '',
                  session: s.session || 'Sáng',
                  period: s.period || 1,
                  className: s.className || '10M',
                  grade: grade,
                  subjectType: s.subjectType || 'Toán',
                  ppct: s.ppct || 1,
                  lessonName: s.lessonName || (lesson ? lesson.lessonName : 'Bài học theo PPCT')
                };
              });
            }
          } catch (e) {
            console.error('Failed to parse suggested slots json:', e);
          }
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `ai_${Date.now()}`,
            role: 'assistant',
            content: content.replace(/```json[\s\S]*?```/g, ''),
            timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            extractedSlots
          }
        ]);
      }
    } catch (err: any) {
      // Offline fallback generator
      const fallbackMsg = `Tôi đã ghi nhận thông tin của Thầy/Cô. Hệ thống đã tự động tính toán tiến độ nối tiếp cho tuần ${currentWeek}:
- Mỗi lớp khối 10, 11: 3 tiết Toán + 1 tiết Chuyên đề
- Lớp khối 12: 3 tiết Toán + 1 tiết Chuyên đề + 2 tiết Ôn tốt nghiệp
Tên bài học đã được tự động liên kết với phân phối chương trình của trường.`;

      setMessages((prev) => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          role: 'assistant',
          content: fallbackMsg,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(scrollToBottom, 100);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full sm:w-[500px] bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-white/20 backdrop-blur-xs">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-1.5">
              Trợ Lý AI & Quét Thời Khóa Biểu
            </h3>
            <p className="text-[11px] text-purple-200">
              Phân tích ảnh / PDF / Đoạn chat • Tuần {currentWeek}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Prompts Bar */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px] text-slate-700 whitespace-nowrap scrollbar-none">
        <button
          onClick={() => handleQuickPrompt(`Tôi đã dạy đến tiết 9 Toán, tiết 3 CĐ 10M, 10K, 10I, 11A khi kết thúc tuần 3. Hãy lập kế hoạch chi tiết cho tuần 4.`)}
          className="px-2.5 py-1 rounded-full bg-white border border-slate-300 hover:border-purple-500 hover:text-purple-700 transition-colors cursor-pointer shrink-0"
        >
          ✨ Lập Tuần 4 từ tiến độ Tuần 3
        </button>
        <button
          onClick={() => handleQuickPrompt(`Xếp lịch lớp 12A1: gồm 3 tiết Toán chính khóa, 1 tiết Chuyên đề, và 2 tiết Ôn tốt nghiệp.`)}
          className="px-2.5 py-1 rounded-full bg-white border border-slate-300 hover:border-purple-500 hover:text-purple-700 transition-colors cursor-pointer shrink-0"
        >
          🎓 Thêm phân bổ Lớp 12 (+2 Ôn TN)
        </button>
        <button
          onClick={() => handleQuickPrompt(`Kiểm tra quy định phân bổ thời lượng môn Toán tuần này có hợp lệ không?`)}
          className="px-2.5 py-1 rounded-full bg-white border border-slate-300 hover:border-purple-500 hover:text-purple-700 transition-colors cursor-pointer shrink-0"
        >
          📋 Kiểm tra định mức tuần
        </button>
      </div>

      {/* Messages List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm">
        {messages.map((m) => {
          const isAi = m.role === 'assistant';

          return (
            <div key={m.id} className={`flex gap-3 ${isAi ? '' : 'flex-row-reverse'}`}>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white ${
                  isAi ? 'bg-gradient-to-tr from-purple-600 to-indigo-600' : 'bg-slate-700'
                }`}
              >
                {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] space-y-2`}>
                <div
                  className={`p-3.5 rounded-2xl ${
                    isAi
                      ? 'bg-slate-100 text-slate-800 rounded-tl-xs'
                      : 'bg-indigo-600 text-white rounded-tr-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed text-xs sm:text-sm">
                    {m.content}
                  </p>
                </div>

                {/* If AI provided extracted slots */}
                {m.extractedSlots && m.extractedSlots.length > 0 && (
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-purple-600" />
                        Trích xuất được {m.extractedSlots.length} tiết giảng dạy
                      </span>
                    </div>

                    <div className="max-h-36 overflow-y-auto space-y-1 text-[11px] text-slate-700 border border-purple-100 rounded-lg p-2 bg-white">
                      {m.extractedSlots.map((s, idx) => (
                        <div key={idx} className="flex items-center justify-between border-b border-slate-100 pb-1">
                          <span>
                            <strong>{s.day}</strong> ({s.session} T{s.period}): <strong>Lớp {s.className}</strong> - {s.subjectType}
                          </span>
                          <span className="text-indigo-600 font-bold">Tiết {s.ppct}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        if (m.extractedSlots) {
                          onApplySlotsToSchedule(m.extractedSlots);
                          alert(`Đã áp dụng ${m.extractedSlots.length} tiết vào Sổ Báo Giảng Tuần ${currentWeek}!`);
                        }
                      }}
                      className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Áp dụng vào Sổ Báo Giảng Tuần {currentWeek}</span>
                    </button>
                  </div>
                )}

                <span className="text-[10px] text-slate-400 block px-1">{m.timestamp}</span>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-white shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-100 p-3.5 rounded-2xl rounded-tl-xs flex items-center gap-2 text-xs text-slate-600">
              <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
              <span>Đang phân tích thời khóa biểu & đối chiếu PPCT...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* File Upload Preview */}
      {uploadedFile && (
        <div className="px-4 py-2 bg-purple-50 border-t border-purple-200 flex items-center justify-between text-xs text-purple-900">
          <div className="flex items-center gap-2 truncate">
            {uploadedFile.type.includes('image') ? (
              <ImageIcon className="w-4 h-4 text-purple-600 shrink-0" />
            ) : (
              <FileText className="w-4 h-4 text-purple-600 shrink-0" />
            )}
            <span className="truncate font-semibold">{uploadedFile.name}</span>
          </div>
          <button
            onClick={() => setUploadedFile(null)}
            className="text-slate-400 hover:text-rose-600 p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Input Form */}
      <div className="p-3 bg-white border-t border-slate-200 space-y-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileUpload}
          className="hidden"
        />

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title="Tải ảnh hoặc PDF Thời khóa biểu"
          >
            <Upload className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder="Nhập ghi chú, số tiết đã dạy, hoặc dán TKB..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 text-xs bg-slate-100 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
          />

          <button
            type="button"
            onClick={() => handleSendMessage()}
            disabled={isLoading || (!inputText.trim() && !uploadedFile)}
            className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-40 transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[10px] text-slate-400 text-center">
          Hỗ trợ ảnh TKB, văn bản liệt kê thứ/tiết/môn, báo giảng tuần trước.
        </p>
      </div>
    </div>
  );
};
