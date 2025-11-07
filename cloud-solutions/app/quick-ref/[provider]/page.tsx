import { GlassCard } from '@/components/ui';
import Link from 'next/link';

const providerData = {
  aws: {
    name: 'Amazon Web Services',
    icon: '☁️',
    color: 'from-orange-400 to-yellow-400',
    limits: [
      { resource: 'EC2 Instances (On-Demand)', limit: '20 per region (default)' },
      { resource: 'S3 Buckets', limit: '100 per account' },
      { resource: 'VPCs', limit: '5 per region' },
      { resource: 'EBS Volumes', limit: '5,000 per region' },
      { resource: 'Lambda Concurrent Executions', limit: '1,000 per region' },
    ],
    regions: [
      'us-east-1 (N. Virginia)', 'us-west-2 (Oregon)', 'eu-west-1 (Ireland)',
      'ap-southeast-1 (Singapore)', 'ap-northeast-1 (Tokyo)', 'sa-east-1 (São Paulo)'
    ],
    bestFor: [
      'Largest service catalog',
      'Most mature ecosystem',
      'Enterprise applications',
      'Widest global presence'
    ]
  },
  gcp: {
    name: 'Google Cloud Platform',
    icon: '🌐',
    color: 'from-blue-400 to-green-400',
    limits: [
      { resource: 'Compute Engine Instances', limit: '24 CPUs per region (default)' },
      { resource: 'Cloud Storage Buckets', limit: 'No limit' },
      { resource: 'VPC Networks', limit: '15 per project' },
      { resource: 'Persistent Disks', limit: '500 per project' },
      { resource: 'Cloud Functions', limit: '1,000 per region' },
    ],
    regions: [
      'us-central1 (Iowa)', 'us-west1 (Oregon)', 'europe-west1 (Belgium)',
      'asia-southeast1 (Singapore)', 'asia-northeast1 (Tokyo)', 'southamerica-east1 (São Paulo)'
    ],
    bestFor: [
      'Big data and analytics',
      'Machine learning (TensorFlow)',
      'Kubernetes (GKE)',
      'Competitive pricing'
    ]
  },
  azure: {
    name: 'Microsoft Azure',
    icon: '☁️',
    color: 'from-blue-400 to-purple-400',
    limits: [
      { resource: 'Virtual Machines', limit: '25,000 per subscription per region' },
      { resource: 'Storage Accounts', limit: '250 per subscription per region' },
      { resource: 'Virtual Networks', limit: '1,000 per subscription per region' },
      { resource: 'Managed Disks', limit: '50,000 per subscription per region' },
      { resource: 'Functions', limit: '200 function apps per subscription' },
    ],
    regions: [
      'East US (Virginia)', 'West US 2 (Washington)', 'West Europe (Netherlands)',
      'Southeast Asia (Singapore)', 'Japan East (Tokyo)', 'Brazil South (São Paulo)'
    ],
    bestFor: [
      'Microsoft ecosystem integration',
      'Hybrid cloud solutions',
      'Enterprise Windows workloads',
      'Active Directory integration'
    ]
  },
};

export default function ProviderPage({ params }: { params: { provider: string } }) {
  const provider = params.provider as 'aws' | 'gcp' | 'azure';
  const data = providerData[provider];

  if (!data) {
    return (
      <div className="space-y-6">
        <GlassCard className="p-8">
          <h1 className="text-2xl font-bold text-white">Provider not found</h1>
          <Link href="/quick-ref" className="text-blue-400 hover:text-blue-300">
            Back to Quick Reference
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/quick-ref" className="text-white/70 hover:text-white text-sm mb-2 inline-block">
          ← Back to Quick Reference
        </Link>
        <h1 className={`text-4xl font-bold bg-gradient-to-r ${data.color} bg-clip-text text-transparent mb-2 flex items-center gap-3`}>
          <span className="text-4xl">{data.icon}</span>
          {data.name}
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-white">Service Limits & Quotas</h2>
          <div className="space-y-3">
            {data.limits.map((limit, idx) => (
              <div key={idx} className="pb-3 border-b border-white/10 last:border-0">
                <div className="font-semibold text-white text-sm">{limit.resource}</div>
                <div className="text-white/70 text-sm">{limit.limit}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/50 pt-2">
            Note: Limits can often be increased by contacting support
          </p>
        </GlassCard>

        <GlassCard className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-white">Key Regions</h2>
          <div className="space-y-2">
            {data.regions.map((region, idx) => (
              <div key={idx} className="text-white/70 text-sm">
                • {region}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-white">Best For</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {data.bestFor.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span className="text-white/70">{item}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { provider: 'aws' },
    { provider: 'gcp' },
    { provider: 'azure' },
  ];
}

