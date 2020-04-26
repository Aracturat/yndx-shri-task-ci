import React from 'react';
import { bemHelper } from '../bem-helper';

import "./HeaderText.scss";


const cn = bemHelper('header-text');

interface HeaderTextProps {
    children: React.ReactNode;
    small?: boolean;
    inactive?: boolean;
    className?: string;
}


export function HeaderText({ small = false, inactive = false, children, className }: HeaderTextProps) {
    let WrapperTag = small ? 'h2' : 'h1' as any;

    return (
        <WrapperTag className={
            cn(undefined, {
                'small': small,
                'inactive': inactive
            }, className)
        }>
            { children }
        </WrapperTag>
    );
}
