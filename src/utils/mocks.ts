import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { TCamera } from '../types/camera';
import { TState } from '../types/state';
import { createApi } from '../services/api';
import { TPromo } from '../types/promo';

export type AppThunkDispatch = ThunkDispatch<
  TState,
  ReturnType<typeof createApi>,
  Action
>;

export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

export function makeFakeCameraData(): TCamera {
  return {
    id: 1,
    name: 'Ретрокамера Dus Auge lV',
    vendorCode: 'DA4IU67AD5',
    type: 'Коллекционная',
    category: 'Видеокамера',
    description: 'Немецкий концерн BRW разработал',
    previewImg: 'img/content/das-auge.jpg',
    level: 'Любительский',
    price: 73450,
    previewImg2x: 'img/content/das-auge@2x.jpg',
    previewImgWebp: 'img/content/das-auge.webp',
    previewImgWebp2x: 'img/content/das-auge@2x.webp',
    rating: 3,
    reviewCount: 58,
  };
}

export function makeFakePromoData(): TPromo {
  return {
    id: 7,
    name: 'Look 54',
    previewImg: 'img/content/promo-look-54.jpg',
    previewImg2x: 'img/content/promo-look-54@2x.jpg',
    previewImgWebp: 'img/content/promo-look-54.webp',
    previewImgWebp2x: 'img/content/promo-look-54@2x.webp',
  };
}
