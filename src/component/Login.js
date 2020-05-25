import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { setAuthedUser } from '../action/authedUser';

class Login extends Component {

    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    state = {
        userId: ''
    }
    handleOnUserChange = (e) => {
        e.preventDefault()
        const { value } = e.target;
        this.setState(() => ({ userId: value }))
    }

    handleOnUserLogin = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(setAuthedUser(this.state.userId))
    }
    render() {
        const { userList } = this.props
        const { userId } = this.state
        return (< div className='form-container' >

            <form onSubmit={this.handleOnUserLogin}>
                <h1>Would You Rather</h1>
                <div className='logo-wrapper'>
                    <img className='logo' src='../logo192.png' alt='App logo' />
                </div>

                <span className='sign-in'>Sign in</span>
                <div className='form-content'>
                    <select onChange={this.handleOnUserChange}>
                        <option value='none'>Select user to login</option>
                        {userList.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                    </select>
                    <button className='button' type='submit' disabled={userId === '' || userId === 'none'}>Login</button>
                </div>
            </form>
        </div >)
    }
}

const mapStateToProps = ({ users }) => {
    const userList = [];
    Object.keys(users).forEach(key => {
        const { id, name } = users[key]
        userList.push({ id, name })
    });

    return { userList }
}
export default connect(mapStateToProps)(Login)