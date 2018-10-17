const treeify = require('treeify')

module.exports = {
  tree: function (o) {
    if (typeof o !== 'object') {
      console.log(o)
    } else {
      console.log(
        treeify.asTree(o, true)
      )
    }
  }
}
