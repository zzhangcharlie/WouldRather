import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      author: authedUser,
      optionOneText,
      optionTwoText
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function addQuestionAnswer ({ authedUser, qid, answer }) {
  return {
    type: ADD_QUESTION_ANSWER,
    qid,
    authedUser,
    answer
  }
}

export function handleSaveQuestionAnswer (info) {
  return (dispatch) => {
    dispatch(addQuestionAnswer(info))

    return saveQuestionAnswer(info)
      .catch((e) => {
        console.warn('Error in handleSaveQuestionAnswer: ', e)
        //dispatch(toggleTweet(info))
        //alert('The was an error liking the tweet. Try again.')
      })
  }
}