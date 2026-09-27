import { CurriculumLesson, GradeLevel, SubjectType, WeekSchedule, TimetableSlot, ClassProgress } from '../types/curriculum';

// ====================== TOÁN 10 ======================
export const CURRICULUM_TOAN_10: CurriculumLesson[] = [
  // Học kỳ 1: Chương I
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 1,
    grade: 10 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương I: Mệnh đề - Tập hợp',
    lessonName: 'Bài 1: Mệnh đề',
    periodCount: 4,
    periodsRange: '1-4',
    competencyCode: '3.1.NC1a',
    requirements: 'Thiết lập mệnh đề phủ định, đảo, tương đương, điều kiện cần và đủ; xác định tính đúng sai.'
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 5,
    grade: 10 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương I: Mệnh đề - Tập hợp',
    lessonName: 'Bài 2: Tập hợp và phép toán trên tập hợp',
    periodCount: 4,
    periodsRange: '5-8',
    competencyCode: '1.1.NC1a',
    requirements: 'Khái niệm tập hợp, các phép toán hợp, giao, hiệu, phần bù, biểu đồ Ven.'
  })),
  {
    ppct: 9,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương I: Mệnh đề - Tập hợp',
    lessonName: 'Ôn tập cuối chương I',
    periodCount: 1,
    competencyCode: '3.1.NC1a',
    requirements: 'Hệ thống hóa kiến thức Mệnh đề và Tập hợp.'
  },
  // Chương II
  {
    ppct: 10,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương II: Bất phương trình, hệ BPT bậc nhất hai ẩn',
    lessonName: 'Bài 3: Bất phương trình bậc nhất hai ẩn (Tiết 1)',
    periodCount: 2,
    periodsRange: '10-11',
    competencyCode: '2.1.NC1'
  },
  {
    ppct: 11,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương II: Bất phương trình, hệ BPT bậc nhất hai ẩn',
    lessonName: 'Bài 3: Bất phương trình bậc nhất hai ẩn (Tiết 2)',
    periodCount: 2,
    periodsRange: '10-11',
    competencyCode: '2.1.NC1'
  },
  ...Array.from({ length: 3 }, (_, i) => ({
    ppct: i + 12,
    grade: 10 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương II: Bất phương trình, hệ BPT bậc nhất hai ẩn',
    lessonName: `Bài 4: Hệ bất phương trình bậc nhất hai ẩn (Tiết ${i + 1})`,
    periodCount: 3,
    periodsRange: '12-14',
    competencyCode: '2.2.NC1b'
  })),
  {
    ppct: 15,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương II: Bất phương trình, hệ BPT bậc nhất hai ẩn',
    lessonName: 'Bài tập cuối chương II',
    periodCount: 1,
    competencyCode: '5.1.NC1a'
  },
  // Chương III
  {
    ppct: 16,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương III: Hệ thức lượng trong tam giác',
    lessonName: 'Bài 5: Giá trị lượng giác của một góc từ 0° đến 180° (Tiết 1)',
    periodCount: 2,
    periodsRange: '16-17',
    competencyCode: '1.1.NC1b'
  },
  {
    ppct: 17,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương III: Hệ thức lượng trong tam giác',
    lessonName: 'Bài 5: Giá trị lượng giác của một góc từ 0° đến 180° (Tiết 2)',
    periodCount: 2,
    periodsRange: '16-17',
    competencyCode: '1.1.NC1b'
  },
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 18,
    grade: 10 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương III: Hệ thức lượng trong tam giác',
    lessonName: `Bài 6: Hệ thức lượng cơ bản trong tam giác (Tiết ${i + 1})`,
    periodCount: 4,
    periodsRange: '18-21',
    competencyCode: '3.1.NC1a'
  })),
  {
    ppct: 22,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương III: Hệ thức lượng trong tam giác',
    lessonName: 'Bài tập cuối chương III',
    periodCount: 1,
    competencyCode: '1.1.NC1a'
  },
  {
    ppct: 23,
    grade: 10,
    type: 'Toán',
    chapter: 'Kiểm tra định kỳ',
    lessonName: 'Ôn tập giữa kỳ I',
    periodCount: 1,
    competencyCode: '5.1.NC1a'
  },
  {
    ppct: 24,
    grade: 10,
    type: 'Toán',
    chapter: 'Kiểm tra định kỳ',
    lessonName: 'Kiểm tra giữa kỳ I (Phần 1)',
    periodCount: 2,
    competencyCode: '5.1.NC1a'
  },
  {
    ppct: 25,
    grade: 10,
    type: 'Toán',
    chapter: 'Kiểm tra định kỳ',
    lessonName: 'Kiểm tra giữa kỳ I (Phần 2)',
    periodCount: 2,
    competencyCode: '5.1.NC1a'
  },
  // Chương IV
  {
    ppct: 26,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương IV: Vectơ và các phép toán',
    lessonName: 'Bài 7: Các khái niệm mở đầu về vectơ (Tiết 1)',
    periodCount: 2,
    periodsRange: '26-27'
  },
  {
    ppct: 27,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương IV: Vectơ và các phép toán',
    lessonName: 'Bài 7: Các khái niệm mở đầu về vectơ (Tiết 2)',
    periodCount: 2,
    periodsRange: '26-27'
  },
  {
    ppct: 28,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương IV: Vectơ và các phép toán',
    lessonName: 'Bài 8: Tổng và hiệu của hai vectơ (Tiết 1)',
    periodCount: 2,
    periodsRange: '28-29'
  },
  {
    ppct: 29,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương IV: Vectơ và các phép toán',
    lessonName: 'Bài 8: Tổng và hiệu của hai vectơ (Tiết 2)',
    periodCount: 2,
    periodsRange: '28-29'
  },
  {
    ppct: 30,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương IV: Vectơ và các phép toán',
    lessonName: 'Bài 9: Tích của một vectơ với một số (Tiết 1)',
    periodCount: 2,
    periodsRange: '30-31'
  },
  {
    ppct: 31,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương IV: Vectơ và các phép toán',
    lessonName: 'Bài 9: Tích của một vectơ với một số (Tiết 2)',
    periodCount: 2,
    periodsRange: '30-31'
  },
  {
    ppct: 32,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương IV: Vectơ và các phép toán',
    lessonName: 'Bài 10: Vectơ trong mặt phẳng tọa độ (Tiết 1)',
    periodCount: 3,
    periodsRange: '32-34'
  },
  {
    ppct: 33,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương IV: Vectơ và các phép toán',
    lessonName: 'Bài 10: Vectơ trong mặt phẳng tọa độ (Tiết 2)',
    periodCount: 3,
    periodsRange: '32-34'
  },
  {
    ppct: 34,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương IV: Vectơ và các phép toán',
    lessonName: 'Bài 10: Vectơ trong mặt phẳng tọa độ (Tiết 3)',
    periodCount: 3,
    periodsRange: '32-34'
  },
  {
    ppct: 35,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương IV: Vectơ và các phép toán',
    lessonName: 'Bài 11: Tích vô hướng của hai vectơ (Tiết 1)',
    periodCount: 3,
    periodsRange: '35-37'
  },
  {
    ppct: 36,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương IV: Vectơ và các phép toán',
    lessonName: 'Bài 11: Tích vô hướng của hai vectơ (Tiết 2)',
    periodCount: 3,
    periodsRange: '35-37'
  },
  {
    ppct: 37,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương IV: Vectơ và các phép toán',
    lessonName: 'Bài 11: Tích vô hướng của hai vectơ (Tiết 3)',
    periodCount: 3,
    periodsRange: '35-37'
  },
  {
    ppct: 38,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương IV: Vectơ và các phép toán',
    lessonName: 'Bài tập cuối chương IV',
    periodCount: 1
  },
  // Chương V: Thống kê không ghép nhóm
  {
    ppct: 39,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương V: Các số đặc trưng không ghép nhóm',
    lessonName: 'Bài 12: Số gần đúng và sai số (Tiết 1)',
    periodCount: 2,
    periodsRange: '39-40'
  },
  {
    ppct: 40,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương V: Các số đặc trưng không ghép nhóm',
    lessonName: 'Bài 12: Số gần đúng và sai số (Tiết 2)',
    periodCount: 2,
    periodsRange: '39-40'
  },
  {
    ppct: 41,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương V: Các số đặc trưng không ghép nhóm',
    lessonName: 'Bài 13: Các số đặc trưng đo xu thế trung tâm (Tiết 1)',
    periodCount: 2,
    periodsRange: '41-42'
  },
  {
    ppct: 42,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương V: Các số đặc trưng không ghép nhóm',
    lessonName: 'Bài 13: Các số đặc trưng đo xu thế trung tâm (Tiết 2)',
    periodCount: 2,
    periodsRange: '41-42'
  },
  {
    ppct: 43,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương V: Các số đặc trưng không ghép nhóm',
    lessonName: 'Bài 14: Các số đặc trưng đo độ phân tán (Tiết 1)',
    periodCount: 2,
    periodsRange: '43-44'
  },
  {
    ppct: 44,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương V: Các số đặc trưng không ghép nhóm',
    lessonName: 'Bài 14: Các số đặc trưng đo độ phân tán (Tiết 2)',
    periodCount: 2,
    periodsRange: '43-44'
  },
  {
    ppct: 45,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương V: Các số đặc trưng không ghép nhóm',
    lessonName: 'Bài tập cuối chương V',
    periodCount: 1
  },
  {
    ppct: 46,
    grade: 10,
    type: 'Toán',
    chapter: 'Hoạt động trải nghiệm',
    lessonName: 'HĐTN: Tìm hiểu một số kiến thức về tài chính (Tiết 1)',
    periodCount: 2
  },
  {
    ppct: 47,
    grade: 10,
    type: 'Toán',
    chapter: 'Hoạt động trải nghiệm',
    lessonName: 'HĐTN: Tìm hiểu một số kiến thức về tài chính (Tiết 2)',
    periodCount: 2
  },
  {
    ppct: 48,
    grade: 10,
    type: 'Toán',
    chapter: 'Hoạt động trải nghiệm',
    lessonName: 'HĐTN: Mạng xã hội: Lợi và hại (Tiết 1)',
    periodCount: 2
  },
  {
    ppct: 49,
    grade: 10,
    type: 'Toán',
    chapter: 'Hoạt động trải nghiệm',
    lessonName: 'HĐTN: Mạng xã hội: Lợi và hại (Tiết 2)',
    periodCount: 2
  },
  {
    ppct: 50,
    grade: 10,
    type: 'Toán',
    chapter: 'Kiểm tra cuối kỳ I',
    lessonName: 'Ôn tập cuối học kỳ I (Tiết 1)',
    periodCount: 3
  },
  {
    ppct: 51,
    grade: 10,
    type: 'Toán',
    chapter: 'Kiểm tra cuối kỳ I',
    lessonName: 'Ôn tập cuối học kỳ I (Tiết 2)',
    periodCount: 3
  },
  {
    ppct: 52,
    grade: 10,
    type: 'Toán',
    chapter: 'Kiểm tra cuối kỳ I',
    lessonName: 'Ôn tập cuối học kỳ I (Tiết 3)',
    periodCount: 3
  },
  {
    ppct: 53,
    grade: 10,
    type: 'Toán',
    chapter: 'Kiểm tra cuối kỳ I',
    lessonName: 'Kiểm tra cuối học kỳ I (Phần 1)',
    periodCount: 2
  },
  {
    ppct: 54,
    grade: 10,
    type: 'Toán',
    chapter: 'Kiểm tra cuối kỳ I',
    lessonName: 'Kiểm tra cuối học kỳ I (Phần 2)',
    periodCount: 2
  },
  // Học kỳ 2: Tiết 55 - 105
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 55,
    grade: 10 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VI: Hàm số và đồ thị',
    lessonName: `Bài 15: Khái niệm cơ bản về hàm số và đồ thị (Tiết ${i + 1})`,
    periodCount: 4,
    periodsRange: '55-58'
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    ppct: i + 59,
    grade: 10 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VI: Hàm số và đồ thị',
    lessonName: `Bài 16: Hàm số bậc hai, đồ thị và ứng dụng (Tiết ${i + 1})`,
    periodCount: 3,
    periodsRange: '59-61'
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    ppct: i + 62,
    grade: 10 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VI: Hàm số và đồ thị',
    lessonName: `Bài 17: Dấu tam thức bậc hai và BPT bậc hai một ẩn (Tiết ${i + 1})`,
    periodCount: 3,
    periodsRange: '62-64'
  })),
  {
    ppct: 65,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương VI: Hàm số và đồ thị',
    lessonName: 'Bài 18: Phương trình quy về phương trình bậc hai (Tiết 1)',
    periodCount: 2,
    periodsRange: '65-66'
  },
  {
    ppct: 66,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương VI: Hàm số và đồ thị',
    lessonName: 'Bài 18: Phương trình quy về phương trình bậc hai (Tiết 2)',
    periodCount: 2,
    periodsRange: '65-66'
  },
  {
    ppct: 67,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương VI: Hàm số và đồ thị',
    lessonName: 'Ôn tập chương VI',
    periodCount: 1
  },
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 68,
    grade: 10 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VII: Phương pháp tọa độ trong mặt phẳng',
    lessonName: `Bài 19: Phương trình đường thẳng (Tiết ${i + 1})`,
    periodCount: 2,
    periodsRange: '68-69'
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    ppct: i + 70,
    grade: 10 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VII: Phương pháp tọa độ trong mặt phẳng',
    lessonName: `Bài 20: Vị trí tương đối hai đường thẳng. Góc và khoảng cách (Tiết ${i + 1})`,
    periodCount: 3,
    periodsRange: '70-72'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 73,
    grade: 10 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VII: Phương pháp tọa độ trong mặt phẳng',
    lessonName: `Bài 21: Đường tròn trong mặt phẳng tọa độ (Tiết ${i + 1})`,
    periodCount: 2,
    periodsRange: '73-74'
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 75,
    grade: 10 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VII: Phương pháp tọa độ trong mặt phẳng',
    lessonName: `Bài 22: Ba đường conic (Tiết ${i + 1})`,
    periodCount: 4,
    periodsRange: '75-78'
  })),
  {
    ppct: 79,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương VII: Phương pháp tọa độ trong mặt phẳng',
    lessonName: 'Bài tập cuối chương VII',
    periodCount: 1
  },
  {
    ppct: 80,
    grade: 10,
    type: 'Toán',
    chapter: 'Kiểm tra giữa kỳ II',
    lessonName: 'Ôn tập giữa kỳ II',
    periodCount: 1
  },
  {
    ppct: 81,
    grade: 10,
    type: 'Toán',
    chapter: 'Kiểm tra giữa kỳ II',
    lessonName: 'Kiểm tra giữa kì II (Phần 1)',
    periodCount: 2
  },
  {
    ppct: 82,
    grade: 10,
    type: 'Toán',
    chapter: 'Kiểm tra giữa kỳ II',
    lessonName: 'Kiểm tra giữa kì II (Phần 2)',
    periodCount: 2
  },
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 83,
    grade: 10 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VIII: Đại số tổ hợp',
    lessonName: `Bài 23: Quy tắc đếm (Tiết ${i + 1})`,
    periodCount: 4,
    periodsRange: '83-86'
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 87,
    grade: 10 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VIII: Đại số tổ hợp',
    lessonName: `Bài 24: Hoán vị, chỉnh hợp và tổ hợp (Tiết ${i + 1})`,
    periodCount: 4,
    periodsRange: '87-90'
  })),
  {
    ppct: 91,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương VIII: Đại số tổ hợp',
    lessonName: 'Bài 25: Nhị thức Niutơn (Tiết 1)',
    periodCount: 2,
    periodsRange: '91-92'
  },
  {
    ppct: 92,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương VIII: Đại số tổ hợp',
    lessonName: 'Bài 25: Nhị thức Niutơn (Tiết 2)',
    periodCount: 2,
    periodsRange: '91-92'
  },
  {
    ppct: 93,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương VIII: Đại số tổ hợp',
    lessonName: 'Bài tập ôn chương VIII',
    periodCount: 1
  },
  {
    ppct: 94,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương IX: Xác suất cổ điển',
    lessonName: 'Bài 26: Biến cố và định nghĩa cổ điển của xác suất (Tiết 1)',
    periodCount: 2,
    periodsRange: '94-95'
  },
  {
    ppct: 95,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương IX: Xác suất cổ điển',
    lessonName: 'Bài 26: Biến cố và định nghĩa cổ điển của xác suất (Tiết 2)',
    periodCount: 2,
    periodsRange: '94-95'
  },
  ...Array.from({ length: 3 }, (_, i) => ({
    ppct: i + 96,
    grade: 10 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương IX: Xác suất cổ điển',
    lessonName: `Bài 27: Thực hành tính xác suất theo định nghĩa cổ điển (Tiết ${i + 1})`,
    periodCount: 3,
    periodsRange: '96-98'
  })),
  {
    ppct: 99,
    grade: 10,
    type: 'Toán',
    chapter: 'Chương IX: Xác suất cổ điển',
    lessonName: 'Bài tập cuối chương IX',
    periodCount: 1
  },
  {
    ppct: 100,
    grade: 10,
    type: 'Toán',
    chapter: 'Hoạt động trải nghiệm',
    lessonName: 'HĐTN: Hoạt động trải nghiệm hình học (Tiết 1)',
    periodCount: 2
  },
  {
    ppct: 101,
    grade: 10,
    type: 'Toán',
    chapter: 'Hoạt động trải nghiệm',
    lessonName: 'HĐTN: Hoạt động trải nghiệm hình học (Tiết 2)',
    periodCount: 2
  },
  {
    ppct: 102,
    grade: 10,
    type: 'Toán',
    chapter: 'Hoạt động trải nghiệm',
    lessonName: 'HĐTN: Ước tính số cá thể trong quần thể',
    periodCount: 1
  },
  {
    ppct: 103,
    grade: 10,
    type: 'Toán',
    chapter: 'Kiểm tra cuối kỳ II',
    lessonName: 'Ôn tập cuối kì II (Tiết 1)',
    periodCount: 3
  },
  {
    ppct: 104,
    grade: 10,
    type: 'Toán',
    chapter: 'Kiểm tra cuối kỳ II',
    lessonName: 'Kiểm tra cuối kì II (Phần 1)',
    periodCount: 2
  },
  {
    ppct: 105,
    grade: 10,
    type: 'Toán',
    chapter: 'Kiểm tra cuối kỳ II',
    lessonName: 'Kiểm tra cuối kì II (Phần 2)',
    periodCount: 2
  }
];

