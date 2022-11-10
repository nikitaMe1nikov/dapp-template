import mockAdapter from 'axios-mock-adapter'
import { AxiosInstance } from 'axios'
import someResponse from './someResponce.json'

export function addMock(axios: AxiosInstance) {
  const mock = new mockAdapter(axios, { delayResponse: 2000, onNoMatch: 'passthrough' })

  mock.onGet('/someapi').reply(() => [200, someResponse])
}
