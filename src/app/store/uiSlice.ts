import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { savePointerPosition } from "./thunks/uiThunk";

export interface theme {
  lastPointer: {
    x: number;
    y: number;
  };
  interact: {
    eye: {
      think: string;
    };
  };
}

const initialState = {
  interact: {
    eye: {
      visibility: false,

      blur: false,
      think: "",
    },
  },
  lastPointer: {
    x: 0,
    y: 0,
  },
  drawer: {
    open: false,
  },
  navigator: {
    visibility: false,
    blur: false,
    defaultPosition: {
      open: { x: 0, y: 0 },
      close: { x: 0, y: 0 },
    },
  },
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLastPointer(state, action: PayloadAction<{ x: number; y: number }>) {
      state.lastPointer = action.payload;
    },
    thinkEye(state, action: PayloadAction<string>) {
      state.interact.eye.think = action.payload;
    },
    eye(
      state,
      action: PayloadAction<
        Partial<Omit<(typeof initialState)["interact"]["eye"], "think">>
      >
    ) {
      state.interact.eye = { ...state.interact.eye, ...action.payload };
    },
    drawer(
      state,
      action: PayloadAction<Partial<(typeof initialState)["drawer"]>>
    ) {
      state.drawer = { ...state.drawer, ...action.payload };
    },
    setOpenNavPos(
      state,
      action: PayloadAction<
        (typeof initialState)["navigator"]["defaultPosition"]["open"]
      >
    ) {
      state.navigator.defaultPosition.open = action.payload;
    },
    setNavOpacity(state, action: PayloadAction<{ blur: boolean }>) {
      state.navigator.blur = action.payload.blur;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(savePointerPosition.fulfilled, (state, action) => {
      // Add user to the state array
      state.lastPointer = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const uiActions = uiSlice.actions;

export default uiSlice;
