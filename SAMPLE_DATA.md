# Sample Data for Testing

Use these sample texts when testing the Job Portal application.

## Sample Resumes for ATS Testing

### High Match Resume (Should score 80%+ for Frontend Developer jobs)

```
JOHN DOE
Senior Frontend Developer

PROFESSIONAL SUMMARY
Experienced Frontend Developer with 5+ years of expertise in building modern web applications 
using Vue.js, React, and JavaScript. Proficient in HTML, CSS, and responsive web development. 
Strong background in creating user-friendly interfaces and working with RESTful APIs.

TECHNICAL SKILLS
• Frontend: Vue.js, React, JavaScript, TypeScript, HTML5, CSS3
• Frameworks & Libraries: Tailwind CSS, Bootstrap, jQuery
• Backend: Node.js, Express
• Databases: MongoDB, PostgreSQL
• Tools: Git, Webpack, Vite, npm
• Testing: Jest, Cypress

PROFESSIONAL EXPERIENCE
Senior Frontend Developer | Tech Solutions Inc. | 2020 - Present
• Developed multiple web applications using Vue.js and React
• Implemented responsive designs with modern CSS frameworks
• Collaborated with backend teams to integrate APIs
• Improved application performance by 40%

Frontend Developer | Digital Agency | 2018 - 2020
• Built client websites using JavaScript and modern frameworks
• Created reusable components and maintained code quality
• Worked with design teams to implement pixel-perfect UIs

EDUCATION
Bachelor of Science in Computer Science | 2018
```

### Medium Match Resume (Should score 60-70% for Data Analyst jobs)

```
JANE SMITH
Data Analyst

SUMMARY
Analytical professional with 3 years of experience in data analysis and reporting. 
Skilled in Python, SQL, and data visualization tools. Background in statistics 
and business intelligence.

SKILLS
• Programming: Python, SQL
• Analysis: Excel, Statistical Analysis
• Visualization: Tableau, Power BI
• Other: R, Data Mining

EXPERIENCE
Data Analyst | Finance Corp | 2021 - Present
• Analyzed financial data and created reports
• Used SQL for database queries
• Developed dashboards in Tableau
• Conducted statistical analysis

Junior Analyst | Marketing Solutions | 2020 - 2021
• Processed and cleaned data sets
• Created Excel reports for management
• Supported data-driven decision making
```

### Low Match Resume (Should score below 60% for Backend Engineer jobs)

```
ALEX JOHNSON
Web Designer

PROFILE
Creative web designer with a passion for beautiful, user-friendly websites. 
Experience in graphic design and UI/UX principles.

SKILLS
• Adobe Photoshop
• Adobe Illustrator
• Figma
• Sketch
• Basic HTML/CSS

EXPERIENCE
Web Designer | Creative Studio | 2021 - Present
• Designed website mockups
• Created brand identities
• Collaborated with clients on visual direction
```

## Sample Job Descriptions for Posting

### Example 1: Frontend Developer Position

**Title:** Senior Frontend Developer

**Type:** Full-time

**Location:** Remote

**Salary:** $90,000 - $130,000

**Description:**
```
We're looking for an experienced Frontend Developer to join our growing team. You'll be 
responsible for building and maintaining our web applications using modern JavaScript frameworks.

The ideal candidate will have a strong understanding of frontend best practices, responsive 
design, and API integration. You'll work closely with our design and backend teams to deliver 
exceptional user experiences.

This is a fully remote position with flexible working hours and competitive benefits.
```

**Requirements:**
```
• 5+ years of frontend development experience
• Expert knowledge of Vue.js or React
• Strong JavaScript/TypeScript skills
• Experience with modern CSS frameworks (Tailwind, Bootstrap)
• Understanding of RESTful APIs
• Git version control proficiency
• Excellent problem-solving skills
• Strong communication abilities
```

**ATS Keywords:**
```
Vue.js, React, JavaScript, TypeScript, HTML, CSS, Frontend, Web Development, 
Tailwind CSS, Bootstrap, Git, API, Node.js
```

### Example 2: Data Analyst Position

**Title:** Data Analyst

**Type:** Full-time

**Location:** New York, NY

**Salary:** $70,000 - $100,000

**Description:**
```
Join our analytics team to help drive data-informed decisions across the organization. 
You'll work with large datasets, create insightful reports, and collaborate with stakeholders 
to identify trends and opportunities.

We're looking for someone who combines technical skills with business acumen. You should be 
comfortable with SQL, Python, and data visualization tools.
```

