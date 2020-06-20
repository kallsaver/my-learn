function getCookieExpires() {
  // 注意cookie的maxAge是秒为单位
  // 而date.getTime单位是毫秒
  const maxAgeTime = 24 * 60 * 60 * 1000
  const date = new Date()
  date.setTime(date.getTime() + maxAgeTime)
  return date.toGMTString()
}

function createSessionId() {
  return `${Date.now()}_${Math.random()}`
}

module.exports = {
  getCookieExpires,
  createSessionId,
}
