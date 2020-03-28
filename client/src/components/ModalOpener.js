import React from 'react';
import { PortalWithState } from 'react-portal';

const node = document.getElementById("modal-root");

export function ModalOpener({ opener, modal }) {
	return (
		<PortalWithState node={node} closeOnOutsideClick closeOnEsc>
			{({ openPortal, closePortal, isOpen, portal }) => (
				<>
					{opener({ openModal: openPortal })}
					{portal(modal({ closeModal: closePortal}))}
				</>
			)}
		</PortalWithState>
	);
}
