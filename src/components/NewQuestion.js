import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import User from './User'
import { handleInitialData } from '../actions/shared'

const defaultState = {
  optionOneText: '',
  optionTwoText: '',
  toHome: false,
}

class NewQuestion extends Component {
  state = defaultState;

  handleChange = (e) => {
    const { value, id } = e.target;
    this.setState({
      [`${id}Text`]: value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { dispatch, authedUser } = this.props

    dispatch(handleAddQuestion(optionOneText, optionTwoText))
    dispatch(handleInitialData(authedUser))

    this.setState(() => ({
        ...defaultState,
        toHome: true,
    }))
  }
  render() {
    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <User />
        <h3 className='center'>Would You Rather</h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <textarea
            id='optionOne'
            placeholder="What's your first option?"
            value={optionOneText}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}
          />
          <textarea
            id='optionTwo'
            placeholder="What's your second option?"
            value={optionTwoText}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}
          />
          <button
            className='btn'
            type='submit'
            disabled={optionOneText === '' || optionTwoText === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NewQuestion)