interface Animal {
  readonly name: string
  eat(food: string): void
  sleep(hours: number): void
}

interface Bird {
  fly(hours: number): void
}

class Duck implements Animal, Bird {
  readonly name: string
  eat(food: string) {
    console.log(food)
  }

  sleep(hours: number) {
    console.log(hours)
  }

  fly(hours: number) {
    console.log(hours)
  }
}
