export const locales = ["ru", "en"];
export const defaultLocale = "en";
export const userLocale = navigator.language.toLowerCase().split('-').shift();

export function getLocaleAfterSwitch(locale: string) {
    return locale === "ru" ? "en" : "ru";
}

