const engine = require('store/src/store-engine')
const storages = [
  require('store/storages/localStorage')
]

const storePlugins = [
  require('store/plugins/defaults'),
  require('store/plugins/expire')
]

const store = engine.createStore(storages, storePlugins)


function login () {
  let time = new Date().getTime()
  store.set('userData', { time }, 60 * 10000000000000)
  let loginData = store.get('userData')
}

function ajax (options) {
  if (options.url && options.url instanceof Function) {
    function getData () {
      let loginData = store.get('userData')
      return new Promise((resolve, reject) => {
        options.url(loginData).then((data) => {
          if (data.code == 200) {
            resolve(data)
          } else if (data.code === 416) {
            console.log('token过期')
            reLogin_Node().then((data) => {
              let token = data
              store.set('userData', { time: token }, 60 * 10000000000000)
              // 总是触发token过期
              store.set('userData', { itme: 1 }, 60 * 10000000000000)
              getData()
            })
          } else {
            console.log('其他错误')
          }
        })
      })
    }
    // 由于Promise的指针改变了,所以在ajax中封装要更高级
    // https://github.com/IndigoUnited/node-promise-retry
    return getData()
  }
}

// 后台接口
function reLogin_Node () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Date().getTime())
    }, 1000)
  })
}

// 后台接口
function getUser_Node (loginData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!loginData || !loginData.time) {
        resolve({
          code: 416,
        })
      }
      if (new Date().getTime() - loginData.time > 60 * 1000) {
        resolve({
          code: 416,
        })
      } else {
        resolve({
          code: 200,
          data: {
            name: 'didi'
          }
        })
      }

    }, 1000)
  })
}

function getUser () {
  return new Promise((resolve, reject) => {
    ajax({
      url: getUser_Node
    }).then((data) => {
      resolve(data)
    })
  })
}

login()

document.getElementById('getUser').onclick = function () {
  getUser().then((data) => {
    console.log(data)

  })
}


