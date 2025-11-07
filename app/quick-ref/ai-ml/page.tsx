import { GlassCard } from '@/components/ui';
import Link from 'next/link';

export default function AIMLPage() {
  const llmArchitectures = [
    {
      name: 'GPT (Decoder-only)',
      description: 'Autoregressive language models for text generation',
      examples: ['GPT-3', 'GPT-4', 'LLaMA', 'Mistral', 'Claude'],
      architecture: 'Transformer decoder with causal attention',
      bestFor: ['Text generation', 'Chat applications', 'Code generation', 'Creative writing'],
      keyFeatures: ['Unidirectional attention', 'Next-token prediction', 'In-context learning']
    },
    {
      name: 'BERT (Encoder-only)',
      description: 'Bidirectional models for understanding tasks',
      examples: ['BERT', 'RoBERTa', 'ALBERT', 'DeBERTa'],
      architecture: 'Transformer encoder with bidirectional attention',
      bestFor: ['Classification', 'Named entity recognition', 'Question answering', 'Sentiment analysis'],
      keyFeatures: ['Bidirectional context', 'Masked language modeling', 'Fine-tuning for downstream tasks']
    },
    {
      name: 'T5 (Encoder-Decoder)',
      description: 'Unified text-to-text framework',
      examples: ['T5', 'BART', 'mT5', 'UL2'],
      architecture: 'Full transformer with encoder and decoder',
      bestFor: ['Translation', 'Summarization', 'Multi-task learning', 'Text-to-text tasks'],
      keyFeatures: ['Flexible architecture', 'Sequence-to-sequence', 'Task prefixes']
    },
    {
      name: 'Mixture of Experts (MoE)',
      description: 'Sparse models with conditional computation',
      examples: ['Switch Transformer', 'GLaM', 'Mixtral 8x7B'],
      architecture: 'Transformer with sparse expert layers',
      bestFor: ['Scaling to trillion parameters', 'Efficient inference', 'Multi-domain models'],
      keyFeatures: ['Sparse activation', 'Expert routing', 'Conditional computation']
    }
  ];

  const generativeAIFrameworks = [
    {
      name: 'Hugging Face Transformers',
      type: 'Model Hub & Library',
      language: 'Python',
      features: ['Pre-trained models', 'Easy fine-tuning', 'Production deployment', 'Multi-framework support'],
      cloudSupport: { aws: 'SageMaker', gcp: 'Vertex AI', azure: 'ML Studio' },
      bestFor: 'Quick prototyping and deployment of transformer models'
    },
    {
      name: 'LangChain',
      type: 'LLM Application Framework',
      language: 'Python / TypeScript',
      features: ['Chain composition', 'Memory management', 'Agent framework', 'Vector store integration'],
      cloudSupport: { aws: 'Bedrock', gcp: 'Vertex AI', azure: 'OpenAI Service' },
      bestFor: 'Building LLM-powered applications and agents'
    },
    {
      name: 'vLLM',
      type: 'Inference Engine',
      language: 'Python',
      features: ['PagedAttention', 'Continuous batching', 'High throughput', 'Low latency'],
      cloudSupport: { aws: 'EC2/EKS', gcp: 'GKE', azure: 'AKS' },
      bestFor: 'High-performance LLM inference serving'
    },
    {
      name: 'DeepSpeed',
      type: 'Training Optimization',
      language: 'Python',
      features: ['ZeRO optimizer', 'Pipeline parallelism', 'Mixed precision', '3D parallelism'],
      cloudSupport: { aws: 'SageMaker', gcp: 'Vertex AI', azure: 'ML Studio' },
      bestFor: 'Training large-scale models efficiently'
    },
    {
      name: 'Ray / Anyscale',
      type: 'Distributed Computing',
      language: 'Python',
      features: ['Distributed training', 'Hyperparameter tuning', 'Serving', 'Auto-scaling'],
      cloudSupport: { aws: 'Native', gcp: 'Native', azure: 'Native' },
      bestFor: 'Scalable ML workflows and distributed inference'
    },
    {
      name: 'TensorRT-LLM',
      type: 'NVIDIA Inference',
      language: 'Python / C++',
      features: ['Optimized kernels', 'Multi-GPU inference', 'Quantization', 'Flash attention'],
      cloudSupport: { aws: 'EC2 GPU', gcp: 'Compute GPU', azure: 'NC-series' },
      bestFor: 'Maximum performance on NVIDIA GPUs'
    }
  ];

  const transformerConcepts = [
    {
      concept: 'Self-Attention',
      description: 'Mechanism that weighs importance of different tokens',
      formula: 'Attention(Q,K,V) = softmax(QK^T/√d_k)V',
      importance: 'Core building block of transformers'
    },
    {
      concept: 'Multi-Head Attention',
      description: 'Multiple attention mechanisms in parallel',
      formula: 'MultiHead(Q,K,V) = Concat(head_1,...,head_h)W^O',
      importance: 'Allows model to attend to different representation subspaces'
    },
    {
      concept: 'Positional Encoding',
      description: 'Injects sequence order information',
      formula: 'PE(pos,2i) = sin(pos/10000^(2i/d)), PE(pos,2i+1) = cos(pos/10000^(2i/d))',
      importance: 'Transformers have no inherent notion of order'
    },
    {
      concept: 'Layer Normalization',
      description: 'Normalizes activations across features',
      formula: 'LayerNorm(x) = γ((x-μ)/σ) + β',
      importance: 'Stabilizes training and improves convergence'
    }
  ];

  const optimizationTechniques = [
    {
      technique: 'Quantization',
      types: ['INT8', 'INT4', 'FP8', 'GPTQ', 'AWQ'],
      benefit: '2-4x memory reduction, faster inference',
      tradeoff: 'Slight accuracy loss (typically <1%)',
      tools: ['bitsandbytes', 'GPTQ', 'AWQ', 'TensorRT']
    },
    {
      technique: 'LoRA (Low-Rank Adaptation)',
      types: ['LoRA', 'QLoRA', 'AdaLoRA'],
      benefit: 'Fine-tune with 0.1% of parameters',
      tradeoff: 'Slightly lower performance than full fine-tuning',
      tools: ['PEFT', 'Hugging Face', 'LLaMA Factory']
    },
    {
      technique: 'Flash Attention',
      types: ['Flash Attention 1', 'Flash Attention 2', 'Flash Decoding'],
      benefit: '2-4x faster attention, reduced memory',
      tradeoff: 'Requires specific GPU support',
      tools: ['xformers', 'TensorRT-LLM', 'vLLM']
    },
    {
      technique: 'KV Cache Optimization',
      types: ['PagedAttention', 'Multi-Query Attention', 'Grouped-Query Attention'],
      benefit: 'Reduced memory for inference',
      tradeoff: 'Implementation complexity',
      tools: ['vLLM', 'TensorRT-LLM', 'Text Generation Inference']
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <Link href="/quick-ref" className="text-white/70 hover:text-white text-sm mb-2 inline-block">
          ← Back to Quick Reference
        </Link>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          AI/ML & LLM Architectures
        </h1>
        <p className="text-white/70">
          Deep dive into transformer architectures, LLMs, and generative AI frameworks
        </p>
      </div>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">LLM Architecture Types</h2>
        <div className="space-y-6">
          {llmArchitectures.map((arch, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-white/5 border border-white/10 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white">{arch.name}</h3>
                <p className="text-white/70 mt-1">{arch.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-white/70 mb-2">Examples:</div>
                  <div className="flex gap-2 flex-wrap">
                    {arch.examples.map((ex, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-sm">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-white/70 mb-2">Architecture:</div>
                  <div className="text-sm text-white">{arch.architecture}</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-white/70 mb-2">Best For:</div>
                <div className="flex gap-2 flex-wrap">
                  {arch.bestFor.map((use, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-white/10 text-white/80 text-xs">
                      {use}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <div className="text-sm text-white/70 mb-2">Key Features:</div>
                <ul className="text-sm text-white/80 space-y-1">
                  {arch.keyFeatures.map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Generative AI Frameworks</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {generativeAIFrameworks.map((framework, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-white/5 border border-white/10 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-white">{framework.name}</h3>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs">
                  {framework.type}
                </span>
              </div>

              <div className="text-sm text-white/70">{framework.bestFor}</div>

              <div>
                <div className="text-xs text-white/70 mb-2">Key Features:</div>
                <ul className="text-xs text-white/80 space-y-1">
                  {framework.features.map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-white/10">
                <div className="text-xs text-white/70 mb-2">Cloud Integration:</div>
                <div className="space-y-1 text-xs">
                  <div><span className="text-blue-300">AWS:</span> {framework.cloudSupport.aws}</div>
                  <div><span className="text-green-300">GCP:</span> {framework.cloudSupport.gcp}</div>
                  <div><span className="text-purple-300">Azure:</span> {framework.cloudSupport.azure}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Transformer Core Concepts</h2>
        <div className="space-y-4">
          {transformerConcepts.map((item, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-white/5 border border-white/10 space-y-2">
              <h3 className="text-lg font-bold text-white">{item.concept}</h3>
              <p className="text-white/70">{item.description}</p>
              <div className="p-3 rounded bg-black/30 font-mono text-sm text-green-300 overflow-x-auto">
                {item.formula}
              </div>
              <div className="text-sm text-yellow-300">💡 {item.importance}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Optimization Techniques</h2>
        <div className="space-y-4">
          {optimizationTechniques.map((opt, idx) => (
            <div key={idx} className="p-6 rounded-lg bg-white/5 border border-white/10 space-y-3">
              <h3 className="text-lg font-bold text-white">{opt.technique}</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-white/70 mb-1">Types:</div>
                  <div className="flex gap-2 flex-wrap">
                    {opt.types.map((type, i) => (
                      <span key={i} className="px-2 py-1 rounded bg-white/10 text-white text-xs">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-white/70 mb-1">Tools:</div>
                  <div className="flex gap-2 flex-wrap">
                    {opt.tools.map((tool, i) => (
                      <span key={i} className="px-2 py-1 rounded bg-blue-500/20 text-blue-300 text-xs">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-sm text-green-400">✓ Benefit: </span>
                  <span className="text-sm text-white/80">{opt.benefit}</span>
                </div>
                <div>
                  <span className="text-sm text-yellow-400">⚠ Tradeoff: </span>
                  <span className="text-sm text-white/80">{opt.tradeoff}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="text-lg font-bold text-white mb-4">Quick Decision Guide</h3>
        <div className="space-y-2 text-sm text-white/70">
          <div>• <strong>Training LLMs:</strong> Use DeepSpeed + ZeRO on H100/A100 clusters</div>
          <div>• <strong>Fine-tuning:</strong> Use QLoRA for consumer GPUs, full fine-tuning for production</div>
          <div>• <strong>Inference:</strong> vLLM or TensorRT-LLM with quantization for best performance</div>
          <div>• <strong>Applications:</strong> LangChain for rapid prototyping, custom solutions for production</div>
          <div>• <strong>Cost optimization:</strong> Quantization + LoRA + cloud spot instances</div>
        </div>
      </GlassCard>
    </div>
  );
}

