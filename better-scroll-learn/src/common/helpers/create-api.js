// cube-ui的createAPI方法提取

let camelizeRE = /-(\w)/g;

function camelize(str) {
  str = String(str);
  return str.replace(camelizeRE, function (m, c) {
    return c ? c.toUpperCase() : '';
  });
}

function instantiateComponent(Vue, Component, data, renderFn) {
  let renderData;
  let childrenRenderFn;
  let instance = new Vue({
    render(createElement) {
      let children = childrenRenderFn && childrenRenderFn(createElement);
      if (children && !Array.isArray(children)) {
        children = [children];
      }
      return createElement(Component, renderData, children || []);
    },
    methods: {
      init: function () {
        document.body.appendChild(this.$el);
      },
      destroy: function () {
        this.$destroy();
        document.body.removeChild(this.$el);
      }
    }
  });
  instance.updateRenderData = function (data, render) {
    renderData = data;
    childrenRenderFn = render;
  };
  instance.updateRenderData(data, renderFn);
  instance.$mount();
  instance.init();
  let component = instance.$children[0];
  return component;
}

// parse-render-data.js
function parseRenderData(data, events) {
  data = data || {};
  events = events || {};
  events = parseEvents(events);
  let props = data;
  let on = {};
  for (let name in events) {
    if (events.hasOwnProperty(name)) {
      let handlerName = events[name];
      if (props[handlerName]) {
        on[name] = props[handlerName];
        delete props[handlerName];
      }
    }
  }
  return {
    props,
    on
  };
}

function parseEvents(events) {
  let parsedEvents = {};
  events.forEach(function (name) {
    parsedEvents[name] = camelize(`on-${name}`);
  });
  return parsedEvents;
}

function createAPIComponent(Vue, Component, events = [], single = false) {
  let singleComponent;
  let singleInstance;
  let beforeFns = [];
  let api = {
    before(fn) {
      beforeFns.push(fn);
    },
    open(data, renderFn, instanceSingle) {
      if (typeof renderFn !== 'function') {
        instanceSingle = renderFn;
        renderFn = null;
      }
      beforeFns.forEach(function (before) {
        before(data, renderFn, instanceSingle);
      });
      if (instanceSingle === undefined) {
        instanceSingle = single;
      }
      if (instanceSingle && singleComponent) {
        singleInstance.updateRenderData(data, renderFn);
        singleInstance.$forceUpdate();
        // singleComponent.show && singleComponent.show()
        return singleComponent;
      }
      let component = instantiateComponent(Vue, Component, data, renderFn);
      let instance = component.$parent;
      let originRemove = component.remove;

      component.remove = function () {
        if (instance.__cube__destroyed) {
          return;
        }
        originRemove && originRemove.call(this);
        instance.destroy();
        instance.__cube__destroyed = true;
        if (instanceSingle) {
          singleComponent = null;
          singleInstance = null;
        }
      };
      let originShow = component.show;
      component.show = function () {
        originShow && originShow.call(this);
        return this;
      };
      let originHide = component.hide;
      component.hide = function () {
        originHide && originHide.call(this);
        return this;
      };
      if (instanceSingle) {
        singleComponent = component;
        singleInstance = instance;
      }
      // component.show && component.show()
      return component;
    },
    create(config, renderFn, single) {
      let ownerInstance = this;
      let component = api.open(parseRenderData(config, events), renderFn, single);
      if (component.__cube__parent !== ownerInstance) {
        component.__cube__parent = ownerInstance;
        let beforeDestroy = function () {
          if (component.__cube__parent === ownerInstance) {
            component.remove();
          }
          ownerInstance.$off('hook:beforeDestroy', beforeDestroy);
          component.__cube__parent = null;
        };
        ownerInstance.$on('hook:beforeDestroy', beforeDestroy);
      }
      return component;
    }
  };
  return api;
}

function createAPI(Vue, Component, events, single) {
  let api = createAPIComponent.apply(this, arguments);
  let name = Component.name;
  let pureName = name.replace(/^cube-/i, '');
  let createName = `$${camelize(`create-${pureName}`)}`;
  Vue.prototype[createName] = api.create;
  return api;
}

export {
  createAPI
};
