import { LoadingStatus } from '../const';
import { store } from '../store/store';

export type TAppDispatch = typeof store.dispatch;

export type TState = ReturnType<typeof store.getState>;

export type TLoadingStatus = (typeof LoadingStatus)[keyof typeof LoadingStatus];
