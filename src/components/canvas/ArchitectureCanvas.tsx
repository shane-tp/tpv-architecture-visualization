import { useState, useRef, useCallback } from 'react'
import { CanvasBackground } from './CanvasBackground'
import { ZoomToolbar } from './ZoomToolbar'
import { ArchitectureEdges } from './ArchitectureEdges'
import { ArchitectureGroups } from './ArchitectureGroups'
import { ArchitectureNodes } from './ArchitectureNodes'

interface ArchitectureCanvasProps {
  focusGroup: string | null
}

interface Transform {
  x: number
  y: number
  scale: number
}

const INITIAL_TRANSFORM: Transform = { x: 50, y: 50, scale: 0.55 }

export function ArchitectureCanvas({ focusGroup }: ArchitectureCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState<Transform>(INITIAL_TRANSFORM)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const scaleAdjust = e.deltaY * -0.001
    setTransform((prev) => ({
      ...prev,
      scale: Math.min(Math.max(0.15, prev.scale + scaleAdjust), 3),
    }))
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y })
  }, [transform.x, transform.y])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    setTransform((prev) => ({
      ...prev,
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    }))
  }, [isDragging, dragStart])

  const handleMouseUp = useCallback(() => setIsDragging(false), [])

  const zoomIn = useCallback(() => {
    setTransform((prev) => ({ ...prev, scale: Math.min(prev.scale + 0.1, 3) }))
  }, [])

  const zoomOut = useCallback(() => {
    setTransform((prev) => ({ ...prev, scale: Math.max(prev.scale - 0.1, 0.15) }))
  }, [])

  const resetZoom = useCallback(() => setTransform(INITIAL_TRANSFORM), [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-grab active:cursor-grabbing"
      style={{ backgroundColor: 'var(--canvas-bg)' }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
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
