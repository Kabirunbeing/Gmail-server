# Gmailify - Railway Deployment Guide

## 🚀 Quick Railway Deployment

### Step 1: Prepare Your Repository
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit for Railway deployment"

# Push to GitHub
git remote add origin https://github.com/yourusername/gmailify.git
git push -u origin main
```

### Step 2: Deploy to Railway

1. **Go to [Railway.app](https://railway.app)**
2. **Connect GitHub**: Sign in and connect your GitHub account
3. **Create New Project**: Click "New Project" → "Deploy from GitHub repo"
4. **Select Repository**: Choose your Gmailify repository
5. **Deploy**: Railway will automatically detect Node.js and deploy

### Step 3: Configure Environment Variables

In Railway dashboard → Your Project → Variables tab, add:

```env
NODE_ENV=production
SENDER_EMAIL=nocturnallad4@gmail.com
SENDER_PASSWORD=qxoyyvhzgktvgzor
RECEIVER_EMAIL=nocturnallad4@gmail.com
```

### Step 4: Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain or use the provided Railway domain
3. Railway handles HTTPS automatically

## 📊 Railway Features for Your App

✅ **Automatic HTTPS**
✅ **Auto-deploy on Git push**
✅ **Environment variables**
✅ **Built-in monitoring**
✅ **Global CDN**
✅ **99.9% uptime**

## 🔧 Railway CLI (Optional)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Deploy from CLI
railway up
```

## 💡 Cost Management Tips

- **Free Tier**: $5 worth of usage per month
- **Pricing**: $0.000463 per GB-hour + $0.000231 per vCPU-hour
- **Sleep Mode**: Enable to reduce costs during low usage
- **Monitoring**: Use Railway dashboard to track usage

## 🔄 Auto-Deploy Setup

Your app will auto-deploy when you push to main branch:

```bash
# Make changes
git add .
git commit -m "Update payment validation"
git push origin main
# Railway automatically deploys!
```

## 🌐 Your Live URLs

After deployment, your app will be available at:
- **Railway Domain**: `https://gmailify-production.railway.app`
- **Custom Domain**: Your domain if configured

## 📧 Email Configuration

Your app is configured to send emails to `nocturnallad4@gmail.com` with the current settings. The email functionality will work immediately after deployment.

## 🔍 Monitoring

Access Railway dashboard to monitor:
- **Deployments**: Build status and logs
- **Metrics**: CPU, Memory, Network usage
- **Logs**: Real-time application logs
- **Usage**: Cost tracking

## 🆘 Troubleshooting

**Common Issues:**
1. **Build Fails**: Check package.json dependencies
2. **Email Not Working**: Verify environment variables
3. **Port Issues**: Railway handles PORT automatically
4. **Domain Issues**: Check DNS settings for custom domains

**Support:**
- Railway Discord: [discord.gg/railway](https://discord.gg/railway)
- Documentation: [docs.railway.app](https://docs.railway.app)
