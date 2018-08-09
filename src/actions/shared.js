import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

//const AUTHED_ID = null

export function handleInitialData (AUTHED_ID) {
  if(AUTHED_ID === undefined) AUTHED_ID = null
  return (dispatch) => {
    if(AUTHED_ID === null){
      dispatch(showLoading())
    }
    
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      })
  }
}