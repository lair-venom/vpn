import { useState, useCallback } from 'react';
import { validateUserKey } from '../data/userKeys';
import { getUserProfile, UserProfile } from '../data/userProfiles';

interface AuthState {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    userProfile: null
  });

  const login = useCallback(async (key: string): Promise<boolean> => {
    const userKey = validateUserKey(key);
    if (userKey) {
      const profile = getUserProfile(userKey.userId);
      if (profile) {
        setAuthState({
          isAuthenticated: true,
          userProfile: profile
        });
        return true;
      }
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setAuthState({
      isAuthenticated: false,
      userProfile: null
    });
  }, []);

  return {
    isAuthenticated: authState.isAuthenticated,
    userProfile: authState.userProfile,
    login,
    logout
  };
};

export default useAuth;