import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../action/shared';
import Login from './Login';
import Home from './Home';
import { BrowserRouter, Route } from 'react-router-dom';
import PollQuestion from './PollQuestion';
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion';
import Nav from './Nav'
import LeaderBoard from './LeaderBoard';


class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleInitialData())
  }
  render() {

    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />

          <div >
            {this.props.loading === true
              ? <Login /> :
              <div>
                <Nav />
                <Route exact path='/' component={Home} />
                <Route exact path='/questions/:questionid' component={PollQuestion} />
                <Route exact path='/add' component={NewQuestion} />
                <Route exact path='/leaderboard' component={LeaderBoard} />
                <Route exact path='/404' render={() => <h1>Page not found</h1>} />
              </div>
            }

          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
