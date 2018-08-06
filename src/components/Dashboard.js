import React, { Component } from 'react'
import { connect } from 'react-redux'
import AnsweredQuestion from './AnsweredQuestion'
import UnansweredQuestion from './UnansweredQuestion'
import User from './User'

class Dashboard extends Component {
  toggleQuestions = (e) => {
    const name = e.target.id
    if(name.indexOf('Not') > -1){
      document.getElementsByName('notAnsweredQuestions')[0].removeAttribute("hidden")
      document.getElementsByName('answeredQuestions')[0].setAttribute("hidden", true)
    }
    else{
      document.getElementsByName('answeredQuestions')[0].removeAttribute("hidden")
      document.getElementsByName('notAnsweredQuestions')[0].setAttribute("hidden", true)
    }
  }
  render() {
    return (
      <div>
        <User />
        <div>
          <input type='radio' id='showAnsweredQuestions' name='toggleQuestions' onClick={this.toggleQuestions} />
          <label for="showAnsweredQuestions">Answered Questions</label>
          <input type='radio' id='showNotAnsweredQuestions' name='toggleQuestions' onClick={this.toggleQuestions} />
          <label for="showNotAnsweredQuestions">Not Answered Questions</label>
        </div>
        
        <div name='answeredQuestions' hidden>
          <h3 className='center'>Your Answered Questions:</h3>
          <ul className='dashboard-list'>
            {this.props.answeredQuestionsIds.map((id) => (
              <li key={id}>
                <AnsweredQuestion id={id} />
              </li>
            ))}
          </ul>
        </div>
        
        <div name='notAnsweredQuestions' >
          <h3 className='center'>Your Not Answered Questions:</h3>
          <ul className='dashboard-list'>
            {this.props.notAnsweredQuestionsIds.map((id) => (
              <li key={id}>
                <UnansweredQuestion id={id} />
              </li>
            ))}
          </ul>
        </div>        
      </div>
    )
  }
}

function mapStateToProps ({ questions, authedUser }) {
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
  }
}

export default connect(mapStateToProps)(Dashboard)