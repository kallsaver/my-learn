import { HOST, IMAGE_SERVER_PORT } from './dev.js'

export default {
  development: {
    cloudImgBaseUrl: `http://${HOST}:${IMAGE_SERVER_PORT}`,
    // apiBaseUrl: 'https://um.10get.com',
    apiBaseUrl: `http://${HOST}:9494`,
    // apiBaseUrl: 'http://10.68.245.172:8325',
    h5ActivityBaseUrl: `http://${HOST}:8011/#/`,
    // h5ActivityBaseUrl: 'https://um.10get.com/h5-activity/#/'
  },
  test: {
    cloudImgBaseUrl: 'https://um.10get.com/statics/images',
    apiBaseUrl: 'https://um.10get.com',
    h5ActivityBaseUrl: 'https://um.10get.com/h5-activity/#/'
  },
  production: {
    cloudImgBaseUrl: 'https://tcl.com/statics/images',
    apiBaseUrl: 'https://um.tcl.com',
    h5ActivityBaseUrl: 'https://um.tcl.com/h5-activity/#/'
  }
}
