import { IS_LOGGED, IS_NOT_LOGGED } from "./types";

export const setIsLoggedIn = (data) => ({
    type: IS_LOGGED,
    payload: data
});


export const setNotLoggedIn = () => ({
    type: IS_NOT_LOGGED,
});
