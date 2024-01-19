import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../const';
import { camerasSlice } from './cameras/cameras';
import { promoSlice } from './promo/promo';
import { cameraSlice } from './camera/camera';
import { similarSlice } from './similar/similar';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasSlice.reducer,
  [NameSpace.Camera]: cameraSlice.reducer,
  [NameSpace.Promo]: promoSlice.reducer,
  [NameSpace.Similar]: similarSlice.reducer,
});
