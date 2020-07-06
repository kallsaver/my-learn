// const multer = require('multer')

// module.exports = (ctx, next) => {
//   return multer({
//     dest: '/uploads/images'
//   }).array('image')
// }

const multer = require('koa-multer')

module.exports = () => {
  multer({
    dest: '/uploads/images'
  }) //.array('image')
}


