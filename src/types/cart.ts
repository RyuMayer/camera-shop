import { TCamera } from './camera';

export type TCartItem = {
  product: TCamera;
  count: number;
};

export type TCartStorageData = {
  items: TCartItem[];
  discountPercent: number;
  coupon: string | null;
};

export type TCartData = {
  camerasIds: number[];
  coupon: string | null;
};
