import { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const [weatherData, setWeatehrData] = useState([])
  
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then(response => setWeatehrData(response.data))
  }, [country.capital])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        capital <span>{country.capital}</span>
      </div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.keys(country.languages).map((language) => (
          <li key={language}>{country.languages[language]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`The flag of ${country.name.common}`} />
      {weatherData.main && (
        <>
          <h1>Weather in {country.capital}</h1>
          <p>temperature {weatherData.main.temp} Celcius</p>
          <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={`Icon for ${weatherData.weather[0].description}`}/>
          <p>wind {weatherData.wind.speed} m/s</p>
        </>
      )}
    </div>
  )
}

export default Country