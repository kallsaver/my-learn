class ResModel {
  constructor(data, message) {
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

class SuccessModel extends ResModel {
  constructor(data, message) {
    super(data, message)
    this.code = 1
    if (!message) {
      this.message = 'success'
    }
  }
}

class ErrorModel extends ResModel {
  constructor(data, message) {
    super(data, message)
    this.code = 0
    if (!message) {
      this.message = 'error'
    }
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}
