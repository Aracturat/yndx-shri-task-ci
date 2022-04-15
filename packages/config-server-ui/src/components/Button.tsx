import React from 'react';
import { bemHelper } from '../bem-helper';
import { Icon, IconName } from './Icon';

import './Button.scss';


const cn = bemHelper('button');

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    disabled?: boolean,
    type?: 'submit' | 'reset' | 'button';
    small?: boolean;
    action?: boolean;
    className?: string;
    icon?: IconName;
}

export const Button = React.memo((
    {
        children,
        onClick,
        disabled = false,
        type = 'button',
        small = false,
        action = false,
        className = '',
        icon
    }: ButtonProps
) => {
    return (
        <button
            className={ cn(undefined, { small, action }, className) }
            type={ type }
            onClick={ onClick }
            disabled={ disabled }
        >
            { icon && <Icon name={ icon } className={ cn('icon') } /> }
            { children && <span className={ cn('text') }>{ children }</span> }
        </button>
    );
});
