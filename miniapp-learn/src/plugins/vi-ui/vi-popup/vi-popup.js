const EVENT_MASK_TAP = 'maskTap'

Component({
  options: {
    multipleSlots: true
  },
  behaviors: [],
  properties: {
    duration: {
      type: Number,
      value: 400
    }
  },
  data: {
    isVisible: false,
  },
  attached() {
  },
  methods: {
    show() {
      this.setData({
        isVisible: true
      })
    },
    hide() {
      this.setData({
        isVisible: false
      })
    },
    preventTouchMove(e) {
    },
    maskTap() {
      this.triggerEvent(EVENT_MASK_TAP)
    }
  },
})
