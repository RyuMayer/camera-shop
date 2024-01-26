import { useDispatch } from 'react-redux';

import { TAppDispatch } from '../types/state';

export function useAppDispatch() {
  return useDispatch<TAppDispatch>();
}
