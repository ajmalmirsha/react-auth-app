import axios from "axios"


export const BASE_URL = 'http://localhost:4000'

const fetchData = (method) => {
    axios.get(BASE_URL)
}
