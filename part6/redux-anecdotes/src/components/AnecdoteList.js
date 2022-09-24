import { useDispatch, useSelector } from 'react-redux'
import  {updateVote}  from '../reducers/anecdoteReducer'
import { orderBy } from "lodash";
import  {createNotification}  from '../reducers/notificationReducer'

const Anecdote = ()=> {


const anecdotes = useSelector(state => state.anecdotes)
let sortAnecdotes = orderBy(anecdotes, ["votes"], ["desc"]);
const dispatch = useDispatch()

const vote = (anecdote) => {
  
  dispatch(updateVote(anecdote))
  dispatch(createNotification(`you voted for ${anecdote.content}`,3))
}
return (
    <div>
{sortAnecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  )}
  </div>
)
}
export default Anecdote