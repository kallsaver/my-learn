Component({
  properties: {
    data: {
      type: String,
      value: []
    }
  },
  attached() {
    this.getComponents()
  },
  methods: {
    getComponents() {
      this.popup = this.selectComponent('#popup')
    },
    show() {
      this.popup.show()
    },
    hide() {
      this.popup.hide()
    },
    btnTapHandler() {
      this.hide()
      this.triggerEvent(EVENT_BTN_TAP)
    }
  },
})
