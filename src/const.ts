export const BASE_URL = 'https://camera-shop.accelerator.htmlacademy.pro';
export const REQUEST_TIMEOUT = 5000;

export const TOTAL_RATING_COUNT = 5;

export const PAGINATION_URL_PARAM = 'page';
export const CARDS_PER_PAGE = 9;

export const TABS_URL_PARAM = 'tab';

export const COUNT_REVIEWS_FOR_RENDER = 3;

export const SLIDER_AUTOPLAY_DELAY = 3000;

export const PAGINATIONS_PER_PAGE = 3;

export const ReviewValidLength = {
  Min: 10,
  Max: 160,
} as const;

export const AppRoute = {
  Catalog: '/',
  Product: '/product',
  NotFound: '/not-found',
} as const;

export const APIRoute = {
  Cameras: '/cameras',
  Promo: '/promo',
  Reviews: '/reviews',
} as const;

export const NameSpace = {
  Cameras: 'CAMERAS',
  Camera: 'CAMERA',
  Promo: 'PROMO',
  Similar: 'SIMILAR',
  Review: 'REVIEW',
} as const;

export const LoadingStatus = {
  Idle: 'idle',
  Loading: 'loading',
  Rejected: 'rejected',
} as const;

export const TabUrlParam = {
  DESCRIPTION: 'desc',
  SPECIFICATION: 'spec',
} as const;

export const FormStarRating = {
  5: 'Отлично',
  4: 'Хорошо',
  3: 'Нормально',
  2: 'Плохо',
  1: 'Ужасно',
} as const;
