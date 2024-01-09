import { store } from '../store/store';

export type TAppDispatch = typeof store.dispatch;

export type TState = ReturnType<typeof store.getState>;
