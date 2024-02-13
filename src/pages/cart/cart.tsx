import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { CartList } from '../../components/cart-list/cart-list';
import { CartSummary } from '../../components/cart-summary/cart-summary';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector';
import {
  selectCartItems,
  selectIsSummaryPopupOpened,
} from '../../store/cart/cart.selector';
import { Modal } from '../../components/modal/modal';
import { CartSummaryPopup } from '../../components/cart-summary-popup/cart-summary-popup';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import {
  closeSummaryPopup,
  dropDiscountLoadingStatus,
} from '../../store/cart/cart';
import { useEffect } from 'react';

export function Cart() {
  const dispatch = useAppDispatch();

  const isSummaryPopupOpened = useAppSelector(selectIsSummaryPopupOpened);
  const cartItems = useAppSelector(selectCartItems);

  const onClose = () => {
    dispatch(closeSummaryPopup());
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      dispatch(dropDiscountLoadingStatus());
    };
  }, [dispatch]);

  return (
    <>
      <main>
        <div className="page-content">
          <Breadcrumbs
            items={[
              { id: 1, title: 'Главная', href: AppRoute.Catalog },
              { id: 2, title: 'Каталог', href: AppRoute.Catalog },
              { id: 3, title: 'Корзина', href: null },
            ]}
          />
          <section className="basket" data-testid="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              {cartItems.length ? (
                <>
                  <CartList items={cartItems} />
                  <CartSummary />
                </>
              ) : (
                'Нет товаров в корзине'
              )}
            </div>
          </section>
        </div>
      </main>
      <Modal onClose={onClose} isOpen={isSummaryPopupOpened} isNarrow={false}>
        <CartSummaryPopup onClose={onClose} />
      </Modal>
    </>
  );
}
