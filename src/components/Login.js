import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
    state = {
        userId: '',
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const ele = document.getElementById("userId");
        const userId = ele.options[ele.selectedIndex].value;

        const { dispatch } = this.props

        dispatch(setAuthedUser(userId))

        this.setState(() => ({
            userId: userId,
        }))
    }
  render() {
    const {users, userIds} = this.props
    return (
      <div>
          {userIds.length === 0? null:
          <div>
            <h3 className='center'>Please Choose to Log in:</h3>
            <form className='new-tweet' onSubmit={this.handleSubmit}>
                <select id='userId'>
                {userIds.map((id) => (
                    <option  key={id} value={id}>
                    {users[id].name}
                    </option >
                ))}
                </select>
                <div>
                    <button
                        type='submit'
                    >
                        Submit
                    </button>
                </div>
            </form>
          </div>
        }
        
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
    
  return {
    userIds: Object.keys(users),
    users
  }
}

export default connect(mapStateToProps)(Login)