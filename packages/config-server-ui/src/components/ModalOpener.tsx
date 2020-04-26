import React from 'react';
import { PortalWithState } from 'react-portal';

const node = document.getElementById('modal-root');

interface ModalOpenerProps {
    opener?: (params: { openModal: (event?: any) => void }) => React.ReactNode;
    modal: (params: { closeModal: () => void }) => React.ReactNode;
}

export function ModalOpener({ opener, modal }: ModalOpenerProps) {
    return (
        <PortalWithState node={ node } closeOnOutsideClick closeOnEsc defaultOpen={ !opener }>
            { ({ openPortal, closePortal, isOpen, portal }) => (
                <>
                    { opener && opener({ openModal: openPortal }) }
                    { portal(modal({ closeModal: closePortal })) }
                </>
            ) }
        </PortalWithState>
    );
}
