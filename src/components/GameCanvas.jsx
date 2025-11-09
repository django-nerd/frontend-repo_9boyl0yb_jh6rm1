import React, { useEffect, useRef } from 'react'

// Simple 2D Helix-style game on Canvas
// Rotate the tower, let the ball fall through gaps. Avoid red danger rings.
export default function GameCanvas({ running, onScoreChange, onGameOver }) {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)

  // Initialize game state
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * DPR
      canvas.height = rect.height * DPR
    }

    resize()
    window.addEventListener('resize', resize)

    const center = () => ({ x: canvas.width / 2, y: canvas.height / 2 })

    // Game parameters
    const params = {
      gravity: 0.5 * DPR,
      bounce: -10 * DPR,
      ringGapAngle: (Math.PI / 3),
      ringThickness: 18 * DPR,
      ringSpacing: 90 * DPR,
      initialRings: 10,
      maxRings: 30,
      rotateSpeedKeys: 0.04,
      dragSensitivity: 0.008,
    }

    // Create rings (each ring: baseAngle, gapStart, isDanger)
    function generateRings(count, startY) {
      const rings = []
      let y = startY
      for (let i = 0; i < count; i++) {
        const base = Math.random() * Math.PI * 2
        const gapStart = Math.random() * Math.PI * 2
        const isDanger = i % 5 === 4 // every 5th ring is red
        rings.push({ base, gapStart, isDanger, y })
        y += params.ringSpacing
      }
      return rings
    }

    const rings = generateRings(params.initialRings, 0)

    const state = {
      angle: 0, // tower rotation
      keys: { left: false, right: false },
      dragging: false,
      lastX: 0,
      score: 0,
      level: 1,
      ball: {
        x: center().x,
        y: -40 * DPR,
        r: 10 * DPR,
        vy: 0,
      },
      offsetY: 0, // camera offset scrolling down
      rings,
      running,
      gameOver: false,
    }

    stateRef.current = state

    // Input handlers
    function onKeyDown(e) {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') state.keys.left = true
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') state.keys.right = true
    }
    function onKeyUp(e) {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') state.keys.left = false
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') state.keys.right = false
    }
    function onPointerDown(e) {
      state.dragging = true
      state.lastX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0
    }
    function onPointerMove(e) {
      if (!state.dragging) return
      const x = e.clientX || (e.touches && e.touches[0]?.clientX) || 0
      const dx = x - state.lastX
      state.angle += dx * params.dragSensitivity
      state.lastX = x
    }
    function onPointerUp() {
      state.dragging = false
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    canvas.addEventListener('mousedown', onPointerDown)
    window.addEventListener('mousemove', onPointerMove)
    window.addEventListener('mouseup', onPointerUp)
    canvas.addEventListener('touchstart', onPointerDown, { passive: true })
    window.addEventListener('touchmove', onPointerMove, { passive: true })
    window.addEventListener('touchend', onPointerUp)

    // Helpers
    function wrapAngle(a) {
      while (a < 0) a += Math.PI * 2
      while (a >= Math.PI * 2) a -= Math.PI * 2
      return a
    }

    function addMoreRingsIfNeeded() {
      const last = state.rings[state.rings.length - 1]
      if (!last) return
      const targetCount = Math.min(params.maxRings, params.initialRings + Math.floor(state.score / 5) + 5)
      if (state.rings.length < targetCount && last.y - state.offsetY < canvas.height * 1.2) {
        const extra = generateRings(5, last.y + params.ringSpacing)
        state.rings.push(...extra)
      }
    }

    function update() {
      if (!state.running || state.gameOver) return

      // Rotation from keys
      if (state.keys.left) state.angle -= params.rotateSpeedKeys
      if (state.keys.right) state.angle += params.rotateSpeedKeys

      // Physics
      state.ball.vy += params.gravity
      state.ball.y += state.ball.vy

      // Camera follows ball downward
      const camTarget = state.ball.y - center().y
      state.offsetY = camTarget

      // Collisions when crossing a ring line
      for (let i = 0; i < state.rings.length; i++) {
        const ring = state.rings[i]
        const ringScreenY = ring.y - state.offsetY
        const prevY = state.ball.y - state.ball.vy - state.offsetY
        const currY = state.ball.y - state.offsetY

        // Check if we crossed the ring line this frame (moving downward)
        if (prevY < ringScreenY - params.ringThickness / 2 && currY >= ringScreenY - params.ringThickness / 2) {
          // Determine if we are within the gap
          const a = wrapAngle(state.angle + ring.base)
          const gapStart = wrapAngle(ring.gapStart)
          const gapEnd = wrapAngle(gapStart + params.ringGapAngle)

          const inGap = gapStart < gapEnd
            ? (a >= gapStart && a <= gapEnd)
            : (a >= gapStart || a <= gapEnd)

          if (!inGap) {
            // We hit the ring
            if (ring.isDanger && state.ball.vy > 0) {
              state.gameOver = true
              onGameOver?.(state.score)
              return
            } else {
              // Bounce
              state.ball.vy = params.bounce
              state.ball.y = (ring.y - state.offsetY) - params.ringThickness // push above ring
              state.score += 1
              onScoreChange?.(state.score)
            }
          }
        }
      }

      // Prevent the ball from going too far upward
      if (state.ball.y - state.offsetY < state.ball.r) {
        state.ball.y = state.offsetY + state.ball.r
        state.ball.vy = 0
      }

      // Level progression (every 20 points)
      const newLevel = 1 + Math.floor(state.score / 20)
      if (newLevel !== state.level) {
        state.level = newLevel
        // Increase difficulty slightly
        params.gravity *= 1.03
      }

      addMoreRingsIfNeeded()
    }

    function draw() {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      // Background
      const grad = ctx.createLinearGradient(0, 0, 0, height)
      grad.addColorStop(0, '#eef2ff')
      grad.addColorStop(1, '#ffffff')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // Center for drawing
      const c = center()

      // Draw rings
      for (let i = 0; i < state.rings.length; i++) {
        const ring = state.rings[i]
        const y = ring.y - state.offsetY
        if (y < -params.ringThickness * 2 || y > height + params.ringThickness * 2) continue

        const outerR = 120 * DPR
        const innerR = outerR - params.ringThickness

        // Gap angles
        const a = (state.angle + ring.base)
        const gapStart = ring.gapStart
        const gapEnd = ring.gapStart + params.ringGapAngle

        // Draw the ring as two arcs (before gap and after gap)
        ctx.save()
        ctx.translate(c.x, y)
        ctx.rotate(a)

        ctx.strokeStyle = ring.isDanger ? '#ef4444' : '#4f46e5'
        ctx.lineWidth = params.ringThickness
        ctx.lineCap = 'round'

        // arc before gap
        ctx.beginPath()
        ctx.arc(0, 0, (innerR + outerR) / 2, gapEnd, gapEnd + (Math.PI * 2 - params.ringGapAngle))
        ctx.stroke()

        ctx.restore()
      }

      // Draw ball
      ctx.save()
      ctx.fillStyle = '#111827'
      ctx.beginPath()
      ctx.arc(state.ball.x, state.ball.y - state.offsetY, state.ball.r, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    let raf
    function loop() {
      update()
      draw()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      canvas.removeEventListener('mousedown', onPointerDown)
      window.removeEventListener('mousemove', onPointerMove)
      window.removeEventListener('mouseup', onPointerUp)
      canvas.removeEventListener('touchstart', onPointerDown)
      window.removeEventListener('touchmove', onPointerMove)
      window.removeEventListener('touchend', onPointerUp)
    }
  }, [running, onScoreChange, onGameOver])

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-[560px] rounded-xl shadow-lg bg-white/60 backdrop-blur" />
    </div>
  )
}
