import {  saveQuestion } from "../util/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECIVE_QUESTIONS = 'RECIVE_QUESTIONS';
export const QUESION_ANSWER_SUBMIT = 'QUESION_ANSWER_SUBMIT'
export const CREATE_NEW_QUESTION = 'CREATE_NEW_QUESTION'

export function recieveQuestions(questions) {
    return {
        type: RECIVE_QUESTIONS,
        questions
    }
}

export function answerSubmit(authedUser, qid, answer) {
    return {
        type: QUESION_ANSWER_SUBMIT,
        qid,
        answer,
        authedUser

    }
}

function createNewQuestion(question) {
    return {
        type: CREATE_NEW_QUESTION,
        question
    }

}
export function handleCreateNewQuestion(optionOneText, optionTwoText, author) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestion({ optionOneText, optionTwoText, author }).then((question) => {
            dispatch(createNewQuestion(question))
            dispatch(hideLoading())
        })
    }

}