**Requirements:**
```
• 3+ years of data analysis experience
• Strong SQL skills for database queries
• Proficiency in Python for data manipulation
• Experience with data visualization (Tableau, Power BI)
• Statistical analysis knowledge
• Excel expertise
• Excellent communication skills
• Bachelor's degree in related field
```

**ATS Keywords:**
```
Python, SQL, Data Analysis, Excel, Statistics, Tableau, Power BI, 
Machine Learning, Data Visualization, Database
```

### Example 3: Backend Engineer Position

**Title:** Backend Engineer

**Type:** Full-time

**Location:** San Francisco, CA

**Salary:** $100,000 - $150,000

**Description:**
```
We're seeking a talented Backend Engineer to help build scalable, high-performance APIs 
and services. You'll work on challenging problems involving millions of users and large 
datasets.

The ideal candidate has experience with Node.js, database design, and cloud infrastructure. 
You'll be part of a team that values code quality, testing, and continuous improvement.
```

**Requirements:**
```
• 4+ years of backend development experience
• Strong knowledge of Node.js and Express
• Database experience (MongoDB, PostgreSQL)
• API design and development
• Understanding of microservices architecture
• Experience with cloud platforms (AWS, Google Cloud)
• Testing and CI/CD knowledge
• Computer Science degree preferred
```

**ATS Keywords:**
```
Node.js, Express, MongoDB, PostgreSQL, API, Backend, Microservices, 
AWS, Docker, Redis, REST, GraphQL
```

## Test Scenarios

### Scenario 1: Perfect Match
**Job:** Senior Frontend Developer  
**Resume:** Use the "High Match Resume" above  
**Expected Result:** 85-95% ATS score (most keywords matched)

### Scenario 2: Partial Match
**Job:** Data Analyst  
**Resume:** Use the "Medium Match Resume" above  
**Expected Result:** 60-75% ATS score (some keywords matched)

### Scenario 3: Poor Match
**Job:** Backend Engineer  
**Resume:** Use the "Low Match Resume" above  
**Expected Result:** 10-30% ATS score (few keywords matched)

### Scenario 4: Optimization Test
1. Start with "Medium Match Resume"
2. Check ATS score
3. Note missing keywords
4. Add missing keywords naturally to resume
5. Re-check score - should improve!

## Sample Cover Letters

### Generic Cover Letter Template
```
Dear Hiring Manager,

I am writing to express my interest in the [Job Title] position at [Company Name]. 
With [X years] of experience in [relevant field], I am confident in my ability to 
contribute to your team's success.

In my current role at [Current Company], I have [key achievement or responsibility]. 
This experience has equipped me with [relevant skills] that align perfectly with the 
requirements of this position.

I am particularly drawn to this opportunity because [specific reason related to company 
or role]. I am excited about the possibility of bringing my expertise in [key skills] 
to your organization.

Thank you for considering my application. I look forward to the opportunity to discuss 
how I can contribute to [Company Name]'s continued success.

Sincerely,
[Your Name]
```

### Specific Example - Frontend Developer
```
Dear Hiring Manager,

I am excited to apply for the Senior Frontend Developer position at Tech Corp. With over 
5 years of experience specializing in Vue.js and React, I am confident I can make immediate 
contributions to your development team.

In my current role, I have led the development of multiple web applications serving thousands 
of users. I have extensive experience with the modern JavaScript ecosystem, including Vue.js, 
TypeScript, and Tailwind CSS - technologies I see are core to this position.

What excites me most about this opportunity is the chance to work on challenging problems at 
scale. I am particularly impressed by Tech Corp's commitment to code quality and user experience, 
values that align with my own professional philosophy.

I would welcome the opportunity to discuss how my skills in frontend development, API integration, 
and responsive design can benefit your team.

Thank you for your consideration.

Best regards,
John Doe
```

## Testing Workflow

1. **Create Company Account** → Post 2-3 jobs with different keywords
2. **Create Job Seeker Account** → Use ATS Check with different resume variations
3. **Apply to Jobs** → Submit applications with varying ATS scores
4. **Switch to Company** → Review applicants, note ATS scores
5. **Accept/Reject** → Test status updates
6. **Switch to Job Seeker** → Check updated application status

---

**Pro Tip:** Copy and paste these samples into the application to quickly test all features!