// Chuyên đề 10 (35 tiết)
export const CURRICULUM_CD_10: CurriculumLesson[] = [
  ...Array.from({ length: 5 }, (_, i) => ({
    ppct: i + 1,
    grade: 10 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề 1: Hệ phương trình bậc nhất 3 ẩn',
    lessonName: 'CĐ1 - Bài 1: Hệ phương trình bậc nhất 3 ẩn',
    periodCount: 5,
    periodsRange: '1-5'
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 6,
    grade: 10 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề 1: Hệ phương trình bậc nhất 3 ẩn',
    lessonName: 'CĐ1 - Bài 2: Ứng dụng của hệ phương trình bậc nhất 3 ẩn',
    periodCount: 4,
    periodsRange: '6-9'
  })),
  {
    ppct: 10,
    grade: 10,
    type: 'CĐ Toán',
    chapter: 'Chuyên đề 1: Hệ phương trình bậc nhất 3 ẩn',
    lessonName: 'CĐ1 - Bài tập ôn chuyên đề 1 (Tiết 1)',
    periodCount: 2
  },
  {
    ppct: 11,
    grade: 10,
    type: 'CĐ Toán',
    chapter: 'Chuyên đề 1: Hệ phương trình bậc nhất 3 ẩn',
    lessonName: 'CĐ1 - Bài tập ôn chuyên đề 1 (Tiết 2)',
    periodCount: 2
  },
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 12,
    grade: 10 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề 2: Phương pháp quy nạp toán học. Nhị thức Newton',
    lessonName: 'CĐ2 - Bài 3: Phương pháp quy nạp toán học',
    periodCount: 4,
    periodsRange: '12-15'
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    ppct: i + 16,
    grade: 10 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề 2: Phương pháp quy nạp toán học. Nhị thức Newton',
    lessonName: 'CĐ2 - Bài 4: Nhị thức Niutơn',
    periodCount: 5,
    periodsRange: '16-20'
  })),
  {
    ppct: 21,
    grade: 10,
    type: 'CĐ Toán',
    chapter: 'Chuyên đề 2: Phương pháp quy nạp toán học. Nhị thức Newton',
    lessonName: 'CĐ2 - Bài tập cuối chuyên đề 2',
    periodCount: 1
  },
  ...Array.from({ length: 3 }, (_, i) => ({
    ppct: i + 22,
    grade: 10 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề 3: Ba đường conic và ứng dụng',
    lessonName: 'CĐ3 - Bài 5: Elip',
    periodCount: 3,
    periodsRange: '22-24'
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    ppct: i + 25,
    grade: 10 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề 3: Ba đường conic và ứng dụng',
    lessonName: 'CĐ3 - Bài 6: Hypebol',
    periodCount: 3,
    periodsRange: '25-27'
  })),
  {
    ppct: 28,
    grade: 10,
    type: 'CĐ Toán',
    chapter: 'Chuyên đề 3: Ba đường conic và ứng dụng',
    lessonName: 'CĐ3 - Bài 7: Parabol (Tiết 1)',
    periodCount: 2
  },
  {
    ppct: 29,
    grade: 10,
    type: 'CĐ Toán',
    chapter: 'Chuyên đề 3: Ba đường conic và ứng dụng',
    lessonName: 'CĐ3 - Bài 7: Parabol (Tiết 2)',
    periodCount: 2
  },
  {
    ppct: 30,
    grade: 10,
    type: 'CĐ Toán',
    chapter: 'Chuyên đề 3: Ba đường conic và ứng dụng',
    lessonName: 'CĐ3 - Bài 8: Sự thống nhất giữa 3 đường conic (Tiết 1)',
    periodCount: 2
  },
  {
    ppct: 31,
    grade: 10,
    type: 'CĐ Toán',
    chapter: 'Chuyên đề 3: Ba đường conic và ứng dụng',
    lessonName: 'CĐ3 - Bài 8: Sự thống nhất giữa 3 đường conic (Tiết 2)',
    periodCount: 2
  },
  {
    ppct: 32,
    grade: 10,
    type: 'CĐ Toán',
    chapter: 'Chuyên đề 3: Ba đường conic và ứng dụng',
    lessonName: 'CĐ3 - Bài tập cuối chuyên đề 3',
    periodCount: 1
  },
  {
    ppct: 33,
    grade: 10,
    type: 'CĐ Toán',
    chapter: 'Đánh giá chuyên đề',
    lessonName: 'Ôn tập chuyên đề học tập 10 (Tiết 1)',
    periodCount: 3
  },
  {
    ppct: 34,
    grade: 10,
    type: 'CĐ Toán',
    chapter: 'Đánh giá chuyên đề',
    lessonName: 'Ôn tập chuyên đề học tập 10 (Tiết 2)',
    periodCount: 3
  },
  {
    ppct: 35,
    grade: 10,
    type: 'CĐ Toán',
    chapter: 'Đánh giá chuyên đề',
    lessonName: 'Kiểm tra chuyên đề 1, 2, 3',
    periodCount: 1
  }
];

