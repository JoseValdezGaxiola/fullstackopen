import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
      
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }
  const StatisticLine = ({ text, value }) => {

    return (
      <div>
        
   <p>{text} {value}</p>
  
  
      </div>
    )
  }
  const Statistics = ({good2,neutral,bad2}) => {
     
    if (good2===0 && neutral===0 && bad2===0) {
      return (
        <div>
          no feedback given
        </div>
      )
    }
    return (
     
      <div>
  
          <h1>statistics</h1>
        <StatisticLine text="good" value ={good2} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad2} />
        <StatisticLine text="total" value ={good2+neutral+bad2} />
        <StatisticLine text="average" value ={good2/(good2+neutral+bad2)-bad2/(good2+neutral+bad2)} />
        <StatisticLine text="positive" value ={good2/(good2+neutral+bad2)} />
       
  
      </div>
  
  
    )
  }
  

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      
      
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>

      <Statistics good2={store.getState().good} neutral={store.getState().ok} bad2={store.getState().bad}/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
