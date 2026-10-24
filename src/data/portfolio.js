import { Github, Linkedin, Mail } from 'lucide-react';

export const positioning = "Senior Frontend / Full Stack Engineer (React, Angular, TypeScript, Python)";

export const personalInfo = {
    name: "Patric Phinehas Raj",
    role: positioning,
    summary: "Full stack engineer with 6+ years at Bosch Global Software Technologies. Python on the backend (FastAPI, Django, Flask) and React, TypeScript, and Angular 12, 16, and 18 on the frontend. Recent work is a Digital Twin platform for IoT monitoring: a team of 8 frontend and 2 iOS developers, the Python APIs behind it, and authentication with OAuth 2.0 and JWT.",
    email: "patricphinehas@gmail.com",
    linkedin: "https://www.linkedin.com/in/patricphinehas/",
    github: "https://github.com/patricphinehas",
    location: "Coimbatore, India",
    availability: "Open to roles in Coimbatore, Bengaluru, and remote.",
    socials: [
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/patricphinehas/",
            icon: Linkedin
        },
        {
            name: "GitHub",
            url: "https://github.com/patricphinehas",
            icon: Github
        },
        {
            name: "Email",
            url: "mailto:patricphinehas@gmail.com",
            icon: Mail
        }
    ]
};

export const skills = [
    { category: "Frontend Frameworks", items: ["Angular 12, 16, and 18", "React.js", "Next.js", "Vue.js"] },
    { category: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "Python", "HTML5", "CSS3", "SCSS/SASS"] },
    { category: "Styling & UI", items: ["TailwindCSS", "Bootstrap", "Shadcn-UI", "Material-UI", "Styled Components"] },
    { category: "Backend & APIs", items: ["Node.js", "Express.js", "FastAPI", "Django", "Flask", "REST APIs", "GraphQL", "OAuth 2.0"] },
    { category: "Data Visualization", items: ["Chart.js", "Highcharts", "D3.js", "Recharts"] },
    { category: "3D & Graphics", items: ["Babylon.js", "Three.js", "WebGL"] },
    { category: "GIS and maps", items: ["ArcGIS Maps SDK", "Leaflet", "Mapbox", "OpenLayers", "Geofences", "Live tracking"] },
    { category: "Cloud & DevOps", items: ["Azure", "AWS", "Docker", "CI/CD Pipelines", "Jenkins"] },
    { category: "Databases", items: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "SQLite", "Redis", "SQL Server"] },
    { category: "Testing", items: ["Jest", "React Testing Library", "Cypress", "Jasmine", "Karma"] },
    { category: "Build Tools", items: ["Webpack", "Vite", "npm/yarn", "Postman"] },
];

export const experience = [
    {
        id: 1,
        role: "Senior Software Engineer, Digital Twin",
        company: "Bosch Global Software Technologies",
        location: "Bengaluru, India",
        period: "January 2023 to Present",
        description: [
            "Lead a team of 8 frontend and 2 iOS developers on a Digital Twin platform that monitors 180 IoT assets.",
            "Build dashboards and 3D views in React and Angular with TypeScript.",
            "Build map views with the ArcGIS Maps SDK, Leaflet, Mapbox, and OpenLayers: live tracking, geofences, and markers that open drilldown views.",
            "Load asset data on demand. Use WebSockets only for the live-tracking cases.",
            "Build the Python services (FastAPI and Flask), including a backend-for-frontend that combines asset, sensor, and enterprise data.",
            "Set up login with OAuth 2.0 and JWT on Azure AD, with role-based access on the APIs and the UI.",
            "Wrote Python integrations for a Microsoft Teams bot. Teams now respond about 30% faster.",
            "Mentored 4 UX interns, and review code for the Python and frontend work with Jest, Jasmine, and Karma.",
            "Built an iOS app with offline support for field engineers, and turn Figma designs into working features."
        ]
    },
    {
        id: 2,
        role: "Full Stack Specialist",
        company: "Bosch Global Software Technologies",
        location: "Bengaluru, India",
        period: "September 2022 to January 2023",
        description: [
            "Built REST APIs in Django and Flask and connected them to Power Apps and Power Automate flows used by internal teams.",
            "Created shared React and Angular components that cut the time to build new dashboard features by about 30%.",
            "Secured the APIs with JWT and delivered the UI for 20+ internal users."
        ]
    },
    {
        id: 3,
        role: "Associate Software Engineer",
        company: "Bosch Global Software Technologies",
        location: "India",
        period: "September 2020 to August 2022",
        description: [
            "Wrote backend services in Django and Flask for internal dashboards, pulling data from several upstream systems.",
            "Built Angular and React screens with Chart.js and D3.js charts on those APIs.",
            "Shipped 20+ releases in two-week sprints.",
            "Brought page load time down 40% with lazy loading and change detection fixes."
        ]
    },
    {
        id: 4,
        role: "Graduate Intern, Software Engineering",
        company: "Bosch Global Software Technologies",
        location: "Coimbatore, India",
        period: "July 2019 to June 2020",
        description: [
            "Built a proof of concept with a Flask backend and an Angular frontend that showed live data feeds and charts.",
            "Joined Bosch full time after the internship."
        ]
    }
];

