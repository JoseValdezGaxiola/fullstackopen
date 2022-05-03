import { useState } from 'react'


const Mostvoted = (props) =>
{

  return (

    <div>
      <h1>Anecdote wiht most votes</h1>
      <p>{props.anecdotes[(props.mostvotedan)]}</p>
      <p>has {Math.max(...props.votes)} votes</p>

    </div>
  )
}
const Display = (props) => {
  return (
<p> has {props.votes[props.selected]} votes</p>
  )

}

const Button = (props) => {

  return (
    <div>
    <button onClick = {() =>   props.setSelected(Math.floor(Math.random() * 7))}> Next anecdote </button>
      
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const Votesincrement = () => {

    const CopyArr = [...votes];
    CopyArr[selected]+=1;
    setVotes(CopyArr);
    
    }
  const [selected, setSelected] = useState(0)
  const [votes,setVotes] = useState(new Array(anecdotes.length).fill(0) )

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <Display votes= {votes}  selected = {selected}/>
      <Button  setSelected={setSelected} anecdotes = {anecdotes} />
      <button onClick={Votesincrement}>Vote</button>
      
      <Mostvoted votes= {votes} anecdotes = {anecdotes} mostvotedan ={votes.indexOf(Math.max(...votes))}/>
      
    </div>
  )
}

export default App;
