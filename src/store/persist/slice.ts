import { createSlice } from '@reduxjs/toolkit';
import type { LoginPayload, User } from 'domain/models';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PersistState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  theme: 'dark' | 'light';
  redirectPath: string | null;
}

const initialState: PersistState = {
  accessToken: null,
  isLoading: false,
  redirectPath: null,
  theme: 'dark',
  user: null
};

const persistSlice = createSlice({
  initialState,
  name: 'persist',
  reducers: {
    logout(state: PersistState) {
      state.user = null;
      state.accessToken = null;
    },
    setAuth(state: PersistState, action: PayloadAction<LoginPayload>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    setIsLoading(state: PersistState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setRedirectPath(state: PersistState, action: PayloadAction<string | null>) {
      state.redirectPath = action.payload;
    },
    setTheme(state: PersistState, action: PayloadAction<'dark' | 'light'>) {
      state.theme = action.payload;
    },
    setUser(state: PersistState, action: PayloadAction<User>) {
      state.user = action.payload;
    }
  }
});

export const {
  reducer: persistReducer,
  actions: { setAuth, logout, setUser, setTheme, setIsLoading, setRedirectPath }
} = persistSlice;
