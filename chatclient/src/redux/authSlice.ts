import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../services/api'
import { RootState } from './store'

type AuthState = {
  user: User | null
  token: string | null
  message: string | null
}

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { message, user, token } }: PayloadAction<{ message: string,  user: User; token: string }>
    ) => {
      state.user = user
      state.token = token
      state.message = message
    },
  },
})

export const { setCredentials } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
