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
