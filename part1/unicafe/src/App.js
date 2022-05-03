import { useState } from 'react'

const Button = (props) => {
  return (
    <div>
     <button onClick={() => props.setGood(props.good + 1)}>
        Good
      </button>
      
      <button onClick={() => props.setNeutral(props.neutral + 1)}>
        Neutral
      </button>

      <button onClick={() => props.setBad(props.bad + 1)}>
        Bad
      </button>
    </div>
  )
}
const StatisticLine = ({ text, value }) => {

  return (
    <div>
      
 <p>{text} {value}</p>


    </div>
  )
}
const Statistics = (props) => {
   
  if (props.good===0 && props.neutral===0 && props.bad===0) {
    return (
      <div>
        no feedback given
      </div>
    )
  }
  return (
   
    <div>

        <h1>statistics</h1>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="total" value ={props.good+props.neutral+props.bad} />
      <StatisticLine text="average" value ={props.good/(props.good+props.neutral+props.bad)-props.bad/(props.good+props.neutral+props.bad)} />
      <StatisticLine text="positive" value ={props.good/(props.good+props.neutral+props.bad)} />
     

    </div>


  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
       <h1>give feedback</h1>
     
       <Button good={good} neutral={neutral} bad={bad} setGood={setGood} setNeutral={setNeutral} setBad={setBad}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
  
    </div>

  )
}


export default App