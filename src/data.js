export const profile = {
  name: 'AYUSH KHOPATKAR',
  tagline: 'Software Developer • Computer Engineer • Problem Solver',
  summary: 'Passionate Computer Engineer with expertise in full-stack web development, specializing in MERN stack technologies. I love building innovative solutions that bridge the gap between complex technical requirements and intuitive user experiences. Currently working as Junior Software Programmer in Amukha Technologies. I have hands-on experience in modern web technologies and database management.',
  email: 'ayushkhopatkar7865@gmail.com',
  phone: '+91-9819967854',
  github: 'https://github.com/ayushkhopatkar',
  linkedin: 'https://linkedin.com/in/ayushkhopatkar',
  location: 'Mumbai, Maharashtra, India',
  availability: 'Available for internships and freelance projects',
  resumeUrl: '/resume.pdf' // You can add your resume PDF here
}

export const education = [
  { 
    title: 'Terna Engineering College, Nerul', 
    detail: 'Bachelor of Engineering in Computer Engineering (May 2025)\nCGPA: 8.34 / 10\nRelevant Coursework: Data Structures, Algorithms, Database Management, Software Engineering, Web Technologies',
    period: '2021 - 2025',
    type: 'degree'
  },
  { 
    title: 'Vinayak Ganesh Vaze College, Mulund', 
    detail: 'Higher Secondary Certificate (PCMB) (April 2021)\nPercentage: 88.33%\nSpecialization: Physics, Chemistry, Mathematics, Biology',
    period: '2019 - 2021',
    type: 'higher-secondary'
  },
  { 
    title: 'St. Xavier\'s High School, Airoli', 
    detail: 'Secondary School Certificate (April 2019)\nPercentage: 85.20%\n',
    period: '2018 - 2019',
    type: 'secondary'
  },
]

export const experience = [
  {
    company: 'SmartKnower',
    role: 'Web Development Intern',
    period: 'October 2022 – November 2022',
    location: 'Remote',
    type: 'internship',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Git'],
    points: [
      'Developed and optimized responsive web applications using modern HTML5, CSS3, and JavaScript',
      'Implemented responsive design principles using Bootstrap framework, ensuring cross-browser compatibility',
      'Participated in code reviews and learned industry best practices for clean, maintainable code',
    ],
    achievements: [
      'Successfully Received Certificate of Course Completion and Internship Completion Certificate',
    ]
  },
]

export const certifications = [
  {
    name: 'C# .NET with MS SQL Server Development',
    provider: 'Udemy',
    year: '2025',
    
    skills: ['C#', '.NET Framework', 'MS SQL Server', 'Entity Framework']
  },
  {
    name: 'Complete Java Programming Masterclass',
    provider: 'Apna College',
    year: '2024',
   
    skills: ['Java', 'OOP', 'Data Structures', 'Algorithms']
  },
  {
    name: 'Full Stack Web Development',
    provider: 'SmartKnower',
    year: '2022',
    
    skills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Responsive Design']
  },
]

export const skills = [
  // Programming Languages
  { name: 'Java', level: 85, category: 'Programming Languages', description: 'Object-oriented programming, Spring Boot, Maven' },
  { name: 'JavaScript', level: 90, category: 'Programming Languages', description: 'ES6+, Async/Await, DOM manipulation, Event handling' },
  { name: 'Python', level: 70, category: 'Programming Languages', description: 'Data analysis, Web scraping, Automation scripts' },
  { name: 'C#', level: 70, category: 'Programming Languages', description: '.NET Framework, Entity Framework' },
  
  // Frontend Technologies
  { name: 'React', level: 85, category: 'Frontend Technologies', description: 'Hooks, Context API, Component lifecycle, State management' },
  { name: 'HTML/CSS', level: 90, category: 'Frontend Technologies', description: 'Semantic HTML5, CSS Grid, Flexbox, Animations' },
  { name: 'Tailwind CSS', level: 85, category: 'Frontend Technologies', description: 'Utility-first CSS, Responsive design, Custom components' },
  { name: 'Bootstrap', level: 80, category: 'Frontend Technologies', description: 'Responsive grid system, Component library, Customization' },
  
  // Backend & Database
  { name: 'Node.js', level: 75, category: 'Backend & Database', description: 'Server-side JavaScript, npm ecosystem, Middleware' },
  { name: 'Express.js', level: 75, category: 'Backend & Database', description: 'RESTful APIs, Routing, Authentication, Error handling' },
  { name: 'MySQL', level: 80, category: 'Backend & Database', description: 'Complex queries, Joins, Indexing, Database design' },
  { name: 'MongoDB', level: 60, category: 'Backend & Database', description: 'NoSQL databases, Mongoose ODM, Aggregation pipelines' },
  { name: 'REST APIs', level: 75, category: 'Backend & Database', description: 'API design, HTTP methods, JSON, Authentication' },
  
  // Tools & Others
  { name: 'Git & GitHub', level: 80, category: 'Tools & Others', description: 'Version control, Branching, Merging, Collaboration' },
  { name: 'OOP', level: 80, category: 'Tools & Others', description: 'Inheritance, Polymorphism, Encapsulation, Design patterns' },
  { name: 'DBMS', level: 75, category: 'Tools & Others', description: 'Database design, Normalization, Query optimization' },
]

