import Cookies from 'js-cookie';

export const setStoredCookie = (cookieName, cookieVal) => {
    Cookies.set(cookieName, cookieVal, { secure: false });
}

export const getStoredCookie = (cookieName) => {
    return Cookies.get(cookieName);
}

export const removeStoredCookie = (cookieName) => {
    return Cookies.remove(cookieName);
}