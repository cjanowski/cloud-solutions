'use client';

import { useState } from 'react';
import { GlassCard, GlassSelect } from '@/components/ui';

const cliCommands = {
  aws: [
    {
      task: 'List EC2 Instances',
      command: 'aws ec2 describe-instances',
      description: 'List all EC2 instances in the current region'
    },
    {
      task: 'List S3 Buckets',
      command: 'aws s3 ls',
      description: 'List all S3 buckets'
    },
    {
      task: 'Upload to S3',
      command: 'aws s3 cp file.txt s3://bucket-name/',
      description: 'Upload a file to S3 bucket'
    },
    {
      task: 'Create EC2 Instance',
      command: 'aws ec2 run-instances --image-id ami-xxx --instance-type t3.micro',
      description: 'Launch a new EC2 instance'
    },
    {
      task: 'List Lambda Functions',
      command: 'aws lambda list-functions',
      description: 'List all Lambda functions'
    },
    {
      task: 'Get IAM User',
      command: 'aws iam get-user',
      description: 'Get current IAM user details'
    },
  ],
  gcp: [
    {
      task: 'List Compute Instances',
      command: 'gcloud compute instances list',
      description: 'List all Compute Engine instances'
    },
    {
      task: 'List Storage Buckets',
      command: 'gsutil ls',
      description: 'List all Cloud Storage buckets'
    },
    {
      task: 'Upload to Storage',
      command: 'gsutil cp file.txt gs://bucket-name/',
      description: 'Upload a file to Cloud Storage'
    },
    {
      task: 'Create Compute Instance',
      command: 'gcloud compute instances create instance-name --machine-type=e2-micro',
      description: 'Create a new Compute Engine instance'
    },
    {
      task: 'List Cloud Functions',
      command: 'gcloud functions list',
      description: 'List all Cloud Functions'
    },
    {
      task: 'Set Project',
      command: 'gcloud config set project PROJECT_ID',
      description: 'Set the active GCP project'
    },
  ],
  azure: [
    {
      task: 'List Virtual Machines',
      command: 'az vm list',
      description: 'List all virtual machines'
    },
    {
      task: 'List Storage Accounts',
      command: 'az storage account list',
      description: 'List all storage accounts'
    },
    {
      task: 'Upload to Blob Storage',
      command: 'az storage blob upload --account-name myaccount --container-name mycontainer --file file.txt',
      description: 'Upload a file to Blob Storage'
    },
    {
      task: 'Create Virtual Machine',
      command: 'az vm create --resource-group myRG --name myVM --image UbuntuLTS',
      description: 'Create a new virtual machine'
    },
    {
      task: 'List Functions',
      command: 'az functionapp list',
      description: 'List all Azure Functions'
    },
    {
      task: 'Login',
      command: 'az login',
      description: 'Login to Azure CLI'
    },
  ],
};

export const CLICommands = () => {
  const [selectedProvider, setSelectedProvider] = useState<'aws' | 'gcp' | 'azure'>('aws');

  return (
    <GlassCard className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Common CLI Commands</h2>
        <GlassSelect
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value as 'aws' | 'gcp' | 'azure')}
          options={[
            { value: 'aws', label: 'AWS CLI' },
            { value: 'gcp', label: 'GCP CLI' },
            { value: 'azure', label: 'Azure CLI' },
          ]}
          className="w-48"
        />
      </div>
      
      <div className="space-y-4">
        {cliCommands[selectedProvider].map((cmd, idx) => (
          <div key={idx} className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-white">{cmd.task}</h3>
            </div>
            <code className="block p-3 rounded bg-black/30 text-green-300 text-sm font-mono overflow-x-auto">
              {cmd.command}
            </code>
            <p className="text-sm text-white/70">{cmd.description}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

