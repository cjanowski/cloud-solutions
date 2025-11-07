# CloudSolutions - Multi-Cloud Tools & Calculators

A comprehensive multi-cloud solutions tool for AWS, GCP, and Azure with cost calculators, quick reference guides, and comparison tools. Perfect for solution architects and cloud professionals.

Visit Here: https://systemdesignschool.io/resource-estimator

## Features

- **Cost Calculators**: Compare compute, storage, and bandwidth pricing across cloud providers
- **Quick Reference**: Service mappings, CLI commands, and architecture patterns
- **Comparison Tools**: Side-by-side feature comparisons and trade-off analysis
- **Local vs Cloud**: TCO calculations for on-premises vs cloud solutions
- **Glassmorphism UI**: Beautiful, modern interface with frosted glass effects

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Recharts for visualizations
- Cheerio for web scraping

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

### API Keys (Optional)

The tool works with web scraping by default. To use official cloud provider APIs for more accurate pricing, create a `.env.local` file:

```env
# AWS
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret

# GCP
GCP_API_KEY=your_key

# Azure
AZURE_SUBSCRIPTION_ID=your_subscription_id

# Cache TTL (seconds)
PRICING_CACHE_TTL=3600
```

## Deployment

Deploy to Vercel:

```bash
vercel
```

Or use the Vercel dashboard to connect your repository.

## Project Structure

```
/app                    # Next.js app directory
  /calculators         # Cost calculator pages
  /quick-ref          # Quick reference pages
  /compare            # Comparison tools
  /api/pricing        # Pricing data API
/components
  /ui                 # Glassmorphism UI components
  /calculators        # Calculator components
  /charts             # Chart components
/lib
  /scrapers           # Web scraping modules
  /api-clients        # Cloud provider API clients
/data/static          # Fallback pricing data
```

## License

MIT
