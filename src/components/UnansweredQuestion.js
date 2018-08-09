import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
import { handleInitialData } from '../actions/shared'
import { handleSaveQuestionAnswer } from '../actions/questions'
import { Link, withRouter } from 'react-router-dom'

class UnansweredQuestion extends Component {
  handleChooseOption = (e) => {
    const { dispatch, question, authedUser } = this.props
    const saveQuestionAnswer = {
      answer: e.target.id,
      authedUser,
      qid: question.id,
    }
    dispatch(handleSaveQuestionAnswer({saveQuestionAnswer}))
    dispatch(handleInitialData(authedUser))
  }

  render() {
    const { question, user, authorName } = this.props

    if (!question) {
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
            <h3 className='center'>Would You Rather</h3>
            <span>{authorName}</span>
            <img
              src={avatarURL}
              alt={`Avatar of ${authorName}`}
              className='avatar'
            />
            <div>{formatDate(timestamp)}</div>
            {optionOne && (
                <p className='active' id='optionOne' onClick={this.handleChooseOption}>1. {optionOne.text}</p>
            )}
            {optionTwo && (
                <p className='active' id='optionTwo' onClick={this.handleChooseOption}>2. {optionTwo.text}</p>
            )}
          </div>
        </div>
      </Link>
    )
  }
}

function mapStateToProps ({users, questions, authedUser}, { id }) {
  const question = questions[id]
  const user = users[question.author]
  const authorName = users[question.author].name
  return {
    question,
    user,
    authorName,
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(UnansweredQuestion))