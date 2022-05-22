import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async newPerson => {
  const request = axios.post(baseUrl, newPerson)
  const response = await request
  return response.data
}

const update = async (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson)
  const response = await request
  return response.data
}


const deletePerson = async personId => {
  const request = axios.delete(`${baseUrl}/${personId}`)
  const response = await request
  return response.data
}

const personsService = { getAll, create, update, deletePerson }

export default personsService