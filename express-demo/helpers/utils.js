const treeify = require('treeify')

module.exports = {
  tree: function (value) {
    if (!value || typeof value !== 'object') {
      console.log(value)
    } else {
      console.log(
        treeify.asTree(value, true)
      )
    }
  }
}
