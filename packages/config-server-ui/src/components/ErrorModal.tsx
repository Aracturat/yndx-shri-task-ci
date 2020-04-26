import React from 'react';

import { bemHelper } from '../bem-helper';
import { Button } from './Button';
import { Text } from './Text';
import { Modal } from './Modal';

import './ErrorModal.scss';


const cn = bemHelper('error-modal');

interface ErrorModalProps {
	closeModal: () => void;
	error: string;
}

export function ErrorModal({ closeModal, error }: ErrorModalProps) {
	return (
		<Modal className={cn()} header="Error">
			<Text className={cn('text')}>{error}</Text>
			<div className={cn('buttons')}>
				<Button action onClick={closeModal}>Ok</Button>
			</div>
		</Modal>
	)
}





