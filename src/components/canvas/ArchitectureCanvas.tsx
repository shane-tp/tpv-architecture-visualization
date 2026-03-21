import { useRef, useCallback } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { CanvasBackground } from './CanvasBackground'
import { ZoomToolbar } from './ZoomToolbar'
import { ArchitectureEdges } from './ArchitectureEdges'
import { ArchitectureGroups } from './ArchitectureGroups'
import { ArchitectureNodes } from './ArchitectureNodes'
import { selectedNodeAtom } from '../../atoms/selection'
import { focusGroupAtom } from '../../atoms/navigation'
import { canvasTransformAtom, isDraggingAtom, INITIAL_TRANSFORM } from '../../atoms/canvas'
import { draggingNodeAtom, draggingGroupAtom, resetNodePositionsAtom } from '../../atoms/nodePositions'

const PAN_THRESHOLD = 4

export function ArchitectureCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isPointerDown = useRef(false)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const mouseDownPosRef = useRef({ x: 0, y: 0 })
  const didDragRef = useRef(false)
  const isAnimatingRef = useRef(false)

  const [transform, setTransform] = useAtom(canvasTransformAtom)
  const [isDragging, setIsDragging] = useAtom(isDraggingAtom)
  const focusGroup = useAtomValue(focusGroupAtom)
  const clearSelection = useSetAtom(selectedNodeAtom)
  const draggingNode = useAtomValue(draggingNodeAtom)
  const draggingGroup = useAtomValue(draggingGroupAtom)
  const resetLayout = useSetAtom(resetNodePositionsAtom)

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const scaleAdjust = e.deltaY * -0.001
    setTransform((prev) => ({
      ...prev,
      scale: Math.min(Math.max(0.08, prev.scale + scaleAdjust), 3),
    }))
  }, [setTransform])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (draggingNode || draggingGroup) return
    isPointerDown.current = true
    dragStartRef.current = { x: e.clientX - transform.x, y: e.clientY - transform.y }
    mouseDownPosRef.current = { x: e.clientX, y: e.clientY }
    didDragRef.current = false
  }, [transform.x, transform.y, draggingNode, draggingGroup])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPointerDown.current || draggingNode || draggingGroup) return
    const dx = e.clientX - mouseDownPosRef.current.x
    const dy = e.clientY - mouseDownPosRef.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (!isDragging && distance > PAN_THRESHOLD) {
      setIsDragging(true)
      didDragRef.current = true
    }

    if (isDragging || distance > PAN_THRESHOLD) {
      setTransform((prev) => ({
        ...prev,
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y,
      }))
    }
  }, [isDragging, setIsDragging, setTransform, draggingNode, draggingGroup])

  const handleMouseUp = useCallback(() => {
    isPointerDown.current = false
    if (!didDragRef.current && !draggingNode && !draggingGroup) {
      clearSelection(null)
    }
    setIsDragging(false)
  }, [clearSelection, setIsDragging, draggingNode, draggingGroup])

  const handleMouseLeave = useCallback(() => {
    isPointerDown.current = false
    setIsDragging(false)
  }, [setIsDragging])

  const animatedZoom = useCallback((updater: (prev: typeof transform) => typeof transform) => {
    isAnimatingRef.current = true
    setTransform(updater)
    setTimeout(() => { isAnimatingRef.current = false }, 80)
  }, [setTransform])

  const zoomIn = useCallback(() => {
    animatedZoom((prev) => ({ ...prev, scale: Math.min(prev.scale + 0.1, 3) }))
  }, [animatedZoom])

  const zoomOut = useCallback(() => {
    animatedZoom((prev) => ({ ...prev, scale: Math.max(prev.scale - 0.1, 0.08) }))
  }, [animatedZoom])

  const resetZoom = useCallback(() => {
    isAnimatingRef.current = true
    setTransform(INITIAL_TRANSFORM)
    setTimeout(() => { isAnimatingRef.current = false }, 80)
  }, [setTransform])
  const handleResetLayout = useCallback(() => resetLayout(), [resetLayout])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-grab active:cursor-grabbing"
      style={{ backgroundColor: 'var(--canvas-bg)' }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <CanvasBackground transform={transform} />
      <ZoomToolbar onZoomIn={zoomIn} onZoomOut={zoomOut} onReset={resetZoom} onResetLayout={handleResetLayout} />

      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: '0 0',
          transition: isAnimatingRef.current ? 'transform 75ms ease-out' : 'none',
        }}
      >
        <ArchitectureGroups focusGroup={focusGroup} />
        <ArchitectureNodes focusGroup={focusGroup} />
        <ArchitectureEdges focusGroup={focusGroup} />
      </div>
    </div>
  )
}
