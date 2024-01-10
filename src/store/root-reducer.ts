import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../const';
import { camerasSlice } from './cameras/cameras';
import { promoSlice } from './promo/promo';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasSlice.reducer,
  [NameSpace.Promo]: promoSlice.reducer,
});
