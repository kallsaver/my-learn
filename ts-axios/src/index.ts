import { AxiosRequestConfig } from './types'
import xhr from './core/xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  // TODO
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transformData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

class GenericsClass<T> {
  public add?: (x: T, y: T) => T
}

const cls = new GenericsClass<number>()
cls.add = (x: number, y: number): number => {
  return x + y
}
export default axios
