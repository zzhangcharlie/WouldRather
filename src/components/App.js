import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import Leaderboard from './Leaderboard'
import Nav from './Nav'
import Login from './Login'
import NotFound from './404'

const LoggedIn = () => (
  <div>
    <Route path='/' exact component={Dashboard} />
    <Route path='/questions/:id' component={QuestionPage} />
    <Route path='/add' component={NewQuestion} />
    <Route path='/leaderboard' component={Leaderboard} />
    <Route path='/404' component={NotFound} />
  </div>
)

class App extends Component {
  componentDidMount() {
    const {authedUser} = this.props
    this.props.getData(authedUser)
  }
  render() {
    const {authedUser} = this.props
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            {authedUser !== null && <Nav />}
            {authedUser === null? <Login />: <LoggedIn />}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getData: () => dispatch(handleInitialData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)