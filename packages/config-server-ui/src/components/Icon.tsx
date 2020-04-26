import React from 'react';
import { bemHelper } from '../bem-helper';

import "./Icon.scss";


const cn = bemHelper('icon');

export type IconName =
    'branch'
    | 'calendar'
    | 'clear'
    | 'error'
    | 'gear'
    | 'pending'
    | 'person'
    | 'restart'
    | 'start'
    | 'success'
    | 'timer';

interface IconProps {
    name: IconName;
    size?: 's' | 'm' | 'l';
    className?: string;
}

export function Icon({ name, size, className }: IconProps) {
    return (
        <span className={ cn(undefined, { [name]: !!name, [`size-` + size]: !!size }, className) } />
    );
}
