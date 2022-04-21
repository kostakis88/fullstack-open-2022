import { useState } from 'react'

const Button = (props) => {
  const {handleClick, text} = props
  return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = (props) => {
  const {text, value, symbol} = props
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value} {symbol && '%'}</td>
      </tr>
    </>
  ) 
}

const Statistics = (props) => {
  const {good, neutral, bad, all, avarage, percentage} = props

  return (
    <table>
      <tbody>
        <StatisticLine text={'good'} value={good} symbol={false}/>
        <StatisticLine text={'neutral'} value={neutral} symbol={false}/>
        <StatisticLine text={'bad'} value={bad} symbol={false}/>
        <StatisticLine text={'all'} value={all} symbol={false}/>
        <StatisticLine text={'avarage'} value={avarage} symbol={false}/>
        <StatisticLine text={'positive'} value={percentage} symbol={true}/>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  const all = good + neutral + bad
  const avarage = ((good * 1) + (neutral * 0) + (bad * -1)) / all
  const percentage = (partialValue, totalValue) => {
    return (100 * partialValue) / totalValue
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text={'good'}/>
      <Button handleClick={handleNeutral} text={'neutral'}/>
      <Button handleClick={handleBad} text={'bad'}/>
      <h1>statistics</h1>
      { all > 0 && <Statistics good={good} neutral={neutral} bad={bad} all={all} avarage={avarage} percentage={percentage(good, all)}/>}
    </div>
  )
}

export default App