export const education = [
    {
        degree: "M.E. Information Technology",
        school: "PSG College of Technology, Coimbatore",
        period: "2018 to 2020"
    },
    {
        degree: "B.E. Computer Science and Engineering",
        school: "Jansons Institute of Technology, Coimbatore",
        period: "2013 to 2017"
    }
];

export const projects = [
    {
        id: 9,
        title: "Home System",
        role: "Solo project",
        status: "In progress",
        featured: true,
        icon: "home",
        description: "Self-hosted household operations: inventory, grocery bills, spend analytics, and a shared family calendar.",
        problem: "Household inventory, grocery bills, spend analytics, and a shared family calendar need one self-hosted app, so that data is not handed to a hosted product.",
        approach: "The browser talks only to Next.js on port 3000. Next.js rewrites /api to Express on port 4000, and Express is the only process that talks to MongoDB or Postgres via DB_SELECT.",
        outcome: "No measured results yet. The app is still in progress, so there is no live demo and no usage figure.",
        tradeoffs: "Keeping the database behind Express means two processes to run. The browser never opens a database connection.",
        results: "No measured results yet. The app is still in progress.",
        highlights: [
            "Browser -> Next.js (:3000) -> Express (:4000) -> MongoDB or Postgres",
            "Per-unit bill pricing (kg, litre, piece) with historical price comparisons",
            "MCP tool exposure plus local or hosted LLM chat (Ollama, NIM, OpenRouter)"
        ],
        tags: ["Next.js", "Express", "Fair Source", "Self-hosted"],
        page: "/projects/home-system",
        github: "https://github.com/patricphinehas/HomeSystem1_0",
        diagram: "home-system",
    },
    {
        id: 1,
        title: "VegRoute - Farm-to-Home Delivery",
        role: "Team Lead",
        icon: "vegroute",
        description: "Led the engineering team in building a B2C marketplace connecting local vegetable farmers directly with home consumers, covering catalog browsing, subscriptions, and real-time order tracking.",
        problem: "Local vegetable farmers had no direct channel to home consumers. Produce passed through multiple middlemen, raising prices and cutting farmer margins.",
        approach: "Led the engineering team to build a B2C marketplace from the ground up with catalog browsing, recurring subscription baskets, and real-time order tracking on React and Node.js.",
        outcome: "Shipped a production farmer-to-household marketplace that removed middleman markups and supported recurring fresh-produce subscriptions.",
        highlights: [
            "Catalog browsing with harvest-day availability windows",
            "Recurring subscription orders and delivery slot scheduling",
            "Real-time order tracking from farm dispatch to doorstep"
        ],
        tags: ["Team Lead", "B2C Marketplace", "React", "Node.js"],
    },
    {
        id: 2,
        title: "Aruna Health - Ambulance Optimization",
        role: "Strategic Consultant",
        icon: "ambulance",
        description: "Architected a strategic dispatch and route-optimization solution for Aruna Healthcare Consultancy, spanning a dispatcher admin console and a crew mobile app to cut emergency response times.",
        problem: "Ambulance dispatch relied on manual phone coordination, giving operators limited visibility into crew location or availability during emergencies.",
        approach: "Architected a two-sided dispatch platform: a real-time admin console for dispatchers to assign and monitor ambulances, paired with a mobile crew app for field updates.",
        outcome: "Streamlined the emergency assignment workflow with live fleet visibility and turn-by-turn crew status updates.",
        highlights: [
            "Dispatcher console for live fleet status and incident assignment",
            "Crew mobile workflow for one-tap job acceptance and status progression",
            "Route-optimization strategy to reduce emergency response latency"
        ],
        tags: ["Strategy", "Admin Dashboard", "Crew App", "Logistics"],
    },
    {
        id: 3,
        title: "Aruna Aesthetics & Wellness Clinic",
        role: "Design & Development",
        icon: "clinic",
        description: "Designed and built a bookings-first marketing website for Aruna's aesthetics and wellness clinic, wiring in Calendly for seamless appointment scheduling.",
        problem: "Prospective patients needed a clear treatment catalog and frictionless online appointment booking without back-and-forth phone calls.",
        approach: "Designed a conversion-focused clinic website with structured treatment pages and embedded Calendly scheduling wired directly into staff calendars.",
        outcome: "Delivered a responsive, bookings-first web presence that turns treatment discovery directly into confirmed consultations.",
        highlights: [
            "Treatment-first information architecture and responsive UI",
            "Embedded Calendly booking flow with automated confirmations",
            "Performance-tuned pages built for mobile patient discovery"
        ],
        tags: ["Website", "Calendly Integration", "Healthcare", "UX"],
    },
    {
        id: 4,
        title: "RK Crackers - Inventory & Purchase Orders",
        role: "Full-stack Development",
        icon: "inventory",
        description: "Built a web-based inventory management system with an integrated purchase order workflow, giving RK Crackers real-time stock visibility across their supply chain.",
        problem: "Seasonal high-volume stock movements and supplier purchase orders were tracked manually, causing stockouts and reconciliation delays.",
        approach: "Engineered a full-stack inventory and purchase order web application with SKU-level stock counters, low-stock thresholds, and supplier order tracking.",
        outcome: "Gave operations real-time stock visibility across warehouses and a structured purchase-order approval trail.",
        highlights: [
            "Real-time SKU stock levels with low-inventory alerts",
            "End-to-end purchase order creation, receiving, and reconciliation",
            "Role-friendly web interface built for warehouse and billing staff"
        ],
        tags: ["Inventory Management", "Purchase Orders", "Web App", "B2B"],
    },
    {
        id: 5,
        title: "Aadhi Solar - Branding & Growth Strategy",
        role: "Brand & Marketing Strategy",
        icon: "solar",
        description: "Delivered brand identity and a marketing website for Aadhi Solar, paired with strategic consultancy on brand placement and multi-channel marketing (SEO, AEO, GEO).",
        problem: "Aadhi Solar needed a credible brand identity and digital acquisition channel to compete for residential and commercial solar installations.",
        approach: "Created the visual identity and marketing website, then structured a multi-channel discovery strategy across traditional SEO, AEO, and GEO.",
        outcome: "Established a cohesive brand presence online optimized for both search engines and AI-driven answer engines.",
        highlights: [
            "Complete brand identity system and residential/commercial web presence",
            "Search and answer-engine optimization (SEO, AEO, GEO)",
            "Lead-capture funnels tailored for solar site-survey enquiries"
        ],
        tags: ["Branding", "Website", "SEO / AEO / GEO", "Growth Strategy"],
    },
];

