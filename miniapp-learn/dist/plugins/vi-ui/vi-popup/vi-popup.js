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
      this.animate('.vi-popup-mask-gray', [
        {
          opacity: 0
        },
        {
          opacity: 1
        },
      ], this.properties.duration)
    },
    hide() {
      this.clearAnimation('.vi-popup-mask-gray')
      this.animate('.vi-popup-mask-gray', [
        {
          opacity: 1
        },
        {
          opacity: 0
        },
      ], this.properties.duration, () => {
        this.setData({
          isVisible: false
        })
      })
    },
    preventTouchMove(e) {
    },
    maskTap() {
      this.triggerEvent(EVENT_MASK_TAP)
    }
  },
})
