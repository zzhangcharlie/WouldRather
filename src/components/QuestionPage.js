import React, { Component } from 'react'
import { connect } from 'react-redux'
import AnsweredQuestion from './AnsweredQuestion'
import UnansweredQuestion from './UnansweredQuestion'
// import NewTweet from './NewTweet'

class QuestionPage extends Component {
  render() {
    const { id, hasAnswered } = this.props
    return (
      <div>
        {
          hasAnswered && <AnsweredQuestion id={id} />
        }
        {
          !hasAnswered && <UnansweredQuestion id={id} />
        }
        {/* <NewTweet id={id} /> */}
        {<h3 className='center'>Replies</h3>}
        <ul>
          {/* {replies.map((replyId) => (
            <li key={replyId}>
              <Tweet id={replyId}/>
            </li>
          ))} */}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  const question = questions[id]
  const hasAnswered = (question.optionOne.votes.indexOf(authedUser) > -1 || 
                      question.optionTwo.votes.indexOf(authedUser) > -1)? true: false
  return {
    id,
    hasAnswered
    // replies: !tweets[id]
    //   ? []
    //   : tweets[id].replies.sort((a,b,) => tweets[b].timestamp - tweets[a].timestamp)
  }
}

export default connect(mapStateToProps)(QuestionPage)