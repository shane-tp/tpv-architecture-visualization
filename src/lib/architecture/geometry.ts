import type { ArchNode, Anchors } from '../../types/architecture'

export function getAnchors(from: ArchNode, to: ArchNode): Anchors {
  const fx = from.x + from.w / 2
  const fy = from.y + from.h / 2
  const tx = to.x + to.w / 2
  const ty = to.y + to.h / 2

  const dx = tx - fx
  const dy = ty - fy

  let startX: number, startY: number, endX: number, endY: number

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) {
      startX = from.x + from.w; startY = fy; endX = to.x; endY = ty
    } else {
      startX = from.x; startY = fy; endX = to.x + to.w; endY = ty
    }
  } else {
    if (dy > 0) {
      startX = fx; startY = from.y + from.h; endX = tx; endY = to.y
    } else {
      startX = fx; startY = from.y; endX = tx; endY = to.y + to.h
    }
  }

  return { startX, startY, endX, endY }
}

export function buildPath(
  from: ArchNode,
  to: ArchNode,
  anchors: Anchors,
): string {
  const { startX, startY, endX, endY } = anchors
  const dx = Math.abs(startX - endX)
  const dy = Math.abs(startY - endY)

  // Straight segments read better for short hops (boot strip, adjacent FSM nodes).
  const anchorDy = Math.abs(startY - endY)
  const anchorDx = Math.abs(startX - endX)
  if (anchorDy < 0.75 && anchorDx > 8) {
    return `M ${startX} ${startY} L ${endX} ${endY}`
  }
  if (anchorDx < 0.75 && anchorDy > 8) {
    return `M ${startX} ${startY} L ${endX} ${endY}`
  }

  const isHorizontal = startY === from.y + from.h / 2 && endY === to.y + to.h / 2
  const isVertical = startX === from.x + from.w / 2 && endX === to.x + to.w / 2

  if (isHorizontal && dy < from.h) {
    const cpOffset = Math.max(dx * 0.2, 20)
    const dir = endX > startX ? 1 : -1
    return `M ${startX} ${startY} C ${startX + cpOffset * dir} ${startY}, ${endX - cpOffset * dir} ${endY}, ${endX} ${endY}`
  }

  if (isVertical && dx < from.w) {
    const cpOffset = Math.max(dy * 0.3, 20)
    const dir = endY > startY ? 1 : -1
    return `M ${startX} ${startY} C ${startX} ${startY + cpOffset * dir}, ${endX} ${endY - cpOffset * dir}, ${endX} ${endY}`
  }

  const offset = Math.min(Math.max(dx / 2.5, dy / 2.5, 40), 160)

  let cp1x = startX
  let cp1y = startY
  let cp2x = endX
  let cp2y = endY

  if (startX === from.x || startX === from.x + from.w) {
    cp1x += startX === from.x ? -offset : offset
  } else {
    cp1y += startY === from.y ? -offset : offset
  }

  if (endX === to.x || endX === to.x + to.w) {
    cp2x += endX === to.x ? -offset : offset
  } else {
    cp2y += endY === to.y ? -offset : offset
  }

  return `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`
}
