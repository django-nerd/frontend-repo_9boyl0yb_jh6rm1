import Spline from '@splinetool/react-spline'
import HeroHeader from './components/HeroHeader'
import FeatureGrid from './components/FeatureGrid'
import DownloadPanel from './components/DownloadPanel'
import CodeBlock from './components/CodeBlock'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-indigo-50 to-white">
      <div className="relative h-[420px] w-full">
        <Spline scene="https://prod.spline.design/1xHf7C7sJ6t1i6M2/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-transparent" />
      </div>

      <main className="-mt-32 relative z-10">
        <HeroHeader />
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          <FeatureGrid />

          <CodeBlock title="Inspector-exposed tuning variables">
{`// In BallController.cs\npublic float bounceForce = 12f;\npublic float fallSpeedLimit = -25f;\npublic float bounceCooldown = 0.05f;\n\n// In CameraFollow.cs\npublic Vector3 cameraOffset = new Vector3(0, 6, -8);\npublic float followSpeed = 6f;\n\n// In TowerRotator.cs\npublic float rotationSensitivity = 0.4f;`}
          </CodeBlock>

          <DownloadPanel />

          <footer className="py-12 text-center text-sm text-gray-500">
            Built for rapid drop-in to your Helix Jump project.
          </footer>
        </div>
      </main>
    </div>
  )
}
