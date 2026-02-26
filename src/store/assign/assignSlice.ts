import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AssignModalState {
  open: boolean;
  title: string;
  subtitle: string;
  type: string;
}

const initialState: AssignModalState = {
  open: false,
  title: '',
  subtitle: '',
  type: '',
};

interface SetModalPayload {
  open: boolean;
  title: string;
  subtitle: string;
  type: string;
}

const assignSlice = createSlice({
  name: 'assignModal',
  initialState,
  reducers: {
    setModalState(state, action: PayloadAction<SetModalPayload>) {
      state.open = action.payload.open;
      state.title = action.payload.title;
      state.subtitle = action.payload.subtitle;
      state.type = action.payload.type;
    },
    closeModal(state) {
      state.open = false;
      state.type = '';
    },
  },
});

export const { setModalState, closeModal } = assignSlice.actions;
export default assignSlice.reducer;
