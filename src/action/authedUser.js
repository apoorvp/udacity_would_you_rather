export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const USER_LOGOUT = 'USER_LOGOUT'
export function setAuthedUser(id) {
    return {
        type: SET_AUTHED_USER,
        id
    }
}

export function userLogout() {
    return {
        type: USER_LOGOUT
    }
}


