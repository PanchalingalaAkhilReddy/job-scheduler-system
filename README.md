# Job Scheduler & Automation System

A full-stack job scheduling system that allows users to create, manage, and execute background jobs with webhook notifications.

## 🚀 Tech Stack

**Frontend:**
- Next.js 14
- React
- Tailwind CSS
- Shadcn UI

**Backend:**
- Node.js
- Express.js
- MySQL

**AI Tools Used:**
- Claude 3.7 Sonnet
- Used for: Project structure setup, API logic, frontend components, database schema design, webhook implementation

## 📋 Features

- ✅ Create jobs with task name, payload (JSON), and priority
- ✅ Dashboard to view all jobs
- ✅ Filter jobs by status (pending/running/completed) and priority
- ✅ Run jobs manually with status tracking
- ✅ Job detail view with formatted payload
- ✅ Automatic webhook trigger on job completion
- ✅ Real-time status updates

## 🗄️ Database Schema

```sql
CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  taskName VARCHAR(255) NOT NULL,
  payload JSON,
  priority VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  completedAt TIMESTAMP NULL
);
```

## 📁 Project Structure

```
job-scheduler-system/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateJobForm.jsx
│   │   │   ├── JobTable.jsx
│   │   │   └── JobDetail.jsx
│   │   ├── pages/
│   │   │   ├── index.js
│   │   │   └── jobs/[id].js
│   │   └── services/
│   │       └── api.js
│   ├── package.json
│   └── next.config.js
├── backend/
│   ├── routes/
│   │   └── jobs.js
│   ├── controllers/
│   │   └── jobController.js
│   ├── services/
│   │   └── webhookService.js
│   ├── database/
│   │   └── db.js
│   ├── app.js
│   └── package.json
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create MySQL database:**
```bash
mysql -u root -p
CREATE DATABASE job_scheduler;
USE job_scheduler;

CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  taskName VARCHAR(255) NOT NULL,
  payload JSON,
  priority VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  completedAt TIMESTAMP NULL
);

EXIT;
```

4. **Create .env file:**
```bash
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=job_scheduler
WEBHOOK_URL=https://webhook.site/your-unique-id
```

5. **Start backend server:**
```bash
npm start
```

Backend will run on http://localhost:5000

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create .env.local file:**
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. **Start development server:**
```bash
npm run dev
```

Frontend will run on http://localhost:3000

## 🌐 API Documentation

### 1. Create Job
**POST** `/jobs`
```json
{
  "taskName": "Send Email",
  "payload": { "email": "test@example.com" },
  "priority": "High"
}
```

### 2. List All Jobs
**GET** `/jobs`
- Query params: `?status=pending&priority=High`

### 3. Get Job Details
**GET** `/jobs/:id`

### 4. Run Job
**POST** `/run-job/:id`
- Sets status to "running"
- Waits 3 seconds
- Sets status to "completed"
- Triggers webhook

## 🔗 Webhook Integration

When a job completes, a POST request is sent to the configured webhook URL with:

```json
{
  "jobId": 1,
  "taskName": "Send Email",
  "priority": "High",
  "payload": { "email": "test@example.com" },
  "status": "completed",
  "completedAt": "2024-02-04T12:00:00.000Z"
}
```

To test webhooks:
1. Go to https://webhook.site
2. Copy your unique URL
3. Add it to backend `.env` as `WEBHOOK_URL`

## 🎯 Usage Flow

1. **Create a Job**: Fill form with task name, payload (JSON), priority
2. **View Dashboard**: See all jobs in table format
3. **Filter Jobs**: Use dropdowns to filter by status/priority
4. **Run Job**: Click "Run" button on pending jobs
5. **Watch Status**: See status change: pending → running → completed
6. **View Details**: Click job row to see full details
7. **Check Webhook**: Verify webhook received at webhook.site

## 📸 Screenshots

(Add screenshots here after deployment)

## 🚀 Deployment

### Backend (Render/Railway)
1. Push code to GitHub
2. Create new Web Service
3. Set environment variables
4. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Import project to Vercel
3. Set `NEXT_PUBLIC_API_URL` to deployed backend URL
4. Deploy

## 🤖 AI Usage Disclosure

### AI Tool Used
**Claude 3.7 Sonnet** - Used for ~20% guidance and troubleshooting

### My Independent Work (80%)
- ✅ Complete architecture design and tech stack selection
- ✅ All backend code (Express APIs, controllers, services, database logic)
- ✅ All frontend code (Next.js pages, React components, styling)
- ✅ Database schema design and MySQL setup
- ✅ Webhook integration implementation
- ✅ API testing and debugging
- ✅ Full system integration and testing

### AI Assistance (20%)
Claude helped when I encountered specific blockers:

**Troubleshooting & Fixes:**
- Next.js CSS import error resolution
- MySQL installation steps on Windows
- Git configuration (.gitignore setup)

**Guidance Only:**
- README structure suggestions
- Best practices for error handling patterns

**Key Note:** All code was written by me. AI only provided explanations when I was stuck on specific technical issues.
