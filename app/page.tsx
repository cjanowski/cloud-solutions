import Link from 'next/link';
import { GlassCard } from '@/components/ui';
import { SystemPlanner } from '@/components/SystemPlanner';

export default function Home() {
  const features = [
    {
      title: 'Cost Calculators',
      description: 'Calculate and compare costs for compute, storage, and bandwidth across AWS, GCP, and Azure.',
      links: [
        { href: '/calculators/compute', label: 'Compute Calculator' },
        { href: '/calculators/storage', label: 'Storage Calculator' },
        { href: '/calculators/bandwidth', label: 'Bandwidth Calculator' },
        { href: '/calculators/capacity', label: 'Capacity Planning' },
      ],
      icon: '💰',
    },
    {
      title: 'Quick Reference',
      description: 'Fast access to service mappings, CLI commands, and architecture patterns.',
      links: [
        { href: '/quick-ref', label: 'View Quick Reference' },
      ],
      icon: '📚',
    },
    {
      title: 'Comparison Tools',
      description: 'Side-by-side feature comparisons, pricing charts, and trade-off analysis.',
      links: [
        { href: '/compare', label: 'Compare Providers' },
        { href: '/compare/local-vs-cloud', label: 'Local vs Cloud TCO' },
      ],
      icon: '⚖️',
    },
  ];

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Cloud Solutions
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Your comprehensive multi-cloud toolkit for AWS, GCP, and Azure. 
          Perfect for solution architects and cloud professionals.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <GlassCard key={feature.title} className="p-6 space-y-4" hover>
            <div className="text-4xl">{feature.icon}</div>
            <h2 className="text-2xl font-bold text-white">{feature.title}</h2>
            <p className="text-white/70">{feature.description}</p>
            <div className="space-y-2">
              {feature.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-300 text-center"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      <SystemPlanner />

      <GlassCard className="p-8 space-y-4">
        <h2 className="text-2xl font-bold text-white">Supported Cloud Providers</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center space-y-2">
            <div className="text-4xl">☁️</div>
            <h3 className="text-xl font-semibold text-white">AWS</h3>
            <p className="text-white/70 text-sm">Amazon Web Services</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl">🌐</div>
            <h3 className="text-xl font-semibold text-white">GCP</h3>
            <p className="text-white/70 text-sm">Google Cloud Platform</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl">☁️</div>
            <h3 className="text-xl font-semibold text-white">Azure</h3>
            <p className="text-white/70 text-sm">Microsoft Azure</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
