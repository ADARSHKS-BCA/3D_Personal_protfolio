// src/data/projects.js
export const projects = [
  {
    id: 'medconnect',
    title: 'MediConnect',
    tagline: 'Revolutionizing healthcare scheduling and doctor-patient collaboration',
    desc: 'A high-performance telemedicine and doctor-appointment scheduling platform that connects patients with healthcare providers in real time. Built with enterprise-grade security, live slots tracking, and interactive dashboards.',
    features: [
      'Real-time instant appointment booking with slot-lock mechanism',
      'Role-based secure panels for patients, doctors, and clinic admins',
      'Auto-reminders, calendar sync, and interactive telemedicine rooms',
      'Integrated prescription management and secure PDF reports generation'
    ],
    metrics: [
      { label: 'Performance', value: '98% PageSpeed' },
      { label: 'API Response', value: '< 100ms' },
      { label: 'User Rating', value: '4.9/5 Stars' }
    ],
    tech: ['TypeScript', 'React', 'Node.js', 'Express', 'MongoDB'],
    category: 'Full Stack',
    liveUrl: 'https://med-appointment-platform-web.vercel.app/',
    githubUrl: 'https://github.com/ADARSHKS-BCA/med-appointment-platform',
    caseStudyUrl: '#',
    images: [
      '/projects/mediconnect-1.png',
      '/projects/mediconnect-2.png',
      '/projects/mediconnect-3.png',
      '/projects/mediconnect-4.png',
      '/projects/mediconnect-5.png',
    ],
  },
  {
    id: 'securebank',
    title: 'SecureBank',
    tagline: 'Fortified banking infrastructure with secure multi-factor transactions',
    desc: 'A secure and scalable banking portal designed to handle financial transactions with high precision and reliability. Built with Python and Django, implementing multi-factor authentication, ledger audits, and real-time transaction logs.',
    features: [
      'Dual-factor authenticated logins with security pin confirmation',
      'Interactive ledger showing detailed transaction history with category tagging',
      'Instant peer-to-peer funds transfer with secure session token validation',
      'Full admin dashboard for auditing, account freezing, and transaction oversight'
    ],
    metrics: [
      { label: 'Security Grade', value: 'A+ SSL Cert' },
      { label: 'Processing Time', value: '< 250ms' },
      { label: 'Unit Tests', value: '94% Coverage' }
    ],
    tech: ['Python', 'Django', 'PostgreSQL', 'Tailwind CSS'],
    category: 'Full Stack',
    liveUrl: '',
    githubUrl: 'https://github.com/ADARSHKS-BCA/Banking-App',
    caseStudyUrl: '#',
  },
  {
    id: 'find-your-venue',
    title: 'Find Your Venue',
    tagline: 'Discover and reserve event spaces with fluid, interactive mapping',
    desc: 'A cross-platform mobile application that simplifies space booking, location discovery, and block-by-block floor plan navigation. Developed with Flutter for rich, native-performance rendering.',
    features: [
      'Fluid, gesture-driven 2D/3D map floor plan visualization',
      'Instant slot availability check, pricing comparison, and reservation system',
      'Firebase-powered real-time notifications for booking updates and reminders',
      'Interactive user reviews, tags, and proximity-based suggestions'
    ],
    metrics: [
      { label: 'Frame Rate', value: '60 FPS Stable' },
      { label: 'Flow Time', value: '15s Booking' },
      { label: 'Active Users', value: '1.2K+ Monthly' }
    ],
    tech: ['Flutter', 'Dart', 'Firebase', 'Google Maps API'],
    category: 'Mobile App',
    liveUrl: '',
    githubUrl: 'https://github.com/ADARSHKS-BCA/Find_Your_Venue',
    caseStudyUrl: '#',
  },
  {
    id: 'hockey-website',
    title: 'Hockey Hub',
    tagline: 'Streamlining league coordination, team matchmaking, and match scheduling',
    desc: 'A robust matchmaking and league administration portal for local hockey clubs. Built with Node.js and MongoDB, featuring player registration, automated matchmaking queues, and email updates.',
    features: [
      'Automated match scheduling and solo matchmaking logic based on skill levels',
      'Real-time team roster management and captain control panels',
      'Automated email alerts using Nodemailer for schedules and cancellations',
      'Stunning dark glassmorphism dashboard with interactive statistical charts'
    ],
    metrics: [
      { label: 'Matchmaking', value: '85% Auto Success' },
      { label: 'Load Speed', value: '1.2s Interactive' },
      { label: 'Alerts Sent', value: '10K+ / Month' }
    ],
    tech: ['JavaScript', 'Node.js', 'Express', 'MongoDB'],
    category: 'Full Stack',
    liveUrl: 'https://hockey-website-nzjfcymnr-adarsh-kss-projects.vercel.app/',
    githubUrl: 'https://github.com/ADARSHKS-BCA/HOCKEY-WEBSITE',
    caseStudyUrl: '#',
    images: [
      '/projects/hockey-1.png',
      '/projects/hockey-2.png',
      '/projects/hockey-3.png',
      '/projects/hockey-4.png',
    ],
  },
  {
    id: 'habit-tracker',
    title: 'HabitFlow',
    tagline: 'Social-driven habit building powered by real-time community accountability',
    desc: 'A community-focused habit tracking application that leverages social feedback and public commitments to drive habit formation. Designed with Next.js, hosting a live global feed of completions.',
    features: [
      'Live community feed showing completions and updates in real-time',
      'Interactive habits dashboard with heatmaps, streaks, and charts',
      'Automated milestone badges and progression tracking',
      'Direct friend follow system and cheer reactions for completions'
    ],
    metrics: [
      { label: 'Streaks Retention', value: '40% Retention' },
      { label: 'Feed Sync Latency', value: '< 50ms' },
      { label: 'Lighthouse', value: '99 SEO & Perf' }
    ],
    tech: ['TypeScript', 'Next.js', 'PostgreSQL', 'Prisma'],
    category: 'Full Stack',
    liveUrl: 'https://habittracker-ip2hsuq53-adarsh-kss-projects.vercel.app/',
    githubUrl: 'https://github.com/ADARSHKS-BCA/habit-tracker',
    caseStudyUrl: '#',
    images: [
      '/projects/habitflow-1.png',
    ],
  },
  {
    id: 'semantic-search',
    title: 'Semantic Search API',
    tagline: 'Sub-millisecond semantic search indexing powered by vector embeddings',
    desc: 'A production-grade microservice API engineered for vector-based search and document retrieval. Built with FastAPI and ChromaDB to perform high-dimensional similarity matches.',
    features: [
      'High-dimensional text embeddings generation via SentenceTransformers models',
      'Vector database storage with custom categorization and metadata filters',
      'Sub-millisecond similarity scoring and cosine similarity index rankings',
      'Standard CORS configuration and auto-generated Swagger API documentation'
    ],
    metrics: [
      { label: 'Retrieval Time', value: '< 5ms' },
      { label: 'Startup Time', value: '< 2.5s' },
      { label: 'Throughput', value: '1200+ QPM' }
    ],
    tech: ['Python', 'FastAPI', 'ChromaDB', 'PyTorch'],
    category: 'AI / ML',
    liveUrl: '',
    githubUrl: 'https://github.com/ADARSHKS-BCA/SEMANTIC_SEARCH-',
    caseStudyUrl: '#',
  },
];
