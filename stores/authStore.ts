import { User } from "firebase/auth";
import { create } from "zustand";

interface AuthState {
  loading: boolean;
  user: User | null;
}

interface AuthActions {
  setLoading: (loading: boolean) => void;
  setUser: (user: User | null) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
  loading: true,
  user: null,
  setLoading: (loading) => set({ loading }),
  setUser: (user) => set({ user }),
}));

export const useIsAuthenticated = () => {
  const { user } = useAuthStore();
  return user !== null;
};
