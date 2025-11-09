import FeatureCard from './FeatureCard'

const features = [
  {
    title: 'Rock-solid collisions',
    description:
      'SphereCollider + Rigidbody on the ball, non-trigger colliders on platforms. Bounce cooldown prevents multi-bounces.'
  },
  {
    title: 'No more gap clipping',
    description:
      'Optional Continuous Dynamic + fall speed clamp to keep the ball from tunneling through platform gaps.'
  },
  {
    title: 'Smooth camera follow',
    description:
      'Y-axis follow with offset, clamped to keep the next platform in frame, always looking at the ball.'
  },
  {
    title: 'Mobile-first input',
    description:
      'Touch drag to rotate the tower, with adjustable sensitivity. Mouse supported for quick testing.'
  }
]

export default function FeatureGrid() {
  return (
    <section className="w-full py-8">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f) => (
          <FeatureCard key={f.title} title={f.title} description={f.description} />
        ))}
      </div>
    </section>
  )
}
