import { TCamera } from './camera';

export type TCardPopup = Omit<
  TCamera,
  'id' | 'description' | 'rating' | 'reviewCount'
>;
