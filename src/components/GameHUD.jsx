import React from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

export default function GameHUD({ score, level, running, onToggle, onReset }) {
  return (
    <div className="flex items-center justify-between w-full gap-4">
      <div className="px-4 py-2 rounded-lg bg-white/70 backdrop-blur text-gray-900 shadow-sm border border-black/5">
        <div className="text-xs uppercase tracking-wide text-gray-500">Score</div>
        <div className="text-2xl font-semibold">{score}</div>
      </div>
      <div className="px-4 py-2 rounded-lg bg-white/70 backdrop-blur text-gray-900 shadow-sm border border-black/5">
        <div className="text-xs uppercase tracking-wide text-gray-500">Level</div>
        <div className="text-2xl font-semibold">{level}</div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onToggle} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700 active:scale-[0.98]">
          {running ? <Pause size={18} /> : <Play size={18} />}
          <span className="text-sm font-medium">{running ? 'Pause' : 'Play'}</span>
        </button>
        <button onClick={onReset} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-900 shadow-sm hover:bg-gray-50 border border-gray-200">
          <RotateCcw size={18} />
          <span className="text-sm font-medium">Reset</span>
        </button>
      </div>
    </div>
  )
}
