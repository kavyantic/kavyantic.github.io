  import { createSlice } from '@reduxjs/toolkit'
  import type { PayloadAction } from '@reduxjs/toolkit'

  export interface theme {
    mode: 'dark' | 'light'
  }

  const initialState: theme = {
    mode: 'light',
  }

  export const themeSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      switchMode: (state) => {
        state.mode = state.mode == 'dark' ? 'light' : 'dark'
      }
    },
  })

  // Action creators are generated for each case reducer function
  export const { switchMode } = themeSlice.actions

  export default themeSlice



