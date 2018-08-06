import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'

class AnsweredQuestion extends Component {
  render() {
    const { question, user, authorName, percentageOfOptionOne, percentageOfOptionTwo,
      hasVotedOne } = this.props

    if (question === null || question === undefined) {
      return <p>This Question doesn't existd</p>
    }

    const {
      timestamp, id, optionOne, optionTwo
    } = question

    const {
      avatarURL
    } = user

    return (
      <Link to={`/questions/${id}`} className='tweet'>
        <div className='tweet-info'>
          <div>
            <span>{authorName}</span>
            <div>{formatDate(timestamp)}</div>
            {optionOne && (
                <div>
                  <p className='active'>1. {optionOne.text}. {hasVotedOne && 'Voted'}</p>
                  <span>Number of votes: {optionOne.votes.length}     </span>
                  <span>Percentage: {percentageOfOptionOne}</span>
                </div>
                
            )}
            {optionTwo && (
                <div>
                  <p className='active'>2. {optionTwo.text}. {!hasVotedOne && 'Voted'}</p>
                  <span>Number of votes: {optionTwo.votes.length}     </span>
                  <span>Percentage: {percentageOfOptionTwo}</span>
                </div>
            )}
          </div>
        </div>
      </Link>
    )
  }
}

function mapStateToProps ({users, questions, authedUser}, { id }) {
  const question = questions[id]
  if(question !== undefined){
    const user = users[question.author]
    var numOfOptionA = question.optionOne.votes.length
    var numOfOptionB = question.optionTwo.votes.length
    var percentageOfOptionOne = 100 * numOfOptionA / (numOfOptionA + numOfOptionB)
    var percentageOfOptionTwo = 100 * numOfOptionB / (numOfOptionA + numOfOptionB)
    const authorName = users[question.author].name
    const hasVotedOne = question.optionOne.votes.indexOf(authedUser) > -1? true: false

    return {
      question,
      user,
      authorName,
      percentageOfOptionOne,
      percentageOfOptionTwo,
      hasVotedOne
    }
  }
  
  return{
    question
  }
}

export default withRouter(connect(mapStateToProps)(AnsweredQuestion))