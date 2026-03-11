# Job Portal - Vue 3 Application

A full-featured job portal application built with Vue 3, Vite, Tailwind CSS, Pinia, and Vue Router. This application includes role-based dashboards for both companies and job seekers, with an integrated ATS (Applicant Tracking System) resume checker.

## Features

### For Companies
- **Company Dashboard**: Overview of posted jobs and applications
- **Post Jobs**: Create new job postings with ATS keywords
- **Manage Jobs**: View, edit, and delete job postings
- **View Applicants**: Review applications with ATS match scores
- **Application Management**: Accept or reject applications

### For Job Seekers
- **Job Seeker Dashboard**: Track your applications and statistics
- **Browse Jobs**: Search and filter available positions
- **Apply to Jobs**: Submit applications with resume and cover letter
- **Track Applications**: Monitor application status (pending, accepted, rejected)
- **ATS Resume Check**: Check resume compatibility before applying

### Core Features
- **ATS Matching System**: Keyword-based scoring to match resumes with job requirements
- **Role-Based Access**: Separate dashboards and features for companies and job seekers
- **Static Authentication**: Pre-configured demo accounts for testing
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS for a professional look

## Tech Stack

- **Vue 3**: Progressive JavaScript framework with Composition API
- **Vite**: Next-generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework
- **Pinia**: State management for Vue
- **Vue Router**: Official router for Vue.js
- **Node.js 22**: JavaScript runtime

## Project Structure

```
job-portal/
├── public/              # Static assets
├── src/
│   ├── assets/          # Styles and images
│   │   └── main.css    # Tailwind imports and custom styles
│   ├── components/      # Reusable components
│   │   ├── common/     # Shared components
│   │   │   ├── Header.vue
│   │   │   ├── Footer.vue
│   │   │   ├── Sidebar.vue
│   │   │   └── MainLayout.vue
│   │   ├── company/    # Company-specific components
│   │   └── jobseeker/  # Job seeker-specific components
│   ├── views/          # Page components
│   │   ├── HomePage.vue
│   │   ├── AboutPage.vue
│   │   ├── ContactPage.vue
│   │   ├── LoginPage.vue
│   │   ├── CompanyDashboard.vue
│   │   ├── PostJob.vue
│   │   ├── ManageJobs.vue
│   │   ├── ViewApplicants.vue
│   │   ├── JobSeekerDashboard.vue
│   │   ├── BrowseJobs.vue
│   │   ├── JobDetails.vue
│   │   ├── MyApplications.vue
│   │   └── ATSCheck.vue
│   ├── stores/         # Pinia stores
│   │   ├── auth.js     # Authentication store
│   │   ├── jobs.js     # Jobs store
│   │   └── applications.js  # Applications store
│   ├── router/         # Vue Router configuration
│   │   └── index.js
│   ├── App.vue         # Root component
│   └── main.js         # Application entry point
├── index.html          # HTML entry point
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
├── postcss.config.js   # PostCSS configuration
└── package.json        # Dependencies and scripts
```

## Installation & Setup

### Prerequisites
- Node.js 22 or higher
- npm or yarn

### Step 1: Install Dependencies

