export function coreMixin(BScroll) {
  BScroll.prototype._start = function (e) {
    this.distY = 0
    let point = e.touches[0]
  }
  BScroll.prototype._move = function (e) {

  }
}
