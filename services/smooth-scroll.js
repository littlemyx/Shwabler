// easing functions http://goo.gl/5HLl8
// easing functions https://gist.github.com/gre/1650294

const easeInOutQuad = (t, b, c, d) => {
  let local_t = t
  local_t /= d / 2
  if (local_t < 1) {
    return (c / 2) * local_t * local_t + b
  }
  local_t -= 1
  return (-c / 2) * (local_t * (local_t - 2) - 1) + b
}

let node
let stopScrollingResolve

const requestAnimFrame = (() =>
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  (callback => {
    window.setTimeout(callback, 1000 / 60)
  }))()

const position = () => node.scrollTop

const move = amount => {
  node.scrollTop = amount
}

const animateScroll = (currentTime, start, change, duration) => {
  const nextTime = currentTime + 20
  const value = easeInOutQuad(nextTime, start, change, duration)

  if (nextTime <= duration) {
    move(value)
    requestAnimFrame(() => {
      animateScroll(nextTime, start, change, duration)
    })
  } else {
    console.log("end of scrolling")
    stopScrollingResolve()
  }
}

const scrollTo = (
  to,
  {
    element = document.documentElement ||
      document.body.parentNode ||
      document.body,
    duration = 500
  }
) => {
  node = element
  const start = position()
  const change = to - start
  const currentTime = 0

  if (change) {
    return new Promise(resolve => {
      stopScrollingResolve = resolve
      animateScroll(currentTime, start, change, duration)
    })
  }
  return new Promise(resolve => resolve())
}

export default scrollTo
