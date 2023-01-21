import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById('modals') as HTMLElement;
type TModalProps = {
  title?: string;
  handleClose: () => void;
  children: React.ReactNode;
}

const Modal = ({title, handleClose, children}:TModalProps) => {
  React.useEffect(() => {
    function handleKeyClose(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        handleClose();
      }
    }

    document.addEventListener('keydown', handleKeyClose, false);
    return () => document.removeEventListener('keydown', handleKeyClose);
  });

  return ReactDOM.createPortal(
      <ModalOverlay handleClose={handleClose}>
        <div className={styles.inner}>
          {title && (<div className={styles.header}>
            <div className={styles.title}>{title}</div>
          </div>)}
          {children}
          <div className={styles.close} onClick={handleClose}>
            <CloseIcon type="primary"/>
          </div>
        </div>
      </ModalOverlay>,
      modalRoot
  );
};


export default Modal;