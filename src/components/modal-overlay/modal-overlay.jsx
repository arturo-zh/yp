import React from 'react';
import styles from './modal-overlay.module.css';
import {ModalOverlayType} from '../../utils/types';

const ModalOverlay = (props) => {
	const handleClickClose = (e) => {
		if (e.target === e.currentTarget) {
			props.handleClose();
		}
	};
	return (
			<div className={styles.overlay} onClick={handleClickClose}>
				{props.children}
			</div>
	);
};

ModalOverlay.propTypes = ModalOverlayType;

export default ModalOverlay;