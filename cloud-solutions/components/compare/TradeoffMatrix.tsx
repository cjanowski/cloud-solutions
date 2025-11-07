'use client';

import { GlassCard } from '@/components/ui';

const tradeoffs = [
  {
    aspect: 'Pricing Model',
    aws: {
      pros: ['Most flexible pricing options', 'Reserved instances save up to 75%', 'Spot instances for batch workloads'],
      cons: ['Complex pricing structure', 'Can be expensive without optimization', 'Data transfer costs add up'],
      rating: 8
    },
    gcp: {
      pros: ['Sustained use discounts automatic', 'Per-second billing', 'Committed use discounts'],
      cons: ['Fewer pricing options', 'Limited free tier compared to AWS', 'Egress pricing can be high'],
      rating: 9
    },
    azure: {
      pros: ['Hybrid benefit for Windows', 'Dev/Test pricing', 'Reserved instances'],
      cons: ['Complex licensing', 'Can be expensive for non-Microsoft workloads', 'Less transparent pricing'],
      rating: 7
    }
  },
  {
    aspect: 'Ease of Use',
    aws: {
      pros: ['Extensive documentation', 'Largest community', 'Most third-party integrations'],
      cons: ['Steep learning curve', 'Console can be overwhelming', 'Service naming inconsistent'],
      rating: 7
    },
    gcp: {
      pros: ['Clean, modern interface', 'Consistent naming', 'Better default configurations'],
      cons: ['Smaller community', 'Fewer learning resources', 'Less mature services'],
      rating: 9
    },
    azure: {
      pros: ['Familiar for Microsoft users', 'Good documentation', 'Integrated with Office 365'],
      cons: ['Complex portal navigation', 'Inconsistent UX', 'Steep learning curve for non-MS users'],
      rating: 7
    }
  },
  {
    aspect: 'Performance',
    aws: {
      pros: ['Widest instance variety', 'Graviton processors competitive', 'Excellent network performance'],
      cons: ['Older generation instances still available', 'Performance varies by region', 'Some services slower than competitors'],
      rating: 8
    },
    gcp: {
      pros: ['Fast network (Google backbone)', 'Custom machine types', 'Live migration for VMs'],
      cons: ['Fewer instance types', 'Limited GPU options', 'Smaller global footprint'],
      rating: 9
    },
    azure: {
      pros: ['Large instance variety', 'Good GPU options', 'Fast local storage'],
      cons: ['Network performance varies', 'Some regions slower', 'Occasional stability issues'],
      rating: 8
    }
  },
  {
    aspect: 'Enterprise Features',
    aws: {
      pros: ['Most mature services', 'Excellent compliance certifications', 'Strong enterprise support'],
      cons: ['Can be complex to manage', 'Requires expertise', 'Support can be expensive'],
      rating: 9
    },
    gcp: {
      pros: ['Strong security features', 'Good compliance', 'Excellent for data analytics'],
      cons: ['Fewer enterprise features', 'Smaller partner ecosystem', 'Less enterprise tooling'],
      rating: 7
    },
    azure: {
      pros: ['Best for hybrid cloud', 'Active Directory integration', 'Strong compliance'],
      cons: ['Complex licensing', 'Requires Microsoft expertise', 'Vendor lock-in concerns'],
      rating: 9
    }
  },
  {
    aspect: 'Innovation',
    aws: {
      pros: ['First to market with new services', 'Largest service catalog', 'Regular feature releases'],
      cons: ['Some services feel rushed', 'Beta services may be deprecated', 'Feature overload'],
      rating: 9
    },
    gcp: {
      pros: ['Cutting-edge ML/AI', 'Kubernetes native', 'Modern architecture'],
      cons: ['Fewer overall services', 'Some services lag behind AWS', 'Smaller ecosystem'],
      rating: 8
    },
    azure: {
      pros: ['Good innovation pace', 'Strong in hybrid cloud', 'IoT and edge computing'],
      cons: ['Often plays catch-up', 'Some services feel like AWS clones', 'Slower to innovate'],
      rating: 7
    }
  }
];

const getRatingColor = (rating: number) => {
  if (rating >= 9) return 'text-green-400';
  if (rating >= 7) return 'text-yellow-400';
  return 'text-orange-400';
};

export const TradeoffMatrix = () => {
  return (
    <GlassCard className="p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Trade-offs Matrix</h2>
      <div className="space-y-8">
        {tradeoffs.map((tradeoff, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-xl font-semibold text-white">{tradeoff.aspect}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-blue-300">AWS</h4>
                  <span className={`text-2xl font-bold ${getRatingColor(tradeoff.aws.rating)}`}>
                    {tradeoff.aws.rating}/10
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-400 mb-1">Pros:</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    {tradeoff.aws.pros.map((pro, i) => (
                      <li key={i}>+ {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-400 mb-1">Cons:</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    {tradeoff.aws.cons.map((con, i) => (
                      <li key={i}>- {con}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-green-300">GCP</h4>
                  <span className={`text-2xl font-bold ${getRatingColor(tradeoff.gcp.rating)}`}>
                    {tradeoff.gcp.rating}/10
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-400 mb-1">Pros:</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    {tradeoff.gcp.pros.map((pro, i) => (
                      <li key={i}>+ {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-400 mb-1">Cons:</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    {tradeoff.gcp.cons.map((con, i) => (
                      <li key={i}>- {con}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-purple-300">Azure</h4>
                  <span className={`text-2xl font-bold ${getRatingColor(tradeoff.azure.rating)}`}>
                    {tradeoff.azure.rating}/10
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-400 mb-1">Pros:</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    {tradeoff.azure.pros.map((pro, i) => (
                      <li key={i}>+ {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-400 mb-1">Cons:</p>
                  <ul className="text-xs text-white/70 space-y-1">
                    {tradeoff.azure.cons.map((con, i) => (
                      <li key={i}>- {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

