import cn from 'classnames';
import { ReactNode, useCallback, useEffect } from 'react';
import FocusLock from 'react-focus-lock';

type TPopupProps = {
  children: ReactNode;
  onClose: (state?: boolean) => void;
  isNarrow?: boolean;
};

export function Popup({ children, onClose, isNarrow = false }: TPopupProps) {
  const handleCloseBtnClick = useCallback(() => {
    onClose(false);
  }, [onClose]);

  const closePopup = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseBtnClick();
    },
    [handleCloseBtnClick],
  );

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      document.body.classList.add('scroll-lock');
      window.addEventListener('keydown', closePopup);
    }

    return () => {
      document.body.classList.remove('scroll-lock');
      window.removeEventListener('keydown', closePopup);
      isMounted = false;
    };
  }, [closePopup, handleCloseBtnClick]);

  return (
    <FocusLock>
      <div
        className={cn('modal is-active', {
          'modal--narrow': isNarrow,
        })}
      >
        <div className="modal__wrapper">
          <div
            onClick={handleCloseBtnClick}
            className="modal__overlay"
            data-testid="modal-overlay"
          />
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
    </FocusLock>
  );
}
