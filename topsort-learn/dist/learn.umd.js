(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.learn = factory());
}(this, (function () { 'use strict';

  /**
   * Topological sorting function
   *
   * @param {Array} edges
   * @returns {Array}
   */

  var toposort_1 = function(edges) {
    return toposort(uniqueNodes(edges), edges)
  };

  var array = toposort;

  function toposort(nodes, edges) {
    var cursor = nodes.length
      , sorted = new Array(cursor)
      , visited = {}
      , i = cursor
      // Better data structures make algorithm much faster.
      , outgoingEdges = makeOutgoingEdges(edges)
      , nodesHash = makeNodesHash(nodes);

    // check for unknown nodes
    edges.forEach(function(edge) {
      if (!nodesHash.has(edge[0]) || !nodesHash.has(edge[1])) {
        throw new Error('Unknown node. There is an unknown node in the supplied edges.')
      }
    });

    while (i--) {
      if (!visited[i]) { visit(nodes[i], i, new Set()); }
    }

    return sorted

    function visit(node, i, predecessors) {
      if(predecessors.has(node)) {
        var nodeRep;
        try {
          nodeRep = ", node was:" + JSON.stringify(node);
        } catch(e) {
          nodeRep = "";
        }
        throw new Error('Cyclic dependency' + nodeRep)
      }

      if (!nodesHash.has(node)) {
        throw new Error('Found unknown node. Make sure to provided all involved nodes. Unknown node: '+JSON.stringify(node))
      }

      if (visited[i]) { return; }
      visited[i] = true;

      var outgoing = outgoingEdges.get(node) || new Set();
      outgoing = Array.from(outgoing);

      if (i = outgoing.length) {
        predecessors.add(node);
        do {
          var child = outgoing[--i];
          visit(child, nodesHash.get(child), predecessors);
        } while (i)
        predecessors.delete(node);
      }

      sorted[--cursor] = node;
    }
  }

  function uniqueNodes(arr){
    var res = new Set();
    for (var i = 0, len = arr.length; i < len; i++) {
      var edge = arr[i];
      res.add(edge[0]);
      res.add(edge[1]);
    }
    return Array.from(res)
  }

  function makeOutgoingEdges(arr){
    var edges = new Map();
    for (var i = 0, len = arr.length; i < len; i++) {
      var edge = arr[i];
      if (!edges.has(edge[0])) { edges.set(edge[0], new Set()); }
      if (!edges.has(edge[1])) { edges.set(edge[1], new Set()); }
      edges.get(edge[0]).add(edge[1]);
    }
    return edges
  }

  function makeNodesHash(arr){
    var res = new Map();
    for (var i = 0, len = arr.length; i < len; i++) {
      res.set(arr[i], i);
    }
    return res
  }
  toposort_1.array = array;

  // [parentNode, node]的关系,最终通常还要转成依赖(reverse)关系[node, parentNode]
  var graph = [
    ['webpack', 'webpack-dev-server'],
    ['css-loader', 'style-loader'],
    ['less-loader', 'css-loader'],
    ['less-loader', 'postcss-loader'],
    ['postcss-loader', 'css-loader'],
    ['webpack-dev-server', 'css-loader'],
    ['babel-loader', 'babel-plugin']
  ];

  // 第一个参数要把需要排序的数组的元素都写进去
  // 如果和第二个参数里面的二维数组的元素和第一个参数对不上就会报错
  var result1 = toposort_1.array([
    'node',
    'webpack',
    'webpack-dev-server',
    'css-loader',
    'style-loader',
    'less-loader',
    'postcss-loader',
    'babel-loader',
    'babel-plugin'
  ], graph);

  var result2 = toposort_1(graph);

  console.log(result1);

  console.log(result2);

  var src = {

  };

  return src;

})));
