const handleBlogRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = req.split('?')[0]

  if (method === 'GET' && path === '/api/blog/list') {
    return {
      msg: '/api/blog/list'
    }
  }

  if (method === 'GET' && path === '/api/blog/detail') {
    return {
      msg: '/api/blog/detail'
    }
  }

  if (method === 'POST' && path === '/api/blog/new') {
    return {
      msg: '/api/blog/new'
    }
  }

  if (method === 'POST' && path === '/api/blog/update') {
    return {
      msg: '/api/blog/new'
    }
  }

  if (method === 'POST' && path === '/api/blog/delete') {
    return {
      msg: '/api/blog/new'
    }
  }

}
