import { RECIVE_QUESTIONS, QUESION_ANSWER_SUBMIT, CREATE_NEW_QUESTION } from "../action/questions";


export default function questions(state = {}, action) {

    switch (action.type) {
        case RECIVE_QUESTIONS:
            return { ...state, ...action.questions }
        case QUESION_ANSWER_SUBMIT:
            const { qid, answer, authedUser } = action
            return {
                ...state, [qid]: {
                    ...state[qid], [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat(authedUser)
                    }
                }
            }
        case CREATE_NEW_QUESTION:
            const { id } = action.question
            return { ...state, [id]: action.question }

        default:
            return state
    }

}