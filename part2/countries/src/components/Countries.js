import { useState } from 'react'
import Country from './Country'

const Countries = ({ countries }) => {
  const [displayCoutry, setDisplayCountry] = useState(false)
  const [countryToDisplay, setCountryToDisplay] = useState('')

  const handleClick = (country) => {
    setDisplayCountry(true)
    setCountryToDisplay(country)
  }

  return (
    <>
      <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
        {countries.map(country => <li key={country.name.common}>{country.name.common}<button onClick={() => handleClick(country)}>show</button></li>)}
      </ul>
      {displayCoutry && <Country country={countryToDisplay}/>}
    </>
  )
}

export default Countries