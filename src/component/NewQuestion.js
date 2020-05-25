import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import { handleCreateNewQuestion } from '../action/questions';

class NewQuestion extends Component {

    static propTypes = {
        authedUser:PropTypes.string.isRequired
    }
    state = {
        optionOne: '',
        optionTwo: '',
        toHome: false
    }
    handleSubmitNewQuestion = (e) => {
        e.preventDefault()
        const { dispatch, authedUser } = this.props
        const { optionOne, optionTwo } = this.state

        dispatch(handleCreateNewQuestion(optionOne, optionTwo, authedUser)).then(() => {
            this.setState(() => ({ toHome: true }))
        })

    }

    handleQuestionChange = (e) => {
        const { value, name } = e.target
        this.setState(() => ({ [name]: value }))
    }
    render() {
        const { optionOne, optionTwo, toHome } = this.state

        if (toHome === true) {
            return (<Redirect to='/' />)
        }
        return (


            <div className='form-container'>
                <form onSubmit={this.handleSubmitNewQuestion}>
                    <div className='form-content'>
                        <div className='new-question-header'>Create New Question</div>
                        <h5>Complete the question:</h5>
                        <h4>Would You Rather...</h4>
                        <input type='text' name='optionOne' onChange={this.handleQuestionChange} value={optionOne} placeholder='Enter Option One Text Here' />
                        <div className='new-question-option-divider'><span></span> <span>OR</span> <span></span></div>
                        <input type='text' name='optionTwo' onChange={this.handleQuestionChange} value={optionTwo} placeholder='Enter Option Two Text Here' />
                        <button className='button' type='submit' disabled={optionOne === '' || optionTwo === ''}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser
    }
}
export default connect(mapStateToProps)(NewQuestion)