import { MouseEvent } from 'react';

import { useAppSelector } from '../../hooks/use-app-selector';
import {
  selectCartDiscountCoupon,
  selectCartItems,
} from '../../store/cart/cart.selector';
import { TCartData } from '../../types/cart';
import { fetchPostCart } from '../../store/cart/cart.action';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { openSummaryPopup } from '../../store/cart/cart';

export function CartSummaryBtn() {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(selectCartItems);
  const discountCoupon = useAppSelector(selectCartDiscountCoupon);

  const handleSummaryBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data: TCartData = {
      coupon: discountCoupon,
      camerasIds: cartItems.map((item) => item.product.id),
    };

    dispatch(fetchPostCart(data)).then(() => dispatch(openSummaryPopup()));
  };

  return (
    <button className="btn btn--purple" onClick={handleSummaryBtnClick}>
      Оформить заказ
    </button>
  );
}
