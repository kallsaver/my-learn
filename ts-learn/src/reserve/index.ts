// interface Reserve {
//   (from: Date, to: Date, dest: number): number
// }

// 应该减少使用重载

// 或者
type Reserve = {
  (from: Date, to: Date, dest: number): number
  (from: Date, dest: number): number
}

// 实现resver时做兼容
const reserve: Reserve = (from: Date, toOrDest: Date | number, dest?: number):number => {
  if (toOrDest instanceof Date && typeof dest === 'number') {
    return toOrDest.getTime() - from.getTime() + dest
  } else {
    return from.getTime() + dest
  }
}
