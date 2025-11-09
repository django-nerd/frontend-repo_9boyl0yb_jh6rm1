export default function CodeBlock({ title, children }) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200">
      <div className="px-4 py-2 bg-gray-50 text-xs font-mono text-gray-600 border-b border-gray-200">{title}</div>
      <pre className="p-4 text-xs md:text-sm leading-relaxed overflow-x-auto bg-white">
        <code>{children}</code>
      </pre>
    </div>
  )
}