// ====================== TOÁN 11 (Chính xác từ văn bản phân phối) ======================
export const CURRICULUM_TOAN_11: CurriculumLesson[] = [
  ...Array.from({ length: 3 }, (_, i) => ({
    ppct: i + 1,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương I: Hàm số lượng giác và PT lượng giác',
    lessonName: 'Bài 1: Giá trị lượng giác của góc lượng giác',
    periodCount: 3,
    periodsRange: '1-3',
    competencyCode: '5.2.NC1b, 1.1.NC1a'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 4,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương I: Hàm số lượng giác và PT lượng giác',
    lessonName: 'Bài 2: Công thức lượng giác',
    periodCount: 2,
    periodsRange: '4-5',
    competencyCode: '5.2.NC1b'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 6,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương I: Hàm số lượng giác và PT lượng giác',
    lessonName: 'Bài 3: Hàm số lượng giác',
    periodCount: 2,
    periodsRange: '6-7',
    competencyCode: '3.1.NC1a, 5.2.NC1b'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 8,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương I: Hàm số lượng giác và PT lượng giác',
    lessonName: 'Bài 4: Phương trình lượng giác cơ bản',
    periodCount: 2,
    periodsRange: '8-9',
    competencyCode: '5.2.NC1b'
  })),
  {
    ppct: 10,
    grade: 11,
    type: 'Toán',
    chapter: 'Chương I: Hàm số lượng giác và PT lượng giác',
    lessonName: 'Bài tập cuối chương I',
    periodCount: 1,
    competencyCode: '5.2.NC1b'
  },
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 11,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương II: Dãy số, cấp số cộng và cấp số nhân',
    lessonName: 'Bài 5: Dãy số',
    periodCount: 2,
    periodsRange: '11-12'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 13,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương II: Dãy số, cấp số cộng và cấp số nhân',
    lessonName: 'Bài 6: Cấp số cộng',
    periodCount: 2,
    periodsRange: '13-14'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 15,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương II: Dãy số, cấp số cộng và cấp số nhân',
    lessonName: 'Bài 7: Cấp số nhân',
    periodCount: 2,
    periodsRange: '15-16'
  })),
  {
    ppct: 17,
    grade: 11,
    type: 'Toán',
    chapter: 'Chương II: Dãy số, cấp số cộng và cấp số nhân',
    lessonName: 'Bài tập cuối chương II',
    periodCount: 1
  },
  {
    ppct: 18,
    grade: 11,
    type: 'Toán',
    chapter: 'Chương III: Các số đặc trưng đo xu thế trung tâm của mẫu số liệu ghép nhóm',
    lessonName: 'Bài 8: Mẫu số liệu ghép nhóm',
    periodCount: 1
  },
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 19,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương III: Các số đặc trưng đo xu thế trung tâm của mẫu số liệu ghép nhóm',
    lessonName: 'Bài 9: Các số đặc trưng đo xu thế trung tâm',
    periodCount: 2,
    periodsRange: '19-20'
  })),
  {
    ppct: 21,
    grade: 11,
    type: 'Toán',
    chapter: 'Chương III: Các số đặc trưng đo xu thế trung tâm của mẫu số liệu ghép nhóm',
    lessonName: 'Bài tập cuối chương III',
    periodCount: 1
  },
  {
    ppct: 22,
    grade: 11,
    type: 'Toán',
    chapter: 'Kiểm tra đánh giá định kỳ',
    lessonName: 'Ôn tập giữa kỳ I',
    periodCount: 1
  },
  {
    ppct: 23,
    grade: 11,
    type: 'Toán',
    chapter: 'Kiểm tra đánh giá định kỳ',
    lessonName: 'Kiểm tra giữa kỳ I (Tiết 1)',
    periodCount: 2,
    periodsRange: '23-24'
  },
  {
    ppct: 24,
    grade: 11,
    type: 'Toán',
    chapter: 'Kiểm tra đánh giá định kỳ',
    lessonName: 'Kiểm tra giữa kỳ I (Tiết 2)',
    periodCount: 2,
    periodsRange: '23-24'
  },
  ...Array.from({ length: 3 }, (_, i) => ({
    ppct: i + 25,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương IV: Quan hệ song song trong không gian',
    lessonName: 'Bài 10: Đường thẳng và mặt phẳng trong không gian',
    periodCount: 3,
    periodsRange: '25-27'
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    ppct: i + 28,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương IV: Quan hệ song song trong không gian',
    lessonName: 'Bài 11: Hai đường thẳng song song',
    periodCount: 3,
    periodsRange: '28-30'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 31,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương IV: Quan hệ song song trong không gian',
    lessonName: 'Bài 12: Đường thẳng song song với mặt phẳng',
    periodCount: 2,
    periodsRange: '31-32'
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 33,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương IV: Quan hệ song song trong không gian',
    lessonName: 'Bài 13: Hai mặt phẳng song song',
    periodCount: 4,
    periodsRange: '33-36'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 37,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương IV: Quan hệ song song trong không gian',
    lessonName: 'Bài 14: Phép chiếu song song',
    periodCount: 2,
    periodsRange: '37-38'
  })),
  {
    ppct: 39,
    grade: 11,
    type: 'Toán',
    chapter: 'Chương IV: Quan hệ song song trong không gian',
    lessonName: 'Bài tập cuối chương IV',
    periodCount: 1
  },
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 40,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương V: Giới hạn. Hàm số liên tục',
    lessonName: 'Bài 15: Giới hạn của dãy số',
    periodCount: 2,
    periodsRange: '40-41'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 42,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương V: Giới hạn. Hàm số liên tục',
    lessonName: 'Bài 16: Giới hạn của hàm số',
    periodCount: 2,
    periodsRange: '42-43'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 44,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương V: Giới hạn. Hàm số liên tục',
    lessonName: 'Bài 17: Hàm số liên tục',
    periodCount: 2,
    periodsRange: '44-45'
  })),
  {
    ppct: 46,
    grade: 11,
    type: 'Toán',
    chapter: 'Chương V: Giới hạn. Hàm số liên tục',
    lessonName: 'Bài tập cuối chương V',
    periodCount: 1
  },
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 47,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Hoạt động thực hành trải nghiệm',
    lessonName: 'Một vài ứng dụng của toán học trong tài chính',
    periodCount: 2,
    periodsRange: '47-48'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 49,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Hoạt động thực hành trải nghiệm',
    lessonName: 'Lực căng mặt ngoài của nước',
    periodCount: 2,
    periodsRange: '49-50'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 51,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Kiểm tra đánh giá cuối kỳ I',
    lessonName: 'Ôn tập cuối kỳ I',
    periodCount: 2,
    periodsRange: '51-52'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 53,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Kiểm tra đánh giá cuối kỳ I',
    lessonName: 'Kiểm tra cuối kỳ I',
    periodCount: 2,
    periodsRange: '53-54'
  })),
  // Học kỳ II
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 55,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VI: Hàm số mũ và hàm số logarit',
    lessonName: 'Bài 18: Lũy thừa với số mũ thực',
    periodCount: 2,
    periodsRange: '55-56'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 57,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VI: Hàm số mũ và hàm số logarit',
    lessonName: 'Bài 19: Logarit',
    periodCount: 2,
    periodsRange: '57-58'
  })),
  {
    ppct: 59,
    grade: 11,
    type: 'Toán',
    chapter: 'Chương VI: Hàm số mũ và hàm số logarit',
    lessonName: 'Bài 20: Hàm số mũ và hàm số logarit',
    periodCount: 1
  },
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 60,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VI: Hàm số mũ và hàm số logarit',
    lessonName: 'Bài 21: Phương trình, bất phương trình mũ và logarit',
    periodCount: 2,
    periodsRange: '60-61'
  })),
  {
    ppct: 62,
    grade: 11,
    type: 'Toán',
    chapter: 'Chương VI: Hàm số mũ và hàm số logarit',
    lessonName: 'Bài tập cuối chương VI',
    periodCount: 1
  },
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 63,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VII: Quan hệ vuông góc trong không gian',
    lessonName: 'Bài 22: Hai đường thẳng vuông góc',
    periodCount: 2,
    periodsRange: '63-64'
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    ppct: i + 65,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VII: Quan hệ vuông góc trong không gian',
    lessonName: 'Bài 23: Đường thẳng vuông góc với mặt phẳng',
    periodCount: 3,
    periodsRange: '65-67'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 68,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VII: Quan hệ vuông góc trong không gian',
    lessonName: 'Bài 24: Phép chiếu vuông góc',
    periodCount: 2,
    periodsRange: '68-69'
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    ppct: i + 70,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VII: Quan hệ vuông góc trong không gian',
    lessonName: 'Bài 25: Hai mặt phẳng vuông góc',
    periodCount: 3,
    periodsRange: '70-72'
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    ppct: i + 73,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VII: Quan hệ vuông góc trong không gian',
    lessonName: 'Bài 26: Khoảng cách',
    periodCount: 3,
    periodsRange: '73-75'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 76,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VII: Quan hệ vuông góc trong không gian',
    lessonName: 'Bài 27: Thể tích',
    periodCount: 2,
    periodsRange: '76-77'
  })),
  {
    ppct: 78,
    grade: 11,
    type: 'Toán',
    chapter: 'Chương VII: Quan hệ vuông góc trong không gian',
    lessonName: 'Ôn tập cuối chương VII',
    periodCount: 1
  },
  {
    ppct: 79,
    grade: 11,
    type: 'Toán',
    chapter: 'Kiểm tra giữa kỳ II',
    lessonName: 'Ôn tập giữa kỳ II',
    periodCount: 1
  },
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 80,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Kiểm tra giữa kỳ II',
    lessonName: 'Kiểm tra giữa kỳ II',
    periodCount: 2,
    periodsRange: '80-81'
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    ppct: i + 82,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VIII: Các quy tắc tính xác suất',
    lessonName: 'Bài 28: Biến cố hợp, biến cố giao, biến cố độc lập',
    periodCount: 3,
    periodsRange: '82-84'
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    ppct: i + 85,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VIII: Các quy tắc tính xác suất',
    lessonName: 'Bài 29: Công thức cộng',
    periodCount: 3,
    periodsRange: '85-87'
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    ppct: i + 88,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VIII: Các quy tắc tính xác suất',
    lessonName: 'Bài 30: Công thức nhân cho 2 biến cố độc lập',
    periodCount: 3,
    periodsRange: '88-90'
  })),
  {
    ppct: 91,
    grade: 11,
    type: 'Toán',
    chapter: 'Chương VIII: Các quy tắc tính xác suất',
    lessonName: 'Bài tập cuối chương VIII',
    periodCount: 1
  },
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 92,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương IX: Đạo hàm',
    lessonName: 'Bài 31: Định nghĩa và ý nghĩa của đạo hàm',
    periodCount: 2,
    periodsRange: '92-93'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 94,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương IX: Đạo hàm',
    lessonName: 'Bài 32: Các quy tắc tính đạo hàm',
    periodCount: 2,
    periodsRange: '94-95'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 96,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương IX: Đạo hàm',
    lessonName: 'Bài 33: Đạo hàm cấp hai',
    periodCount: 2,
    periodsRange: '96-97'
  })),
  {
    ppct: 98,
    grade: 11,
    type: 'Toán',
    chapter: 'Chương IX: Đạo hàm',
    lessonName: 'Bài tập cuối chương IX',
    periodCount: 1
  },
  {
    ppct: 99,
    grade: 11,
    type: 'Toán',
    chapter: 'Hoạt động thực hành trải nghiệm',
    lessonName: 'Một số mô hình toán học sử dụng hàm số mũ và hàm số logarit',
    periodCount: 1
  },
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 100,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Hoạt động thực hành trải nghiệm',
    lessonName: 'Hoạt động thực hành trải nghiệm hình học',
    periodCount: 2,
    periodsRange: '100-101'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 102,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Kiểm tra đánh giá cuối HK2',
    lessonName: 'Ôn tập cuối HK2',
    periodCount: 2,
    periodsRange: '102-103'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 104,
    grade: 11 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Kiểm tra đánh giá cuối HK2',
    lessonName: 'Kiểm tra cuối HK2',
    periodCount: 2,
    periodsRange: '104-105'
  }))
];

