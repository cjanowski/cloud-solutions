'use client';

import { useState } from 'react';
import { GlassCard, GlassSelect } from './ui';

interface SystemPlan {
  name: string;
  description: string;
  components: {
    layer: string;
    aws: string;
    gcp: string;
    azure: string;
    local: string;
    notes: string;
  }[];
  considerations: string[];
  estimatedCost: string;
  localCost?: string;
}

const systemPlans: Record<string, SystemPlan> = {
  'web-app': {
    name: 'Web Application (3-Tier)',
    description: 'Standard web application with presentation, application, and data layers',
    components: [
      {
        layer: 'Load Balancer',
        aws: 'Application Load Balancer (ALB)',
        gcp: 'Cloud Load Balancing',
        azure: 'Application Gateway',
        local: 'HAProxy / NGINX',
        notes: 'Distributes traffic across instances'
      },
      {
        layer: 'Compute',
        aws: 'EC2 Auto Scaling / ECS',
        gcp: 'Compute Engine / GKE',
        azure: 'Virtual Machines / AKS',
        local: 'Physical Servers / VMware',
        notes: '2-10 instances based on load'
      },
      {
        layer: 'Database',
        aws: 'RDS (PostgreSQL/MySQL)',
        gcp: 'Cloud SQL',
        azure: 'Azure SQL Database',
        local: 'PostgreSQL / MySQL on-prem',
        notes: 'Multi-AZ for high availability'
      },
      {
        layer: 'Cache',
        aws: 'ElastiCache (Redis)',
        gcp: 'Memorystore',
        azure: 'Azure Cache for Redis',
        local: 'Redis / Memcached',
        notes: 'Reduces database load'
      },
      {
        layer: 'Storage',
        aws: 'S3',
        gcp: 'Cloud Storage',
        azure: 'Blob Storage',
        local: 'NAS / SAN / MinIO',
        notes: 'Static assets, user uploads'
      },
      {
        layer: 'CDN',
        aws: 'CloudFront',
        gcp: 'Cloud CDN',
        azure: 'Azure CDN',
        local: 'Varnish / NGINX Cache',
        notes: 'Global content delivery'
      }
    ],
    considerations: [
      'Use auto-scaling for compute layer',
      'Enable database read replicas for read-heavy workloads',
      'Implement caching strategy (Redis) for frequently accessed data',
      'Use CDN for static assets',
      'Set up monitoring and alerting'
    ],
    estimatedCost: '$500-2,000/month (small to medium scale)',
    localCost: '$2,000-5,000 upfront + $200-500/month (hardware, power, maintenance)'
  },
  'microservices': {
    name: 'Microservices Architecture',
    description: 'Container-based microservices with service mesh and API gateway',
    components: [
      {
        layer: 'API Gateway',
        aws: 'API Gateway / ALB',
        gcp: 'Cloud Endpoints / API Gateway',
        azure: 'API Management',
        local: 'Kong / Tyk / NGINX',
        notes: 'Single entry point for all services'
      },
      {
        layer: 'Container Orchestration',
        aws: 'EKS (Kubernetes)',
        gcp: 'GKE',
        azure: 'AKS',
        local: 'Self-hosted Kubernetes',
        notes: 'Manages containerized services'
      },
      {
        layer: 'Service Mesh',
        aws: 'App Mesh / Istio',
        gcp: 'Anthos Service Mesh',
        azure: 'Service Fabric Mesh',
        local: 'Istio / Linkerd / Consul',
        notes: 'Service-to-service communication'
      },
      {
        layer: 'Container Registry',
        aws: 'ECR',
        gcp: 'Artifact Registry',
        azure: 'Container Registry',
        local: 'Harbor / Nexus / GitLab',
        notes: 'Store Docker images'
      },
      {
        layer: 'Database per Service',
        aws: 'RDS / DynamoDB',
        gcp: 'Cloud SQL / Firestore',
        azure: 'SQL Database / Cosmos DB',
        local: 'PostgreSQL / MongoDB',
        notes: 'Each service owns its data'
      },
      {
        layer: 'Message Queue',
        aws: 'SQS / SNS',
        gcp: 'Pub/Sub',
        azure: 'Service Bus',
        local: 'RabbitMQ / Apache Kafka',
        notes: 'Async communication between services'
      },
      {
        layer: 'Monitoring',
        aws: 'CloudWatch / X-Ray',
        gcp: 'Cloud Monitoring / Trace',
        azure: 'Application Insights',
        local: 'Prometheus / Grafana / Jaeger',
        notes: 'Distributed tracing and metrics'
      }
    ],
    considerations: [
      'Implement circuit breakers and retry logic',
      'Use API gateway for authentication and rate limiting',
      'Set up centralized logging (ELK stack)',
      'Implement health checks for all services',
      'Use GitOps for deployment (ArgoCD, Flux)',
      'Consider service mesh for advanced traffic management'
    ],
    estimatedCost: '$2,000-10,000/month (depending on scale)',
    localCost: '$5,000-15,000 upfront + $500-2,000/month (servers, networking, staff)'
  },
  'serverless': {
    name: 'Serverless Application',
    description: 'Event-driven serverless architecture with managed services',
    components: [
      {
        layer: 'API Gateway',
        aws: 'API Gateway',
        gcp: 'API Gateway',
        azure: 'API Management',
        local: 'Express.js / FastAPI',
        notes: 'RESTful API endpoints'
      },
      {
        layer: 'Functions',
        aws: 'Lambda',
        gcp: 'Cloud Functions',
        azure: 'Azure Functions',
        local: 'OpenFaaS / Knative',
        notes: 'Event-driven compute'
      },
      {
        layer: 'Database',
        aws: 'DynamoDB',
        gcp: 'Firestore',
        azure: 'Cosmos DB',
        local: 'MongoDB / CouchDB',
        notes: 'Serverless NoSQL database'
      },
      {
        layer: 'Authentication',
        aws: 'Cognito',
        gcp: 'Firebase Auth',
        azure: 'Azure AD B2C',
        local: 'Keycloak / Auth0',
        notes: 'User authentication and authorization'
      },
      {
        layer: 'Storage',
        aws: 'S3',
        gcp: 'Cloud Storage',
        azure: 'Blob Storage',
        local: 'MinIO / Ceph',
        notes: 'Object storage with triggers'
      },
      {
        layer: 'Event Bus',
        aws: 'EventBridge',
        gcp: 'Eventarc',
        azure: 'Event Grid',
        local: 'RabbitMQ / NATS',
        notes: 'Event routing and processing'
      }
    ],
    considerations: [
      'Cold start latency (use provisioned concurrency if needed)',
      'Function timeout limits (15 min for Lambda)',
      'Stateless function design',
      'Use environment variables for configuration',
      'Implement proper error handling and retries',
      'Monitor costs closely (can scale unexpectedly)'
    ],
    estimatedCost: '$50-500/month (pay per use, highly variable)',
    localCost: '$1,000-3,000 upfront + $100-300/month (minimal hardware, mostly software)'
  },
  'data-pipeline': {
    name: 'Data Pipeline & Analytics',
    description: 'Batch and streaming data processing with data warehouse',
    components: [
      {
        layer: 'Data Ingestion',
        aws: 'Kinesis / DMS',
        gcp: 'Dataflow / Pub/Sub',
        azure: 'Event Hubs / Data Factory',
        local: 'Apache NiFi / Logstash',
        notes: 'Stream and batch data ingestion'
      },
      {
        layer: 'Data Lake',
        aws: 'S3 + Glue',
        gcp: 'Cloud Storage + Dataproc',
        azure: 'Data Lake Storage',
        local: 'HDFS / MinIO + Hive',
        notes: 'Raw data storage with catalog'
      },
      {
        layer: 'Processing',
        aws: 'EMR (Spark) / Glue',
        gcp: 'Dataproc / Dataflow',
        azure: 'HDInsight / Databricks',
        local: 'Apache Spark / Flink',
        notes: 'ETL and data transformation'
      },
      {
        layer: 'Data Warehouse',
        aws: 'Redshift',
        gcp: 'BigQuery',
        azure: 'Synapse Analytics',
        local: 'ClickHouse / Trino',
        notes: 'Analytical queries and BI'
      },
      {
        layer: 'Orchestration',
        aws: 'Step Functions / MWAA',
        gcp: 'Cloud Composer',
        azure: 'Data Factory',
        local: 'Apache Airflow / Prefect',
        notes: 'Workflow management'
      },
      {
        layer: 'BI Tools',
        aws: 'QuickSight',
        gcp: 'Looker',
        azure: 'Power BI',
        local: 'Apache Superset / Metabase',
        notes: 'Data visualization and reporting'
      }
    ],
    considerations: [
      'Use partitioning for efficient queries',
      'Implement data quality checks',
      'Set up data lifecycle policies',
      'Use columnar formats (Parquet, ORC)',
      'Implement incremental processing',
      'Monitor data freshness and pipeline health'
    ],
    estimatedCost: '$1,000-5,000/month (varies with data volume)',
    localCost: '$10,000-30,000 upfront + $1,000-3,000/month (storage, compute cluster)'
  },
  'ml-platform': {
    name: 'ML Training & Inference',
    description: 'Machine learning platform for training and serving models',
    components: [
      {
        layer: 'Data Storage',
        aws: 'S3',
        gcp: 'Cloud Storage',
        azure: 'Blob Storage',
        notes: 'Training data and model artifacts'
      },
      {
        layer: 'Training',
        aws: 'SageMaker',
        gcp: 'Vertex AI',
        azure: 'Azure ML',
        notes: 'Distributed model training'
      },
      {
        layer: 'GPU Compute',
        aws: 'EC2 P4/P5 instances',
        gcp: 'A2/A3 instances',
        azure: 'NC-series VMs',
        notes: 'GPU instances for training'
      },
      {
        layer: 'Model Registry',
        aws: 'SageMaker Model Registry',
        gcp: 'Vertex AI Model Registry',
        azure: 'Azure ML Registry',
        notes: 'Version control for models'
      },
      {
        layer: 'Inference',
        aws: 'SageMaker Endpoints',
        gcp: 'Vertex AI Endpoints',
        azure: 'Azure ML Endpoints',
        notes: 'Real-time model serving'
      },
      {
        layer: 'Monitoring',
        aws: 'SageMaker Model Monitor',
        gcp: 'Vertex AI Model Monitoring',
        azure: 'Azure ML Monitoring',
        notes: 'Model drift and performance'
      },
      {
        layer: 'Feature Store',
        aws: 'SageMaker Feature Store',
        gcp: 'Vertex AI Feature Store',
        azure: 'Azure ML Feature Store',
        notes: 'Centralized feature management'
      }
    ],
    considerations: [
      'Use spot instances for training to reduce costs',
      'Implement model versioning and A/B testing',
      'Monitor model performance and drift',
      'Use batch inference for non-real-time predictions',
      'Implement MLOps practices (CI/CD for ML)',
      'Consider model compression for inference'
    ],
    estimatedCost: '$2,000-20,000/month (highly variable based on GPU usage)'
  },
  'real-time-streaming': {
    name: 'Real-Time Streaming Platform',
    description: 'High-throughput streaming data processing and analytics',
    components: [
      {
        layer: 'Message Broker',
        aws: 'MSK (Kafka) / Kinesis',
        gcp: 'Pub/Sub',
        azure: 'Event Hubs',
        notes: 'High-throughput message streaming'
      },
      {
        layer: 'Stream Processing',
        aws: 'Kinesis Analytics / Flink',
        gcp: 'Dataflow',
        azure: 'Stream Analytics',
        notes: 'Real-time data transformation'
      },
      {
        layer: 'Time-Series DB',
        aws: 'Timestream',
        gcp: 'Bigtable',
        azure: 'Time Series Insights',
        notes: 'Store time-series metrics'
      },
      {
        layer: 'Real-Time Analytics',
        aws: 'Kinesis Analytics',
        gcp: 'Dataflow + BigQuery',
        azure: 'Stream Analytics',
        notes: 'Real-time aggregations'
      },
      {
        layer: 'Caching',
        aws: 'ElastiCache',
        gcp: 'Memorystore',
        azure: 'Cache for Redis',
        notes: 'Low-latency data access'
      },
      {
        layer: 'Visualization',
        aws: 'Grafana / QuickSight',
        gcp: 'Looker / Grafana',
        azure: 'Power BI / Grafana',
        notes: 'Real-time dashboards'
      }
    ],
    considerations: [
      'Design for exactly-once processing semantics',
      'Implement backpressure handling',
      'Use windowing for aggregations',
      'Monitor lag and throughput',
      'Implement dead letter queues',
      'Plan for data retention and replay'
    ],
    estimatedCost: '$1,500-8,000/month (based on throughput)'
  },
  'mobile-backend': {
    name: 'Mobile App Backend',
    description: 'Scalable backend for mobile applications with offline sync',
    components: [
      {
        layer: 'API Gateway',
        aws: 'API Gateway',
        gcp: 'Cloud Endpoints',
        azure: 'API Management',
        notes: 'RESTful/GraphQL APIs'
      },
      {
        layer: 'Authentication',
        aws: 'Cognito',
        gcp: 'Firebase Auth',
        azure: 'Azure AD B2C',
        notes: 'User authentication'
      },
      {
        layer: 'Backend Logic',
        aws: 'Lambda / ECS',
        gcp: 'Cloud Functions / Cloud Run',
        azure: 'Functions / Container Apps',
        notes: 'Business logic processing'
      },
      {
        layer: 'Database',
        aws: 'DynamoDB / Aurora',
        gcp: 'Firestore / Cloud SQL',
        azure: 'Cosmos DB',
        notes: 'User data and app state'
      },
      {
        layer: 'File Storage',
        aws: 'S3',
        gcp: 'Cloud Storage',
        azure: 'Blob Storage',
        notes: 'Images, videos, documents'
      },
      {
        layer: 'Push Notifications',
        aws: 'SNS',
        gcp: 'Firebase Cloud Messaging',
        azure: 'Notification Hubs',
        notes: 'Mobile push notifications'
      },
      {
        layer: 'Analytics',
        aws: 'Pinpoint',
        gcp: 'Firebase Analytics',
        azure: 'App Center Analytics',
        notes: 'User behavior tracking'
      }
    ],
    considerations: [
      'Implement offline-first architecture',
      'Use GraphQL for flexible data fetching',
      'Implement proper rate limiting',
      'Optimize payload sizes for mobile',
      'Handle network failures gracefully',
      'Implement app versioning and feature flags'
    ],
    estimatedCost: '$300-3,000/month (scales with users)'
  },
  'iot-platform': {
    name: 'IoT Platform',
    description: 'Internet of Things data collection and device management',
    components: [
      {
        layer: 'Device Gateway',
        aws: 'IoT Core',
        gcp: 'IoT Core',
        azure: 'IoT Hub',
        notes: 'MQTT/HTTP device connectivity'
      },
      {
        layer: 'Device Management',
        aws: 'IoT Device Management',
        gcp: 'IoT Device Manager',
        azure: 'IoT Hub Device Provisioning',
        notes: 'Device registration and updates'
      },
      {
        layer: 'Data Ingestion',
        aws: 'Kinesis',
        gcp: 'Pub/Sub',
        azure: 'Event Hubs',
        notes: 'High-volume telemetry data'
      },
      {
        layer: 'Time-Series Storage',
        aws: 'Timestream',
        gcp: 'Bigtable',
        azure: 'Time Series Insights',
        notes: 'Store sensor data'
      },
      {
        layer: 'Rules Engine',
        aws: 'IoT Rules',
        gcp: 'Cloud Functions',
        azure: 'Stream Analytics',
        notes: 'Real-time data processing'
      },
      {
        layer: 'Analytics',
        aws: 'IoT Analytics',
        gcp: 'BigQuery',
        azure: 'Synapse Analytics',
        notes: 'Historical analysis'
      }
    ],
    considerations: [
      'Implement device authentication (X.509 certificates)',
      'Design for intermittent connectivity',
      'Use MQTT for efficient communication',
      'Implement OTA (over-the-air) updates',
      'Monitor device health and connectivity',
      'Plan for data retention and archival'
    ],
    estimatedCost: '$500-5,000/month (scales with device count)'
  }
};

