import axios from "axios";
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecs = () =>
    axios.get(baseUrl).then(res => res.data)

export const createAnec = (newAnec) =>
    axios.post(baseUrl, newAnec).then(res => res.data)

export const updateAnec = (updatedAnec) =>
    axios.put(`${baseUrl}/${updatedAnec.id}`, updatedAnec).then(res => res.data)


