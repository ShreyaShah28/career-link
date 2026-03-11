# Job Portal - Architecture & Data Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Vue 3 Application                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │   Router    │  │   Pinia     │  │    Tailwind CSS         │ │
│  │  (Routes &  │  │  (State)    │  │    (Styling)            │ │
│  │   Guards)   │  │             │  │                         │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App.vue
└── MainLayout.vue
    ├── Header.vue
    │   ├── Logo
    │   ├── Navigation Menu
    │   └── User Dropdown
    │
    ├── Router View (Page Components)
    │   ├── Public Pages
    │   │   ├── HomePage
    │   │   ├── AboutPage
    │   │   ├── ContactPage
    │   │   ├── LoginPage
    │   │   ├── BrowseJobs
    │   │   ├── JobDetails
    │   │   └── ATSCheck
    │   │
    │   ├── Company Pages (Protected)
    │   │   ├── CompanyDashboard
    │   │   │   └── Sidebar.vue
    │   │   ├── PostJob
    │   │   │   └── Sidebar.vue
    │   │   ├── ManageJobs
    │   │   │   └── Sidebar.vue
    │   │   └── ViewApplicants
    │   │       └── Sidebar.vue
    │   │
    │   └── Job Seeker Pages (Protected)
    │       ├── JobSeekerDashboard
    │       │   └── Sidebar.vue
    │       ├── MyApplications
    │       │   └── Sidebar.vue
    │       └── (Shared: BrowseJobs, JobDetails, ATSCheck)
    │
    └── Footer.vue
        ├── Links
        └── Copyright
```

## State Management (Pinia Stores)

### 1. Auth Store (`stores/auth.js`)
```javascript
State:
├── currentUser: User object or null
├── isAuthenticated: boolean
└── userType: 'company' | 'jobseeker' | null

Actions:
├── login(email, password) → Returns success/error
├── logout() → Clears session
└── checkAuth() → Validates stored session

Getters:
├── isCompany → boolean
└── isJobSeeker → boolean
```

### 2. Jobs Store (`stores/jobs.js`)
```javascript
State:
├── jobs: Array of job objects
└── nextJobId: Number for auto-increment

Job Object:
{
  id: number,
  companyId: number,
  companyName: string,
  title: string,
  description: string,
  requirements: string,
  keywords: string[],  ← For ATS matching
  location: string,
  type: string,
  salary: string,
  posted: date string,
  status: 'active' | 'closed'
}

Actions:
├── getJobsByCompany(companyId)
├── getJobById(jobId)
├── addJob(jobData)
├── updateJob(jobId, updates)
└── deleteJob(jobId)

Getters:
└── activeJobs → Filtered list of active jobs
```

### 3. Applications Store (`stores/applications.js`)
```javascript
State:
├── applications: Array of application objects
└── nextApplicationId: Number

Application Object:
{
  id: number,
  jobId: number,
  jobTitle: string,
  applicantId: number,
  applicantName: string,
  applicantEmail: string,
  resume: string,
  coverLetter: string,
  appliedDate: date string,
  status: 'pending' | 'accepted' | 'rejected',
  atsScore: number (0-100)  ← Calculated on submit
}

Actions:
├── getApplicationsByJob(jobId)
├── getApplicationsByApplicant(applicantId)
├── hasApplied(jobId, applicantId)
├── submitApplication(applicationData)
└── updateApplicationStatus(applicationId, status)

Getters:
├── pendingApplications
├── acceptedApplications
└── rejectedApplications
```

## Data Flow Examples

### Example 1: User Login Flow
```
1. User enters credentials in LoginPage
   ↓
2. LoginPage calls authStore.login(email, password)
   ↓
3. Auth Store validates against USERS array
   ↓
4. If valid:
   - Sets currentUser
   - Sets isAuthenticated = true
   - Stores in localStorage
   - Returns success
   ↓
5. LoginPage redirects based on userType:
   - Company → /company/dashboard
   - Job Seeker → /jobseeker/dashboard
   ↓
6. Router guard checks authentication
   ↓
7. Dashboard loads with user-specific data
```

### Example 2: Job Application Flow
```
1. Job Seeker views JobDetails page
   ↓
2. Clicks "Apply Now" button
   ↓
3. Application modal opens
   ↓
4. User enters resume text
   ↓
5. As they type, ATS score calculates:
   - Extract keywords from job
   - Check resume for keyword matches
   - Calculate score: (matches / total) * 100
   - Update UI in real-time
   ↓