// Chuyên đề 11 (35 tiết)
export const CURRICULUM_CD_11: CurriculumLesson[] = [
  {
    ppct: 1,
    grade: 11,
    type: 'CĐ Toán',
    chapter: 'Chuyên đề I: Phép biến hình trong mặt phẳng',
    lessonName: 'CĐ1 - Bài 1: Phép biến hình',
    periodCount: 1
  },
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 2,
    grade: 11 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề I: Phép biến hình trong mặt phẳng',
    lessonName: 'CĐ1 – Bài 2: Phép tịnh tiến',
    periodCount: 2,
    periodsRange: '2-3'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 4,
    grade: 11 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề I: Phép biến hình trong mặt phẳng',
    lessonName: 'CĐ1 - Bài 3: Phép đối xứng trục',
    periodCount: 2,
    periodsRange: '4-5'
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 6,
    grade: 11 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề I: Phép biến hình trong mặt phẳng',
    lessonName: 'CĐ1 - Bài 4: Phép quay và phép đối xứng tâm',
    periodCount: 4,
    periodsRange: '6-9'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 10,
    grade: 11 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề I: Phép biến hình trong mặt phẳng',
    lessonName: 'CĐ1 - Bài 5: Phép dời hình',
    periodCount: 2,
    periodsRange: '10-11'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 12,
    grade: 11 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề I: Phép biến hình trong mặt phẳng',
    lessonName: 'CĐ1 - Bài 6: Phép vị tự',
    periodCount: 2,
    periodsRange: '12-13'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 14,
    grade: 11 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề I: Phép biến hình trong mặt phẳng',
    lessonName: 'CĐ1 - Bài 7: Phép đồng dạng',
    periodCount: 2,
    periodsRange: '14-15'
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    ppct: i + 16,
    grade: 11 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề I: Phép biến hình trong mặt phẳng',
    lessonName: 'CĐ1 - Bài tập cuối chuyên đề 1',
    periodCount: 3,
    periodsRange: '16-18'
  })),
  // Học kỳ II
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 19,
    grade: 11 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề II: Làm quen lý thuyết đồ thị',
    lessonName: 'CĐ2 - Bài 8: Một số khái niệm cơ bản',
    periodCount: 2,
    periodsRange: '19-20'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 21,
    grade: 11 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề II: Làm quen lý thuyết đồ thị',
    lessonName: 'CĐ2 - Bài 9: Đường đi Euler và đường đi Hamilton',
    periodCount: 2,
    periodsRange: '21-22'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 23,
    grade: 11 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề II: Làm quen lý thuyết đồ thị',
    lessonName: 'CĐ2 - Bài 10: Bài toán tìm đường đi tối ưu',
    periodCount: 2,
    periodsRange: '23-24'
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    ppct: i + 25,
    grade: 11 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề II: Làm quen lý thuyết đồ thị',
    lessonName: 'CĐ2 - Bài tập cuối chuyên đề 2',
    periodCount: 3,
    periodsRange: '25-27'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 28,
    grade: 11 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề III: Một số yếu tố vẽ kĩ thuật',
    lessonName: 'CĐ3 - Bài 11: Hình chiếu vuông góc và hình chiếu trục đo',
    periodCount: 2,
    periodsRange: '28-29'
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    ppct: i + 30,
    grade: 11 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề III: Một số yếu tố vẽ kĩ thuật',
    lessonName: 'CĐ3 - Bài 12: Bản vẽ kĩ thuật',
    periodCount: 3,
    periodsRange: '30-32'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 33,
    grade: 11 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề III: Một số yếu tố vẽ kĩ thuật',
    lessonName: 'CĐ3 - Bài tập cuối chuyên đề 3',
    periodCount: 2,
    periodsRange: '33-34'
  })),
  {
    ppct: 35,
    grade: 11,
    type: 'CĐ Toán',
    chapter: 'Kiểm tra chuyên đề',
    lessonName: 'Kiểm tra chuyên đề 1, 2, 3',
    periodCount: 1
  }
];

