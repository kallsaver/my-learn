export default {
  props: {
    context: {
      type: String,
      require: true
    },
  },
  render(createElement) {
    // return createElement(
    //   'div',
    //   {},
    //   [
    //     createElement(
    //       'div',
    //       {},
    //       '123'
    //     ),
    //     createElement(
    //       'div',
    //       {},
    //       '456'
    //     ),
    //   ]
    // )
    return this._createDom(createElement)
  },
  mounted() {
    console.log(99)
  },
  methods: {
    _createDom(createElement) {
      this.dom = document.createElement('div')
      this.dom.innerHTML = this.context
      let tree = this._domToJson(this.dom)
      return this._appendTree(createElement, tree)
    },
    _domToJson(dom) {
      if (dom.children.length === 0) {
        return {
          node: dom,
          children: []
        }
      } else {
        let json = {
          node: dom,
          children: []
        }
        for (let i = 0; i < dom.children.length; i++) {
          json.children.push(this._domToJson(dom.children[i]))
        }
        return json
      }
    },
    _appendTree(createElement, tree) {
      console.log(tree.node.nodeName)
      console.log(tree.node.getAttribute('id'))
      if (tree.children && tree.children.length === 0) {
        return createElement(
          tree.node.nodeName.toLowerCase(),
          {},
          '123'
        )
      } else {
        return createElement(
          tree.node.nodeName.toLowerCase(),
          {},
          [
            ...tree.children.map((item) => {
              return createElement(
                item.node.nodeName.toLowerCase(),
                {},
                [
                  this._appendTree(createElement, item)
                ]
              )
            })
          ]
        )
      }
    }
  }
}
