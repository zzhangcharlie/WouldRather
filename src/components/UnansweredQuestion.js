import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'
// import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
// import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
// import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'
import { handleSaveQuestionAnswer } from '../actions/questions'
import { Link, withRouter } from 'react-router-dom'

class UnansweredQuestion extends Component {
  handleChooseOption = (e) => {
    const { dispatch, question, authedUser } = this.props
    dispatch(handleSaveQuestionAnswer({
      qid: question.id,
      authedUser,
      answer: e.target.id
    }))
  }

  render() {
    const { question, user, authorName } = this.props

    if (question === null) {
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
            {/* {parent && (
              <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                Replying to @{parent.author}
              </button>
            )} */}
            {optionOne && (
                <p className='active' id='optionOne' onClick={this.handleChooseOption}>1. {optionOne.text}</p>
            )}
            {optionTwo && (
                <p className='active' id='optionTwo' onClick={this.handleChooseOption}>2. {optionTwo.text}</p>
            )}
          </div>
          <div className='tweet-icons'>
            {/* <TiArrowBackOutline className='tweet-icon' /> */}
            {/* <span>{replies !== 0 && replies}</span>
            <button className='heart-button' onClick={this.handleLike}>
              {hasLiked === true
                ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                : <TiHeartOutline className='tweet-icon'/>}
            </button>
            <span>{likes !== 0 && likes}</span> */}
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
      // ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      // : null
  }
}

export default withRouter(connect(mapStateToProps)(UnansweredQuestion))