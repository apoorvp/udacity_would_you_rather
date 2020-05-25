import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

function PollResult(props) {
    const { optionOne, optionTwo, name, avatar, totalVotes, userVote } = props
    const optionOneVotes = (optionOne.votes.length / totalVotes * 100).toFixed(2) + '%'
    const optionTwoVotes = (optionTwo.votes.length / totalVotes * 100).toFixed(2) + '%'

    return (
        <div className='poll'>
            <div className='poll-title'>{`${name} Asks`}</div>
            <div className='poll-details'>
                <div className='poll-user-avatar'>
                    {avatar === '' || avatar === null || avatar === undefined ?
                        <img className='avatar' src='../avatar/icon_common.jpg' alt={`${name} avatar`} />
                        : <img className='avatar' src={avatar} alt={`${name} avatar`} />}
                </div>
                <div className='poll-options'>
                    <h4>Results</h4>
                    <div className='poll-option-wrapper'>
                        {userVote === 'optionOne' && <div className='your-vote-badge'>Your vote</div>}
                        <div className='poll-option'>{`Would you rather ${optionOne.text} ?`} </div>
                        <div className='progress'>
                            <span className='value' style={{ width: optionOneVotes }} >
                                {optionOneVotes}
                            </span>
                        </div>
                        <h5>{`${optionOne.votes.length} out of ${totalVotes} votes`} </h5>
                    </div>
                    <div className='poll-option-wrapper'>
                        {userVote === 'optionTwo' && <div className='your-vote-badge'>Your vote</div>}

                        <div className='poll-option'> {`Would you rather ${optionTwo.text} ?`}</div>
                        <div className='progress'>
                            <span className='value' style={{ width: optionTwoVotes }} >
                                {optionTwoVotes}
                            </span>
                        </div>
                        <h5>{`${optionTwo.votes.length} out of ${totalVotes} votes`} </h5>
                    </div>
                </div>
            </div>
        </div >


    )

}
PollResult.propTypes = {
    optionOne: PropTypes.object.isRequired,
    optionTwo: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    totalVotes: PropTypes.number.isRequired,
    userVote: PropTypes.string.isRequired
}
const mapStateToProps = ({ users, questions, authedUser }, { questionid }) => {
    const { author, optionOne, optionTwo } = questions[questionid]
    const { avatarURL, name } = users[author]
    const totalVotes = optionOne.votes.length + optionTwo.votes.length
    const userVote = optionTwo.votes.indexOf(authedUser) > -1 ? 'optionTwo' : 'optionOne'

    return {
        optionOne,
        optionTwo,
        name,
        avatar: avatarURL,
        totalVotes,
        userVote

    }
}

export default connect(mapStateToProps)(PollResult)