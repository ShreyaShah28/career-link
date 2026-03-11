# Quick Start Guide - Job Portal

## ⚡ Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd job-portal
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to: `http://localhost:5173`

---

## 🎯 Quick Test - Try These Demo Accounts

### Test as a Company (Post Jobs & Review Applicants)
1. Go to Login page
2. Click "Quick Login" on the **Company Account** card
3. You'll be redirected to the Company Dashboard
4. Try posting a new job or viewing applicants

**Credentials:**
- Email: `company1@example.com`
- Password: `company123`

### Test as a Job Seeker (Apply for Jobs)
1. Go to Login page
2. Click "Quick Login" on the **Job Seeker Account** card
3. You'll be redirected to the Job Seeker Dashboard
4. Browse jobs, use ATS check, and apply

**Credentials:**
- Email: `seeker1@example.com`
- Password: `seeker123`

---

## 🎨 Key Features to Test

### 1. ATS Resume Checker (⭐ Main Feature)
**Path:** Login → Dashboard → "ATS Check" (or browse to `/ats-check`)

**What to do:**
1. Select any job from the dropdown
2. Paste sample resume text (or use the examples below)
3. Watch your ATS score calculate in real-time
4. See matched vs missing keywords
5. Get recommendations to improve your score

**Sample Resume Text for Testing:**
```
Experienced Frontend Developer with 5 years of experience in Vue.js, React, 
and JavaScript. Strong skills in HTML, CSS, and modern web development. 
Proficient in Node.js, MongoDB, and API development. Expert in creating 
responsive user interfaces and working with REST APIs.
```

### 2. Post a Job (Company)
**Path:** Company Dashboard → "Post New Job"

**What to do:**
1. Fill in job details
2. Add ATS keywords (try: Vue.js, React, JavaScript, Node.js)
3. Submit the job
4. See it appear in your dashboard

### 3. Apply for a Job (Job Seeker)
**Path:** Browse Jobs → Select a Job → "Apply Now"

**What to do:**
1. Enter resume/profile text
2. Write a cover letter
3. See ATS score preview before submitting
4. Submit application
5. Check "My Applications" to track status

### 4. Review Applicants (Company)
**Path:** Company Dashboard → "View Applicants" on any job

**What to do:**
1. See all applicants with ATS scores
2. Review resumes sorted by score
3. Accept or reject applications
4. See status updates

---

## 📁 Project Structure Overview

```
job-portal/
├── src/
│   ├── views/           ← All pages (Home, Login, Dashboards, etc.)
│   ├── components/      ← Reusable components (Header, Sidebar, Footer)
│   ├── stores/          ← State management (auth, jobs, applications)
│   ├── router/          ← Route configuration
│   └── assets/          ← Styles (Tailwind CSS)
├── package.json         ← Dependencies
├── vite.config.js       ← Vite configuration
└── README.md            ← Full documentation
```

---

## 🚀 Build Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 💡 Pro Tips

1. **Try the ATS Checker First**: It's the coolest feature! Select a job and paste a resume to see the magic.

2. **Quick Login Buttons**: On the login page, use the "Quick Login" buttons to instantly test either role.

3. **Real-time ATS Scoring**: When applying for jobs, your ATS score updates as you type your resume!

4. **Multiple Test Accounts**: 
   - Companies: company1@example.com, company2@example.com
   - Job Seekers: seeker1@example.com, seeker2@example.com
   - All passwords: company123 or seeker123

5. **Mobile Responsive**: Try resizing your browser - everything works on mobile!

---

## 🎓 Learning the Code

Want to understand how it works?

1. **Start with Routes**: Check `src/router/index.js` to see all pages
2. **State Management**: Look at `src/stores/` to see how data flows
3. **ATS Logic**: Search for `calculateATSScore` in the code
4. **Components**: Browse `src/views/` to see page implementations

---

## ❓ Having Issues?

**Port already in use?**
- Edit `vite.config.js` and change the port number

**Styles not loading?**
- Make sure you ran `npm install`
- Restart the dev server

**Login not working?**
- Use the Quick Login buttons
- Check credentials match exactly (case-sensitive)

---

## 🎉 What's Next?

After testing the demo:
1. Review the full `README.md` for detailed documentation
2. Explore the code to understand the architecture
3. Customize it for your needs
4. Add a backend API for real data persistence

---

**Ready to start? Run `npm install` then `npm run dev`** 🚀
