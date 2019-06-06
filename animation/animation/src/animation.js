'use strict'

// 支持图片预加载
// 支持两种动画播放方式,及自定义每帧动画
// 支持单组动画控制循环次数(可支持无限次)
// 支持一组动画完成,进行下一组动画
// 支持每一组动画完成后有等待时间
// 支持动画暂停和播放
// 支持动画完成后执行回调函数

const STATE_INITIAL = 0
const STATE_START = 1
const STATE_STOP = 2

class Animation {
  constructor() {
    this.taskQueue = []
    this.index = 0
    this.state = STATE_INITIAL

  }
  /**
   * @description 添加一个异步定时任务,通过定时改变图片背景位置,实现帧动画
   * @param {*} ele
   * @param {*} position
   * @param {*} imageUrl
   */

  /**
   * @description
   * @param {*} ele
   * @param {*} position
   * @param {*} imageUrl
   */
  changePosition(ele, position, imageUrl) {

  }
  /**
   * @description 添加一个异步定时任务,通过定时改变image标签的src属性,实现帧动画
   * @param ele
   * @param imgList
   */
  changeSrc(ele, imgList) {

  }
  /**
   * @description 高级用法,添加一个异步定时执行任务,自定义动画每帧执行的任务函数
   * @param taskFn
   */
  enterFrame(taskFn) {

  }
  /**
   * @description 添加一个同步任务,可以在上一个任务完成后执行回调函数
   */
  then() {

  }
  /**
   * @description 开始执行任务,异步定义任务的间隔
   * @param interval
   */
  start(interval) {

  }
  // 实现重复上一个任务的效果,可定义重复次数
  repeat(times) {

  }
  // 相当于repeat无限次
  repeatForever() {

  }
  // 设置当前任务执行结束后到下一个任务开始前的等待时间
  wait(time) {

  }
  // 暂停当前的异步定时任务
  pause() {

  }
  // 重新执行上一次暂停的异步任务
  restart() {

  }
  // 释放资源
  dispose() {

  }
}
