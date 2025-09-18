import { useState, useCallback, useEffect } from 'react';
import { validateUserKey } from '../data/userKeys';
import { getUserProfile, UserProfile } from '../data/userProfiles';

interface AuthState {
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Инициализируем состояние из localStorage
    const savedAuth = localStorage.getItem('vpn_auth');
    if (savedAuth) {
      try {
        const parsedAuth = JSON.parse(savedAuth);
        return {
          isAuthenticated: parsedAuth.isAuthenticated || false,
          userProfile: parsedAuth.userProfile || null
        };
      } catch (error) {
        console.error('Ошибка при загрузке данных авторизации:', error);
        localStorage.removeItem('vpn_auth');
      }
    }
    return {
      isAuthenticated: false,
      userProfile: null
    };
  });

  // Сохраняем состояние в localStorage при изменении
  useEffect(() => {
    if (authState.isAuthenticated && authState.userProfile) {
      localStorage.setItem('vpn_auth', JSON.stringify(authState));
    } else {
      localStorage.removeItem('vpn_auth');
    }
  }, [authState]);

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
    localStorage.removeItem('vpn_auth');
  }, []);

  return {
    isAuthenticated: authState.isAuthenticated,
    userProfile: authState.userProfile,
    login,
    logout
  };
};

export default useAuth;