// ====================== TOÁN 12 ======================
export const CURRICULUM_TOAN_12: CurriculumLesson[] = [
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 1,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương I: Ứng dụng đạo hàm để khảo sát hàm số',
    lessonName: `Bài 1: Tính đơn điệu và cực trị của hàm số (Tiết ${i + 1})`,
    periodCount: 4,
    periodsRange: '1-4'
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 5,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương I: Ứng dụng đạo hàm để khảo sát hàm số',
    lessonName: `Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số (Tiết ${i + 1})`,
    periodCount: 4,
    periodsRange: '5-8'
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 9,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương I: Ứng dụng đạo hàm để khảo sát hàm số',
    lessonName: `Bài 3: Đường tiệm cận của đồ thị hàm số (Tiết ${i + 1})`,
    periodCount: 4,
    periodsRange: '9-12'
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 13,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương I: Ứng dụng đạo hàm để khảo sát hàm số',
    lessonName: `Bài 4: Khảo sát sự biến thiên và vẽ đồ thị của hàm số (Tiết ${i + 1})`,
    periodCount: 4,
    periodsRange: '13-16'
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 17,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương I: Ứng dụng đạo hàm để khảo sát hàm số',
    lessonName: `Bài 5: Ứng dụng đạo hàm để giải quyết các vấn đề thực tiễn (Tiết ${i + 1})`,
    periodCount: 4,
    periodsRange: '17-20'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 21,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương I: Ứng dụng đạo hàm để khảo sát hàm số',
    lessonName: `Bài tập cuối chương I (Tiết ${i + 1})`,
    periodCount: 2,
    periodsRange: '21-22'
  })),
  {
    ppct: 23,
    grade: 12,
    type: 'Toán',
    chapter: 'Kiểm tra giữa kỳ I',
    lessonName: 'Ôn tập giữa kỳ I',
    periodCount: 1
  },
  {
    ppct: 24,
    grade: 12,
    type: 'Toán',
    chapter: 'Kiểm tra giữa kỳ I',
    lessonName: 'Kiểm tra giữa kỳ I (Tiết 1)',
    periodCount: 2
  },
  {
    ppct: 25,
    grade: 12,
    type: 'Toán',
    chapter: 'Kiểm tra giữa kỳ I',
    lessonName: 'Kiểm tra giữa kỳ I (Tiết 2)',
    periodCount: 2
  },
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 26,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương II: Vectơ và hệ tọa độ trong không gian',
    lessonName: `Bài 6: Vectơ trong không gian (Tiết ${i + 1})`,
    periodCount: 4,
    periodsRange: '26-29'
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    ppct: i + 30,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương II: Vectơ và hệ tọa độ trong không gian',
    lessonName: `Bài 7: Hệ toạ độ trong không gian (Tiết ${i + 1})`,
    periodCount: 5,
    periodsRange: '30-34'
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    ppct: i + 35,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương II: Vectơ và hệ tọa độ trong không gian',
    lessonName: `Bài 8: Biểu thức tọa độ của các phép toán vectơ (Tiết ${i + 1})`,
    periodCount: 5,
    periodsRange: '35-39'
  })),
  {
    ppct: 40,
    grade: 12,
    type: 'Toán',
    chapter: 'Chương II: Vectơ và hệ tọa độ trong không gian',
    lessonName: 'Bài tập cuối chương II',
    periodCount: 1
  },
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 41,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương III: Các số đặc trưng đo mức độ phân tán của mẫu số liệu ghép nhóm',
    lessonName: `Bài 9: Khoảng biến thiên và khoảng tứ phân vị (Tiết ${i + 1})`,
    periodCount: 4,
    periodsRange: '41-44'
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 45,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương III: Các số đặc trưng đo mức độ phân tán của mẫu số liệu ghép nhóm',
    lessonName: `Bài 10: Phương sai và độ lệch chuẩn (Tiết ${i + 1})`,
    periodCount: 4,
    periodsRange: '45-48'
  })),
  {
    ppct: 49,
    grade: 12,
    type: 'Toán',
    chapter: 'Chương III: Các số đặc trưng đo mức độ phân tán của mẫu số liệu ghép nhóm',
    lessonName: 'Bài tập cuối chương III',
    periodCount: 1
  },
  {
    ppct: 50,
    grade: 12,
    type: 'Toán',
    chapter: 'Hoạt động trải nghiệm',
    lessonName: 'Thực hành tính toán tài chính và tối ưu với bảng tính',
    periodCount: 1
  },
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 51,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Kiểm tra cuối kỳ I',
    lessonName: `Ôn tập học kỳ I (Tiết ${i + 1})`,
    periodCount: 2,
    periodsRange: '51-52'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 53,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Kiểm tra cuối kỳ I',
    lessonName: `Kiểm tra cuối học kỳ I (Tiết ${i + 1})`,
    periodCount: 2,
    periodsRange: '53-54'
  })),
  // Học kỳ II: Tiết 55 - 105 (Nguyên hàm, tích phân, Oxyz, Xác suất...)
  ...Array.from({ length: 5 }, (_, i) => ({
    ppct: i + 55,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương IV: Nguyên hàm và Tích phân',
    lessonName: `Bài 11: Nguyên hàm (Tiết ${i + 1})`,
    periodCount: 5,
    periodsRange: '55-59'
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    ppct: i + 60,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương IV: Nguyên hàm và Tích phân',
    lessonName: `Bài 12: Tích phân (Tiết ${i + 1})`,
    periodCount: 5,
    periodsRange: '60-64'
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    ppct: i + 65,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương IV: Nguyên hàm và Tích phân',
    lessonName: `Bài 13: Ứng dụng hình học của tích phân (Tiết ${i + 1})`,
    periodCount: 5,
    periodsRange: '65-69'
  })),
  {
    ppct: 70,
    grade: 12,
    type: 'Toán',
    chapter: 'Chương IV: Nguyên hàm và Tích phân',
    lessonName: 'Bài tập cuối chương IV',
    periodCount: 1
  },
  ...Array.from({ length: 5 }, (_, i) => ({
    ppct: i + 71,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương V: Phương pháp toạ độ trong không gian',
    lessonName: `Bài 14: Phương trình mặt phẳng (Tiết ${i + 1})`,
    periodCount: 5,
    periodsRange: '71-75'
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 76,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương V: Phương pháp toạ độ trong không gian',
    lessonName: `Bài 15: Phương trình đường thẳng trong không gian (Tiết ${i + 1})`,
    periodCount: 4,
    periodsRange: '76-79'
  })),
  {
    ppct: 80,
    grade: 12,
    type: 'Toán',
    chapter: 'Kiểm tra giữa kỳ II',
    lessonName: 'Ôn tập giữa kỳ II',
    periodCount: 1
  },
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 81,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Kiểm tra giữa kỳ II',
    lessonName: `Kiểm tra giữa kỳ II (Tiết ${i + 1})`,
    periodCount: 2,
    periodsRange: '81-82'
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 83,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương V: Phương pháp toạ độ trong không gian',
    lessonName: `Bài 16: Phương trình mặt cầu (Tiết ${i + 1})`,
    periodCount: 4,
    periodsRange: '83-86'
  })),
  {
    ppct: 87,
    grade: 12,
    type: 'Toán',
    chapter: 'Chương V: Phương pháp toạ độ trong không gian',
    lessonName: 'Bài tập cuối chương V',
    periodCount: 1
  },
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 88,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VI: Xác suất có điều kiện',
    lessonName: `Bài 17: Xác suất có điều kiện (Tiết ${i + 1})`,
    periodCount: 4,
    periodsRange: '88-91'
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    ppct: i + 92,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Chương VI: Xác suất có điều kiện',
    lessonName: `Bài 18: Công thức xác suất toàn phần và Bayes (Tiết ${i + 1})`,
    periodCount: 4,
    periodsRange: '92-95'
  })),
  {
    ppct: 96,
    grade: 12,
    type: 'Toán',
    chapter: 'Chương VI: Xác suất có điều kiện',
    lessonName: 'Bài tập cuối chương VI',
    periodCount: 1
  },
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 97,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Hoạt động trải nghiệm',
    lessonName: `HĐTN: Ứng dụng toán học mô hình hóa thực tiễn (Tiết ${i + 1})`,
    periodCount: 2,
    periodsRange: '97-98'
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    ppct: i + 99,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Ôn tập và kiểm tra cuối năm',
    lessonName: `Ôn tập cuối học kỳ II (Tiết ${i + 1})`,
    periodCount: 3,
    periodsRange: '99-101'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 102,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Ôn tập và kiểm tra cuối năm',
    lessonName: `Kiểm tra cuối học kỳ II (Tiết ${i + 1})`,
    periodCount: 2,
    periodsRange: '102-103'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    ppct: i + 104,
    grade: 12 as GradeLevel,
    type: 'Toán' as SubjectType,
    chapter: 'Tổng kết',
    lessonName: `Tổng kết năm học môn Toán 12 (Tiết ${i + 1})`,
    periodCount: 2,
    periodsRange: '104-105'
  }))
];