export const speaking = {
    title: "Guest Lecturer",
    description: "Occasionally invited to speak at engineering colleges, sharing industry practice on frontend engineering with students.",
};

// Response-time / working promise shown near Contact + FAQ
export const responsePromise = {
    headline: "I reply within 24 hours",
    detail: "Every note gets a personal reply, usually the same day, and always within one business day.",
};

export const faqs = [
    {
        question: "What is your stack?",
        answer: "React, Angular 12, 16, and 18, and TypeScript on the frontend. Python with FastAPI, Django, and Flask, plus Node.js and Express, on the backend. Map work uses the ArcGIS Maps SDK, Leaflet, Mapbox, and OpenLayers. Data is usually PostgreSQL or MongoDB."
    },
    {
        question: "Where are you based?",
        answer: "Coimbatore, India. The current Bosch role is in Bengaluru. I am open to roles in Coimbatore, Bengaluru, and remote."
    },
    {
        question: "Are you available?",
        answer: "Yes. I am open to roles in Coimbatore, Bengaluru, and remote. Email patricphinehas@gmail.com. I reply within one business day."
    },
    {
        question: "What are you leading right now?",
        answer: "A Digital Twin platform at Bosch that monitors 180 IoT assets. I lead 8 frontend developers and 2 iOS developers, and I mentored 4 UX interns."
    },
];