```bash
cd job-portal
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Step 3: Build for Production

```bash
npm run build
```

### Step 4: Preview Production Build

```bash
npm run preview
```

## Demo Accounts

### Company Account
- **Email**: company1@example.com
- **Password**: company123
- **Type**: Company User
- **Permissions**: Post jobs, view applicants, manage job listings

### Company Account #2
- **Email**: company2@example.com
- **Password**: company123
- **Type**: Company User

### Job Seeker Account
- **Email**: seeker1@example.com
- **Password**: seeker123
- **Type**: Job Seeker
- **Permissions**: Browse jobs, apply to positions, track applications

### Job Seeker Account #2
- **Email**: seeker2@example.com
- **Password**: seeker123
- **Type**: Job Seeker

## Usage Guide

### For Companies

1. **Login** with a company account
2. **Dashboard** shows overview of jobs and applications
3. **Post a Job**:
   - Click "Post New Job"
   - Fill in job details (title, type, location, salary)
   - Add job description and requirements
   - Add ATS keywords for candidate matching
   - Submit the job posting
4. **Manage Jobs**:
   - View all posted jobs
   - Delete jobs if needed
5. **View Applicants**:
   - Click "View Applicants" on any job
   - See ATS match scores for each applicant
   - Review resumes and cover letters
   - Accept or reject applications

### For Job Seekers

1. **Login** with a job seeker account
2. **Browse Jobs**:
   - Use search and filters to find jobs
   - Click on jobs to view details
3. **ATS Check** (Optional but Recommended):
   - Select a job you're interested in
   - Paste your resume
   - See your ATS match score
   - Review matched and missing keywords
   - Optimize your resume based on recommendations
4. **Apply to Jobs**:
   - Click "Apply Now" on job details page
   - Enter your resume/profile
   - Write a cover letter
   - See ATS score preview
   - Submit application
5. **Track Applications**:
   - View all applications in "My Applications"
   - Filter by status (pending, accepted, rejected)
   - Monitor your ATS scores

## ATS Matching System

The ATS (Applicant Tracking System) checker works by:

1. **Keyword Extraction**: Jobs include specific keywords/skills required
2. **Resume Analysis**: Candidate resumes are scanned for these keywords
3. **Score Calculation**: Score = (Matched Keywords / Total Keywords) × 100
4. **Color Coding**:
   - **Green (80-100%)**: Excellent match - Ready to apply
   - **Yellow (60-79%)**: Good match - Consider optimization
   - **Red (0-59%)**: Needs improvement - Add more keywords

## Key Features Explained

### State Management (Pinia)
- **Auth Store**: Manages user authentication and session
- **Jobs Store**: Handles job listings CRUD operations
- **Applications Store**: Manages job applications

### Routing & Guards
- Public routes: Home, About, Contact, Browse Jobs, ATS Check
- Protected routes: Dashboards, Post Job, Manage Jobs, My Applications
- Role-based guards: Separate access for companies and job seekers
- Auto-redirect after login based on user type

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Hamburger menu for mobile navigation
- Flexible grid layouts that adapt to screen size
- Touch-friendly interface elements

## Customization

### Adding New Job Types
Edit `src/views/PostJob.vue` and add options to the job type select:

```vue
<option value="Your-New-Type">Your New Type</option>
```

### Modifying ATS Algorithm
Edit the `calculateATSScore` function in:
- `src/views/JobDetails.vue`
- `src/views/ATSCheck.vue`

### Styling
- Global styles: `src/assets/main.css`
- Tailwind config: `tailwind.config.js`
- Component-specific styles: Use Tailwind utility classes

### Adding More Demo Users
Edit the `USERS` array in `src/stores/auth.js`

## Future Enhancements

Potential features to add:
- Backend integration with real API
- User registration and profile management
- File upload for resumes (PDF, DOCX)
- Email notifications
- Advanced search with filters
- Job recommendations based on profile
- Messaging system between companies and candidates
- Analytics dashboard for companies
- Resume builder tool
- Interview scheduling

## Troubleshooting

### Port Already in Use
Change the port in `vite.config.js`:
```js
export default defineConfig({
  server: {
    port: 3000 // Change to your preferred port
  }
})
```

### Tailwind Styles Not Loading
1. Ensure PostCSS is configured correctly
2. Check that Tailwind directives are in `src/assets/main.css`
3. Restart the dev server

### Routes Not Working
1. Check Vue Router configuration in `src/router/index.js`
2. Ensure all view components are properly imported
3. Verify navigation guards are not blocking access

## License

This project is open source and available for educational purposes.

## Support

For issues or questions:
- Check the code comments for inline documentation
- Review the component structure in `/src/components`
- Examine the store logic in `/src/stores`

---

Built with ❤️ using Vue 3, Vite, and Tailwind CSS
