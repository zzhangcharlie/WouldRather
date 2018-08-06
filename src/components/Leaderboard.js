import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  render() {
    const users = this.props.users
    return (
      <div>
        <h5>Hello, {this.props.user.name}</h5>
        <h3 className='center'>Leaderboard</h3>
        <ul className='dashboard-list'>
          {this.props.userIds.map((id) => (
            <li key={id} className='center'>
              <span>{users[id].name}</span>
              <img
                src={users[id].avatarURL}
                alt={`Avatar of ${users[id].name}`}
                className='avatar'
              />
              <div>Number of questions asked: {users[id].questions.length}</div>
              <div>Number of questions answered: {Object.keys(users[id].answers).length}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    userIds: Object.keys(users)
      .sort((a,b) => (Object.keys(users[b].answers).length + users[b].questions.length) 
      - (Object.keys(users[a].answers).length + users[a].questions.length)),
    users,
    user: users[authedUser]
  }
}

export default connect(mapStateToProps)(Leaderboard)