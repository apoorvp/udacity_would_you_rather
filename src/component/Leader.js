import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from 'prop-types'

class Leader extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        questionAnswered: PropTypes.number.isRequired,
        questionAsked: PropTypes.number.isRequired
    }
    render() {
        const { name, avatar, questionAnswered, questionAsked } = this.props
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
                        <div className='poll-option'>{`Answered Questions:  ${questionAnswered}`}</div>
                        <div className='poll-option'>{`Created Questions:  ${questionAsked}`}</div>
                    </div>
                    <div className='score'>
                        <div className='score-badge'>
                            <div>Score</div>
                            <div>
                                {questionAnswered + questionAsked}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ users }, { userId }) => {
    const { name, avatarURL, questions, answers } = users[userId]
    return {
        name,
        avatar: avatarURL,
        questionAnswered: answers ? Object.keys(answers).length : 0,
        questionAsked: questions ? questions.length : 0,
    }

}
export default connect(mapStateToProps)(Leader)