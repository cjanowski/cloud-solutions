'use client';

import { GlassCard } from '@/components/ui';

const patterns = [
  {
    name: 'Three-Tier Architecture',
    description: 'Presentation, Application, and Data layers separated for scalability',
    useCases: ['Web applications', 'E-commerce sites', 'Enterprise apps'],
    components: {
      aws: 'ALB + EC2/ECS + RDS',
      gcp: 'Cloud Load Balancing + Compute Engine + Cloud SQL',
      azure: 'Load Balancer + VMs + SQL Database'
    }
  },
  {
    name: 'Serverless Architecture',
    description: 'Event-driven architecture without managing servers',
    useCases: ['APIs', 'Data processing', 'Webhooks'],
    components: {
      aws: 'API Gateway + Lambda + DynamoDB',
      gcp: 'Cloud Functions + Firestore',
      azure: 'Functions + Cosmos DB'
    }
  },
  {
    name: 'Microservices',
    description: 'Loosely coupled services that can be deployed independently',
    useCases: ['Large applications', 'Multiple teams', 'Continuous deployment'],
    components: {
      aws: 'EKS + ECR + RDS',
      gcp: 'GKE + Artifact Registry + Cloud SQL',
      azure: 'AKS + Container Registry + SQL Database'
    }
  },
  {
    name: 'Event-Driven',
    description: 'Services communicate through events and message queues',
    useCases: ['Asynchronous processing', 'Decoupled systems', 'Real-time data'],
    components: {
      aws: 'EventBridge + SQS + Lambda',
      gcp: 'Pub/Sub + Cloud Functions',
      azure: 'Event Grid + Service Bus + Functions'
    }
  },
  {
    name: 'Data Lake',
    description: 'Centralized repository for structured and unstructured data',
    useCases: ['Big data analytics', 'Machine learning', 'Data warehousing'],
    components: {
      aws: 'S3 + Glue + Athena + Redshift',
      gcp: 'Cloud Storage + Dataflow + BigQuery',
      azure: 'Data Lake Storage + Synapse Analytics'
    }
  },
  {
    name: 'Multi-Region Active-Active',
    description: 'Deploy across multiple regions for high availability',
    useCases: ['Global applications', 'Disaster recovery', 'Low latency'],
    components: {
      aws: 'Route 53 + Multi-region ALB + Global RDS',
      gcp: 'Cloud DNS + Global Load Balancing + Spanner',
      azure: 'Traffic Manager + Multi-region deployment'
    }
  },
];

export const ArchitecturePatterns = () => {
  return (
    <GlassCard className="p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Common Architecture Patterns</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {patterns.map((pattern, idx) => (
          <div key={idx} className="p-6 rounded-lg bg-white/5 border border-white/10 space-y-3">
            <h3 className="text-xl font-bold text-white">{pattern.name}</h3>
            <p className="text-white/70 text-sm">{pattern.description}</p>
            
            <div>
              <h4 className="text-sm font-semibold text-white/90 mb-2">Use Cases:</h4>
              <ul className="list-disc list-inside text-sm text-white/70 space-y-1">
                {pattern.useCases.map((useCase, i) => (
                  <li key={i}>{useCase}</li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2">
              <h4 className="text-sm font-semibold text-white/90">Implementation:</h4>
              <div className="space-y-1 text-sm">
                <div><span className="text-blue-300 font-medium">AWS:</span> <span className="text-white/70">{pattern.components.aws}</span></div>
                <div><span className="text-green-300 font-medium">GCP:</span> <span className="text-white/70">{pattern.components.gcp}</span></div>
                <div><span className="text-purple-300 font-medium">Azure:</span> <span className="text-white/70">{pattern.components.azure}</span></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

