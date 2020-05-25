import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Poll from "./Poll";


class Home extends Component {
    static propTypes = {
        answeredIds: PropTypes.array.isRequired,
        unAnsweredIds: PropTypes.array.isRequired
    }
    state = {
        tabSelected: 'tab2'
    }

    handleTabSelection = (tabSelected) => {
        this.setState(() => ({ tabSelected: tabSelected }))
    }
    render() {
        const { answeredIds, unAnsweredIds } = this.props
        const { tabSelected } = this.state
        return (
            <div>
                <div className='tab'>
                    <button className={tabSelected === 'tab1' ? 'active' : ''} onClick={() => this.handleTabSelection('tab1')} type='button'>Answered</button>
                    <button className={tabSelected === 'tab2' ? 'active' : ''} onClick={() => this.handleTabSelection('tab2')} type='button'>Unanswered</button>
                </div>
                <div className='tab-content'>
                    {tabSelected === 'tab1' ? <div>
                        <ul>
                            {answeredIds.map(id => <li key={id}><Poll questionId={id} /></li>)}
                        </ul>
                    </div> :

                        <div>
                            <ul>
                                {unAnsweredIds.map(id => <li key={id}><Poll questionId={id} /></li>)}
                            </ul>
                        </div>}
                </div>
            </div>)
    }
}



const mapStateToProps = ({ users, questions, authedUser }) => {
    const user = users[authedUser]
    const answers = user ? user.answers : {}
    const answeredIds = Object.keys(answers).sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    const unAnsweredIds = Object.keys(questions).filter(key => !answers[key]).sort((a, b) => questions[b].timestamp - questions[a].timestamp);
    return { answeredIds, unAnsweredIds }


}

export default connect(mapStateToProps)(Home)