'use client';

import { GlassCard } from '@/components/ui';

const features = [
  {
    category: 'Global Infrastructure',
    metrics: [
      { name: 'Regions', aws: '33', gcp: '40', azure: '60+' },
      { name: 'Availability Zones', aws: '105', gcp: '121', azure: '116' },
      { name: 'Edge Locations', aws: '400+', gcp: '146', azure: '170+' },
    ]
  },
  {
    category: 'Compute Services',
    metrics: [
      { name: 'VM Types', aws: '400+', gcp: '50+', azure: '700+' },
      { name: 'Serverless Functions', aws: 'Yes (Lambda)', gcp: 'Yes (Functions)', azure: 'Yes (Functions)' },
      { name: 'Container Service', aws: 'ECS/EKS', gcp: 'GKE', azure: 'AKS' },
      { name: 'Bare Metal', aws: 'Limited', gcp: 'Yes', azure: 'Yes' },
    ]
  },
  {
    category: 'Storage Options',
    metrics: [
      { name: 'Object Storage', aws: 'S3', gcp: 'Cloud Storage', azure: 'Blob Storage' },
      { name: 'Block Storage', aws: 'EBS', gcp: 'Persistent Disk', azure: 'Managed Disks' },
      { name: 'File Storage', aws: 'EFS', gcp: 'Filestore', azure: 'Files' },
      { name: 'Archive Storage', aws: 'Glacier', gcp: 'Archive', azure: 'Archive' },
    ]
  },
  {
    category: 'Database Services',
    metrics: [
      { name: 'Relational DB', aws: 'RDS (6 engines)', gcp: 'Cloud SQL (3 engines)', azure: 'SQL Database' },
      { name: 'NoSQL', aws: 'DynamoDB', gcp: 'Firestore/Bigtable', azure: 'Cosmos DB' },
      { name: 'Data Warehouse', aws: 'Redshift', gcp: 'BigQuery', azure: 'Synapse' },
      { name: 'In-Memory Cache', aws: 'ElastiCache', gcp: 'Memorystore', azure: 'Cache for Redis' },
    ]
  },
  {
    category: 'AI/ML Services',
    metrics: [
      { name: 'Pre-trained Models', aws: 'SageMaker', gcp: 'Vertex AI', azure: 'Cognitive Services' },
      { name: 'Custom ML Training', aws: 'Yes', gcp: 'Yes (TensorFlow)', azure: 'Yes' },
      { name: 'AutoML', aws: 'Yes', gcp: 'Yes', azure: 'Yes' },
      { name: 'ML Ops', aws: 'SageMaker', gcp: 'Vertex AI', azure: 'ML Studio' },
    ]
  },
  {
    category: 'Support & SLA',
    metrics: [
      { name: 'Free Tier', aws: '12 months', gcp: 'Always free + $300 credit', azure: '12 months + $200 credit' },
      { name: 'Compute SLA', aws: '99.99%', gcp: '99.99%', azure: '99.99%' },
      { name: 'Storage SLA', aws: '99.9%', gcp: '99.95%', azure: '99.9%' },
      { name: 'Support Plans', aws: '4 tiers', gcp: '3 tiers', azure: '5 tiers' },
    ]
  },
];

export const FeatureComparison = () => {
  return (
    <GlassCard className="p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Feature Comparison</h2>
      <div className="space-y-8">
        {features.map((feature, idx) => (
          <div key={idx}>
            <h3 className="text-xl font-semibold text-white mb-4">{feature.category}</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 text-white/70 font-medium">Feature</th>
                    <th className="text-left py-3 px-4 text-white/70 font-medium">AWS</th>
                    <th className="text-left py-3 px-4 text-white/70 font-medium">GCP</th>
                    <th className="text-left py-3 px-4 text-white/70 font-medium">Azure</th>
                  </tr>
                </thead>
                <tbody>
                  {feature.metrics.map((metric, midx) => (
                    <tr key={midx} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-white font-medium">{metric.name}</td>
                      <td className="py-3 px-4 text-blue-300">{metric.aws}</td>
                      <td className="py-3 px-4 text-green-300">{metric.gcp}</td>
                      <td className="py-3 px-4 text-purple-300">{metric.azure}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

