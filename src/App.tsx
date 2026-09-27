/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SoBaoGiangView } from './components/SoBaoGiangView';
import { ColumnByGradeView } from './components/ColumnByGradeView';
import { ProgressManager } from './components/ProgressManager';
import { CurriculumBrowser } from './components/CurriculumBrowser';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { SlotEditModal } from './components/SlotEditModal';
import { PrintReportModal } from './components/PrintReportModal';
import {
  INITIAL_WEEK_SCHEDULES,
  DEFAULT_CLASSES,
  getLessonByPPCT
} from './data/curriculumData';
import {
  WeekSchedule,
  TimetableSlot,
  ClassProgress,
  GradeLevel
} from './types/curriculum';
import {
  generateNextWeekSchedule,
  validateWeekSchedule
} from './utils/scheduleHelper';
import { Sparkles, Calendar, BookOpen, AlertTriangle } from 'lucide-react';

export default function App() {
  const [currentWeek, setCurrentWeek] = useState<number>(3);
  const [schedules, setSchedules] = useState<Record<number, WeekSchedule>>(() => {
    const saved = localStorage.getItem('thpt_schedules');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved schedules:', e);
      }
    }
    const initialMap: Record<number, WeekSchedule> = {};
    INITIAL_WEEK_SCHEDULES.forEach((ws) => {
      initialMap[ws.week] = ws;
    });
    return initialMap;
  });

  const [classesProgress, setClassesProgress] = useState<ClassProgress[]>(() => {
    const saved = localStorage.getItem('thpt_classes_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved progress:', e);
      }
    }
    return DEFAULT_CLASSES;
  });

  const [activeTab, setActiveTab] = useState<'baogiang' | 'columns' | 'progress' | 'curriculum'>('baogiang');
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimetableSlot | null>(null);
  const [defaultGradeForAdd, setDefaultGradeForAdd] = useState<GradeLevel>(10);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('thpt_schedules', JSON.stringify(schedules));
  }, [schedules]);

  useEffect(() => {
    localStorage.setItem('thpt_classes_progress', JSON.stringify(classesProgress));
  }, [classesProgress]);

  // Ensure current week has a schedule; if not, create an empty one or auto-generate
  const currentSchedule: WeekSchedule = schedules[currentWeek] || {
    week: currentWeek,
    startDate: `28/09/2026`,
    endDate: `03/10/2026`,
    schoolYear: '2026 - 2027',
    teacherName: 'Nguyễn Hữu Trung',
    department: 'Toán - Tin',
    schoolName: 'Trường THPT Trần Phú, Phú Thọ',
    deanName: 'Đỗ Thị Thanh Huyền',
    slots: [],
    note: 'Đã đảm bảo nguyên tắc mỗi lớp học tối đa 3 tiết chính và 1 tiết chuyên đề môn Toán; riêng lớp 12 có thêm 2 tiết ôn thi tốt nghiệp.'
  };

  const validationResults = validateWeekSchedule(currentSchedule.slots);
  const totalClasses = validationResults.length;
  const validClasses = validationResults.filter((v) => v.isValid).length;
  const hasErrors = totalClasses > 0 && validClasses < totalClasses;

  // Handlers
  const handleSelectWeek = (week: number) => {
    setCurrentWeek(week);
  };

  const handleSaveSlot = (slot: TimetableSlot) => {
    const updatedSlots = [...currentSchedule.slots];
    const existingIndex = updatedSlots.findIndex((s) => s.id === slot.id);

    if (existingIndex >= 0) {
      updatedSlots[existingIndex] = slot;
    } else {
      updatedSlots.push(slot);
    }

    setSchedules((prev) => ({
      ...prev,
      [currentWeek]: {
        ...currentSchedule,
        slots: updatedSlots
      }
    }));
  };

  const handleDeleteSlot = (slotId: string) => {
    const updatedSlots = currentSchedule.slots.filter((s) => s.id !== slotId);
    setSchedules((prev) => ({
      ...prev,
      [currentWeek]: {
        ...currentSchedule,
        slots: updatedSlots
      }
    }));
  };

  const handleEditSlot = (slot: TimetableSlot) => {
    setEditingSlot(slot);
    setIsEditModalOpen(true);
  };

  const handleAddSlot = (grade?: GradeLevel) => {
    setEditingSlot(null);
    setDefaultGradeForAdd(grade || 10);
    setIsEditModalOpen(true);
  };

  const handleAutoGenerateNextWeek = () => {
    const baseWeek = currentSchedule.slots.length > 0 ? currentWeek : (schedules[currentWeek - 1] ? currentWeek - 1 : 3);
    const template = schedules[baseWeek]?.slots || INITIAL_WEEK_SCHEDULES[2].slots;
    const generated = generateNextWeekSchedule(baseWeek, classesProgress, template);

    setSchedules((prev) => ({
      ...prev,
      [generated.week]: generated
    }));
    setCurrentWeek(generated.week);
    setActiveTab('baogiang');
  };

  const handleApplySlotsFromAi = (newSlots: TimetableSlot[]) => {
    setSchedules((prev) => ({
      ...prev,
      [currentWeek]: {
        ...currentSchedule,
        slots: newSlots
      }
    }));
  };

  const handlePrint = () => {
    setIsPrintModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Navigation Bar */}
      <Header
        currentWeek={currentWeek}
        totalWeeks={35}
        onSelectWeek={handleSelectWeek}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
        onPrint={handlePrint}
        onAutoGenerateNextWeek={handleAutoGenerateNextWeek}
        ruleStatus={{
          totalClasses,
          validClasses,
          hasErrors
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'baogiang' && (
          <SoBaoGiangView
            schedule={currentSchedule}
            validation={validationResults}
            onEditSlot={handleEditSlot}
            onDeleteSlot={handleDeleteSlot}
            onAddSlot={() => handleAddSlot()}
            onOpenAiPlanner={() => setIsAiDrawerOpen(true)}
            onOpenPrintModal={() => setIsPrintModalOpen(true)}
          />
        )}

        {activeTab === 'columns' && (
          <ColumnByGradeView
            schedule={currentSchedule}
            onEditSlot={handleEditSlot}
            onDeleteSlot={handleDeleteSlot}
            onAddSlotForGrade={(g) => handleAddSlot(g)}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressManager
            classes={classesProgress}
            currentWeek={currentWeek}
            onUpdateProgress={setClassesProgress}
            onAutoGenerateNextWeek={handleAutoGenerateNextWeek}
          />
        )}

        {activeTab === 'curriculum' && <CurriculumBrowser />}
      </main>

      {/* Modals & Drawers */}
      <SlotEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveSlot}
        initialSlot={editingSlot}
        defaultGrade={defaultGradeForAdd}
      />

      <PrintReportModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        schedule={currentSchedule}
      />

      <AiAssistantDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
        currentWeek={currentWeek}
        classesProgress={classesProgress}
        currentSchedule={currentSchedule}
        onApplySlotsToSchedule={handleApplySlotsFromAi}
      />

      {/* Floating Action Button for AI (when drawer is closed) */}
      {!isAiDrawerOpen && (
        <button
          onClick={() => setIsAiDrawerOpen(true)}
          className="fixed bottom-6 right-6 z-30 p-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-600/30 hover:scale-105 transition-all cursor-pointer flex items-center gap-2 px-4 print:hidden ring-2 ring-white/20"
          title="Trợ lý AI & Nhập thời khóa biểu"
        >
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          <span className="text-xs font-bold hidden sm:inline">AI Trợ Lý & TKB</span>
        </button>
      )}
    </div>
  );
}
