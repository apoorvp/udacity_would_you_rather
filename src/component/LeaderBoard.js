import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Leader from './Leader'

class LeaderBoard extends Component {

    render() {
        const { userIds } = this.props
        
        return (<div className='leader-board-container'>
            <h3>Leader Board</h3>
            <ul>
                {userIds.map(user => <li key={user}> <Leader userId={user} /></li>)}
            </ul>
        </div>)
    }

}

const mapSateToProps = ({ users }) => {

    let userIds = Object.keys(users)

    userIds = userIds.sort((a, b) => {
        return (Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length)
    }

    )


    return {
        userIds
    }

}
LeaderBoard.propTypes = {
    userIds: PropTypes.array.isRequired
}

export default connect(mapSateToProps)(LeaderBoard)