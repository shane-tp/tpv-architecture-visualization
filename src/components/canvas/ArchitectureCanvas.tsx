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

const PAN_THRESHOLD = 4

export function ArchitectureCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isPointerDown = useRef(false)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const mouseDownPosRef = useRef({ x: 0, y: 0 })
  const didDragRef = useRef(false)

  const [transform, setTransform] = useAtom(canvasTransformAtom)
  const [isDragging, setIsDragging] = useAtom(isDraggingAtom)
  const focusGroup = useAtomValue(focusGroupAtom)
  const clearSelection = useSetAtom(selectedNodeAtom)

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const scaleAdjust = e.deltaY * -0.001
    setTransform((prev) => ({
      ...prev,
      scale: Math.min(Math.max(0.15, prev.scale + scaleAdjust), 3),
    }))
  }, [setTransform])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isPointerDown.current = true
    dragStartRef.current = { x: e.clientX - transform.x, y: e.clientY - transform.y }
    mouseDownPosRef.current = { x: e.clientX, y: e.clientY }
    didDragRef.current = false
  }, [transform.x, transform.y])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPointerDown.current) return
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
  }, [isDragging, setIsDragging, setTransform])

  const handleMouseUp = useCallback(() => {
    isPointerDown.current = false
    if (!didDragRef.current) {
      clearSelection(null)
    }
    setIsDragging(false)
  }, [clearSelection, setIsDragging])

  const handleMouseLeave = useCallback(() => {
    isPointerDown.current = false
    setIsDragging(false)
  }, [setIsDragging])

  const zoomIn = useCallback(() => {
    setTransform((prev) => ({ ...prev, scale: Math.min(prev.scale + 0.1, 3) }))
  }, [setTransform])

  const zoomOut = useCallback(() => {
    setTransform((prev) => ({ ...prev, scale: Math.max(prev.scale - 0.1, 0.15) }))
  }, [setTransform])

  const resetZoom = useCallback(() => setTransform(INITIAL_TRANSFORM), [setTransform])

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
      <ZoomToolbar onZoomIn={zoomIn} onZoomOut={zoomOut} onReset={resetZoom} />

      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: '0 0',
          transition: isDragging ? 'none' : 'transform 75ms ease-out',
        }}
      >
        <ArchitectureEdges focusGroup={focusGroup} />
        <ArchitectureGroups focusGroup={focusGroup} />
        <ArchitectureNodes focusGroup={focusGroup} />
      </div>
    </div>
  )
}