export const freelanceFaqs = [
    {
        question: "What kind of projects do you take on?",
        answer: "Product builds, dashboards, admin and crew apps, marketing sites with booking, inventory systems, and brand work for small businesses. VegRoute was a farmer-to-home marketplace. Day-to-day employment is frontend and full stack at Bosch."
    },
    {
        question: "Do you work with startups and small businesses?",
        answer: "Yes, alongside the Bosch role. Recent small-business work includes a solar company brand site and a healthcare dispatch concept."
    },
    {
        question: "How quickly can you start, and how long do projects take?",
        answer: "I usually reply within 24 hours. A marketing site with booking can take a few weeks. A full platform can take several months. I will say which one it is before we start."
    },
    {
        question: "How does pricing and scoping work?",
        answer: "A short call, then a fixed-scope proposal for a defined project or a monthly retainer for ongoing work. You see the cost before work starts."
    },
];

export const caseStudies = [
    {
        id: "home-system",
        title: "Home System",
        status: "In progress",
        role: "Solo project. I design and build the app.",
        problem: "Household inventory, grocery bills, spend analytics, and a shared family calendar need one self-hosted app, so that data is not handed to a hosted product.",
        stack: ["Next.js", "Express", "MongoDB or Postgres"],
        tradeoffs: "The browser talks only to Next.js. Next.js rewrites /api to Express, and Express is the only process that talks to the database. DB_SELECT picks MongoDB or Postgres, including a Supabase-compatible Postgres URL. That keeps the database off the public port. The cost is two processes to run.",
        results: "No measured results yet. The app is still in progress, so there is no live demo and no usage figure.",
        github: "https://github.com/patricphinehas/HomeSystem1_0",
        live: null,
        page: "/projects/home-system",
    },
];

// Placeholder testimonials — replace with real client quotes before publishing.
export const testimonials = [
    {
        quote: "Placeholder quote — swap in a real testimonial from this client about working with Patric before publishing.",
        name: "Client Name",
        role: "Founder, VegRoute",
        rating: 5,
    },
    {
        quote: "Placeholder quote — swap in a real testimonial from this client about working with Patric before publishing.",
        name: "Client Name",
        role: "Director, Aruna Healthcare Consultancy",
        rating: 5,
    },
    {
        quote: "Placeholder quote — swap in a real testimonial from this client about working with Patric before publishing.",
        name: "Client Name",
        role: "Owner, Aadhi Solar",
        rating: 5,
    },
];

export const certifications = [
    {
        id: 1,
        title: "User Experience Design",
        issuer: "Udemy",
        date: "October 2025",
        skills: ["UI/UX", "User Interface Design"],
        credentialUrl: "#"
    },
    {
        id: 2,
        title: "OpenAI API and Prompt Engineering",
        issuer: "Udemy",
        date: "September 2023",
        skills: ["OpenAI API", "Prompt Engineering"],
        credentialUrl: "#"
    },
    {
        id: 3,
        title: "EMC Academic Associate, Data Science and Big Data Analytics",
        issuer: "Dell EMC",
        date: "April 2016",
        skills: ["Data Science", "Big Data Analytics"],
        credentialUrl: "#"
    }
];