// Chuyên đề 12 (35 tiết)
export const CURRICULUM_CD_12: CurriculumLesson[] = [
  ...Array.from({ length: 12 }, (_, i) => ({
    ppct: i + 1,
    grade: 12 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề 1: Ứng dụng toán học giải quyết một số bài toán tối ưu',
    lessonName: `CĐ1 - Bài ${Math.floor(i / 4) + 1}: Bài toán tối ưu hóa trong kinh tế và đời sống (Tiết ${(i % 4) + 1})`,
    periodCount: 12
  })),
  ...Array.from({ length: 12 }, (_, i) => ({
    ppct: i + 13,
    grade: 12 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề 2: Ứng dụng toán học trong tài chính và tiền tệ',
    lessonName: `CĐ2 - Bài toán lãi suất, đầu tư và dòng tiền (Tiết ${i + 1})`,
    periodCount: 12
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    ppct: i + 25,
    grade: 12 as GradeLevel,
    type: 'CĐ Toán' as SubjectType,
    chapter: 'Chuyên đề 3: Vẽ kĩ thuật và đồ họa không gian với phần mềm',
    lessonName: `CĐ3 - Mô phỏng và dựng hình không gian 3D (Tiết ${i + 1})`,
    periodCount: 10
  })),
  {
    ppct: 35,
    grade: 12,
    type: 'CĐ Toán',
    chapter: 'Kiểm tra chuyên đề',
    lessonName: 'Kiểm tra chuyên đề lựa chọn Toán 12',
    periodCount: 1
  }
];

// ====================== KẾ HOẠCH DẠY ÔN THI TỐT NGHIỆP TOÁN 12 (CHÍNH XÁC TỪ PDF: 70 TIẾT / 35 TUẦN) ======================
const rawOnTnTopics: { range: [number, number]; title: string }[] = [
  { range: [1, 4], title: 'Tính đơn điệu và cực trị của hàm số' },
  { range: [5, 8], title: 'Giá trị lớn nhất và giá trị nhỏ nhất của hàm số' },
  { range: [9, 12], title: 'Đường tiệm cận của đồ thị hàm số' },
  { range: [13, 16], title: 'Khảo sát sự biến thiên và vẽ đồ thị của hàm số' },
  { range: [17, 20], title: 'Ứng dụng đạo hàm để giải quyết một số vấn đề liên quan đến thực tiễn' },
  { range: [21, 26], title: 'Véc tơ trong không gian' },
  { range: [27, 32], title: 'Biểu thức tọa độ của các phép toán véc tơ' },
  { range: [33, 33], title: 'Khoảng biến thiên và khoảng tứ phân vị' },
  { range: [34, 34], title: 'Phương sai và độ lệch chuẩn' },
  { range: [35, 38], title: 'Nguyên hàm' },
  { range: [39, 42], title: 'Tích phân' },
  { range: [43, 46], title: 'Ứng dụng hình học của tích phân' },
  { range: [47, 50], title: 'Phương trình mặt phẳng' },
  { range: [51, 54], title: 'Phương trình đường thẳng trong không gian' },
  { range: [55, 56], title: 'Công thức tính góc trong không gian' },
  { range: [57, 58], title: 'Phương trình mặt cầu' },
  { range: [59, 60], title: 'Xác suất có điều kiện' },
  { range: [61, 63], title: 'Công thức xác suất toàn phần và xác suất Bayes' },
  { range: [64, 70], title: 'Ôn luyện tổng hợp' }
];

