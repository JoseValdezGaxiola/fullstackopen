import { useState, useEffect } from 'react'
import  { useField } from './hooks'
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useMatch
} from "react-router-dom"



const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
       <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
    
    </div>
  )
}

const Notification = ({ notification }) => {
  const successStyle  ={
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (notification === null) {
    return null
  }

  return (
    <div style={successStyle}>
      {notification}
    </div>
  )
}

const Anecdote = ({ anecdote }) => {

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>has {anecdote.votes} votes</div>
      <div><strong>for more info see <a href={anecdote.info}>{anecdote.info}</a></strong></div>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >
         <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const {reset:resetcontent,...content} = useField('content')
  const {reset:resetauthor,...author} = useField('author')
  const {reset:resetinfo,...info} = useField('info')
  
 
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')
  
  const handleReset =() => {
    resetcontent()
    resetauthor()
    resetinfo()
  }
 
  const handleSubmit = (e) => {
    e.preventDefault()
    
    props.addNew({
      content:content.value,
      author:author.value,
      info:info.value,
      votes: 0
    })
   
   

  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input  {...content} />
        </div>
        <div>
          author
          <input  {...author} />
        </div>
        <div>
          url for more info
          <input {...info}  />
        </div>
        <button>create</button>
        <input type='reset' onClick={handleReset} />
        
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, setNotification] = useState(null)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification(null)
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [notification])

  const navigate = useNavigate()
  const addNew = (anecdote) => {
    
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification( `Added '${anecdote.content}'`)
    navigate('/')
  }
  const match = useMatch('/anecdotes/:id')

  const anecdote = match 
  ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
  : null
 



  return (
    <div>

    <div>
    <h1>Software anecdotes</h1>
       <Routes>
        <Route path="/create" element={<CreateNew addNew={addNew}/>} />
        <Route path="/" element={ <><Menu />
        <AnecdoteList anecdotes={anecdotes} /> <Notification notification={notification}/> </>} />
        <Route path='/about' element= {<> <Menu /> <About/></>} />

        <Route path='/anecdotes/:id' element={<><Menu /><Anecdote anecdote={anecdote} /></>} />
      </Routes>
      <div>
      <Footer />
      </div>
    </div>
    
    {/* <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <AnecdoteList anecdotes={anecdotes} />
      <About />
      <CreateNew addNew={addNew} />
      <Footer />
    </div> */}
    </div>
  )
}

export default App
