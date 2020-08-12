function add(x: number, y: number): number {
  console.log(x)
  return x + y
}

const myAdd: (x: number, y: number) => number = add

myAdd(1, 0)
