# Pre-Deployment Checklist for Vercel

## Code Quality
- [ ] All `console.log()` statements removed from production code
- [ ] No hardcoded sensitive data (passwords, API keys) in code
- [ ] All environment variables properly configured
- [ ] Error handling implemented properly
- [ ] No `localhost` URLs in code (use env variables)

## Security
- [ ] JWT_SECRET is a strong random string (not placeholder)
- [ ] CORS is properly configured (only allow frontend domain)
- [ ] Password hashing implemented (bcryptjs)
- [ ] MongoDB connection string is secure
- [ ] No .env file committed to GitHub

## Frontend (my-dsa-roadmap)
- [ ] Build command in package.json: `vite build`
- [ ] Output directory set to `dist`
- [ ] VITE_API_URL environment variable configured
- [ ] No hardcoded API URLs
- [ ] All dependencies in package.json
- [ ] Node modules not committed

## Backend (backend)
- [ ] All routes properly defined in app.js
- [ ] CORS enabled with correct origins
- [ ] MongoDB connection string from MongoDB Atlas
- [ ] All environment variables documented
- [ ] Server listens on process.env.PORT
- [ ] Error handling for database failures
- [ ] Proper HTTP status codes returned

## Database (MongoDB)
- [ ] MongoDB Atlas account created
- [ ] Cluster set up and running
- [ ] Database user created with strong password
- [ ] Connection string copied correctly
- [ ] Whitelist Vercel IP ranges (or allow all for testing)
- [ ] Collections created (if needed)

## Vercel Configuration
- [ ] vercel.json files exist and properly configured
- [ ] Root directory selected correctly in Vercel dashboard
- [ ] Environment variables added to Vercel dashboard
- [ ] Build settings correct in Vercel dashboard
- [ ] Serverless function limitations understood

## Testing
- [ ] Test locally with production environment variables
- [ ] Test user registration
- [ ] Test user login
- [ ] Test API endpoints work
- [ ] Check browser console for errors
- [ ] Check Vercel logs for backend errors
- [ ] Test all main features work

## Documentation
- [ ] README.md updated with deployment instructions
- [ ] VERCEL_DEPLOYMENT.md created with detailed steps
- [ ] Environment variables documented in .env.example
- [ ] .env.production configured for frontend

## Before Final Deploy
- [ ] Push all changes to GitHub
- [ ] Verify no secrets in Git history
- [ ] All tests passing locally
- [ ] Production MongoDB Atlas credentials ready
- [ ] Backup of .env values saved securely

## Post-Deployment
- [ ] Frontend works at Vercel URL
- [ ] Backend API responds at Vercel URL
- [ ] CORS working correctly
- [ ] Login/Register functions work
- [ ] Data persists in MongoDB
- [ ] Monitor Vercel logs for errors
- [ ] Set up alerts for failed deployments

## Immediate Post-Deploy Fixes
If something breaks after deployment:
1. Check Vercel logs in dashboard
2. Verify environment variables are set
3. Check MongoDB Atlas connection
4. Restart deployment
5. Clear browser cache and try again
