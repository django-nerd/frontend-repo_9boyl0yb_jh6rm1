export default function FeatureCard({ title, description }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white/70 backdrop-blur p-5 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  )
}
