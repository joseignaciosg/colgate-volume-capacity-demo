# Deployment Guide

## Quick Deploy to Vercel (5 minutes)

### Step 1: Go to Vercel
Visit [vercel.com/new](https://vercel.com/new) and sign in with your GitHub account.

### Step 2: Import Repository
1. Click "Import Git Repository"
2. Search for `colgate-volume-capacity-demo` or paste the URL:
   ```
   https://github.com/joseignaciosg/colgate-volume-capacity-demo
   ```

### Step 3: Configure (Optional)
Vercel will automatically detect Next.js. You can leave all settings as default:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Step 4: Deploy
Click **Deploy** and wait ~2-3 minutes.

### Step 5: Get Your URL
After deployment, Vercel will provide you with a production URL like:
```
https://colgate-volume-capacity-demo.vercel.app
```

---

## Alternative: Deploy via CLI

If you prefer using the command line:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (follow the prompts)
cd colgate-volume-capacity-demo
vercel --prod
```

---

## After Deployment

### Custom Domain (Optional)
1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain and follow DNS instructions

### Environment Variables (If Needed)
Currently, this app uses mock data and doesn't require environment variables.
For production, you would add:
- Database connection strings
- API keys
- Authentication secrets

---

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node.js version compatibility (16.x or higher)
- Review build logs in Vercel dashboard

### Deployment Takes Too Long
- First deployment takes longer (~3-5 min)
- Subsequent deploys are faster (~1-2 min)

### App Not Loading
- Check Vercel deployment logs
- Verify all routes are working locally first
- Ensure build completed successfully

---

## Support

For issues with Vercel deployment, see:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
