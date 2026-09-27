import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initialize GoogleGenAI
const apiKey = process.env.GEMINI_API_KEY || '';
let genAI: GoogleGenAI | null = null;
if (apiKey) {
  try {
    genAI = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI with provided key:', err);
  }
}

// API: Check AI status
app.get('/api/ai-status', (req, res) => {
  res.json({
    available: !!apiKey,
    model: 'gemini-3.8-flash'
  });
});

// API: AI Chat & Schedule Planner
app.post('/api/ai-chat', async (req, res) => {
  try {
    const { message, history, currentWeek, teachingProgress, scheduleContext } = req.body;

    if (!genAI) {
      return res.status(503).json({
        error: 'Chưa cấu hình GEMINI_API_KEY trên môi trường máy chủ.',
        fallback: true
      });
    }

    const systemPrompt = `Bạn là Trợ lý AI Chuyên môn Toán THPT (thuộc Tổ Toán - Tin, Trường THPT Trần Phú).
Nhiệm vụ của bạn là hỗ trợ giáo viên lập kế hoạch dạy học, phân phối chương trình và tạo Sổ báo giảng điện tử cho khối 10, 11, 12.

CÁC NGUYÊN TẮC BẮT BUỘC:
1. Quy định thời lượng dạy học môn Toán:
   - Lớp 10, 11, 12: Mỗi tuần bắt buộc có đúng 1 tiết Chuyên đề học tập môn Toán (CĐ Toán), và tối đa 3 tiết Toán chính khóa (Toán).
   - Riêng khối lớp 12: Bắt buộc có thêm 2 tiết Ôn thi tốt nghiệp môn Toán (Ôn tốt nghiệp).
2. Khi giáo viên cung cấp:
   - Tuần thứ mấy (ví dụ: Tuần 4, Tuần 5...).
   - Tiến độ tiết đã dạy khi kết thúc tuần trước cho từng lớp (ví dụ: Lớp 10M đã dạy đến tiết 6 Toán và tiết 2 CĐ; Lớp 11A đã dạy đến tiết 6 Toán và tiết 2 CĐ...).
   - Hoặc đoạn văn bản / thông tin thời khóa biểu / báo giảng tuần trước.
3. Bạn cần:
   - Xác định chính xác tiết PPCT tiếp theo cho từng phân môn (Toán, CĐ Toán, Ôn tốt nghiệp) của từng lớp.
   - Khớp đúng tên bài học trong kế hoạch dạy học chuẩn GDPT 2018 (Chương trình Toán 10, 11, 12 và Kế hoạch dạy ôn tốt nghiệp 12 - 70 tiết).
   - Nếu phát hiện yêu cầu xếp lịch có thể chuyển thành các tiết học cụ thể, hãy trả lời thân thiện bằng tiếng Việt, đồng thời kèm theo khối JSON nếu có:
   \`\`\`json
   {
     "suggestedSlots": [
       { "day": "Thứ 3", "session": "Sáng", "period": 1, "className": "10M", "subjectType": "Toán", "ppct": 7, "lessonName": "..." }
     ]
   }
   \`\`\`
4. Giọng điệu chuyên nghiệp, mẫu mực sư phạm, rõ ràng, chính xác.`;

    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        contents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.content }]
        });
      }
    }

    const userContent = `Ngữ cảnh hiện tại:
- Tuần hiện tại: Tuần ${currentWeek || 4}
- Tiến độ giảng dạy đã ghi nhận: ${JSON.stringify(teachingProgress || {})}
- Lịch hiện tại hoặc yêu cầu thêm: ${JSON.stringify(scheduleContext || {})}

Tin nhắn của giáo viên:
${message}`;

    contents.push({
      role: 'user',
      parts: [{ text: userContent }]
    });

    const response = await genAI.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.2
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Error calling Gemini AI:', error);
    res.status(500).json({ error: error.message || 'Lỗi khi kết nối với Gemini AI.' });
  }
});

// API: Parse Timetable Image / PDF or Text
app.post('/api/parse-schedule', async (req, res) => {
  try {
    const { imageBase64, mimeType, textInput, currentWeek, currentProgress } = req.body;

    if (!genAI) {
      return res.status(503).json({
        error: 'Chưa cấu hình GEMINI_API_KEY trên môi trường máy chủ.',
        fallback: true
      });
    }

    const prompt = `Bạn là hệ thống trích xuất thời khóa biểu và kế hoạch giảng dạy môn Toán tự động cho trường THPT Trần Phú.
Hãy phân tích dữ liệu đính kèm (ảnh thời khóa biểu, tài liệu hoặc văn bản mô tả).

QUY ĐỊNH CẦN TUÂN THỦ:
1. Mỗi lớp khối 10, 11, 12 có tối đa 3 tiết Toán chính khóa + 1 tiết Chuyên đề môn Toán (CĐ Toán) mỗi tuần.
2. Lớp 12 có thêm 2 tiết Ôn thi tốt nghiệp môn Toán mỗi tuần.
3. Tuần cần lập: Tuần ${currentWeek || 4}
4. Tiến độ đã dạy tuần trước: ${JSON.stringify(currentProgress || {})}

YÊU CẦU ĐẦU RA:
Trả về duy nhất định dạng JSON (không có text nào ngoài JSON) theo cấu trúc:
{
  "week": ${currentWeek || 4},
  "teacher": "Nguyễn Hữu Trung",
  "entries": [
    {
      "id": "slot_1",
      "day": "Thứ 3",
      "date": "29/09/2026",
      "session": "Sáng",
      "period": 1,
      "className": "10M",
      "grade": 10,
      "subjectType": "Toán",
      "lessonName": "Tên bài học tương ứng với PPCT",
      "ppct": 7,
      "note": ""
    }
  ],
  "summary": "Tóm tắt phân tích và số tiết đã xếp cho từng lớp"
}`;

    const parts: any[] = [];

    if (imageBase64 && mimeType) {
      parts.push({
        inlineData: {
          data: imageBase64.replace(/^data:[^;]+;base64,/, ''),
          mimeType: mimeType
        }
      });
    }

    parts.push({
      text: `${prompt}\n\nNội dung văn bản giáo viên nhập hoặc ghi chú thêm:\n${textInput || 'Trích xuất toàn bộ các tiết dạy môn Toán từ ảnh/tài liệu được cung cấp.'}`
    });

    const response = await genAI.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [{ role: 'user', parts }],
      config: {
        responseMimeType: 'application/json'
      }
    });

    try {
      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (parseErr) {
      res.json({ rawText: response.text, entries: [] });
    }
  } catch (error: any) {
    console.error('Error in parse-schedule:', error);
    res.status(500).json({ error: error.message || 'Lỗi khi xử lý dữ liệu thời khóa biểu.' });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
