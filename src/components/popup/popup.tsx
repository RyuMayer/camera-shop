import cn from 'classnames';
import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';

type TPopupProps = {
  children: ReactNode;
  onClose: Dispatch<SetStateAction<boolean>>;
  isNarrow?: boolean;
};

export function Popup({ children, onClose, isNarrow = false }: TPopupProps) {
  const handleCloseBtnClick = () => {
    onClose(false);
  };

  useEffect(() => {
    document.body.classList.add('scroll-lock');

    return () => {
      document.body.classList.remove('scroll-lock');
    };
  }, []);

  return (
    <div
      className={cn('modal is-active', {
        'modal--narrow': isNarrow,
      })}
    >
      <div className="modal__wrapper">
        <div onClick={handleCloseBtnClick} className="modal__overlay" />
        <div className="modal__content">
          {children}
          <button
            onClick={handleCloseBtnClick}
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
