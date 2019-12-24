import a from './a.js'

export default {
  mixins: [
    a
  ],
  data: {
    date: '20'
  },
  onShow() {
    console.log('--------------show--------------')
  },
  a: 0,
  b() {
    console.log('mixins b')
  }
}
