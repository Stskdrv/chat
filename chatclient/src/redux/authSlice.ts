import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { UserInterface } from '../types';

type AuthState = {
  name: string | null
  id: string | null
}

const slice = createSlice({
  name: 'auth',
  initialState: { name: null, id: null} as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { username, id } }: PayloadAction<UserInterface>
    ) => {
      state.name = username;
      state.id = id;
      return state;
    },
  },
})

export const { setCredentials } = slice.actions

export default slice.reducer

export const selectAuthData = (state: RootState) => state.auth;
