import { LoadingStatus } from '../../const';
import { TCartItem } from '../../types/cart';
import { makeFakeCameraData } from '../../utils/mocks';
import {
  addToCart,
  cartSlice,
  changeItemNumberInCart,
  closeSummaryPopup,
  deleteFromCart,
  dropDiscountLoadingStatus,
  openSummaryPopup,
  removeFromCart,
} from './cart';

describe('Cart slice', () => {
  it('Should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      data: [],
      discountPercent: 0,
      discountСoupon: null,
      discountLoadingStatus: LoadingStatus.Idle,
      isDiscountLoaded: false,
      cartPostingStatus: LoadingStatus.Idle,
      isCartPosted: false,
      isCartSummaryPopupOpened: false,
    };

    const result = cartSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      data: [],
      discountPercent: 0,
      discountСoupon: null,
      discountLoadingStatus: LoadingStatus.Idle,
      isDiscountLoaded: false,
      cartPostingStatus: LoadingStatus.Idle,
      isCartPosted: false,
      isCartSummaryPopupOpened: false,
    };

    const result = cartSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should be added item to cart with "addToCart" action', () => {
    const mockData = makeFakeCameraData();
    const cartItems: TCartItem[] = [
      {
        product: mockData,
        count: 1,
      },
    ];

    const initialState = {
      data: [],
      discountPercent: 0,
      discountСoupon: null,
      discountLoadingStatus: LoadingStatus.Idle,
      isDiscountLoaded: false,
      cartPostingStatus: LoadingStatus.Idle,
      isCartPosted: false,
      isCartSummaryPopupOpened: false,
    };

    const expectedState = {
      data: cartItems,
      discountPercent: 0,
      discountСoupon: null,
      discountLoadingStatus: LoadingStatus.Idle,
      isDiscountLoaded: false,
      cartPostingStatus: LoadingStatus.Idle,
      isCartPosted: false,
      isCartSummaryPopupOpened: false,
    };

    const result = cartSlice.reducer(
      initialState,
      addToCart({ product: mockData }),
    );

    expect(result).toEqual(expectedState);
  });

  it('Item should be increased by one with "addToCart" action', () => {
    const mockData = makeFakeCameraData();
    const initialCartItems: TCartItem[] = [
      {
        product: mockData,
        count: 1,
      },
    ];
    const cartItems: TCartItem[] = [
      {
        product: mockData,
        count: 2,
      },
    ];

    const initialState = {
      data: initialCartItems,
      discountPercent: 0,
      discountСoupon: null,
      discountLoadingStatus: LoadingStatus.Idle,
      isDiscountLoaded: false,
      cartPostingStatus: LoadingStatus.Idle,
      isCartPosted: false,
      isCartSummaryPopupOpened: false,
    };

    const expectedState = {
      data: cartItems,
      discountPercent: 0,
      discountСoupon: null,
      discountLoadingStatus: LoadingStatus.Idle,
      isDiscountLoaded: false,
      cartPostingStatus: LoadingStatus.Idle,
      isCartPosted: false,
      isCartSummaryPopupOpened: false,
    };

    const result = cartSlice.reducer(
      initialState,
      addToCart({ product: mockData }),
    );

    expect(result).toEqual(expectedState);
  });

  it('Item should be decreased by one with "removeFromCart" action', () => {
    const mockData = makeFakeCameraData();
    const initialCartItems: TCartItem[] = [
      {
        product: mockData,
        count: 2,
      },
    ];
    const cartItems: TCartItem[] = [
      {
        product: mockData,
        count: 1,
      },
    ];

    const initialState = {
      data: initialCartItems,
      discountPercent: 0,
      discountСoupon: null,
      discountLoadingStatus: LoadingStatus.Idle,
      isDiscountLoaded: false,
      cartPostingStatus: LoadingStatus.Idle,
      isCartPosted: false,
      isCartSummaryPopupOpened: false,
    };

    const expectedState = {
      data: cartItems,
      discountPercent: 0,
      discountСoupon: null,
      discountLoadingStatus: LoadingStatus.Idle,
      isDiscountLoaded: false,
      cartPostingStatus: LoadingStatus.Idle,
      isCartPosted: false,
      isCartSummaryPopupOpened: false,
    };

    const result = cartSlice.reducer(
      initialState,
      removeFromCart({ product: mockData }),
    );

    expect(result).toEqual(expectedState);
  });

  it('Item should be delete with "deleteFromCart" action', () => {
    const mockData = makeFakeCameraData();
    const initialCartItems: TCartItem[] = [
      {
        product: mockData,
        count: 2,
      },
    ];

    const initialState = {
      data: initialCartItems,
      discountPercent: 0,
      discountСoupon: null,
      discountLoadingStatus: LoadingStatus.Idle,
      isDiscountLoaded: false,
      cartPostingStatus: LoadingStatus.Idle,
      isCartPosted: false,
      isCartSummaryPopupOpened: false,
    };

    const expectedState = {
      data: [],
      discountPercent: 0,
      discountСoupon: null,
      discountLoadingStatus: LoadingStatus.Idle,
      isDiscountLoaded: false,
      cartPostingStatus: LoadingStatus.Idle,
      isCartPosted: false,
      isCartSummaryPopupOpened: false,
    };

    const result = cartSlice.reducer(
      initialState,
      deleteFromCart({ product: mockData }),
    );

    expect(result).toEqual(expectedState);
  });

  it('Item count should be changed with "changeItemNumberInCart" action', () => {
    const mockData = makeFakeCameraData();
    const count = 10;
    const initialCartItems: TCartItem[] = [
      {
        product: mockData,
        count: 2,
      },
    ];
    const cartItems: TCartItem[] = [
      {
        product: mockData,
        count: count,
      },
    ];

    const initialState = {
      data: initialCartItems,
      discountPercent: 0,
      discountСoupon: null,
      discountLoadingStatus: LoadingStatus.Idle,
      isDiscountLoaded: false,
      cartPostingStatus: LoadingStatus.Idle,
      isCartPosted: false,
      isCartSummaryPopupOpened: false,
    };

    const expectedState = {
      data: cartItems,
      discountPercent: 0,
      discountСoupon: null,
      discountLoadingStatus: LoadingStatus.Idle,
      isDiscountLoaded: false,
      cartPostingStatus: LoadingStatus.Idle,
      isCartPosted: false,
      isCartSummaryPopupOpened: false,
    };

    const result = cartSlice.reducer(
      initialState,
      changeItemNumberInCart({ product: mockData, count }),
    );

    expect(result).toEqual(expectedState);
  });

  it('Should drop discount loading status data with "dropDiscountLoadingStatus" action', () => {
    const mockData = makeFakeCameraData();
    const initialCartItems: TCartItem[] = [
      {
        product: mockData,
        count: 2,
      },
    ];

    const initialState = {
      data: initialCartItems,
      discountPercent: 0,
      discountСoupon: null,
      discountLoadingStatus: LoadingStatus.Rejected,
      isDiscountLoaded: true,
      cartPostingStatus: LoadingStatus.Idle,
      isCartPosted: false,
      isCartSummaryPopupOpened: false,
    };

    const expectedState = {
      data: initialCartItems,
      discountPercent: 0,
      discountСoupon: null,
      discountLoadingStatus: LoadingStatus.Idle,
      isDiscountLoaded: false,
      cartPostingStatus: LoadingStatus.Idle,
      isCartPosted: false,
      isCartSummaryPopupOpened: false,
    };

    const result = cartSlice.reducer(initialState, dropDiscountLoadingStatus);

    expect(result).toEqual(expectedState);
  });

  it('Should change popup opened status to true with "openSummaryPopup" action', () => {
    const mockData = makeFakeCameraData();
    const initialCartItems: TCartItem[] = [
      {
        product: mockData,
        count: 2,
      },
    ];

    const initialState = {
      data: initialCartItems,
      discountPercent: 0,
      discountСoupon: null,
      discountLoadingStatus: LoadingStatus.Idle,
      isDiscountLoaded: false,
      cartPostingStatus: LoadingStatus.Idle,
      isCartPosted: false,
      isCartSummaryPopupOpened: false,
    };

    const expectedState = {
      data: initialCartItems,
      discountPercent: 0,
      discountСoupon: null,
      discountLoadingStatus: LoadingStatus.Idle,
      isDiscountLoaded: false,
      cartPostingStatus: LoadingStatus.Idle,
      isCartPosted: false,
      isCartSummaryPopupOpened: true,
    };

    const result = cartSlice.reducer(initialState, openSummaryPopup);

    expect(result).toEqual(expectedState);
  });

  it('Should change popup opened status to false with "closeSummaryPopup" action', () => {
    const mockData = makeFakeCameraData();
    const initialCartItems: TCartItem[] = [
      {
        product: mockData,
        count: 2,
      },
    ];

    const initialState = {
      data: initialCartItems,
      discountPercent: 0,
      discountСoupon: null,
      discountLoadingStatus: LoadingStatus.Idle,
      isDiscountLoaded: false,
      cartPostingStatus: LoadingStatus.Idle,
      isCartPosted: false,
      isCartSummaryPopupOpened: true,
    };

    const expectedState = {
      data: initialCartItems,
      discountPercent: 0,
      discountСoupon: null,
      discountLoadingStatus: LoadingStatus.Idle,
      isDiscountLoaded: false,
      cartPostingStatus: LoadingStatus.Idle,
      isCartPosted: false,
      isCartSummaryPopupOpened: false,
    };

    const result = cartSlice.reducer(initialState, closeSummaryPopup);

    expect(result).toEqual(expectedState);
  });
});
