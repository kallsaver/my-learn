import { add } from '../src/math'

test('add(2, 3)', () => {
  expect(add(2, 3)).toBe(5)
})

// not
test('not', () => {
  const flag = false
  expect(flag).not.toBe(true)
})

// Number相关的匹配器

// toBeGreaterThan
test('toBeGreaterThan', () => {
  const count = 10
  expect(count).toBeGreaterThan(9)
})

// toBeGreaterThanOrEqual
test('toBeGreaterThanOrEqual', () => {
  const count = 10
  expect(count).toBeGreaterThanOrEqual(10)
})

// toBeLessThan
test('toBeLessThan', () => {
  const count = 10
  expect(count).toBeLessThan(11)
})

// toBeCloseTo
test('toBeCloseTo', () => {
  const first = 0.1
  const second = 0.2
  expect(first + second).toBeCloseTo(0.3)
})

// String相关的匹配器

// toMatch
test('toMatch', () => {
  const str = 'http://www.baidu.com'
  expect(str).toMatch(/baidu/)
})

// Array相关的匹配器
test('toContain', () => {
  const arr = [0, 1]
  expect(arr).toContain(0)
})

// 异常情况的匹配器
test('toThrow', () => {
  const throwError = () => {
    throw new Error('this is a error')
  }
  expect(throwError).toThrow()
})
