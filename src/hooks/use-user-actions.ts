import { useUserStore } from '@/lib/stores/user-store';

export function useUserActions() {
  const { setUser, clearUser, reset } = useUserStore();

  const logout = () => {
    // Clear tokens from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_in');

    // Clear user from store
    clearUser();

    // Redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  const updateUser = (userData: Partial<Parameters<typeof setUser>[0]>) => {
    const currentUser = useUserStore.getState().user;
    if (currentUser) {
      setUser({ ...currentUser, ...userData });
    }
  };

  return {
    setUser,
    clearUser,
    reset,
    logout,
    updateUser,
  };
}
