import { useDispatch } from 'react-redux';

import { TAppDispatch } from '../types/state';

export const useAppDispatch = () => useDispatch<TAppDispatch>();