export const projects = [
  {
    title: 'House Rentals – Smart Property Platform',
    description: 'Comprehensive rental platform featuring intelligent property search, ML-powered rent prediction, advanced filtering, and interactive property comparison tools. Built to streamline the rental process for both tenants and landlords.',
    fullDescription: 'A full-featured rental platform that revolutionizes property search with machine learning integration. Features include intelligent search algorithms, rent prediction models, property comparison matrices, and a comprehensive enquiry management system.',
    tags: ['React', 'Tailwind CSS', 'Spring Boot', 'MySQL', 'Gemini AI', 'Machine Learning'],
    category: 'Full-Stack',
    status: 'In Development',
  
    features: [
      'ML-powered rent prediction algorithm',
      'Advanced property filtering and search',
      'Interactive property comparison tool',
      'Real-time enquiry management system',
      'Responsive design for all devices',
     
    ],
    technologies: {
      frontend: ['React', 'Tailwind CSS', 'JavaScript ES6+'],
      backend: ['Spring Boot', 'Java', 'REST APIs'],
      database: ['MySQL', 'JPA/Hibernate'],
      ai: ['Gemini API', 'Machine Learning Models'],
      tools: ['Git', 'Maven', 'Postman']
    },
    challenges: [
      'Implementing accurate rent prediction algorithms',
      'Designing intuitive property comparison interface',
      'Optimizing database queries for large datasets'
    ],
    link: '#', // Replace with actual link when available
    repo: '#', // Replace with actual repo link
    images: ['/projects/house-rentals-1.png', '/projects/house-rentals-2.png'],
    highlights: [
      'Achieved 80% accuracy in rent prediction model',
      'Reduced property search time by 60%',
      'Improved user engagement by 45%'
    ]
  },
  {
    title: 'Quick Calls – Emergency Services Hub',
    description: 'Centralized platform aggregating contact information for emergency and essential local services including hospitals, police, fire services, and hotels. Designed to provide quick access during critical situations.',
    fullDescription: 'A life-saving application that consolidates emergency and essential service contacts in one easily accessible platform. Features location-based services, quick dial functionality, and comprehensive service categories.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'MySQL', 'Geolocation API'],
    category: 'Web Application',
    status: 'Completed',

    features: [
      'Location-based service discovery',
      'Emergency contact categorization',
      'Offline capability for critical numbers',
      'Search and filter services',
      'Mobile-optimized interface'
    ],
    technologies: {
      frontend: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      backend: ['PHP', 'MySQL'],
      apis: ['Geolocation API', 'Maps integration'],
      tools: ['Git', 'XAMPP']
    },
    challenges: [
      'Ensuring fast load times for emergency situations',
      'Implementing reliable offline functionality',
      'Creating intuitive navigation for stress situations'
    ],
    link: '#',
    repo: '#',
    images: ['/projects/quick-calls-1.png', '/projects/quick-calls-2.png'],
   
  },
  {
    title: 'Chota Bazaar – Local Business Platform',
    description: 'Digital marketplace empowering small and local businesses by providing them with an online presence. Features product showcasing, business discovery, and customer engagement tools to boost local commerce.',
    fullDescription: 'A comprehensive platform designed to digitize local businesses and connect them with their community. Includes business profiles, product catalogs, customer reviews, and promotional tools.',
    tags: ['PHP', 'HTML5', 'Bootstrap', 'MySQL', 'phpMyAdmin'],
    category: 'E-commerce Platform',
    status: 'Completed',

    features: [
      'Business profile management',
      'Product catalog with image gallery',
      'Customer review and rating system',
    ],
    technologies: {
      frontend: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript'],
      backend: ['PHP', 'MySQL'],
      tools: ['phpMyAdmin', 'XAMPP', 'Git'],
      design: ['Figma']
    },
    challenges: [
      'Creating scalable product catalog system',
      'Implementing secure user authentication',
      'Optimizing for low-bandwidth environments'
    ],
    link: '#',
    repo: '#',
    images: ['/projects/chota-bazaar-1.png', '/projects/chota-bazaar-2.png'],
   
  }
]

