import React, { Component } from "react"
import { userLogout } from '../action/authedUser'
import { connect } from "react-redux"
import PropTypes from 'prop-types'

class UserProfile extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string
    }
    handleLogout = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(userLogout())
        this.setState(() => ({ toLogin: true }))
    }
    render() {
        const { name, avatar } = this.props

        return (
            <div className='profile-container'>
                <span className='name'>{name}</span>
                <span>
                    {avatar === '' || avatar === null || avatar === undefined ?
                        <img className='avatar' src='../avatar/icon_common.jpg' alt={`${name} avatar`} />
                        : <img className='avatar' src={avatar} alt={`${name} avatar`} />}</span>
                <button type='button' className='logout' onClick={this.handleLogout}><i className="fa fa-power-off"></i></button>
            </div>)
    }
}

const mapStateToProps = ({ users, authedUser }) => {
    const { avatarURL, name } = users[authedUser]
    return {
        avatar: avatarURL,
        name
    }
}
export default connect(mapStateToProps)(UserProfile)