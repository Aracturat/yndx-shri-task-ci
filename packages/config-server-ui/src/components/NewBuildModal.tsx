import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { bemHelper } from '../bem-helper';
import { Button } from './Button';
import { FormField } from './FormField';

import { AppDispatch, requestBuild } from '../store/actions';
import { Modal } from './Modal';
import { ErrorModal } from './ErrorModal';

import './NewBuildModal.scss';


interface NewBuildModalProps {
	closeModal: () => void;
}

const cn = bemHelper('new-build-modal');

export function NewBuildModal({ closeModal }: NewBuildModalProps) {
	const history = useHistory();

	const dispatch = useDispatch<AppDispatch>();
	const [commitHash, setCommitHash] = useState<string>();
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const [error, setError] = useState<string | null>();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (isSaving) {
			return;
		}
		setIsSaving(true);
		setError(null);

		if (commitHash) {
			dispatch(requestBuild(commitHash))
				.then(build => {
					closeModal && closeModal();
					history.push(`/build/${build.id}`);
				})
				.catch(err => {
					setError(err.error);
				})
		}
	};

	if (error) {
		return (
			<ErrorModal
				closeModal={closeModal}
				error={error}
			/>
		);
	}

	return (
		<Modal className={cn()} header="New build">
			<form className={cn('form')} onSubmit={handleSubmit}>
				<FormField
					value={commitHash}
					onChange={setCommitHash}
					placeholder="Commit hash"
					label="Enter the commit hash which you want to build."
				/>
				<div className={cn('buttons')}>
					<Button type="submit" action disabled={!commitHash || isSaving}>Run build</Button>
					<Button onClick={closeModal} disabled={isSaving}>Cancel</Button>
				</div>
			</form>
		</Modal>
	)
}





