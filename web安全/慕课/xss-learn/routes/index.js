var express = require('express');
var router = express.Router();

var comments = {};

function html_encode(str) {
  if (!str) {
    return ''
  }
  let s = ''
  s = str.replace(/&/g, '$gt;');
  s = s.replace(/</g, '&lt;')

}

/* GET home page. */
router.get('/', function(req, res, next) {
  // express自带屏蔽了xss攻击,现在开放出来
  res.set('X-XSS-Protection', 0)
  res.render('index', { title: 'Express', xss: req.query.xss });
});

router.get('/getComment', function (req, res, next) {
  res.json({
    code: 1,
    data: {
      comment: comments.v
    }
  })
});

router.post('/postComment', function (req, res, next) {
  let resData = {}
  let data = ''
  req.on('data', function (chunk) {
    // Buffer数据格式
    data += chunk.toString()
  });
  req.on('end', function () {
    // 去掉空格符,转义符等等
    console.log('data', data)
    let postData = JSON.parse(data)
    resData.comments = postData
    res.json(resData)
  })
});

module.exports = router;
