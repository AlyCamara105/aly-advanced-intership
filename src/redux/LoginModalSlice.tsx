import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface loginModalState {
  modalOpen: boolean;
}

const initialState: loginModalState = {
  modalOpen: false,
};

export const loginModalSlice = createSlice({
  name: "LoginModal",
  initialState: initialState,
  reducers: {
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setModalOpen } = loginModalSlice.actions;

export default loginModalSlice.reducer;