export const CURRICULUM_ON_TN_12: CurriculumLesson[] = [];
rawOnTnTopics.forEach(topic => {
  const [start, end] = topic.range;
  const count = end - start + 1;
  for (let p = start; p <= end; p++) {
    CURRICULUM_ON_TN_12.push({
      ppct: p,
      grade: 12,
      type: 'Ôn tốt nghiệp',
      chapter: 'Kế hoạch ôn thi tốt nghiệp môn Toán 12',
      lessonName: count > 1 ? `${topic.title} (Tiết ${p - start + 1})` : topic.title,
      periodCount: count,
      periodsRange: `${start}-${end}`
    });
  }
});

// Helper to get lesson by Grade, Type and PPCT number
export function getLessonByPPCT(grade: GradeLevel, type: SubjectType, ppct: number): CurriculumLesson | undefined {
  if (type === 'Ôn tốt nghiệp') {
    return CURRICULUM_ON_TN_12.find(l => l.ppct === ppct);
  }
  if (type === 'CĐ Toán') {
    if (grade === 10) return CURRICULUM_CD_10.find(l => l.ppct === ppct);
    if (grade === 11) return CURRICULUM_CD_11.find(l => l.ppct === ppct);
    if (grade === 12) return CURRICULUM_CD_12.find(l => l.ppct === ppct);
  }
  if (type === 'Toán') {
    if (grade === 10) return CURRICULUM_TOAN_10.find(l => l.ppct === ppct);
    if (grade === 11) return CURRICULUM_TOAN_11.find(l => l.ppct === ppct);
    if (grade === 12) return CURRICULUM_TOAN_12.find(l => l.ppct === ppct);
  }
  return undefined;
}

