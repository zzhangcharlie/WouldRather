import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }
  handleChange = (e) => {
    const temp = e.target.value
    if(e.target.id === 'optionOne'){
        this.setState(() => ({
            optionOneText: temp
        }))
    }
    else{
        this.setState(() => ({
            optionTwoText: temp
        }))
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { dispatch } = this.props

    dispatch(handleAddQuestion(optionOneText, optionTwoText))

    this.setState(() => ({
        optionOneText:'',
        optionTwoText: '',
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
        <h5>Hello, {this.props.user.name}</h5>
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

function mapStateToProps ({ authedUser, users }) {
  return {
    user: users[authedUser]
  }
}

export default connect(mapStateToProps)(NewQuestion)