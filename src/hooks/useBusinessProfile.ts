import { useState, useCallback } from 'react';
import type { BusinessProfile } from '@/lib/ai-engine';

const STORAGE_KEY = 'socialpilot_profile';

export function useBusinessProfile() {
  const [profile, setProfileState] = useState<BusinessProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const setProfile = useCallback((p: BusinessProfile) => {
    setProfileState(p);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  }, []);

  const clearProfile = useCallback(() => {
    setProfileState(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { profile, setProfile, clearProfile, isSetup: !!profile };
}