export const SystemPlanner = () => {
  const [selectedSystem, setSelectedSystem] = useState('web-app');
  const [selectedProvider, setSelectedProvider] = useState<'aws' | 'gcp' | 'azure'>('aws');

  const plan = systemPlans[selectedSystem];

  return (
    <GlassCard className="p-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">System Architecture Planner</h2>
          <p className="text-white/70">
            Select a system type to see recommended architecture and cloud service mappings
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <GlassSelect
            label="System Type"
            value={selectedSystem}
            onChange={(e) => setSelectedSystem(e.target.value)}
            options={[
              { value: 'web-app', label: '🌐 Web Application (3-Tier)' },
              { value: 'microservices', label: '🔷 Microservices Architecture' },
              { value: 'serverless', label: '⚡ Serverless Application' },
              { value: 'data-pipeline', label: '📊 Data Pipeline & Analytics' },
              { value: 'ml-platform', label: '🤖 ML Training & Inference' },
              { value: 'real-time-streaming', label: '🌊 Real-Time Streaming' },
              { value: 'mobile-backend', label: '📱 Mobile App Backend' },
              { value: 'iot-platform', label: '🔌 IoT Platform' }
            ]}
          />

          <GlassSelect
            label="Primary Cloud Provider"
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value as 'aws' | 'gcp' | 'azure')}
            options={[
              { value: 'aws', label: 'AWS (Amazon Web Services)' },
              { value: 'gcp', label: 'GCP (Google Cloud Platform)' },
              { value: 'azure', label: 'Azure (Microsoft Azure)' }
            ]}
          />
        </div>

        <div className="p-6 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
          <p className="text-white/80">{plan.description}</p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4">Architecture Components</h3>
          <div className="space-y-3">
            {plan.components.map((component, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-white">{component.layer}</div>
                  <div className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${selectedProvider === 'aws' ? 'bg-orange-500/20 text-orange-300' : ''}
                    ${selectedProvider === 'gcp' ? 'bg-blue-500/20 text-blue-300' : ''}
                    ${selectedProvider === 'azure' ? 'bg-purple-500/20 text-purple-300' : ''}
                  `}>
                    {selectedProvider === 'aws' && component.aws}
                    {selectedProvider === 'gcp' && component.gcp}
                    {selectedProvider === 'azure' && component.azure}
                  </div>
                </div>
                <div className="text-sm text-white/70">{component.notes}</div>
                <div className="mt-2 pt-2 border-t border-white/10 text-xs text-white/50">
                  <span className="text-orange-300">AWS:</span> {component.aws} • 
                  <span className="text-blue-300 ml-2">GCP:</span> {component.gcp} • 
                  <span className="text-purple-300 ml-2">Azure:</span> {component.azure}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Key Considerations</h3>
            <ul className="space-y-2">
              {plan.considerations.map((consideration, idx) => (
                <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>{consideration}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-lg bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30">
            <h3 className="text-lg font-bold text-white mb-2">Estimated Cost</h3>
            <div className="text-2xl font-bold text-green-400 mb-2">{plan.estimatedCost}</div>
            <p className="text-sm text-white/70">
              Costs vary based on traffic, data volume, and specific configurations. 
              Use our calculators for detailed estimates.
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

