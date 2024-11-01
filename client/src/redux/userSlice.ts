import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginResponse, User } from '../components/types/auth';
// import { RootState } from '@reduxjs/toolkit/query';

export interface RootState {
  auth: AuthState
}

const getInitialUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  const storedUser = localStorage.getItem('user');
  if (!storedUser) return null;
  
  try {
    return JSON.parse(storedUser) as User;
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

const getInitialToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};



const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null
};

interface CredentialsPayload {
  user: User;
  token: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.loading = false;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});


export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.user && !!state.auth.token;

export const { 
  setCredentials, 
  setLoading, 
  setError, 
  logout, 
  clearError 
} = authSlice.actions;


// export const { setCredentials, setLoading, setError, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
