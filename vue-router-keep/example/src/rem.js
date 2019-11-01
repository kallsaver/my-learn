const DESIGN_WIDTH = 375
const REM2PX = 100
const MAX_WIDTH = 640

function setRemFontSize() {
  const innerWidth = window.innerWidth > MAX_WIDTH ? MAX_WIDTH : window.innerWidth
  const remFontSize = innerWidth / DESIGN_WIDTH * REM2PX
  document.documentElement.style.fontSize = remFontSize + 'px'
}

setRemFontSize()
window.addEventListener('resize', setRemFontSize, false)
