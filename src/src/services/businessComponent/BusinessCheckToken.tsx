import { useContext, useEffect } from "react";
import * as accountAPI from 'apis/account';
import { AccountDataContext } from "index";
import { useLocation } from "react-router-dom";

export default function BusinessCheckToken() {
    const { accountData, updateAccountData } = useContext(AccountDataContext);
    const location = useLocation();
    useEffect(() => {
        async function checkToken() {
            const AccessToken = localStorage.getItem('AccessToken');
            let isAccessTokenValid = false;

            if (AccessToken !== null) {
                const validResponse = await accountAPI.postAccountValid(AccessToken);
                if (validResponse.status === 200) {
                    isAccessTokenValid = true;
                }
            } else {
                const isAutoLogin = JSON.parse(localStorage.getItem('isAutoLogin')!);
                if (isAutoLogin === true) {
                    const RefreshToken = localStorage.getItem('RefreshToken');
                    if (RefreshToken !== null) {
                        const refreshResponse = await accountAPI.postAccountRenew(RefreshToken);
                        if (refreshResponse.status === 200) {
                            const newAccessToken = refreshResponse.data;
                            localStorage.setItem('AccessToken', newAccessToken);
                            isAccessTokenValid = true;
                        }
                    }
                }
            }

            if (isAccessTokenValid) {
                updateAccountData('isLogin', true);
            } else {
                updateAccountData('isLogin', false);
            }

        }

        checkToken();

    }, [location]);

    return null;
}