import axios from 'axios'
import camelcaseKeys from 'camelcase-keys-deep'
import qs from 'qs'
import snakecaseKeys from 'snakecase-keys'

import { API_BASEURL, API_JWT, API_KEY } from './config'

const baseURL = API_BASEURL

export const pickData = ({ data }) => data

const instance = axios.create({
  baseURL,

  headers: {
    Authorization: `Bearer ${API_JWT}`,
    'x-api-key': API_KEY,
    'content-type': 'application/json'
  },

  transformRequest: [
    data => data && JSON.stringify(snakecaseKeys(data)),
    ...axios.defaults.transformRequest
  ],

  paramsSerializer: params => {
    const result = qs.stringify(snakecaseKeys(params), {
      arrayFormat: 'brackets'
    })

    return result
  },

  timeout: 10000,
  transformResponse: [data => camelcaseKeys(JSON.parse(data))]
})

export default instance
