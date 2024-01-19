import axios from "axios"


const BASE_URL = 'http://localhost:4000'

const getData = async (url) => {
   return axios.get(BASE_URL + url)
}

const postData = async (url) => {
   return axios.post(BASE_URL + url)
}

export default {
    getData,
    postData
}