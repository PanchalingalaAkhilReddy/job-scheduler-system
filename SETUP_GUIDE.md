# COMPLETE SETUP GUIDE - Job Scheduler System
## ⏰ DEADLINE: 5 PM - Follow these steps EXACTLY

---

## PHASE 1: DOWNLOAD & EXTRACT (2 minutes)

1. **Download** the `job-scheduler-system.zip` file
2. **Extract** it to your Desktop or Documents folder
3. **Open Terminal/Command Prompt**
   - Windows: Press `Win + R`, type `cmd`, hit Enter
   - Mac: Press `Cmd + Space`, type "Terminal", hit Enter

---

## PHASE 2: BACKEND SETUP (10 minutes)

### Step 1: Install MySQL (if not installed)
- **Windows**: Download from https://dev.mysql.com/downloads/installer/
- **Mac**: `brew install mysql` or download from website
- **Linux**: `sudo apt-get install mysql-server`

### Step 2: Create Database
```bash
# Start MySQL
mysql -u root -p

# In MySQL shell, run:
CREATE DATABASE job_scheduler;
EXIT;
```

### Step 3: Run Database Schema
```bash
# Navigate to project
cd Desktop/job-scheduler-system/backend

# Run schema file
mysql -u root -p job_scheduler < database/schema.sql
```

### Step 4: Setup Backend
```bash
# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env file with your details:
# - DB_PASSWORD: Your MySQL password
# - WEBHOOK_URL: Get from https://webhook.site (copy your unique URL)
```

**Edit .env file:**
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
DB_NAME=job_scheduler
WEBHOOK_URL=https://webhook.site/YOUR_UNIQUE_ID_HERE
```

### Step 5: Start Backend Server
```bash
npm start
```

✅ You should see: "Server running on http://localhost:5000"

**Keep this terminal window open!**

---

## PHASE 3: FRONTEND SETUP (5 minutes)

### Open a NEW Terminal/Command Prompt

```bash
# Navigate to frontend
cd Desktop/job-scheduler-system/frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local

# Start frontend
npm run dev
```

✅ You should see: "ready - started server on http://localhost:3000"

**Keep this terminal window open too!**

---

## PHASE 4: TEST THE SYSTEM (5 minutes)

### 1. Open Browser
Go to: http://localhost:3000

### 2. Create a Test Job
- Task Name: `Send Welcome Email`
- Payload: `{"email": "test@example.com", "type": "welcome"}`
- Priority: `High`
- Click "Create Job"

### 3. Verify Job Created
- You should see it in the table with status "pending"

### 4. Run the Job
- Click the "Run" button
- Status should change: pending → running → completed (takes 3 seconds)

### 5. Check Webhook
- Go to https://webhook.site/YOUR_UNIQUE_ID
- You should see the webhook request with job details!

### 6. View Job Details
- Click on the job row in the table
- You should see all details including formatted payload

---

## PHASE 5: PUSH TO GITHUB (10 minutes)

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `job-scheduler-system`
3. Make it **Public**
4. Click "Create repository"

### Step 2: Push Code
```bash
# Navigate to project root
cd Desktop/job-scheduler-system

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Job Scheduler System with Node.js, Next.js, MySQL"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/job-scheduler-system.git

# Push
git branch -M main
git push -u origin main
```

---

## PHASE 6: DEPLOYMENT (Optional but Recommended)

### Deploy Backend (Render.com)
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your repository
5. Set:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add Environment Variables:
   - DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, WEBHOOK_URL
7. Click "Create Web Service"

### Deploy Frontend (Vercel)
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Set:
   - Root Directory: `frontend`
   - Environment Variable: `NEXT_PUBLIC_API_URL` = your backend URL
6. Click "Deploy"

---

## PHASE 7: FINAL SUBMISSION

### Update README with:
1. Your deployed URLs (if deployed)
2. Your name and GitHub username
3. Screenshots of working system
4. Screen recording link (use Loom or similar)

### Submit:
- GitHub Repository Link
- Deployed Frontend URL (if deployed)
- Screen Recording Link

---

## TROUBLESHOOTING

### Backend won't start:
```bash
# Check if MySQL is running
# Windows: Services → MySQL
# Mac: brew services list
# Linux: sudo service mysql status

# Check if port 5000 is free
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
```

### Frontend won't start:
```bash
# Check if port 3000 is free
# Windows: netstat -ano | findstr :3000
# Mac/Linux: lsof -i :3000

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Database connection error:
- Verify MySQL is running
- Check DB_PASSWORD in .env is correct
- Verify database `job_scheduler` exists

### Jobs not appearing:
- Check backend console for errors
- Open browser DevTools (F12) → Console tab
- Verify API_URL in frontend .env.local is correct

---

## QUICK TEST CHECKLIST

✅ Backend running on port 5000
✅ Frontend running on port 3000
✅ Can create a job
✅ Job appears in table
✅ Can run job
✅ Status changes: pending → running → completed
✅ Webhook receives notification
✅ Can view job details
✅ Filters work (status, priority)
✅ Code pushed to GitHub

---

## TIME BREAKDOWN

- Setup MySQL: 5 min
- Backend setup: 5 min
- Frontend setup: 5 min
- Testing: 5 min
- GitHub push: 5 min
- **Total: ~25 minutes**

You have time! Just follow step by step.

---

## NEED HELP?

### Common Issues:

**"npm: command not found"**
→ Install Node.js from https://nodejs.org

**"mysql: command not found"**
→ Install MySQL or add it to PATH

**"Port 5000 already in use"**
→ Change PORT in backend .env to 5001

**"Cannot connect to database"**
→ Check MySQL is running and credentials are correct

---

## SCREEN RECORDING TIPS

Use Loom (free): https://www.loom.com
1. Show creating a job
2. Show running the job
3. Show status changes
4. Show webhook notification
5. Show job details page
6. Show filters working

Keep it under 5 minutes!

---

## YOU'VE GOT THIS! 🚀

Just follow the steps one by one. Don't skip anything.
Everything is already built for you!
