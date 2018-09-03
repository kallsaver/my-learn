import '@/common/stylus/index.styl'
import './stylus/style.styl'

import { addClass } from '@/common/helpers/dom.js'

// vendor
import * as _ from 'lodash'

import { canvasAnimFrame } from './js/canvas'

console.log(_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }))

let img = document.createElement('img')

let imgUrl = require('./images/wallpaper.jpg')

img.setAttribute('src', imgUrl)

addClass(img, 'box')

let app = document.getElementById('app')

app.appendChild(img)

setTimeout(() => {
  img.style.width = '0px'
  img.style.opacity = '0'
  canvasAnimFrame()
}, 1000)