6. User submits application
   ↓
7. JobDetails calls applicationsStore.submitApplication()
   ↓
8. Application Store:
   - Creates new application object
   - Includes final ATS score
   - Adds to applications array
   ↓
9. User redirected to MyApplications
   ↓
10. Application appears in list with status "pending"
```

### Example 3: ATS Check Flow
```
1. User visits ATSCheck page
   ↓
2. Selects a job from dropdown
   ↓
3. Job keywords displayed
   ↓
4. User pastes resume text
   ↓
5. Real-time calculation:
   resumeLower = resume.toLowerCase()
   matchedKeywords = keywords.filter(k => 
     resumeLower.includes(k.toLowerCase())
   )
   score = (matchedKeywords.length / keywords.length) * 100
   ↓
6. UI updates:
   - Score circle with color coding
   - Matched keywords in green
   - Missing keywords in red
   - Recommendations if score < 80
   ↓
7. User can optimize resume and re-check
```

### Example 4: Company Reviewing Applicants
```
1. Company views ViewApplicants page
   ↓
2. Page loads job data from jobsStore
   ↓
3. Page loads applications from applicationsStore
   ↓
4. Applications displayed sorted by ATS score (high to low)
   ↓
5. Each applicant card shows:
   - Name, email
   - Resume, cover letter
   - ATS score badge (colored based on score)
   - Status
   ↓
6. Company clicks "Accept" or "Reject"
   ↓
7. Calls applicationsStore.updateApplicationStatus()
   ↓
8. Status updates in real-time
   ↓
9. Job seeker sees updated status in MyApplications
```

## Route Protection Flow

```
User navigates to route
        ↓
Router beforeEach guard runs
        ↓
Check route meta requirements:
        ↓
┌───────┴───────┐
│               │
requiresAuth?   requiresGuest?
│               │
Yes             Yes
│               │
Check auth      Check NOT auth
        ↓               ↓
    Redirect        Redirect
    to login        to dashboard
        ↓
Check role (company/jobseeker)
        ↓
┌───────┴───────┐
│               │
Matches?        Doesn't match?
│               │
Allow           Redirect home
```

## ATS Algorithm Details

```javascript
// Keyword Matching Algorithm

function calculateATSScore(resume, jobKeywords) {
  // 1. Normalize resume text
  const resumeLower = resume.toLowerCase()
  
  // 2. Check each keyword
  const matchedKeywords = jobKeywords.filter(keyword => 
    resumeLower.includes(keyword.toLowerCase())
  )
  
  // 3. Calculate percentage
  const totalKeywords = jobKeywords.length
  const matchCount = matchedKeywords.length
  const score = Math.round((matchCount / totalKeywords) * 100)
  
  // 4. Return score and details
  return {
    score,
    matched: matchedKeywords,
    missing: jobKeywords.filter(k => !matchedKeywords.includes(k))
  }
}

// Score Interpretation:
// 80-100: Excellent (Green) - Strong match, ready to apply
// 60-79:  Good (Yellow) - Decent match, could improve
// 0-59:   Needs Work (Red) - Low match, needs optimization
```

## File Upload Flow (Future Enhancement)

```
Current: Text input only
Future: Support PDF/DOCX uploads

Proposed Flow:
1. User uploads file
   ↓
2. File parsed to extract text
   (using libraries like pdf-parse, mammoth)
   ↓
3. Extracted text used for ATS matching
   ↓
4. File stored as base64 or uploaded to server
```

## Security Considerations

**Current Implementation (Demo/Development):**
- Static user data in auth store
- Client-side only authentication
- No password hashing
- Data stored in localStorage

**Production Recommendations:**
- Move to real backend API
- Implement proper JWT authentication
- Hash passwords (bcrypt)
- Use HTTP-only cookies for sessions
- Add CSRF protection
- Implement rate limiting
- Add input validation and sanitization
- Use environment variables for sensitive data

## Performance Optimizations

**Current:**
- Component lazy loading via router
- Computed properties for reactive filtering
- Minimal re-renders with Vue's reactivity

**Future Enhancements:**
- Virtual scrolling for large job lists
- Debouncing on search inputs
- Caching of job data
- Pagination for applications
- Code splitting for faster initial load

---

This architecture is designed to be:
✅ Scalable - Easy to add new features
✅ Maintainable - Clear separation of concerns
✅ Extensible - Ready for backend integration
✅ User-friendly - Intuitive flows and feedback