// Additional data for enhanced features
export const achievements = [
  {
    title: 'Academic Excellence',
    description: 'Maintained consistent academic performance with 8.34 CGPA',
    icon: '🎓',
    year: '2021-2025'
  },
]



export const stats = [
  { label: 'Projects Completed', value: '3+', icon: '💼' },
  { label: 'Technologies Mastered', value: '15+', icon: '⚡' },
  { label: 'Lines of Code', value: '10K+', icon: '💻' },
  { label: 'Coffee Consumed', value: '∞', icon: '☕' }
]

export const interests = [
  { name: 'Web Development', icon: '🌐', description: 'Building modern, responsive web applications' },
  { name: 'Machine Learning', icon: '🤖', description: 'Exploring AI/ML applications in real-world problems' },
  { name: 'Open Source', icon: '🔓', description: 'Contributing to open source projects and community' },
  { name: 'Problem Solving', icon: '🧩', description: 'Competitive programming and algorithmic challenges' },
  { name: 'Tech Innovation', icon: '🚀', description: 'Staying updated with latest technology trends' },
  { name: 'Team Collaboration', icon: '🤝', description: 'Working in agile teams and mentoring peers' }
]

export const timeline = [
  {
    year: '2025',
    title: 'Graduation & Career Launch',
    description: 'Completing B.E. in Computer Engineering and starting professional career',
    type: 'future'
  },
  {
    year: '2024',
    title: 'Advanced Project Development',
    description: 'Built House Rentals platform with ML integration and advanced features',
    type: 'achievement'
  },
  {
    year: '2023',
    title: 'Skill Expansion',
    description: 'Mastered React, Node.js, and modern full-stack development practices',
    type: 'learning'
  },
  {
    year: '2022',
    title: 'First Industry Experience',
    description: 'Completed web development internship at SmartKnower',
    type: 'experience'
  },
  {
    year: '2021',
    title: 'Engineering Journey Begins',
    description: 'Started Computer Engineering at Terna Engineering College',
    type: 'education'
  }
]

export const projectCategories = [
  { id: 'all', name: 'All Projects', count: projects.length },
  { id: 'full-stack', name: 'Full-Stack', count: projects.filter(p => p.category === 'Full-Stack').length },
  { id: 'web-app', name: 'Web Apps', count: projects.filter(p => p.category === 'Web Application').length },
  { id: 'e-commerce', name: 'E-commerce', count: projects.filter(p => p.category === 'E-commerce Platform').length }
]

export const socialProfiles = [
  {
    name: 'GitHub',
    url: profile.github,
    username: '@ayushkhopatkar',
    description: 'Check out my latest code and open source contributions',
    icon: 'github',
    
  },
  {
    name: 'LinkedIn',
    url: profile.linkedin,
    username: 'ayushkhopatkar',
    description: 'Connect with me professionally and see my career journey',
    icon: 'linkedin',
    
  },
  {
    name: 'Email',
    url: `mailto:${profile.email}`,
    username: profile.email,
    description: 'Get in touch for collaborations and opportunities',
    icon: 'mail',
    stats: { response_time: '< 24h' }
  }
]

