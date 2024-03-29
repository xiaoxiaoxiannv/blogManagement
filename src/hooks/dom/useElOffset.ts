export function getBoundingClientRect(element: Element): DOMRect | undefined {
  if (!element || !element.getBoundingClientRect) {
    return undefined
  }
  return element.getBoundingClientRect()
}

export function getEloffset(element: Element) {
  const doc = document.documentElement

  const docScrollLeft = doc.scrollLeft
  const docScrollTop = doc.scrollTop
  const docClientLeft = doc.clientLeft
  const docClientTop = doc.clientTop
  const clientWidth = doc.clientWidth
  const clientHeight = doc.clientHeight

  const pageXOffset = window.pageXOffset
  const pageYOffset = window.pageYOffset

  const box = getBoundingClientRect(element)

  const { left: retLeft, top: rectTop, width: rectWidth, height: rectHeight } = box as DOMRect

  const scrollLeft = (pageXOffset || docScrollLeft) - (docClientLeft || 0)
  const scrollTop = (pageYOffset || docScrollTop) - (docClientTop || 0)
  const offsetLeft = retLeft + (pageXOffset || docScrollLeft)
  const offsetTop = rectTop + (pageYOffset || docScrollTop)

  const left = offsetLeft - scrollLeft
  const top = offsetTop - scrollTop

  return {
    left: left,
    top: top,
    right: clientWidth - rectWidth - left,
    bottom: clientHeight - rectHeight - top,
    rightToVisibleWindow: clientWidth - left,
    bottomToVisibleWindow: clientHeight - top
  }
}
