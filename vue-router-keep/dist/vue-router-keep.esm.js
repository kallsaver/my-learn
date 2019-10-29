/*!
 * vue-router-keep.js v0.0.1
 * (c) 2019-2019 kallsave
 * Released under the MIT License.
 */
const inBrowser = typeof window !== 'undefined';

class Stack {
  constructor(maxLength = Infinity) {
    this.maxLength = maxLength;
    this.init();
  }
  init() {
    this.list = [];
  }
  _add(item) {
    const index = this.list.indexOf(item);
    if (index !== -1) {
      this.list.splice(index, 1);
    }
    this.list.unshift(item);
    if (this.list.length > this.maxLength) {
      this.list.pop();
    }
  }
  add() {
    for (let i = 0; i < arguments.length; i++) {
      const item = arguments[i];
      this._add(item);
    }
  }
  reduce() {
    if (!this.list.length) {
      return false
    }
    return this.list.shift()
  }
  replace(item) {
    const result = this.reduce();
    if (!result) {
      return false
    }
    this._add(item);
  }
  removeFrom(item) {
    const index = this.list.indexOf(item);
    if (index !== -1) {
      return this.list.splice(index)
    }
    return false
  }
  remove(item) {
    const index = this.list.indexOf(item);
    if (index === -1) {
      return false
    }
    return this.list.splice(index, 1)
  }
  removeByIndex(index) {
    if (this.list[index]) {
      return this.list.splice(index, 1)
    }
  }
  clearAll() {
    return this.list.splice(0)
  }
  clearExclude() {
    for (let i = 0; i < this.list.length; i++) {
      const item = this.list[i];
      if (Array.prototype.indexOf.call(arguments, item) === -1) {
        this.list.splice(i, 1);
        i--;
      }
    }
  }
  backTo(item) {
    const index = this.list.indexOf(item);
    if (index === -1) {
      return false
    }
    return this.list.splice(0, index)
  }
  backToByIndex(index) {
    if (index > this.list.length - 1) {
      return this.list.splice(0)
    }
    return this.list.splice(0, index)
  }
  getHeader() {
    return this.list[0]
  }
  getByIndex(index) {
    return this.list[index]
  }
  getFooter() {
    return this.list[this.list.length - 1]
  }
  getSize() {
    return this.list.length
  }
  getStore() {
    return this.list
  }
  has(item) {
    return this.list.indexOf(item) !== -1
  }
}

const historyStack = new Stack();

class Events {
  constructor() {
    this.map = {};
  }
  on(name, fn) {
    if (this.map[name]) {
      this.map[name].push(fn);
      return
    }
    this.map[name] = [fn];
  }
  emit(name, ...args) {
    if (this.map[name]) {
      this.map[name].forEach((fn) => {
        fn(...args);
      });
    }
  }
}

const EVENT_HISTORY_ACTION_BACK = 'back';
const EVENT_HISTORY_ACTION_GO = 'go';

const historyStateEvent = new Events();

window.addEventListener('hashchange', () => {
  if (historyStack.getByIndex(1) === window.location.href) {
    historyStateEvent.emit(EVENT_HISTORY_ACTION_BACK);
  } else {
    historyStateEvent.emit(EVENT_HISTORY_ACTION_GO);
  }
});

const store = [];

const routerKeepHelper = {
  add(item) {
  },
  remove(item) {
  },
  clearAll(item) {
    for (let i = 0; i < store.length; i++) {
      const storeItem = store[i];
      const stack = storeItem.stack;
      const cache = storeItem.cache;
      for (const key in storeItem.cache) {
        delete cache[key];
      }
      stack.clearAll();
    }
  }
};

function isDef(v) {
  return v !== undefined && v !== null
}

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory
}

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

const COMPONENT_NAME = 'router-keep';

var Component = {
  name: COMPONENT_NAME,
  abstract: true,
  props: {
    max: {
      type: Number,
      default: 10,
      validator(num) {
        return (num | 0) === num
      }
    }
  },
  created() {
    this.cache = Object.create(null);
    this.stack = new Stack(this.max);
    store.push({
      cache: this.cache,
      stack: this.stack
    });
  },
  render(h) {
    const slot = this.$slots.default;
    const vnode = getFirstComponentChild(slot);
    if (vnode) {
      const key = window.location.href;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
        this.stack.add(key);
      } else {
        if (this.max > this.stack.getSize()) {
          this.cache[key] = vnode;
          this.stack.add(key);
        }
      }
      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  },
  mounted() {
    this.historyStateBackHandler();
  },
  methods: {
    historyStateBackHandler() {
      historyStateEvent.on(EVENT_HISTORY_ACTION_BACK, () => {
        historyStack.reduce();
        this.remove(this.stack.getByIndex(0));
      });
    },
    remove(key) {
      const cached = this.cache[key];
      if (cached) {
        cached.componentInstance.$destroy();
        this.cache[key] = null;
        this.stack.remove(key);
      }
    }
  },
  beforeDestroy() {
    let index = -1;
    for (let i = 0; i < store.length; i++) {
      const item = store[i];
      if (item.cache === this.cache) {
        index = i;
        break
      }
    }
    if (index !== -1) {
      store.splice(index, 1);
    }
    this.cache = null;
    this.stack = null;
  },
};

let isBack = false;

historyStateEvent.on('back', () => {
  isBack = true;
});

const routerMiddle = (Vue, options) => {
  const router = options.router;
  const actionKey = options.actionKey || 'actions';

  Vue.util.defineReactive(router.history, 'current', router.history.current, () => {
    Vue.nextTick(() => {
      historyStack.add(window.location.href);
    });
  });

  router.beforeEach((to, from, next) => {
    // let hashchange before next
    window.setTimeout(() => {
      if (isBack) {
        to.params[actionKey] = EVENT_HISTORY_ACTION_BACK;
      } else {
        to.params[actionKey] = EVENT_HISTORY_ACTION_GO;
      }
      isBack = false;
      next();
    }, 0);
  });
};

let isInstalled = false;

function install(Vue, options) {
  if (isInstalled) {
    return
  }
  isInstalled = true;
  Vue.component(Component.name, Component);
  Vue.prototype.$routerKeepHelper = routerKeepHelper;
  routerMiddle(Vue, options);
}

const RouterKeep = {
  install: install,
};

if (inBrowser && window.Vue) {
  window.Vue.use(RouterKeep);
}

export default RouterKeep;
