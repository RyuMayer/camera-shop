import { TCamera } from './camera';

export type TAddToCartPopup = Omit<
  TCamera,
  'id' | 'description' | 'rating' | 'reviewCount'
>;
