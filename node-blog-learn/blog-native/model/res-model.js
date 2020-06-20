class ResModel {
  constructor(data = null, message, code) {
    this.data = data
    this.code = code
    if (message) {
      this.message = message
    }
  }
}

class SuccessModel extends ResModel {
  constructor(data, message = 'success', code = 1) {
    super(data, message, code)
    this.message = message
  }
}

class ErrorModel extends ResModel {
  constructor(data, message = 'error', code = 0) {
    super(data, message, code)
    this.message = message
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}
