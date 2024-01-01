import { createAsyncThunk } from "@reduxjs/toolkit"

export const savePointerPosition =  createAsyncThunk(
    "ui/savePointer",
    async (e:PointerEvent, thunkAPI) => {
        return {x:e.clientX,y:e.clientY}
    }
  )

  

  