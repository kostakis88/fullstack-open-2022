import { useEffect, useState } from 'react'
import axios from 'axios'
import Country from './components/Country'
import Countries from './components/Countries'

const App = () => {
  const [countrySearch, setCountrySearch] = useState('')
  const [countries, setCountries] = useState([])

  const handleCountryChange = (event) => {
    setCountrySearch(event.target.value)
  }

  const displayCoutries = () => {
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(countrySearch))

    if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]}/>
    } else if (filteredCountries.length > 10) {
      return <div>Too many matches, specify another filter</div>
    } else {
      return <Countries countries={filteredCountries} />
    }
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => setCountries(response.data))
  }, [])

  return (
    <div>
      find countries&nbsp;
      <input value={countrySearch} onChange={handleCountryChange} />
      {displayCoutries()}
    </div>
  )
}

export default App;
