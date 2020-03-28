import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { bemHelper } from '../bem-helper';
import { HeaderText } from './HeaderText';
import { Button } from './Button';
import { FormField } from './FormField';

import './NewBuildModal.scss';
import { requestBuild } from '../store/actions';


const cn = bemHelper('new-build-modal');

export function NewBuildModal({ closeModal }) {
	const dispatch = useDispatch();
	const [commitHash, setCommitHash] = useState();

	const handleSubmit = () => {
		if (commitHash) {
			dispatch(requestBuild(commitHash));
			closeModal && closeModal();
		}
	};

	return (
		<div className={cn(null, null, 'modal')}>
			<HeaderText className={cn('header')}>New build</HeaderText>
			<form className={cn('form')} onSubmit={handleSubmit}>
				<FormField
					value={commitHash}
					onChange={setCommitHash}
					placeholder="Commit hash"
					label="Enter the commit hash which you want to build."
				/>
				<div className={cn('buttons')}>
					<Button type="submit" action disabled={!commitHash}>Run build</Button>
					<Button onClick={closeModal}>Cancel</Button>
				</div>
			</form>
		</div>
	)
}





