import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

import { RECEIVE_QUESTIONS, ADD_QUESTION_ANSWER, ADD_QUESTION } from '../actions/actionTypes'

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
    dispatch(addQuestionAnswer(info.saveQuestionAnswer))

    return saveQuestionAnswer(info.saveQuestionAnswer)
      .catch((e) => {
        console.warn('Error in handleSaveQuestionAnswer: ', e)
      })
  }
}