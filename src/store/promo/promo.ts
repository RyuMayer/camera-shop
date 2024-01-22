import { createSlice } from '@reduxjs/toolkit';

import { LoadingStatus, NameSpace } from '../../const';
import { TLoadingStatus } from '../../types/state';
import { TPromo } from '../../types/promo';
import { fetchPromo } from './promo.action';
import { toast } from 'react-toastify';

type TInitialState = {
  data: TPromo[];
  loadingStatus: TLoadingStatus;
  isLoaded: boolean;
};

const initialState: TInitialState = {
  data: [],
  loadingStatus: LoadingStatus.Idle,
  isLoaded: false,
};

export const promoSlice = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {
    dropPromoData(state) {
      state.data = [];
      state.isLoaded = false;
      state.loadingStatus = LoadingStatus.Idle;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPromo.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
        state.isLoaded = false;
      })
      .addCase(fetchPromo.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingStatus = LoadingStatus.Idle;
        state.isLoaded = true;
      })
      .addCase(fetchPromo.rejected, (state) => {
        state.loadingStatus = LoadingStatus.Rejected;
        state.isLoaded = false;
        toast.error('Ошибка при загрузке промо товаров. Обновите страницу');
      });
  },
});

export const { dropPromoData } = promoSlice.actions;
