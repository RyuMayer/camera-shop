import { TCartItem } from '../../types/cart';
import { CartItem } from '../cart-item/cart-item';

type TCartListProps = {
  items: TCartItem[];
};

export function CartList({ items }: TCartListProps) {
  return (
    <ul className="basket__list">
      {items.map(({ product, count }) => (
        <CartItem key={product.id} product={product} numberInCart={count} />
      ))}
    </ul>
  );
}
