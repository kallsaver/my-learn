const loginCheck = (username, password) => {
  if (username === 'test' && password === 'test') {
    return true
  }
  return false
}

module.exports = {
  loginCheck,
}
