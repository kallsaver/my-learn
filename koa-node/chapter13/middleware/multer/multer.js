const multer = require('multer')

module.exports = (app) => {
  app.use(multer({ dest: '/uploads/images' }).array('image'))
}


