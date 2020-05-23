import { useHistory as useRouterHistory, useRouteMatch } from "react-router-dom";


export function useHistory() {
    const history = useRouterHistory();
    const { params } = useRouteMatch<{ 0: string }>();
    const locale = params[0];

    return {
        goBack() {
            return history.goBack();
        },
        push(path: string) {
            return history.push(`/${locale}${path}`);
        }
    };
}
