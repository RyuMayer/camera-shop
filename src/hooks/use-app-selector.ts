import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { TState } from '../types/state';

export const useAppSelector: TypedUseSelectorHook<TState> = useSelector;
