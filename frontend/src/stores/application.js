import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  snackMessage: '',
  snackOpened: false,
  snackType: 'info',
}

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    showInfoSnack: (state, action) => {
      state.snackType = 'info';
      state.snackMessage = action.payload;
      state.snackOpened = true;
    },
    showSuccessSnack: (state, action) => {
      state.snackType = 'success';
      state.snackMessage = action.payload;
      state.snackOpened = true;
    },
    showErrorSnack: (state, action) => {
      state.snackType = 'error';
      state.snackMessage = action.payload;
      state.snackOpened = true;
    },
    hideSnack: (state) => {
      state.snackOpened = false;
      state.snackMessage = '';
    },
  },
})

export const { showInfoSnack, showSuccessSnack, showErrorSnack, hideSnack } = applicationSlice.actions

export default applicationSlice.reducer