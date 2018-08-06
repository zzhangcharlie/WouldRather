import React, { Component } from 'react'
import { connect } from 'react-redux'
import AnsweredQuestion from './AnsweredQuestion'
import UnansweredQuestion from './UnansweredQuestion'

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
  }
}

export default connect(mapStateToProps)(QuestionPage)