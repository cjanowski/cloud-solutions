'use client';

import { GlassCard } from '@/components/ui';

const serviceMappings = [
  {
    category: 'Compute',
    aws: 'EC2',
    gcp: 'Compute Engine',
    azure: 'Virtual Machines',
    description: 'Virtual machine instances'
  },
  {
    category: 'Serverless Compute',
    aws: 'Lambda',
    gcp: 'Cloud Functions',
    azure: 'Functions',
    description: 'Event-driven serverless functions'
  },
  {
    category: 'Container Orchestration',
    aws: 'EKS',
    gcp: 'GKE',
    azure: 'AKS',
    description: 'Managed Kubernetes service'
  },
  {
    category: 'Object Storage',
    aws: 'S3',
    gcp: 'Cloud Storage',
    azure: 'Blob Storage',
    description: 'Scalable object storage'
  },
  {
    category: 'Block Storage',
    aws: 'EBS',
    gcp: 'Persistent Disk',
    azure: 'Managed Disks',
    description: 'Block-level storage volumes'
  },
  {
    category: 'File Storage',
    aws: 'EFS',
    gcp: 'Filestore',
    azure: 'Files',
    description: 'Managed file storage'
  },
  {
    category: 'Relational Database',
    aws: 'RDS',
    gcp: 'Cloud SQL',
    azure: 'SQL Database',
    description: 'Managed relational databases'
  },
  {
    category: 'NoSQL Database',
    aws: 'DynamoDB',
    gcp: 'Firestore',
    azure: 'Cosmos DB',
    description: 'Managed NoSQL databases'
  },
  {
    category: 'Data Warehouse',
    aws: 'Redshift',
    gcp: 'BigQuery',
    azure: 'Synapse Analytics',
    description: 'Petabyte-scale data warehouse'
  },
  {
    category: 'Load Balancer',
    aws: 'ELB/ALB',
    gcp: 'Cloud Load Balancing',
    azure: 'Load Balancer',
    description: 'Distribute traffic across instances'
  },
  {
    category: 'CDN',
    aws: 'CloudFront',
    gcp: 'Cloud CDN',
    azure: 'CDN',
    description: 'Content delivery network'
  },
  {
    category: 'DNS',
    aws: 'Route 53',
    gcp: 'Cloud DNS',
    azure: 'DNS',
    description: 'Domain name system service'
  },
  {
    category: 'VPC/Network',
    aws: 'VPC',
    gcp: 'VPC',
    azure: 'Virtual Network',
    description: 'Virtual private cloud networking'
  },
  {
    category: 'Message Queue',
    aws: 'SQS',
    gcp: 'Pub/Sub',
    azure: 'Service Bus',
    description: 'Asynchronous messaging service'
  },
  {
    category: 'Identity Management',
    aws: 'IAM',
    gcp: 'IAM',
    azure: 'Active Directory',
    description: 'Access control and identity'
  },
];

export const ServiceMappings = () => {
  return (
    <GlassCard className="p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Service Name Mappings</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-3 px-4 text-white font-semibold">Category</th>
              <th className="text-left py-3 px-4 text-white font-semibold">AWS</th>
              <th className="text-left py-3 px-4 text-white font-semibold">GCP</th>
              <th className="text-left py-3 px-4 text-white font-semibold">Azure</th>
              <th className="text-left py-3 px-4 text-white font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            {serviceMappings.map((mapping, idx) => (
              <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 text-white font-medium">{mapping.category}</td>
                <td className="py-3 px-4 text-blue-300">{mapping.aws}</td>
                <td className="py-3 px-4 text-green-300">{mapping.gcp}</td>
                <td className="py-3 px-4 text-purple-300">{mapping.azure}</td>
                <td className="py-3 px-4 text-white/70 text-sm">{mapping.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};

