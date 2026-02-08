import { useState, useCallback } from 'react';
import type { GeneratedPost } from '@/lib/ai-engine';

const STORAGE_KEY = 'socialpilot_posts';
const MAX_HISTORY = 20;

export function usePostHistory() {
  const [posts, setPostsState] = useState<GeneratedPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addPost = useCallback((post: GeneratedPost) => {
    setPostsState(prev => {
      const next = [post, ...prev].slice(0, MAX_HISTORY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const schedulePost = useCallback((postId: string, date: Date, time: string) => {
    setPostsState(prev => {
      const next = prev.map(p =>
        p.id === postId ? { ...p, scheduledDate: date, scheduledTime: time } : p
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removePost = useCallback((postId: string) => {
    setPostsState(prev => {
      const next = prev.filter(p => p.id !== postId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const scheduledPosts = posts.filter(p => p.scheduledDate);
  const recentPosts = posts.slice(0, 5);

  return { posts, addPost, schedulePost, removePost, scheduledPosts, recentPosts };
}
