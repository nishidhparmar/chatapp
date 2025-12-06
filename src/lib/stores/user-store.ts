import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { User } from '@/types/auth';

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

interface UserActions {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setInitialized: (initialized: boolean) => void;
  clearUser: () => void;
  reset: () => void;
}

type UserStore = UserState & UserActions;

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
  isInitialized: false,
};

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set, _get) => ({
        ...initialState,

        setUser: user => set({ user, error: null }, false, 'setUser'),

        setLoading: isLoading => set({ isLoading }, false, 'setLoading'),

        setError: error => set({ error, isLoading: false }, false, 'setError'),

        setInitialized: isInitialized =>
          set({ isInitialized }, false, 'setInitialized'),

        clearUser: () => set({ user: null, error: null }, false, 'clearUser'),

        reset: () => set(initialState, false, 'reset'),
      }),
      {
        name: 'user-store',
        partialize: state => ({
          user: state.user,
          isInitialized: state.isInitialized,
        }),
      }
    ),
    {
      name: 'user-store',
    }
  )
);
