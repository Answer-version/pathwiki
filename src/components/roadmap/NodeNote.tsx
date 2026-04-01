"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, Save, Check } from "lucide-react";

interface NodeNoteProps {
  nodeId: string;
  roadmapId: string;
  initialNote: string;
  onSave: (nodeId: string, note: string) => void;
}

export default function NodeNote({ nodeId, roadmapId, initialNote, onSave }: NodeNoteProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState(initialNote);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Update note when initialNote changes
  useEffect(() => {
    setNote(initialNote);
  }, [initialNote]);

  // Auto-save with debounce
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (note === initialNote) return;

    debounceRef.current = setTimeout(() => {
      setIsSaving(true);
      onSave(nodeId, note);
      
      // Show saved indicator
      setTimeout(() => {
        setIsSaving(false);
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
      }, 300);
    }, 1000);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [note, initialNote, nodeId, onSave]);

  // Focus textarea when expanded
  useEffect(() => {
    if (isExpanded && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isExpanded]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleSave = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    setIsSaving(true);
    onSave(nodeId, note);
    setTimeout(() => {
      setIsSaving(false);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    }, 300);
  };

  const charCount = note.length;
  const hasNote = note.trim().length > 0;

  return (
    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500">📝 学习笔记</span>
          {hasNote && !isExpanded && (
            <span className="text-xs text-emerald-500 flex items-center gap-1">
              <Check className="w-3 h-3" />
              已记录
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-2 space-y-2">
          <textarea
            ref={textareaRef}
            value={note}
            onChange={handleNoteChange}
            placeholder="记录你的学习心得、疑问、重点内容..."
            className="w-full h-24 px-3 py-2 text-xs border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">{charCount} 字</span>
            <div className="flex items-center gap-2">
              {showSaved && (
                <span className="text-xs text-emerald-500 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  已保存
                </span>
              )}
              {isSaving && (
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  保存中...
                </span>
              )}
              <button
                onClick={handleSave}
                disabled={isSaving || note === initialNote}
                className="flex items-center gap-1 px-2 py-1 text-xs text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-3 h-3" />
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
