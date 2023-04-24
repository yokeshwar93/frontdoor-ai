import Axios, {AxiosResponse} from 'axios'
import {API_SERVER, REQUEST_METHODS} from "./constants";

const getDefaultHeaders = (customHeaders : any) => {
  return {
    'Content-Type': 'application/json',
    accept: 'application/json',
    ...customHeaders,
  }
}

const callApi = (serviceEndpoint : string, params : any, requestMethod : string, requestBody : any, headers : any) : Promise<any> | undefined => {
  const axiosInstance = Axios.create({
    headers: getDefaultHeaders(headers),
    baseURL: API_SERVER
  })

  switch (requestMethod) {
    case REQUEST_METHODS.GET:
      return axiosInstance
        .get(serviceEndpoint, { params })
        .then((response : AxiosResponse) => response.data)
        .catch((error) => {
          throw error
        })
    case REQUEST_METHODS.POST:
      return axiosInstance
        .post(serviceEndpoint, requestBody)
        .then((response : AxiosResponse) => response.data)
        .catch((error) => {
          throw error.response
        })
    case REQUEST_METHODS.PUT:
      return axiosInstance
        .put(serviceEndpoint, requestBody)
        .then((response: AxiosResponse) => response.data)
        .catch((error) => {
          throw error.response
        })
    case REQUEST_METHODS.DELETE:
      return axiosInstance
        .delete(serviceEndpoint, { params })
        .then((response: AxiosResponse) => response.data)
        .catch((error) => {
          throw error
        })

  }
}

export default callApi
