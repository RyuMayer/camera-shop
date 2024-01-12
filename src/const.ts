export const BASE_URL = 'https://camera-shop.accelerator.pages.academy';
export const REQUEST_TIMEOUT = 5000;

export const TOTAL_RATING_COUNT = 5;

export const PAGINATION_URL_PARAM = 'page';
export const CARDS_PER_PAGE = 9;

export const AppRoute = {
  Main: '/',
} as const;

export const APIRoute = {
  Cameras: '/cameras',
  Promo: '/promo',
} as const;

export const NameSpace = {
  Cameras: 'CAMERAS',
  Promo: 'PROMO',
  CardPopup: 'CARD_POPUP',
} as const;

export const LoadingStatus = {
  Idle: 'idle',
  Loading: 'loading',
  Rejected: 'rejected',
} as const;
