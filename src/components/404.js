import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'

class NotFound extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <h2>404 Not Found</h2>
            <div>The page is not found.</div>            
          </div>
        </Fragment>
      </Router>
    )
  }
}

export default connect()(NotFound)