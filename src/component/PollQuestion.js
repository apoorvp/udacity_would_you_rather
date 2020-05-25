import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import { handleAnswerSubmit } from '../action/shared';
import PollResult from './PollResult';



class PollQuestion extends Component {

    static propTypes = {
        id: PropTypes.string,
        optionOne: PropTypes.object,
        optionTwo: PropTypes.object,
        name: PropTypes.string,
        avatar: PropTypes.string,
        hasanswered: PropTypes.bool
    }
    state = {
        optionSelected: '',
        showResult: false
    }
    componentDidMount() {
        const { hasanswered } = this.props
        this.setState(() => ({ showResult: hasanswered }))
    }
    handlePollChange = (e) => {
        const { value } = e.target;
        this.setState(() => ({ optionSelected: value }))
    }
    handlePollSubmit = (e) => {
        const { authedUser, id, dispatch } = this.props
        e.preventDefault();
        dispatch(handleAnswerSubmit(authedUser, id, this.state.optionSelected)).then(() => {
            this.setState(() => ({ showResult: true }))
        })
    }
    render() {
        const { id, optionOne, optionTwo, name, avatar } = this.props;
        const { showResult, optionSelected } = this.state
        if (id === null || id === undefined) {
            return (<Redirect to='/404' />)
        }
        return (
            <div className='form-container'>
                {!showResult &&
                    <form onSubmit={this.handlePollSubmit} style={{ boxShadow: 'none' }}>

                        <div className='poll'>
                            <div className='poll-title'>{`${name} Asks`}</div>
                            <div className='poll-details'>
                                <div className='poll-user-avatar'>
                                    {avatar === '' || avatar === null || avatar === undefined ?
                                        <img className='avatar' src='../avatar/icon_common.jpg' alt={`${name} avatar`} />
                                        : <img className='avatar' src={avatar} alt={`${name} avatar`} />}
                                </div>
                                <div className='poll-options'>
                                    <ul>
                                        <li className='poll-option'>
                                            <input type='radio' id='option1' name='option1' checked={optionSelected === 'optionOne'} onChange={this.handlePollChange} value='optionOne' />
                                            <label htmlFor='option1'>{optionOne?.text}</label></li>
                                        <li className='poll-option'>
                                            <input type='radio' id='option2' name='option2' checked={optionSelected === 'optionTwo'} onChange={this.handlePollChange} value='optionTwo' />
                                            <label htmlFor='option2'>{optionTwo?.text}</label>
                                        </li>
                                    </ul>
                                    <button className='poll-option button' type='submit' disabled={optionSelected === ''}>Submit</button>

                                </div>
                            </div>
                        </div>
                    </form>}
                {showResult && <PollResult questionid={id} />}
            </div >)
    }

}

const mapStateToProps = ({ users, questions, authedUser }, props) => {
    const { questionid } = props.match.params
    if (questions[questionid] === null || questions[questionid] === undefined) {
        return {};
    }
    const { id, author, optionOne, optionTwo } = questions[questionid]
    const { avatarURL, name } = users[author]
    const { answers } = users[authedUser]


    return {
        id,
        optionOne,
        optionTwo,
        name,
        avatar: avatarURL,
        authedUser,
        hasanswered: answers && (answers[id] !== null && answers[id] !== undefined)
    }
}

export default connect(mapStateToProps)(PollQuestion)