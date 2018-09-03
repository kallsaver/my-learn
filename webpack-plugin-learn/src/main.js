import Vue from 'vue'
import BScroll from 'better-scroll'
import './style/style.css'
import { a } from './lib/a'
let png = require('./images/bizhi.jpg')

let b = a()

console.log(b)

console.log(Vue)

let img = document.createElement('img')

img.setAttribute('src', png)

img.className = 'box'

let app = document.getElementById('app')

app.appendChild(img)

console.log(BScroll)
