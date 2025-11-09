import React from 'react'
import { Trophy } from 'lucide-react'

export default function GameOver({ score, onRestart }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="max-w-sm w-full mx-auto p-6 rounded-2xl bg-white/80 backdrop-blur border border-black/5 shadow-xl text-center">
        <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
          <Trophy size={24} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Game Over</h3>
        <p className="text-gray-600 mt-1">Nice run! Your score</p>
        <div className="text-3xl font-bold mt-2 text-gray-900">{score}</div>
        <button onClick={onRestart} className="mt-5 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white shadow hover:bg-indigo-700">
          Play Again
        </button>
      </div>
    </div>
  )
}
