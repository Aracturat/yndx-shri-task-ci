import React from 'react';

import { bemHelper } from '../bem-helper';
import { Button } from './Button';
import { Text } from './Text';

import './ErrorModal.scss';
import { Modal } from './Modal';


const cn = bemHelper('error-modal');

export function ErrorModal({ closeModal, error }) {
	return (
		<Modal className={cn()} header="Error">
			<Text className={cn('text')}>{error}</Text>
			<div className={cn('buttons')}>
				<Button action onClick={closeModal}>Ok</Button>
			</div>
		</Modal>
	)
}





