import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { TCamera } from '../types/camera';
import { TState } from '../types/state';
import { createApi } from '../services/api';
import { TPromo } from '../types/promo';
import { TReview } from '../types/review';

export type AppThunkDispatch = ThunkDispatch<
  TState,
  ReturnType<typeof createApi>,
  Action
>;

export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

export const makeFakeCameraData = (): TCamera => {
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
};

export const makeFakePromoData = (): TPromo => {
  return {
    id: 7,
    name: 'Look 54',
    previewImg: 'img/content/promo-look-54.jpg',
    previewImg2x: 'img/content/promo-look-54@2x.jpg',
    previewImgWebp: 'img/content/promo-look-54.webp',
    previewImgWebp2x: 'img/content/promo-look-54@2x.webp',
  };
};

export const makeFakeReviewData = (): TReview[] => {
  return [
    {
      id: '5b9497d9-3616-48f5-b36c-33800bc07abd',
      userName: 'Дарья',
      advantage: 'Хорошо. Отличная камера.',
      disadvantage: 'Без объектива',
      review: 'В целом для домашнего использования в самый раз!',
      rating: 3,
      createAt: '2023-10-31T09:38:11.174Z',
      cameraId: 1,
    },
    {
      id: '2d357c05-563c-46e4-8c4d-ff2545f53460',
      userName: 'Ксения',
      advantage: 'Недорогая, за такую цену отличный вариант.',
      disadvantage:
        'Пришла поврежденная упаковка. Нет теперь понимая со внутренностями',
      review:
        'Отличная камера, мне понравилась, пользуюсь около года. Профессионально оценить нет возможности. Есть разные мелкие недочеты, но, по скольку я не являюсь специалисто в данной области, они не ощущаются в моих работах.',
      rating: 1,
      createAt: '2023-08-22T09:38:11.177Z',
      cameraId: 1,
    },
    {
      id: 'c60def2d-763f-4b56-8a49-67cff5ee5664',
      userName: 'Алексей',
      advantage: 'Рекомендую данный аппарат',
      disadvantage: 'Быстро садиться зарядка',
      review:
        'Подарила сыну на первое сентября прошлого года. Пришла целой. Для начала камера хорошая.',
      rating: 4,
      createAt: '2023-07-24T09:38:11.177Z',
      cameraId: 1,
    },
    {
      id: 'c178feca-2463-417d-a8d2-063d52740ba2',
      userName: 'Евгений',
      advantage: 'Недорогая, за такую цену отличный вариант.',
      disadvantage: 'Не рекомендую!',
      review: 'В целом для домашнего использования в самый раз!',
      rating: 1,
      createAt: '2023-06-20T09:38:11.177Z',
      cameraId: 1,
    },
    {
      id: 'a0146843-9a4c-4563-9021-a0a0b9caa81d',
      userName: 'Ксения',
      advantage: 'Настройки, внешний вид, лёгкость',
      disadvantage: 'Трудно найти чехол. Заводские крайне дррогие',
      review: 'В целом для домашнего использования в самый раз!',
      rating: 2,
      createAt: '2023-07-23T09:38:11.177Z',
      cameraId: 1,
    },
  ];
};
