import { GlassCard } from '@/components/ui';
import Link from 'next/link';

export default function DataAnalyticsPage() {
  const dataLakeArchitectures = [
    {
      name: 'Apache Hadoop',
      type: 'Distributed Storage & Processing',
      components: ['HDFS', 'YARN', 'MapReduce'],
      cloudServices: {
        aws: 'EMR (Elastic MapReduce)',
        gcp: 'Dataproc',
        azure: 'HDInsight'
      },
      bestFor: ['Batch processing', 'Large-scale ETL', 'Legacy workloads'],
      considerations: ['Mature ecosystem', 'Complex operations', 'Being superseded by modern alternatives']
    },
    {
      name: 'Apache Iceberg',
      type: 'Table Format',
      components: ['Table metadata', 'Snapshot isolation', 'Time travel', 'Schema evolution'],
      cloudServices: {
        aws: 'S3 + Athena/EMR',
        gcp: 'GCS + BigQuery/Dataproc',
        azure: 'ADLS + Synapse/Databricks'
      },
      bestFor: ['ACID transactions on data lakes', 'Multi-engine access', 'Streaming + batch'],
      considerations: ['Modern standard', 'Great performance', 'Growing ecosystem']
    },
    {
      name: 'Delta Lake',
      type: 'Table Format (Databricks)',
      components: ['ACID transactions', 'Time travel', 'Schema enforcement', 'Unified batch/streaming'],
      cloudServices: {
        aws: 'Databricks on AWS',
        gcp: 'Databricks on GCP',
        azure: 'Databricks on Azure'
      },
      bestFor: ['Databricks environments', 'Lakehouse architecture', 'ML workflows'],
      considerations: ['Tight Databricks integration', 'Excellent performance', 'Proprietary features']
    },
    {
      name: 'Apache Hudi',
      type: 'Table Format',
      components: ['Incremental processing', 'Record-level updates', 'Indexing'],
      cloudServices: {
        aws: 'EMR + S3',
        gcp: 'Dataproc + GCS',
        azure: 'HDInsight + ADLS'
      },
      bestFor: ['CDC pipelines', 'Incremental ETL', 'Upserts at scale'],
      considerations: ['Uber-developed', 'Strong CDC support', 'Complex setup']
    }
  ];

  const queryEngines = [
    {
      name: 'Trino (formerly Presto)',
      description: 'Distributed SQL query engine for big data',
      features: ['Federated queries', 'Multiple data sources', 'ANSI SQL', 'MPP architecture'],
      connectors: ['S3/HDFS', 'PostgreSQL', 'MySQL', 'Kafka', 'Elasticsearch', '60+ connectors'],
      performance: 'Sub-second to minutes for TB-scale data',
      cloudDeployment: ['Self-hosted on EC2/GKE/AKS', 'Starburst Enterprise', 'AWS EMR'],
      bestFor: ['Ad-hoc analytics', 'Data lake queries', 'Federated analytics', 'Interactive BI']
    },
    {
      name: 'Apache Spark',
      description: 'Unified analytics engine for big data',
      features: ['Batch + streaming', 'ML library', 'Graph processing', 'SQL support'],
      connectors: ['All major data sources', 'Delta/Iceberg/Hudi', 'Kafka', 'JDBC'],
      performance: 'Minutes to hours for TB-PB scale',
      cloudDeployment: ['EMR', 'Dataproc', 'Databricks', 'HDInsight', 'Synapse'],
      bestFor: ['ETL pipelines', 'ML training', 'Streaming analytics', 'Complex transformations']
    },
    {
      name: 'Apache Flink',
      description: 'Stream processing framework',
      features: ['True streaming', 'Event time processing', 'Exactly-once semantics', 'SQL support'],
      connectors: ['Kafka', 'Kinesis', 'Pulsar', 'JDBC', 'Elasticsearch'],
      performance: 'Milliseconds to seconds latency',
      cloudDeployment: ['Kinesis Data Analytics', 'Dataflow', 'HDInsight', 'Self-hosted'],
      bestFor: ['Real-time analytics', 'Event-driven apps', 'Complex event processing', 'Low-latency pipelines']
    },
    {
      name: 'DuckDB',
      description: 'In-process analytical database',
      features: ['Embedded OLAP', 'Columnar storage', 'Vectorized execution', 'Parquet native'],
      connectors: ['Parquet', 'CSV', 'JSON', 'PostgreSQL', 'S3', 'HTTP'],
      performance: 'Sub-second for GB-scale data',
      cloudDeployment: ['Lambda functions', 'Cloud Functions', 'Containers', 'Edge computing'],
      bestFor: ['Local analytics', 'Serverless analytics', 'Data science', 'Prototyping']
    }
  ];

  const realtimePlatforms = [
    {
      platform: 'Apache Kafka',
      type: 'Distributed Event Streaming',
      features: ['High throughput', 'Durable storage', 'Stream processing', 'Connect framework'],
      managedServices: {
        aws: 'MSK (Managed Streaming for Kafka)',
        gcp: 'Confluent Cloud on GCP',
        azure: 'Event Hubs (Kafka-compatible)'
      },
      useCases: ['Event sourcing', 'Log aggregation', 'Real-time ETL', 'Microservices messaging'],
      throughput: 'Millions of events/sec'
    },
    {
      platform: 'Apache Pulsar',
      type: 'Cloud-Native Messaging',
      features: ['Multi-tenancy', 'Geo-replication', 'Tiered storage', 'Functions'],
      managedServices: {
        aws: 'StreamNative Cloud',
        gcp: 'StreamNative Cloud',
        azure: 'Self-hosted / StreamNative'
      },
      useCases: ['Multi-tenant platforms', 'IoT', 'Financial services', 'Cloud-native apps'],
      throughput: 'Millions of events/sec'
    },
    {
      platform: 'AWS Kinesis',
      type: 'Managed Streaming',
      features: ['Fully managed', 'Auto-scaling', 'Data Firehose', 'Analytics'],
      managedServices: {
        aws: 'Kinesis Data Streams',
        gcp: 'Pub/Sub (alternative)',
        azure: 'Event Hubs (alternative)'
      },
      useCases: ['AWS-native apps', 'Log processing', 'Clickstream', 'IoT telemetry'],
      throughput: 'Hundreds of thousands of events/sec per shard'
    },
    {
      platform: 'Apache Druid',
      type: 'Real-Time OLAP',
      features: ['Sub-second queries', 'Real-time ingestion', 'Columnar storage', 'Approximate algorithms'],
      managedServices: {
        aws: 'Imply Cloud',
        gcp: 'Imply Cloud',
        azure: 'Self-hosted / Imply'
      },
      useCases: ['Real-time dashboards', 'User analytics', 'Network telemetry', 'APM'],
      throughput: 'Millions of events/sec ingestion'
    }
  ];

  const architecturePatterns = [
    {
      pattern: 'Lambda Architecture',
      description: 'Batch + speed layers for comprehensive data processing',
      components: {
        batch: 'Spark/Hadoop on S3/HDFS',
        speed: 'Flink/Spark Streaming',
        serving: 'Trino/Presto'
      },
      pros: ['Handles all data types', 'Fault tolerant', 'Comprehensive views'],
      cons: ['Complex to maintain', 'Duplicate logic', 'Higher costs']
    },
    {
      pattern: 'Kappa Architecture',
      description: 'Stream-first architecture, everything is a stream',
      components: {
        streaming: 'Kafka + Flink/Spark Streaming',
        storage: 'Iceberg/Delta Lake',
        serving: 'Real-time + batch queries'
      },
      pros: ['Simpler than Lambda', 'Single codebase', 'Lower latency'],
      cons: ['Reprocessing challenges', 'Stream complexity', 'Limited batch optimizations']
    },
    {
      pattern: 'Lakehouse Architecture',
      description: 'Unified platform for data lake + warehouse capabilities',
      components: {
        storage: 'S3/ADLS/GCS with Delta/Iceberg',
        compute: 'Spark/Trino/Databricks',
        governance: 'Unity Catalog/AWS Glue'
      },
      pros: ['ACID transactions', 'Single source of truth', 'Cost effective'],
      cons: ['Newer paradigm', 'Tool maturity varies', 'Requires planning']
    },
    {
      pattern: 'Data Mesh',
      description: 'Decentralized data ownership with domain-oriented architecture',
      components: {
        domains: 'Domain-specific data products',
        platform: 'Self-serve infrastructure',
        governance: 'Federated computational governance'
      },
      pros: ['Scalable organization', 'Domain expertise', 'Faster innovation'],
      cons: ['Organizational change', 'Governance complexity', 'Requires maturity']
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <Link href="/quick-ref" className="text-white/70 hover:text-white text-sm mb-2 inline-block">
          ← Back to Quick Reference
        </Link>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
          Data Analytics & Real-Time Platforms
        </h1>
        <p className="text-white/70">
          Data lake architectures, query engines, and real-time analytics platforms
        </p>
      </div>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Data Lake Table Formats</h2>
        <div className="space-y-6">
          {dataLakeArchitectures.map((arch, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-white/5 border border-white/10 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">{arch.name}</h3>
                  <p className="text-sm text-white/70">{arch.type}</p>
                </div>
              </div>

              <div>
                <div className="text-sm text-white/70 mb-2">Key Components:</div>
                <div className="flex gap-2 flex-wrap">
                  {arch.components.map((comp, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-sm">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-white/70 mb-2">Best For:</div>
                  <ul className="text-sm text-white/80 space-y-1">
                    {arch.bestFor.map((use, i) => (
                      <li key={i}>• {use}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-sm text-white/70 mb-2">Considerations:</div>
                  <ul className="text-sm text-white/80 space-y-1">
                    {arch.considerations.map((con, i) => (
                      <li key={i}>• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <div className="text-sm text-white/70 mb-2">Cloud Services:</div>
                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <span className="text-blue-300 font-medium">AWS:</span>
                    <span className="text-white/80 text-sm ml-2">{arch.cloudServices.aws}</span>
                  </div>
                  <div>
                    <span className="text-green-300 font-medium">GCP:</span>
                    <span className="text-white/80 text-sm ml-2">{arch.cloudServices.gcp}</span>
                  </div>
                  <div>
                    <span className="text-purple-300 font-medium">Azure:</span>
                    <span className="text-white/80 text-sm ml-2">{arch.cloudServices.azure}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Query Engines & Processing Frameworks</h2>
        <div className="space-y-6">
          {queryEngines.map((engine, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-white/5 border border-white/10 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white">{engine.name}</h3>
                <p className="text-white/70 mt-1">{engine.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-white/70 mb-2">Key Features:</div>
                  <ul className="text-sm text-white/80 space-y-1">
                    {engine.features.map((feature, i) => (
                      <li key={i}>• {feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-sm text-white/70 mb-2">Best For:</div>
                  <ul className="text-sm text-white/80 space-y-1">
                    {engine.bestFor.map((use, i) => (
                      <li key={i}>• {use}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-3 border-t border-white/10">
                <div>
                  <div className="text-sm text-white/70 mb-1">Performance:</div>
                  <div className="text-sm text-green-400">{engine.performance}</div>
                </div>
                <div>
                  <div className="text-sm text-white/70 mb-1">Cloud Deployment:</div>
                  <div className="text-sm text-white/80">{engine.cloudDeployment.join(', ')}</div>
                </div>
              </div>

              <div>
                <div className="text-xs text-white/70 mb-2">Connectors:</div>
                <div className="flex gap-2 flex-wrap">
                  {engine.connectors.map((conn, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-white/10 text-white/80 text-xs">
                      {conn}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Real-Time Analytics Platforms</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {realtimePlatforms.map((platform, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-white/5 border border-white/10 space-y-3">
              <div>
                <h3 className="text-lg font-bold text-white">{platform.platform}</h3>
                <p className="text-sm text-white/70">{platform.type}</p>
              </div>

              <div>
                <div className="text-sm text-white/70 mb-2">Features:</div>
                <ul className="text-sm text-white/80 space-y-1">
                  {platform.features.map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-sm text-white/70 mb-2">Use Cases:</div>
                <div className="flex gap-2 flex-wrap">
                  {platform.useCases.map((use, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-purple-500/20 text-purple-300 text-xs">
                      {use}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <div className="text-xs text-white/70 mb-1">Throughput:</div>
                <div className="text-sm text-green-400">{platform.throughput}</div>
              </div>

              <div>
                <div className="text-xs text-white/70 mb-2">Managed Services:</div>
                <div className="space-y-1 text-xs">
                  <div><span className="text-blue-300">AWS:</span> {platform.managedServices.aws}</div>
                  <div><span className="text-green-300">GCP:</span> {platform.managedServices.gcp}</div>
                  <div><span className="text-purple-300">Azure:</span> {platform.managedServices.azure}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Data Architecture Patterns</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {architecturePatterns.map((pattern, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-white/5 border border-white/10 space-y-3">
              <h3 className="text-lg font-bold text-white">{pattern.pattern}</h3>
              <p className="text-sm text-white/70">{pattern.description}</p>

              <div>
                <div className="text-sm text-white/70 mb-2">Components:</div>
                <div className="space-y-1 text-sm text-white/80">
                  {Object.entries(pattern.components).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-blue-300 capitalize">{key}:</span> {value}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/10">
                <div>
                  <div className="text-xs text-green-400 mb-1">Pros:</div>
                  <ul className="text-xs text-white/80 space-y-1">
                    {pattern.pros.map((pro, i) => (
                      <li key={i}>+ {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs text-red-400 mb-1">Cons:</div>
                  <ul className="text-xs text-white/80 space-y-1">
                    {pattern.cons.map((con, i) => (
                      <li key={i}>- {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="text-lg font-bold text-white mb-4">Technology Selection Guide</h3>
        <div className="space-y-2 text-sm text-white/70">
          <div>• <strong>Table Format:</strong> Iceberg for new projects, Delta for Databricks, Hudi for CDC-heavy workloads</div>
          <div>• <strong>Query Engine:</strong> Trino for ad-hoc, Spark for ETL, Flink for streaming, DuckDB for local/serverless</div>
          <div>• <strong>Streaming:</strong> Kafka for high throughput, Pulsar for multi-tenancy, Kinesis for AWS-native</div>
          <div>• <strong>Real-time OLAP:</strong> Druid for dashboards, ClickHouse for logs, Pinot for user-facing analytics</div>
          <div>• <strong>Architecture:</strong> Lakehouse for most use cases, Kappa for stream-first, Data Mesh for large orgs</div>
        </div>
      </GlassCard>
    </div>
  );
}

