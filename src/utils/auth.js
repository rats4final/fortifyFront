import Cookies from "js-cookie";
import cookie from "cookie"
import {useNavigate } from "react-router-dom";



export const isLoggedIn = (requestCookies = null) => {
    if (!requestCookies) {
        return !! Cookies.get("is_user_logged_in")
    }

    return !! cookie.parse(requestCookies).is_user_logged_in
}

export const logIn = () => {
    Cookies.set("is_user_logged_in", true, {expires:86400, sameSite: 'lax'});
}
export const logOut = () => {
    if (typeof window !== 'undefined') {
        Cookies.remove("is_user_logged_in", true, {expires:86400, sameSite: 'lax'});
        //redirect("/login");
    }
}