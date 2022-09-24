import { connect } from 'react-redux'
import  {createAnecdote}  from '../reducers/anecdoteReducer'
import  {createNotification}  from '../reducers/notificationReducer'


const NewAnecdote = (props)=>{


const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.createNotification(`New anecdote added: ${content}`, 5)
  }

  return(

      <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>)
}
export default connect(null, { createAnecdote,createNotification })(NewAnecdote) 
