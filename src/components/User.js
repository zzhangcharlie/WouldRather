import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class User extends Component {
    handleLogout = (e) => {
        e.preventDefault()

        const { dispatch } = this.props

        dispatch(setAuthedUser(null))
      }
  render() {
    return (
      <div>
        <h5>Hello, {this.props.user.name}</h5>
        <div><a href='#' onClick={this.handleLogout}>Log out</a></div>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    user: users[authedUser]
  }
}

export default connect(mapStateToProps)(User)