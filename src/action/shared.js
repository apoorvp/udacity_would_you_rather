import { getInitialData, saveQuestionAnswer } from '../util/api'
import { recieveQuestions, answerSubmit } from './questions'
import { recieveUsers } from './users'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        getInitialData().then(({ users, questions }) => {
            dispatch(recieveUsers(users))
            dispatch(recieveQuestions(questions))
           // dispatch(setAuthedUser(login))
            dispatch(hideLoading())
        })
    }
}

export function handleAnswerSubmit(authedUser, qid, answer) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
            dispatch(answerSubmit(authedUser, qid, answer))
            dispatch(hideLoading())
        })
    }
}
