import React, { ReactNode } from "react";
import { flatten } from "./utils";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { defaultLocale } from "./locales";

export interface IntlProviderProps {
    locale: string;
    children: ReactNode;
}


export function IntlProvider({ locale, children }: IntlProviderProps) {
    let messages = flatten(require(`../locales/${ locale }.json`));

    return (
        <ReactIntlProvider locale={ locale } key={ locale } messages={ messages } defaultLocale={defaultLocale}>
            { children }
        </ReactIntlProvider>
    );
}
