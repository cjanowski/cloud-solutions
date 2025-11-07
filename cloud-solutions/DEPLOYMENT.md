# Deployment Guide

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your repository
5. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `cloud-solutions` (if not at repo root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Add environment variables (optional):
   - `PRICING_CACHE_TTL=3600`
   - Cloud provider API keys (when ready):
     - `AWS_ACCESS_KEY_ID`
     - `AWS_SECRET_ACCESS_KEY`
     - `GCP_API_KEY`
     - `AZURE_SUBSCRIPTION_ID`
7. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Navigate to the project directory:
```bash
cd cloud-solutions
```

3. Login to Vercel:
```bash
vercel login
```

4. Deploy:
```bash
vercel
```

5. For production deployment:
```bash
vercel --prod
```

## Environment Variables

The application works out of the box with fallback pricing data. To enable live pricing data:

### For Web Scraping (Default)
No configuration needed. The app will use web scraping with cached fallback data.

### For API Integration (Optional)
Add these environment variables in Vercel dashboard:

**AWS:**
- `AWS_ACCESS_KEY_ID` - Your AWS access key
- `AWS_SECRET_ACCESS_KEY` - Your AWS secret key

**GCP:**
- `GCP_API_KEY` - Your GCP API key

**Azure:**
- `AZURE_SUBSCRIPTION_ID` - Your Azure subscription ID

**Cache Settings:**
- `PRICING_CACHE_TTL` - Cache duration in seconds (default: 3600)

## Post-Deployment

1. Verify the deployment at your Vercel URL
2. Test all calculators and comparison tools
3. Check that pricing data is loading correctly
4. Monitor performance and caching in Vercel dashboard

## Custom Domain

To add a custom domain:
1. Go to your project in Vercel dashboard
2. Navigate to Settings → Domains
3. Add your custom domain
4. Configure DNS records as instructed

## Monitoring

- View deployment logs in Vercel dashboard
- Monitor API route performance
- Check cache hit rates for pricing data
- Set up alerts for errors or performance issues

## Troubleshooting

**Build Fails:**
- Check Node.js version (should be 18.x or higher)
- Verify all dependencies are in package.json
- Review build logs in Vercel dashboard

**Pricing Data Not Loading:**
- Check if API routes are working
- Verify fallback data is present
- Check browser console for errors

**Performance Issues:**
- Enable caching for pricing data
- Optimize images if added
- Review Vercel analytics

