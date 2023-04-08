import instance from "axios"

export const URI = ""

const axios = instance.create({
    baseURL: URI,
    withCredentials: true,
    headers: {'Access-Control-Allow-Origin': '*'}
})

export default axios
