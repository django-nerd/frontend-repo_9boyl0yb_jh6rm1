import { useState, useCallback } from 'react'
import Spline from '@splinetool/react-spline'
import { Rocket } from 'lucide-react'

import HeroHeader from './components/HeroHeader'
import FeatureGrid from './components/FeatureGrid'
import CodeBlock from './components/CodeBlock'
import DownloadPanel from './components/DownloadPanel'
import GameCanvas from './components/GameCanvas'
import GameHUD from './components/GameHUD'
import GameOver from './components/GameOver'

export default function App() {
  const [running, setRunning] = useState(true)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameOver, setGameOver] = useState(false)

  const handleScoreChange = useCallback((s) => {
    setScore(s)
    setLevel(1 + Math.floor(s / 20))
  }, [])

  const handleGameOver = useCallback(() => {
    setRunning(false)
    setGameOver(true)
  }, [])

  const handleToggle = () => setRunning((v) => !v)
  const handleReset = () => {
    // Simple reset: reload page to re-init canvas state cleanly
    window.location.reload()
  }
  const handleRestart = () => window.location.reload()

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-indigo-50 to-white">
      <div className="relative h-[420px] w-full">
        <Spline scene="https://prod.spline.design/1xHf7C7sJ6t1i6M2/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-transparent" />
      </div>

      <main className="-mt-32 relative z-10">
        <HeroHeader />

        <div className="max-w-6xl mx-auto px-6 space-y-10">
          <section className="bg-white/70 backdrop-blur rounded-2xl border border-black/5 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4 text-gray-900">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Rocket size={18} />
              </div>
              <h2 className="text-lg font-semibold">Playable Demo</h2>
            </div>

            <GameHUD
              score={score}
              level={level}
              running={running}
              onToggle={handleToggle}
              onReset={handleReset}
            />

            <div className="relative mt-4">
              <GameCanvas
                running={running}
                onScoreChange={handleScoreChange}
                onGameOver={handleGameOver}
              />
              {gameOver && (
                <GameOver score={score} onRestart={handleRestart} />
              )}
            </div>

            <p className="text-sm text-gray-600 mt-3">
              Rotate the tower with A/D, arrow keys, or by dragging. Guide the ball through gaps. Avoid red rings!
            </p>
          </section>

          <FeatureGrid />

          <CodeBlock title="Inspector-exposed tuning variables">
{`// In BallController.cs\npublic float bounceForce = 12f;\npublic float fallSpeedLimit = -25f;\npublic float bounceCooldown = 0.05f;\n\n// In CameraFollow.cs\npublic Vector3 cameraOffset = new Vector3(0, 6, -8);\npublic float followSpeed = 6f;\n\n// In TowerRotator.cs\npublic float rotationSensitivity = 0.4f;`}
          </CodeBlock>

          <DownloadPanel />

          <footer className="py-12 text-center text-sm text-gray-500">
            Built for rapid drop-in to your Helix Jump project — now with a browser-playable demo.
          </footer>
        </div>
      </main>
    </div>
  )
}