// Preloaded Historical Weeks 1, 2, 3 (from User's PDF documents)
export const INITIAL_WEEK_SCHEDULES: WeekSchedule[] = [
  // Tuần 1: 07/09/2026 - 12/09/2026
  {
    week: 1,
    startDate: '07/09/2026',
    endDate: '12/09/2026',
    schoolYear: '2026 - 2027',
    teacherName: 'Nguyễn Hữu Trung',
    department: 'Toán - Tin',
    schoolName: 'Trường THPT Trần Phú, Phú Thọ',
    deanName: 'Đỗ Thị Thanh Huyền',
    slots: [
      { id: 'w1_1', day: 'Thứ 3', date: '08/09/2026', session: 'Sáng', period: 1, className: '10M', grade: 10, subjectType: 'Toán', ppct: 1, lessonName: 'Bài 1: Mệnh đề' },
      { id: 'w1_2', day: 'Thứ 3', date: '08/09/2026', session: 'Sáng', period: 3, className: '11A', grade: 11, subjectType: 'Toán', ppct: 1, lessonName: 'Bài 1: Giá trị lượng giác của góc lượng giác' },
      { id: 'w1_3', day: 'Thứ 3', date: '08/09/2026', session: 'Sáng', period: 4, className: '11A', grade: 11, subjectType: 'Toán', ppct: 2, lessonName: 'Bài 1: Giá trị lượng giác của góc lượng giác' },
      { id: 'w1_4', day: 'Thứ 3', date: '08/09/2026', session: 'Sáng', period: 5, className: '10M', grade: 10, subjectType: 'CĐ Toán', ppct: 1, lessonName: 'CĐ1 - Bài 1: Hệ phương trình bậc nhất 3 ẩn' },
      { id: 'w1_5', day: 'Thứ 3', date: '08/09/2026', session: 'Chiều', period: 1, className: '10K', grade: 10, subjectType: 'Toán', ppct: 1, lessonName: 'Bài 1: Mệnh đề' },
      { id: 'w1_6', day: 'Thứ 3', date: '08/09/2026', session: 'Chiều', period: 2, className: '10I', grade: 10, subjectType: 'Toán', ppct: 1, lessonName: 'Bài 1: Mệnh đề' },
      { id: 'w1_7', day: 'Thứ 3', date: '08/09/2026', session: 'Chiều', period: 3, className: '10I', grade: 10, subjectType: 'Toán', ppct: 2, lessonName: 'Bài 1: Mệnh đề' },

      { id: 'w1_8', day: 'Thứ 4', date: '09/09/2026', session: 'Sáng', period: 1, className: '10K', grade: 10, subjectType: 'Toán', ppct: 2, lessonName: 'Bài 1: Mệnh đề' },
      { id: 'w1_9', day: 'Thứ 4', date: '09/09/2026', session: 'Sáng', period: 2, className: '10K', grade: 10, subjectType: 'CĐ Toán', ppct: 1, lessonName: 'CĐ1 - Bài 1: Hệ phương trình bậc nhất 3 ẩn' },
      { id: 'w1_10', day: 'Thứ 4', date: '09/09/2026', session: 'Chiều', period: 1, className: '10K', grade: 10, subjectType: 'Toán', ppct: 3, lessonName: 'Bài 1: Mệnh đề' },
      { id: 'w1_11', day: 'Thứ 4', date: '09/09/2026', session: 'Chiều', period: 2, className: '10M', grade: 10, subjectType: 'Toán', ppct: 2, lessonName: 'Bài 1: Mệnh đề' },
      { id: 'w1_12', day: 'Thứ 4', date: '09/09/2026', session: 'Chiều', period: 3, className: '10M', grade: 10, subjectType: 'Toán', ppct: 3, lessonName: 'Bài 1: Mệnh đề' },

      { id: 'w1_13', day: 'Thứ 6', date: '11/09/2026', session: 'Sáng', period: 1, className: '10I', grade: 10, subjectType: 'Toán', ppct: 3, lessonName: 'Bài 1: Mệnh đề' },
      { id: 'w1_14', day: 'Thứ 6', date: '11/09/2026', session: 'Sáng', period: 2, className: '10I', grade: 10, subjectType: 'CĐ Toán', ppct: 1, lessonName: 'CĐ1 - Bài 1: Hệ phương trình bậc nhất 3 ẩn' },
      { id: 'w1_15', day: 'Thứ 6', date: '11/09/2026', session: 'Sáng', period: 3, className: '11A', grade: 11, subjectType: 'Toán', ppct: 3, lessonName: 'Bài 1: Giá trị lượng giác của góc lượng giác' },
      { id: 'w1_16', day: 'Thứ 6', date: '11/09/2026', session: 'Sáng', period: 4, className: '11A', grade: 11, subjectType: 'CĐ Toán', ppct: 1, lessonName: 'CĐ1 - Bài 1: Phép biến hình' }
    ]
  },
  // Tuần 2: 14/09/2026 - 19/09/2026
  {
    week: 2,
    startDate: '14/09/2026',
    endDate: '19/09/2026',
    schoolYear: '2026 - 2027',
    teacherName: 'Nguyễn Hữu Trung',
    department: 'Toán - Tin',
    schoolName: 'Trường THPT Trần Phú, Phú Thọ',
    deanName: 'Đỗ Thị Thanh Huyền',
    slots: [
      { id: 'w2_1', day: 'Thứ 3', date: '15/09/2026', session: 'Sáng', period: 1, className: '10M', grade: 10, subjectType: 'Toán', ppct: 4, lessonName: 'Bài 1: Mệnh đề' },
      { id: 'w2_2', day: 'Thứ 3', date: '15/09/2026', session: 'Sáng', period: 3, className: '11A', grade: 11, subjectType: 'Toán', ppct: 4, lessonName: 'Bài 2: Công thức lượng giác' },
      { id: 'w2_3', day: 'Thứ 3', date: '15/09/2026', session: 'Sáng', period: 4, className: '11A', grade: 11, subjectType: 'Toán', ppct: 5, lessonName: 'Bài 2: Công thức lượng giác' },
      { id: 'w2_4', day: 'Thứ 3', date: '15/09/2026', session: 'Sáng', period: 5, className: '10M', grade: 10, subjectType: 'CĐ Toán', ppct: 2, lessonName: 'CĐ1 - Bài 1: Hệ phương trình bậc nhất 3 ẩn' },
      { id: 'w2_5', day: 'Thứ 3', date: '15/09/2026', session: 'Chiều', period: 1, className: '10K', grade: 10, subjectType: 'Toán', ppct: 4, lessonName: 'Bài 1: Mệnh đề' },
      { id: 'w2_6', day: 'Thứ 3', date: '15/09/2026', session: 'Chiều', period: 2, className: '10I', grade: 10, subjectType: 'Toán', ppct: 4, lessonName: 'Bài 1: Mệnh đề' },
      { id: 'w2_7', day: 'Thứ 3', date: '15/09/2026', session: 'Chiều', period: 3, className: '10I', grade: 10, subjectType: 'Toán', ppct: 5, lessonName: 'Bài 2: Tập hợp và phép toán trên tập hợp' },

      { id: 'w2_8', day: 'Thứ 4', date: '16/09/2026', session: 'Sáng', period: 1, className: '10K', grade: 10, subjectType: 'Toán', ppct: 5, lessonName: 'Bài 2: Tập hợp và phép toán trên tập hợp' },
      { id: 'w2_9', day: 'Thứ 4', date: '16/09/2026', session: 'Sáng', period: 2, className: '10K', grade: 10, subjectType: 'CĐ Toán', ppct: 2, lessonName: 'CĐ1 - Bài 1: Hệ phương trình bậc nhất 3 ẩn' },
      { id: 'w2_10', day: 'Thứ 4', date: '16/09/2026', session: 'Chiều', period: 1, className: '10K', grade: 10, subjectType: 'Toán', ppct: 6, lessonName: 'Bài 2: Tập hợp và phép toán trên tập hợp' },
      { id: 'w2_11', day: 'Thứ 4', date: '16/09/2026', session: 'Chiều', period: 2, className: '10M', grade: 10, subjectType: 'Toán', ppct: 5, lessonName: 'Bài 2: Tập hợp và phép toán trên tập hợp' },
      { id: 'w2_12', day: 'Thứ 4', date: '16/09/2026', session: 'Chiều', period: 3, className: '10M', grade: 10, subjectType: 'Toán', ppct: 6, lessonName: 'Bài 2: Tập hợp và phép toán trên tập hợp' },

      { id: 'w2_13', day: 'Thứ 6', date: '18/09/2026', session: 'Sáng', period: 1, className: '10I', grade: 10, subjectType: 'Toán', ppct: 6, lessonName: 'Bài 2: Tập hợp và phép toán trên tập hợp' },
      { id: 'w2_14', day: 'Thứ 6', date: '18/09/2026', session: 'Sáng', period: 2, className: '10I', grade: 10, subjectType: 'CĐ Toán', ppct: 2, lessonName: 'CĐ1 - Bài 1: Hệ phương trình bậc nhất 3 ẩn' },
      { id: 'w2_15', day: 'Thứ 6', date: '18/09/2026', session: 'Sáng', period: 3, className: '11A', grade: 11, subjectType: 'Toán', ppct: 6, lessonName: 'Bài 3: Hàm số lượng giác' },
      { id: 'w2_16', day: 'Thứ 6', date: '18/09/2026', session: 'Sáng', period: 4, className: '11A', grade: 11, subjectType: 'CĐ Toán', ppct: 2, lessonName: 'CĐ1 - Bài 2: Phép tịnh tiến' }
    ]
  },
  // Tuần 3: 21/09/2026 - 26/09/2026
  {
    week: 3,
    startDate: '21/09/2026',
    endDate: '26/09/2026',
    schoolYear: '2026 - 2027',
    teacherName: 'Nguyễn Hữu Trung',
    department: 'Toán - Tin',
    schoolName: 'Trường THPT Trần Phú, Phú Thọ',
    deanName: 'Đỗ Thị Thanh Huyền',
    slots: [
      { id: 'w3_1', day: 'Thứ 3', date: '22/09/2026', session: 'Sáng', period: 1, className: '10M', grade: 10, subjectType: 'Toán', ppct: 7, lessonName: 'Bài 2: Tập hợp và phép toán trên tập hợp' },
      { id: 'w3_2', day: 'Thứ 3', date: '22/09/2026', session: 'Sáng', period: 3, className: '11A', grade: 11, subjectType: 'Toán', ppct: 7, lessonName: 'Bài 3: Hàm số lượng giác' },
      { id: 'w3_3', day: 'Thứ 3', date: '22/09/2026', session: 'Sáng', period: 4, className: '11A', grade: 11, subjectType: 'Toán', ppct: 8, lessonName: 'Bài 4: Phương trình lượng giác cơ bản' },
      { id: 'w3_4', day: 'Thứ 3', date: '22/09/2026', session: 'Sáng', period: 5, className: '10M', grade: 10, subjectType: 'CĐ Toán', ppct: 3, lessonName: 'CĐ1 - Bài 1: Hệ phương trình bậc nhất 3 ẩn' },
      { id: 'w3_5', day: 'Thứ 3', date: '22/09/2026', session: 'Chiều', period: 1, className: '10K', grade: 10, subjectType: 'Toán', ppct: 7, lessonName: 'Bài 2: Tập hợp và phép toán trên tập hợp' },
      { id: 'w3_6', day: 'Thứ 3', date: '22/09/2026', session: 'Chiều', period: 2, className: '10I', grade: 10, subjectType: 'Toán', ppct: 7, lessonName: 'Bài 2: Tập hợp và phép toán trên tập hợp' },
      { id: 'w3_7', day: 'Thứ 3', date: '22/09/2026', session: 'Chiều', period: 3, className: '10I', grade: 10, subjectType: 'Toán', ppct: 8, lessonName: 'Bài 2: Tập hợp và phép toán trên tập hợp' },

      { id: 'w3_8', day: 'Thứ 4', date: '23/09/2026', session: 'Sáng', period: 1, className: '10K', grade: 10, subjectType: 'Toán', ppct: 8, lessonName: 'Bài 2: Tập hợp và phép toán trên tập hợp' },
      { id: 'w3_9', day: 'Thứ 4', date: '23/09/2026', session: 'Sáng', period: 2, className: '10K', grade: 10, subjectType: 'CĐ Toán', ppct: 3, lessonName: 'CĐ1 - Bài 1: Hệ phương trình bậc nhất 3 ẩn' },
      { id: 'w3_10', day: 'Thứ 4', date: '23/09/2026', session: 'Chiều', period: 1, className: '10K', grade: 10, subjectType: 'Toán', ppct: 9, lessonName: 'Ôn tập cuối chương I' },
      { id: 'w3_11', day: 'Thứ 4', date: '23/09/2026', session: 'Chiều', period: 2, className: '10M', grade: 10, subjectType: 'Toán', ppct: 8, lessonName: 'Bài 2: Tập hợp và phép toán trên tập hợp' },
      { id: 'w3_12', day: 'Thứ 4', date: '23/09/2026', session: 'Chiều', period: 3, className: '10M', grade: 10, subjectType: 'Toán', ppct: 9, lessonName: 'Ôn tập cuối chương I' },

      { id: 'w3_13', day: 'Thứ 6', date: '25/09/2026', session: 'Sáng', period: 1, className: '10I', grade: 10, subjectType: 'Toán', ppct: 9, lessonName: 'Ôn tập cuối chương I' },
      { id: 'w3_14', day: 'Thứ 6', date: '25/09/2026', session: 'Sáng', period: 2, className: '10I', grade: 10, subjectType: 'CĐ Toán', ppct: 3, lessonName: 'CĐ1 - Bài 1: Hệ phương trình bậc nhất 3 ẩn' },
      { id: 'w3_15', day: 'Thứ 6', date: '25/09/2026', session: 'Sáng', period: 3, className: '11A', grade: 11, subjectType: 'Toán', ppct: 9, lessonName: 'Bài 4: Phương trình lượng giác cơ bản' },
      { id: 'w3_16', day: 'Thứ 6', date: '25/09/2026', session: 'Sáng', period: 4, className: '11A', grade: 11, subjectType: 'CĐ Toán', ppct: 3, lessonName: 'CĐ1 - Bài 2: Phép tịnh tiến' }
    ]
  }
];

// Default classes taught
export const DEFAULT_CLASSES: ClassProgress[] = [
  { className: '10M', grade: 10, lastToanPpct: 9, lastCdPpct: 3 },
  { className: '10K', grade: 10, lastToanPpct: 9, lastCdPpct: 3 },
  { className: '10I', grade: 10, lastToanPpct: 9, lastCdPpct: 3 },
  { className: '11A', grade: 11, lastToanPpct: 9, lastCdPpct: 3 },
  { className: '12A1', grade: 12, lastToanPpct: 9, lastCdPpct: 3, lastOnTnPpct: 6 }
];
