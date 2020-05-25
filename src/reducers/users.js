import { RECIEVE_USERS } from "../action/users";
import { CREATE_NEW_QUESTION, QUESION_ANSWER_SUBMIT } from "../action/questions";


export default function users(state = {}, action) {
    const { authedUser, answer, qid } = action
    switch (action.type) {
        case RECIEVE_USERS:
            return { ...state, ...action.users }
        case QUESION_ANSWER_SUBMIT:
            return {
                ...state, [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer
                    }
                }
            }
        case CREATE_NEW_QUESTION:
            const { author, id } = action.question
            return {
                ...state, [author]: {
                    ...state[author], questions: state[author].questions.concat([id])
                }


            }
        default:
            return state
    }

}