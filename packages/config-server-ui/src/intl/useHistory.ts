import { useHistory as useRouterHistory, useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import { locales } from "./locales";


export function useHistory() {
    const history = useRouterHistory();
    const location = useLocation();
    const { locale } = useIntl();

    return {
        goBack() {
            return history.goBack();
        },
        push(path: string) {
            return history.push(`/${ locale }${ path }`);
        },
        changeLocale(newLocale: string) {
            const removeLocalePart = (pathname: string) => {
                const firstPart = pathname.split("/")[1];

                if (locales.indexOf(firstPart) !== -1) {
                    return pathname.replace(`/${ firstPart }`, ``);
                } else {
                    return pathname;
                }
            };

            const pathname = removeLocalePart(location.pathname);
            const url = `/${ newLocale }${ pathname }`;

            history.push(url);
        }
    };
}
