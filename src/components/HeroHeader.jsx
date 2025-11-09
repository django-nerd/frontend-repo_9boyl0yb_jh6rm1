import { Rocket } from 'lucide-react'

export default function HeroHeader() {
  return (
    <header className="w-full py-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-lg">
            <Rocket className="h-6 w-6" />
          </div>
          <span className="text-sm font-medium text-indigo-600">Helix Jump Core Systems Kit</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Production-ready Unity C# scripts for a 3D Helix Jump game
        </h1>
        <p className="mt-4 text-gray-600 max-w-3xl">
          Drop these scripts into your project to get tight ball physics, responsive tower rotation, a smooth camera,
          and a clean level flow. Includes bounce particles, trail, SFX hooks, and inspector-exposed tuning vars.
        </p>
      </div>
    </header>
  )
}
