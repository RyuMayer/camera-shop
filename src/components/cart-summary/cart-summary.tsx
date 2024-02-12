import { ChangeEvent, FormEvent, useState } from 'react';
import cn from 'classnames';

import { useAppSelector } from '../../hooks/use-app-selector';
import {
  selectDiscountAmount,
  selectDiscountLoadedStatus,
  selectDiscountLoadingStatus,
  selectTotalCartPrice,
} from '../../store/cart/cart.selector';
import { formatPrice } from '../../utils/card';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { fetchPostDiscount } from '../../store/cart/cart.action';
import { LoadingStatus } from '../../const';
import { dropDiscountLoadingStatus } from '../../store/cart/cart';
import { CartSummaryBtn } from '../cart-summary-btn/cart-summary-btn';

export function CartSummary() {
  const [promoInput, setPromoInput] = useState('');

  const dispatch = useAppDispatch();

  const totalCartPrice = useAppSelector(selectTotalCartPrice);
  const discountAmount = useAppSelector(selectDiscountAmount);

  const discountLoadingStatus = useAppSelector(selectDiscountLoadingStatus);
  const isDiscountLoaded = useAppSelector(selectDiscountLoadedStatus);

  const totalPriceWitnDiscount = discountAmount
    ? totalCartPrice - discountAmount
    : totalCartPrice;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPromoInput(value.replace(/\s/g, ''));

    if (discountLoadingStatus !== LoadingStatus.Idle || isDiscountLoaded) {
      dispatch(dropDiscountLoadingStatus());
    }
  };

  const handlePromoFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(fetchPostDiscount(promoInput));
  };

  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title--h4">
          Если у вас есть промокод на скидку, примените его в этом поле
        </p>
        <div className="basket-form">
          <form action="#" onSubmit={handlePromoFormSubmit}>
            <div
              className={cn('custom-input', {
                'is-valid':
                  discountLoadingStatus === LoadingStatus.Idle &&
                  isDiscountLoaded,
                'is-invalid': discountLoadingStatus === LoadingStatus.Rejected,
              })}
            >
              <label>
                <span className="custom-input__label">Промокод</span>
                <input
                  type="text"
                  name="promo"
                  value={promoInput}
                  onChange={handleInputChange}
                  placeholder="Введите промокод"
                />
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button className="btn" type="submit">
              Применить
            </button>
          </form>
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">Всего:</span>
          <span className="basket__summary-value">
            {formatPrice(totalCartPrice)} ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text">Скидка:</span>
          <span
            className={cn('basket__summary-value', {
              'basket__summary-value--bonus': Boolean(discountAmount),
            })}
          >
            {formatPrice(discountAmount)} ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">
            К оплате:
          </span>
          <span className="basket__summary-value basket__summary-value--total">
            {formatPrice(totalPriceWitnDiscount)} ₽
          </span>
        </p>
        <CartSummaryBtn />
      </div>
    </div>
  );
}
