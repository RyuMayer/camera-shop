import { useEffect, useRef } from 'react';

type TPopupSuccessProps = {
  onClose: () => void;
};

export function PopupSuccess({ onClose }: TPopupSuccessProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (btnRef.current) {
      btnRef.current.focus();
    }
  }, []);

  return (
    <>
      <p className="title title--h4">Спасибо за отзыв</p>
      <svg className="modal__icon" width={80} height={78} aria-hidden="true">
        <use xlinkHref="#icon-review-success" />
      </svg>
      <div className="modal__buttons">
        <button
          ref={btnRef}
          onClick={onClose}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
        >
          Вернуться к покупкам
        </button>
      </div>
    </>
  );
}
