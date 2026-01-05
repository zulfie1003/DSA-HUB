# Vercel Deployment Guide

## Prerequisites
- MongoDB Atlas account (free tier available)
- Vercel account
- GitHub account with your repository

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Create a database user with a strong password
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/dsa-hub`)
5. Copy this connection string - you'll need it for environment variables

## Step 2: Deploy Backend to Vercel

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy backend
cd backend
vercel
```

### Option B: Using GitHub (Recommended for easy updates)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Select "Backend" folder as root directory
6. Add environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a strong secret (use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
   - `NODE_ENV`: `production`
7. Deploy!

## Step 3: Deploy Frontend to Vercel

1. In Vercel dashboard, create new project
2. Import your repository again
3. Select "my-dsa-roadmap" as root directory
4. Add environment variable:
   - `VITE_API_URL`: Your backend Vercel URL (e.g., `https://your-backend.vercel.app/api`)
5. Build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Deploy!

## Step 4: Update Frontend API URL

After backend is deployed, update the frontend:

1. Get your backend Vercel URL from deployment
2. Add to Vercel environment variables: `VITE_API_URL=https://your-backend.vercel.app/api`
3. Redeploy frontend

## Important Notes

- **Don't commit .env file** - Use Vercel environment variables instead
- **JWT_SECRET** - Generate a secure random string, never use dummy values
- **CORS** - Backend already has CORS enabled for all origins
- **Database** - MongoDB Atlas free tier has 512MB limit, sufficient for testing
- **Cold starts** - Backend may take 10-30 seconds on first request after deployment

## Testing After Deployment

1. Open frontend URL in browser
2. Try to register a new account
3. Check browser console (F12) for any errors
4. Check backend logs in Vercel dashboard

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Run `npm install` before deploying |
| "MONGO_URI not defined" | Add env variable in Vercel dashboard |
| "CORS error" | Ensure backend API URL is correct in VITE_API_URL |
| "Login fails" | Check MongoDB connection, ensure database exists |
| "503 Service Unavailable" | Backend might be cold starting, wait a moment and retry |

## Next Steps

1. Replace placeholder values with real credentials
2. Test everything locally first
3. Deploy backend first
4. Deploy frontend after getting backend URL
5. Monitor logs in Vercel dashboard for issues
