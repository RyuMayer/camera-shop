import { createPortal } from 'react-dom';

import { Popup } from '../popup/popup';
import { ReactNode } from 'react';

type TModalProps = {
  children: ReactNode;
  isOpen: boolean;
  isNarrow: boolean;
  onClose: (state?: boolean) => void;
};

export function Modal({ children, isNarrow, isOpen, onClose }: TModalProps) {
  return (isOpen &&
    createPortal(
      <Popup onClose={onClose} isNarrow={isNarrow}>
        {children}
      </Popup>,
      document.querySelector('main') as HTMLElement,
    )) as JSX.Element;
}
