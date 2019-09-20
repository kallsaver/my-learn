const handleBlogRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]

  // api接口

  if (method === 'GET') {
    if (path === '/api/blog/list') {
      return {
        msg: '/api/blog/list'
      }
    } else if (path === '/api/blog/detail') {
      return {
        msg: '/api/blog/detail'
      }
    }
  } else if (method === 'POST') {
    if (path === '/api/blog/new') {
      return {
        msg: '/api/blog/new'
      }
    } else if (path === '/api/blog/update') {
      return {
        msg: '/api/blog/new'
      }
    } else if (path === '/api/blog/delete') {
      return {
        msg: '/api/blog/new'
      }
    }
  }
  return null
}

module.exports = handleBlogRouter
