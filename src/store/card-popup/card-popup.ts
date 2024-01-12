import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { TCardPopup } from '../../types/card-popup';

type TInitialState = {
  data: TCardPopup | null;
  isOpened: boolean;
};

const initialState: TInitialState = {
  data: null,
  isOpened: false,
};

export const cardPopupSlice = createSlice({
  name: NameSpace.CardPopup,
  initialState,
  reducers: {
    openPopup: (state, action: PayloadAction<TCardPopup>) => {
      state.data = action.payload;
      state.isOpened = true;
    },
    closePopup: (state) => {
      state.data = null;
      state.isOpened = false;
    },
  },
});

export const { openPopup, closePopup } = cardPopupSlice.actions;
