# 404 NOT_FOUND Error - Troubleshooting Guide

## Common Causes of 404 Error During Vercel Deployment

### 1. **Missing Environment Variables**
**Error:** `MONGO_URI is not defined`
**Solution:**
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Add these variables:
  ```
  MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dsa-hub
  JWT_SECRET=your_generated_secret_key
  NODE_ENV=production
  ```

### 2. **Backend Not Deployed**
**Error:** API calls return 404
**Solution:**
- Deploy backend first as a separate Vercel project
- Get the backend URL (e.g., `https://your-backend.vercel.app`)
- Add frontend environment variable:
  ```
  VITE_API_URL=https://your-backend.vercel.app/api
  ```
- Redeploy frontend

### 3. **Incorrect API URL in Frontend**
**Error:** Can't reach backend API
**Solution:**
Check `/my-dsa-roadmap/.env.production` or Vercel environment variables:
```
# Should be your DEPLOYED backend URL, not localhost
VITE_API_URL=https://your-backend-domain.vercel.app/api
```

### 4. **Database Connection Issues**
**Error:** Routes exist but 500 errors or no data
**Solution:**
- Verify MongoDB Atlas connection string is correct
- Check if IP whitelist allows Vercel (use 0.0.0.0/0 for testing)
- Test with `/api/test` endpoint:
  ```
  GET https://your-backend.vercel.app/api/test
  ```

### 5. **Missing Routes**
**Error:** 404 on specific endpoints like `/api/auth/login`
**Solution:**
- Ensure all route files are imported in `backend/app.js`
- Check that routes are properly exported:
  ```javascript
  app.use('/api/auth', authRoutes);
  app.use('/api/mindmap', mindmapRoutes);
  // etc
  ```

### 6. **Merge Conflicts in Code**
**Error:** Broken API configuration
**Solution:**
- Check `my-dsa-roadmap/src/api.js` for merge conflict markers:
  ```
  <<<<<<< HEAD
  // ... code ...
  =======
  // ... other code ...
  >>>>>>> branch-name
  ```
- Resolve all conflicts and push again

## Deployment Checklist

### Backend Deployment
- [ ] All environment variables set in Vercel
- [ ] MongoDB Atlas connection string is correct
- [ ] JWT_SECRET is a strong random string
- [ ] vercel.json is properly configured
- [ ] All routes are defined in app.js
- [ ] server.js properly imports app.js
- [ ] package.json has "type": "module"

### Frontend Deployment
- [ ] VITE_API_URL points to deployed backend
- [ ] vercel.json has correct build settings:
  ```json
  {
    "buildCommand": "npm run build",
    "outputDirectory": "dist"
  }
  ```
- [ ] No merge conflicts in api.js
- [ ] All dependencies installed

## Testing After Deployment

### 1. Test Backend API
```bash
# Test API is running
curl https://your-backend.vercel.app/api/test

# Should return:
# {"message":"MongoDB connected successfully","problemCount":...}
```

### 2. Test Frontend Connection
- Open browser DevTools (F12)
- Go to Network tab
- Try login/register
- Check if requests go to correct backend URL

### 3. Check Vercel Logs
- Backend: Vercel Dashboard → Backend Project → Deployments → Logs
- Frontend: Vercel Dashboard → Frontend Project → Deployments → Logs

## Quick Fix Steps

1. **Verify environment variables are set:**
   ```
   MONGO_URI ✓
   JWT_SECRET ✓
   NODE_ENV=production ✓
   VITE_API_URL ✓
   ```

2. **Push latest code:**
   ```bash
   git add .
   git commit -m "Fix: Resolve 404 errors and update Vercel configuration"
   git push origin main
   ```

3. **Redeploy on Vercel:**
   - Go to Vercel Dashboard
   - Click "Deployments"
   - Click "Redeploy" on latest deployment

4. **Clear browser cache:**
   - Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
   - Clear all cached data
   - Refresh page

## Still Getting 404?

1. **Check backend logs in Vercel:**
   - Look for MongoDB connection errors
   - Look for route definition errors
   - Look for middleware issues

2. **Verify routes are accessible:**
   - Test: `https://backend-url.vercel.app/api/auth/login` → Should return 405 (method not allowed) or handle it
   - Test: `https://backend-url.vercel.app/api/test` → Should return MongoDB connection status

3. **Check CORS:**
   - Ensure backend has CORS enabled with correct origins
   - Add to backend CORS:
     ```javascript
     app.use(cors({
       origin: '*',
       methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
       credentials: true
     }));
     ```

4. **Check Node version:**
   - Vercel might be using different Node version
   - Specify in package.json:
     ```json
     "engines": {
       "node": "18.x"
     }
     ```

## Contact Support
If issues persist:
- Check Vercel documentation: vercel.com/docs
- Check MongoDB Atlas status: status.cloud.mongodb.com
- Review backend logs in Vercel dashboard
