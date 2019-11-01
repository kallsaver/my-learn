/*!
 * vue-router-keep.js v0.0.1
 * (c) 2019-2019 kallsave
 * Released under the MIT License.
 */
const config = {
  max: Infinity,
  actionKey: 'action',
};

class Stack {
  constructor(max = Infinity) {
    this.max = max;
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
    if (this.list.length > this.max) {
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
  removeAll() {
    return this.list.splice(0)
  }
  removeExclude() {
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
  getMax() {
    return this.max
  }
  has(item) {
    return this.list.indexOf(item) !== -1
  }
  updateSize(max) {
    this.max = max;
  }
  checkFull() {
    return this.max === this.list.length
  }
}

function checkInt(n) {
  if (n === Infinity) {
    return true
  }
  return typeof n === 'number' && n > 0 && (n | 0) === n
}

function defineReactive(data, key, val, fn) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      return val
    },
    set: function (newVal) {
      if (newVal === val) {
        return
      }
      val = newVal;
      typeof fn === 'function' && fn(newVal);
    }
  });
}

const globalStack = new Stack(config.max);

const globalCache = [];

defineReactive(config, 'max', config.max, (newVal) => {
  globalStack.updateSize(newVal);
});

const routerKeepHelper = {
  remove(key) {
    for (let i = 0; i < globalCache.length; i++) {
      const globalCacheItem = globalCache[i];
      const stack = globalCacheItem.stack;
      const cache = globalCacheItem.cache;
      if (cache[key]) {
        cache[key].componentInstance.$destroy();
        cache[key] = null;
        globalStack.remove(key);
      }
    }
  },
  removeAll() {
    for (let i = 0; i < globalCache.length; i++) {
      const globalCacheItem = globalCache[i];
      const stack = globalCacheItem.stack;
      const cache = globalCacheItem.cache;
      for (const key in cache) {
        cache[key].componentInstance.$destroy();
        cache[key] = null;
      }
    }
    globalStack.removeAll();
  },
  getStore() {
    return {
      cache: globalCache,
      stack: globalStack.getStore()
    }
  }
};

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

const historyStack = new Stack();

const EVENT_HISTORY_ACTION_BACK = 'back';
const EVENT_HISTORY_ACTION_FORWARD = 'forward';

const historyStateEvent = new Events();

window.addEventListener('hashchange', () => {
  if (historyStack.getByIndex(1) === window.location.href) {
    historyStateEvent.emit(EVENT_HISTORY_ACTION_BACK);
  } else {
    historyStateEvent.emit(EVENT_HISTORY_ACTION_FORWARD);
  }
});

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
  created() {
    this.cache = Object.create(null);
    globalCache.push({
      cache: this.cache,
    });
  },
  render(h) {
    const slot = this.$slots.default;
    const vnode = getFirstComponentChild(slot);
    if (vnode) {
      const key = this.$route.name;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        if (!globalStack.checkFull()) {
          this.cache[key] = vnode;
        } else {
          const lastKey = globalStack.getFooter();
          routerKeepHelper.remove(lastKey);
          this.cache[key] = vnode;
        }
      }
      globalStack.add(key);
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
        this.remove(globalStack.getByIndex(0));
      });
    },
    remove(key) {
      this.removeCacheItem(key);
      this.removeStackItem(key);
    },
    removeCacheItem(key) {
      if (this.cache[key]) {
        this.cache[key].componentInstance.$destroy();
        this.cache[key] = null;
      }
    },
    removeStackItem(key) {
      globalStack.remove(key);
    }
  },
  beforeDestroy() {
    for (const key in this.cache) {
      this.remove(key);
    }
    let index;
    for (let i = 0; i < globalCache.length; i++) {
      if (this.cache === globalCache[i]) {
        index = i;
        break
      }
    }
    globalCache.splice(index, 1);
  },
};

let isBack = false;

historyStateEvent.on(EVENT_HISTORY_ACTION_BACK, () => {
  historyStack.reduce();
  isBack = true;
});

const routerMiddle = (Vue, config) => {
  const router = config.router;
  const actionKey = config.actionKey;

  const originPush = router.push.bind(router);

  router.push = (location, onComplete, onAbort) => {
    console.log(location);
    console.log(onComplete);
    console.log(onAbort);
    originPush(location, onComplete, onAbort);
  };

  router.beforeEach((to, from, next) => {
    // let hashchange I/0 event trigger callback before next trigger to get right isBack
    window.setTimeout(() => {
      if (isBack) {
        to.params[actionKey] = EVENT_HISTORY_ACTION_BACK;
      } else {
        to.params[actionKey] = EVENT_HISTORY_ACTION_FORWARD;
      }
      isBack = false;
      next();
    }, 0);
  });

  defineReactive(router.history, 'current', router.history.current, () => {
    Vue.nextTick(() => {
      historyStack.add(window.location.href);
    });
  });
};

let isInstalled = false;

function install(Vue, options = {}) {
  if (!options.router) {
    console.error(`parameter %crouter`, 'color: orange', 'is required');
    return
  }
  if (options.max && !checkInt(options.max)) {
    console.error(`parameter %cmax`, 'color: orange', 'must be an integer');
    return
  }
  if (isInstalled) {
    return
  }
  isInstalled = true;
  Object.assign(config, options);
  Vue.prototype.$routerKeepHelper = routerKeepHelper;
  Vue.component(Component.name, Component);
  routerMiddle(Vue, config);
}

const VueRouterKeep = {
  install: install,
};

export default VueRouterKeep;
