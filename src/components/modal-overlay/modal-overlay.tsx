import React from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlay = {
	children: React.ReactNode;
	handleClose: () => void;
}

const ModalOverlay = ({children, handleClose}: TModalOverlay): JSX.Element => {
	const handleClickClose = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	};
	return (<div className={styles.overlay} onClick={handleClickClose}>
		{children}
	</div>);
};

export default ModalOverlay;