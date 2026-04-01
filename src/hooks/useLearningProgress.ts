"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_PREFIX = "pathwiki-";

interface ProgressData {
  completed: string[];
  notes: Record<string, string>;
}

function getStorageKey(roadmapId: string): string {
  return `${STORAGE_PREFIX}progress-${roadmapId}`;
}

function loadProgressData(roadmapId: string): ProgressData {
  if (typeof window === "undefined") {
    return { completed: [], notes: {} };
  }
  
  try {
    const stored = localStorage.getItem(getStorageKey(roadmapId));
    if (stored) {
      return JSON.parse(stored) as ProgressData;
    }
  } catch (e) {
    console.warn("Failed to load progress data:", e);
  }
  return { completed: [], notes: {} };
}

function saveProgressData(roadmapId: string, data: ProgressData): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(getStorageKey(roadmapId), JSON.stringify(data));
  } catch (e) {
    console.warn("Failed to save progress data:", e);
  }
}

export function useLearningProgress(roadmapId: string) {
  const [progressData, setProgressData] = useState<ProgressData>({ completed: [], notes: {} });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const data = loadProgressData(roadmapId);
    setProgressData(data);
    setIsLoaded(true);
  }, [roadmapId]);

  // Mark a node as completed
  const markAsCompleted = useCallback((nodeId: string) => {
    setProgressData((prev) => {
      if (prev.completed.includes(nodeId)) return prev;
      const newData = {
        ...prev,
        completed: [...prev.completed, nodeId],
      };
      saveProgressData(roadmapId, newData);
      return newData;
    });
  }, [roadmapId]);

  // Mark a node as incomplete
  const markAsIncomplete = useCallback((nodeId: string) => {
    setProgressData((prev) => {
      const newData = {
        ...prev,
        completed: prev.completed.filter((id) => id !== nodeId),
      };
      saveProgressData(roadmapId, newData);
      return newData;
    });
  }, [roadmapId]);

  // Toggle completed state
  const toggleCompleted = useCallback((nodeId: string) => {
    setProgressData((prev) => {
      const isCurrentlyCompleted = prev.completed.includes(nodeId);
      const newData = {
        ...prev,
        completed: isCurrentlyCompleted
          ? prev.completed.filter((id) => id !== nodeId)
          : [...prev.completed, nodeId],
      };
      saveProgressData(roadmapId, newData);
      return newData;
    });
  }, [roadmapId]);

  // Check if a node is completed
  const isCompleted = useCallback((nodeId: string): boolean => {
    return progressData.completed.includes(nodeId);
  }, [progressData.completed]);

  // Get progress statistics
  const getProgress = useCallback((totalNodes: number) => {
    return {
      completed: progressData.completed.length,
      total: totalNodes,
      percentage: totalNodes > 0 ? Math.round((progressData.completed.length / totalNodes) * 100) : 0,
    };
  }, [progressData.completed.length]);

  // Save a note for a node
  const saveNote = useCallback((nodeId: string, note: string) => {
    setProgressData((prev) => {
      const newData = {
        ...prev,
        notes: {
          ...prev.notes,
          [nodeId]: note,
        },
      };
      saveProgressData(roadmapId, newData);
      return newData;
    });
  }, [roadmapId]);

  // Get a note for a node
  const getNote = useCallback((nodeId: string): string => {
    return progressData.notes[nodeId] || "";
  }, [progressData.notes]);

  return {
    isLoaded,
    markAsCompleted,
    markAsIncomplete,
    toggleCompleted,
    isCompleted,
    getProgress,
    saveNote,
    getNote,
    completedNodes: progressData.completed,
  };
}

// Separate hook for favorites (shared across all roadmaps)
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}favorites`);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Failed to load favorites:", e);
    }
  }, []);

  const toggleFavorite = useCallback((roadmapId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(roadmapId)
        ? prev.filter((id) => id !== roadmapId)
        : [...prev, roadmapId];
      localStorage.setItem(`${STORAGE_PREFIX}favorites`, JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((roadmapId: string): boolean => {
    return favorites.includes(roadmapId);
  }, [favorites]);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}
