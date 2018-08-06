import React, { Component } from 'react'
import { connect } from 'react-redux'
import AnsweredQuestion from './AnsweredQuestion'
import UnansweredQuestion from './UnansweredQuestion'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h5>Hello, {this.props.user.name}</h5>
        <h3 className='center'>Your Answered Questions:</h3>
        <ul className='dashboard-list'>
          {this.props.answeredQuestionsIds.map((id) => (
            <li key={id}>
              <AnsweredQuestion id={id} />
            </li>
          ))}
        </ul>

        <h3 className='center'>Your Not Answered Questions:</h3>
        <ul className='dashboard-list'>
          {this.props.notAnsweredQuestionsIds.map((id) => (
            <li key={id}>
              <UnansweredQuestion id={id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ questions, authedUser, users }) {
    const answeredQuestion = Object.keys(questions).filter((qid) => {
        if((questions[qid].optionOne.votes.indexOf(authedUser) > -1) || (questions[qid].optionTwo.votes.indexOf(authedUser) > -1)){
            return qid
        }
    })

    const notAnsweredQuestion = Object.keys(questions).filter((qid) => {
        if((questions[qid].optionOne.votes.indexOf(authedUser) < 0) && (questions[qid].optionTwo.votes.indexOf(authedUser) < 0)){
            return qid
        }
    })
  return {
    answeredQuestionsIds: answeredQuestion
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    notAnsweredQuestionsIds: notAnsweredQuestion
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    user: users[authedUser]
  }
}

export default connect(mapStateToProps)(Dashboard)