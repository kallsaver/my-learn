const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '标题1',
      content: '内容1',
      author: 'a',
      createTime: 1570114331511
    },
    {
      id: 2,
      title: '标题2',
      content: '内容2',
      author: 'a',
      createTime: 1570114331511
    },
  ]
}

const getDetail = (id) => {
  return {
    id: 1,
    title: '标题1',
    content: '内容1',
    author: 'a',
    createTime: 1570114331511
  }
}

const newBlog = (blogData = {}) => {
  return {
    id: 3
  }
}

const updateBolg = (id, blogData = {}) => {
  return true
}

const deleteBolg = (id) => {
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBolg,
  deleteBolg,
}
