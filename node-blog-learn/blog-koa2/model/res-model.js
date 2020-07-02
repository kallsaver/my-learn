class SuccessModel {
  constructor(data, message = 'success', code = 1) {
    this.message = message
    this.data = data
    this.code = code
  }
}

class ErrorModel {
  constructor(message, data = null, code = 0) {
    this.message = message
    this.data = data
    this.code = code
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}
