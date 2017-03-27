
// //webpack编译打包会在debugger停住
// //debugger;
// module.exports = "ninghao.net";

// let name = 'ninghao.net';
//
// export default name;

'use strict';

import React from "react";

class Name extends React.Component {
  render() {
    return (
      <div>
        hello ~ React <input />
      </div>
    );
  }
}

export { Name as default} ;
