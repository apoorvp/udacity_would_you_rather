import { SET_AUTHED_USER, USER_LOGOUT } from "../action/authedUser";

export default function authedUser(state = null, action) {

    switch (action.type) {
        case SET_AUTHED_USER:
            return action.id
        case USER_LOGOUT:
            return null
        default:
            return state
    }
}