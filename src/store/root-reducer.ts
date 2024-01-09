import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../const';
import { camerasSlice } from './cameras/cameras';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasSlice.reducer,
});
