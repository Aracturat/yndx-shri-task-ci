import React from 'react';
import { FormattedMessage, useIntl } from "react-intl";

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
    const { formatMessage: f } = useIntl();

    return (
        <Modal className={ cn() } header={ f({ id: 'ErrorModal.Header' }) }>
            <Text className={ cn('text') }>{ error }</Text>
            <div className={ cn('buttons') }>
                <Button action onClick={ closeModal }>
                    <FormattedMessage id="ErrorModal.Button.Ok"/>
                </Button>
            </div>
        </Modal>
    );
}





