import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types'

class Poll extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        optionOne: PropTypes.object.isRequired,
        optionTwo: PropTypes.object.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string
    }
    state = {
        toQuestionDetails: false
    }
    handleViewPoll = (e) => {
        e.preventDefault();
        this.setState(() => ({ toQuestionDetails: true }))

    }
    render() {
        const { id, optionOne, optionTwo, name, avatar } = this.props
        if (this.state.toQuestionDetails === true) {
            return (<Redirect to={`/questions/${id}`} />)
        }

        return (
            <div className='poll'>
                <div className='poll-title'>{`${name} Asks`}</div>
                <div className='poll-details'>
                    <div className='poll-user-avatar'>
                        {avatar === '' || avatar === null || avatar === undefined ?
                            <img className='avatar' src='./avatar/icon_common.jpg' alt={`${name} avatar`} />
                            : <img className='avatar' src={avatar} alt={`${name} avatar`} />}
                    </div>
                    <div className='poll-options'>
                        <div className='poll-option'>{optionOne.text}</div>
                        <div className='poll-option'>{optionTwo.text}</div>
                        <button className='poll-option button' type='button' onClick={this.handleViewPoll}>View Poll</button>
                    </div>

                </div>

            </div>)
    }
}
const mapStateToProps = ({ questions, users }, { questionId }) => {
    const { id, author, optionOne, optionTwo } = questions[questionId]
    const { avatarURL, name } = users[author]
    return {
        id,
        optionOne,
        optionTwo,
        name,
        avatar: avatarURL
    }


}
export default connect(mapStateToProps)(Poll)