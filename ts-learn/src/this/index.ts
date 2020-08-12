interface Picker {
  time: number
  getTime: () => number
}

const picker: Picker = {
  time: 1,
  getTime(this: Picker): number {
    return this.time
  }
}

const date: Date = new Date()
console.log(picker.getTime())
