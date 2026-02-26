import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AssignModalState {
  open: boolean;
  title: string;
  subtitle: string;
  type: string;
  statusActionType: string;
}

const initialState: AssignModalState = {
  open: false,
  title: '',
  subtitle: '',
  type: '',
  statusActionType: '',
};

interface SetModalPayload {
  open: boolean;
  title: string;
  subtitle: string;
  type: string;
  statusActionType?: string;
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
      state.statusActionType = action.payload.statusActionType || '';
    },
    closeModal(state) {
      state.open = false;
      state.type = '';
      state.statusActionType = '';
    },
  },
});

export const { setModalState, closeModal } = assignSlice.actions;
export default assignSlice.reducer;
