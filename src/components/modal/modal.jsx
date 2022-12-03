import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import {modalType} from '../../utils/types';

const modalRoot = document.getElementById('modals');

const Modal = (props) => {
	React.useEffect(() => {
		function handleKeyClose(e) {
			if (e.keyCode === 27) {
				props.handleClose();
			}
		}

		document.addEventListener('keydown', handleKeyClose, false);
		return () => document.removeEventListener('keydown', handleKeyClose);
	});

	return ReactDOM.createPortal(
			<ModalOverlay handleClose={props.handleClose}>
				<div className={styles.inner}>
					{props.title && (<div className={styles.header}>
						<div className={styles.title}>{props.title}</div>
					</div>)}
					{props.children}
					<div className={styles.close} onClick={props.handleClose}>
						<CloseIcon type="primary"/>
					</div>
				</div>
			</ModalOverlay>
			, modalRoot,
	);
};

Modal.propTypes = modalType;

export default Modal;