export const techStack = {
  frontend: {
    title: 'Frontend Development',
    description: 'Creating responsive and interactive user interfaces',
    technologies: [
      { name: 'React', level: 85, experience: '2+ years', projects: 3 },
      { name: 'HTML5', level: 90, experience: '3+ years', projects: 5 },
      { name: 'CSS3', level: 90, experience: '3+ years', projects: 5 },
      { name: 'JavaScript', level: 90, experience: '3+ years', projects: 5 },
      { name: 'Tailwind CSS', level: 85, experience: '1+ year', projects: 2 },
      { name: 'Bootstrap', level: 80, experience: '2+ years', projects: 3 }
    ]
  },
  backend: {
    title: 'Backend Development',
    description: 'Building robust server-side applications and APIs',
    technologies: [
      { name: 'Node.js', level: 75, experience: '1+ year', projects: 2 },
      { name: 'Express.js', level: 75, experience: '1+ year', projects: 2 },
      { name: 'Java Spring Boot', level: 70, experience: '1+ year', projects: 1 },
      { name: 'PHP', level: 65, experience: '1+ year', projects: 1 },
      { name: 'REST APIs', level: 75, experience: '1+ year', projects: 3 }
    ]
  },
  database: {
    title: 'Database Management',
    description: 'Designing and managing efficient database systems',
    technologies: [
      { name: 'MySQL', level: 80, experience: '2+ years', projects: 4 },
      { name: 'MongoDB', level: 60, experience: '1+ year', projects: 1 },
      { name: 'Database Design', level: 75, experience: '2+ years', projects: 3 },
      { name: 'Query Optimization', level: 70, experience: '1+ year', projects: 2 }
    ]
  },
  tools: {
    title: 'Development Tools',
    description: 'Using modern tools for efficient development workflow',
    technologies: [
      { name: 'Git & GitHub', level: 80, experience: '2+ years', projects: 5 },
      { name: 'VS Code', level: 85, experience: '3+ years', projects: 5 },
      { name: 'Postman', level: 75, experience: '1+ year', projects: 3 },
      { name: 'Maven', level: 65, experience: '1+ year', projects: 1 }
    ]
  }
}

export const learningGoals = [
  {
    technology: 'TypeScript',
    reason: 'Enhanced type safety for large-scale applications',
    timeline: 'Q2 2025',
    priority: 'high'
  },
  {
    technology: 'Docker & Kubernetes',
    reason: 'Modern deployment and containerization',
    timeline: 'Q3 2025',
    priority: 'medium'
  },
  {
    technology: 'AWS/Cloud Services',
    reason: 'Scalable cloud infrastructure and deployment',
    timeline: 'Q3 2025',
    priority: 'high'
  },
  {
    technology: 'GraphQL',
    reason: 'Advanced API query language and optimization',
    timeline: 'Q4 2025',
    priority: 'medium'
  }
]

export const contactMethods = [
  {
    type: 'email',
    value: profile.email,
    label: 'Email',
    icon: 'mail',
    primary: true,
    description: 'Best for project discussions and collaborations'
  },
  {
    type: 'phone',
    value: profile.phone,
    label: 'Phone',
    icon: 'phone',
    primary: false,
    description: 'Available for urgent matters and interviews'
  },
  {
    type: 'linkedin',
    value: profile.linkedin,
    label: 'LinkedIn',
    icon: 'linkedin',
    primary: false,
    description: 'Professional networking and career opportunities'
  },
  {
    type: 'github',
    value: profile.github,
    label: 'GitHub',
    icon: 'github',
    primary: false,
    description: 'Code collaboration and open source contributions'
  }
]

// Fun facts for personality touch
export const funFacts = [
  '🎯 I debug with console.log more than I\'d like to admit',
  '☕ My code quality is directly proportional to my coffee intake',
  '🌙 I\'m most productive during late-night coding sessions',
  '🎮 When not coding, I enjoy exploring new technologies and gaming',
  '📚 I believe the best way to learn is by building real projects',
  '🤝 I love collaborating with fellow developers and sharing knowledge'
]

export default {
  profile,
  education,
  experience,
  certifications,
  skills,
  projects,
  achievements,
  stats,
  interests,
  timeline,
  projectCategories,
  socialProfiles,
  techStack,
  learningGoals,
  contactMethods,
  funFacts
}