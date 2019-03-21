import Vue from 'vue'
import List from '@/pages/list/list.vue'

describe('list.vue', () => {
  it('页面是否有python这个单词', () => {
    const Constructor = Vue.extend(List)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.contain('python')
  })

  it('页面是否有哈哈哈这个单词', () => {
    const Constructor = Vue.extend(List)
    const vm = new Constructor().$mount()
    let str = '哈哈哈'
    vm.query = str
    vm.$nextTick(() => {
      window.setTimeout(() => {
        expect(vm.$el.textContent).to.contain(str)
      }, 200)
    })
  })

  it('点击事件是否生效', () => {
    const Constructor = Vue.extend(List)
    const vm = new Constructor().$mount()
    vm._watcher.run()
    const button = vm.$el.getElementsByClassName('btn')[0]
    const clickEvent = new window.Event('click')
    button.dispatchEvent(clickEvent)
    expect(vm.list).to.contain('flutter')
  })
})
