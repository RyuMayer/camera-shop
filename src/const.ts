export const BASE_URL = 'https://camera-shop.accelerator.htmlacademy.pro';
export const REQUEST_TIMEOUT = 5000;

export const TOTAL_RATING_COUNT = 5;

export const PAGINATION_URL_PARAM = 'page';
export const CARDS_PER_PAGE = 9;

export const COUNT_REVIEWS_FOR_RENDER = 3;

export const SLIDER_AUTOPLAY_DELAY = 3000;

export const PAGINATIONS_PER_PAGE = 3;

export const FILTER_URL_PARAMS_SEPARATOR = ',';

export const AppRoute = {
  Catalog: '/',
  Product: '/product',
  Cart: '/cart',
  NotFound: '/not-found',
} as const;

export const APIRoute = {
  Cameras: '/cameras',
  Promo: '/promo',
  Reviews: '/reviews',
  Discount: '/coupons',
  Orders: '/orders',
} as const;

export const NameSpace = {
  Cameras: 'CAMERAS',
  Camera: 'CAMERA',
  Promo: 'PROMO',
  Similar: 'SIMILAR',
  Cart: 'CART',
  Review: 'REVIEW',
} as const;

export const LoadingStatus = {
  Idle: 'idle',
  Loading: 'loading',
  Rejected: 'rejected',
} as const;
