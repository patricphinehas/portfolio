import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const personalInfo = {
    name: "Patric Phinehas Raj",
    role: "Senior Frontend Engineer",
    summary: "Results-driven Frontend Engineer with over 5 years of experience in developing scalable, high-performance web applications. Adept at leading teams, mentoring junior engineers, and integrating modern JavaScript frameworks. Passionate about creating seamless user experiences through Angular, React, and modern frontend technologies. Experienced in Agile development, CI/CD, and integrating AI solutions to enhance efficiency. Also gives guest lectures at engineering colleges, sharing industry insights with the next generation of developers.",
    email: "patricphinehas@gmail.com",
    phone: "+91-9597567751",
    linkedin: "https://www.linkedin.com/in/patricphinehas/",
    location: "Bengaluru, India",
    socials: [
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/patricphinehas/",
            icon: Linkedin
        },
        {
            name: "Email",
            url: "mailto:patricphinehas@gmail.com",
            icon: Mail
        }
    ]
};

export const skills = [
    { category: "Frontend Frameworks", items: ["Angular 12+", "React.js", "Next.js", "Vue.js"] },
    { category: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "Python", "C", "C++", "HTML5", "CSS3", "SCSS/SASS"] },
    { category: "Styling & UI", items: ["TailwindCSS", "Bootstrap", "Shadcn-UI", "Material-UI", "Styled Components"] },
    { category: "Backend & APIs", items: ["Node.js", "Express.js", "FastAPI", "REST APIs", "GraphQL", "OAuth 2.0"] },
    { category: "Machine Learning & AI", items: ["Scikit-learn", "TensorFlow", "Pandas", "NumPy", "Linear Regression", "Decision Trees", "Neural Networks", "NLP"] },
    { category: "Automation & Workflow", items: ["n8n", "Zapier", "Make (Integromat)", "Power Automate", "Python Scripts", "Selenium"] },
    { category: "Data Visualization", items: ["Chart.js", "Highcharts", "D3.js", "Recharts"] },
    { category: "3D & Graphics", items: ["BabylonJs", "Three.js", "WebGL"] },
    { category: "Cloud & DevOps", items: ["Azure", "AWS", "Docker", "CI/CD Pipelines", "Jenkins"] },
    { category: "Databases", items: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "SQLite", "Redis", "SQL Server"] },
    { category: "Version Control", items: ["Git", "GitHub", "GitLab", "Bitbucket"] },
    { category: "UX/UI Design & Research", items: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "User Research", "Wireframing", "Prototyping", "Usability Testing"] },
    { category: "Testing", items: ["Jest", "React Testing Library", "Cypress", "Jasmine", "Karma"] },
    { category: "Other Tools", items: ["Webpack", "Vite", "npm/yarn", "VS Code", "Postman"] },
];

export const experience = [
    {
        id: 1,
        role: "Senior Frontend Engineer",
        company: "Bosch Global Software Technologies",
        period: "September 2022 – Present",
        description: [
            "Designed and developed intuitive dashboards for streamlined task delegation and tracking, enhancing productivity and efficiency.",
            "Led and mentored a team of 8 frontend and 2 iOS developers, ensuring adherence to best practices and project deadlines.",
            "Spearheaded the integration of Generative AI into the chatbot system, automating responses and improving user engagement.",
            "Planned and implemented Teams Chatbot and Power Platform tools, leading to optimized workflow automation.",
            "Developed and maintained a highly scalable Angular-based frontend integrated with a Python-based backend.",
            "Lead UI/UX improvements, enhancing accessibility, responsiveness, and overall user experience.",
            "Improved efficiency of the page load time by 15%."
        ]
    },
    {
        id: 2,
        role: "Software Development Associate",
        company: "Bosch Global Software Technologies",
        period: "September 2020 – August 2022",
        description: [
            "Led the adoption and integration of NextGen technologies, including Firebase for real-time data synchronization.",
            "Engineered a SQLite-based system to improve data storage, retrieval speed, and scalability.",
            "Refactored and optimized critical application functions, leading to significant performance gains.",
            "Designed and developed a custom Android system on an SoC-based development board.",
            "Partnered with cross-functional teams to streamline CI/CD pipelines, reducing deployment times."
        ]
    },
    {
        id: 3,
        role: "Intern",
        company: "Bosch Global Software Technologies",
        period: "July 2019 – March 2020",
        description: [
            "Developed a Python-based audio fingerprinting tool to analyse and extract audio spectra.",
            "Created an NFC-based authentication PoC for seamless cross-authentication.",
            "Conducted research and experiments on embedded systems and IoT devices."
        ]
    }
];

export const education = [
    {
        degree: "Master of Technology in Information Technology",
        school: "PSG College of Technology, Coimbatore",
        period: "2018 – 2020"
    },
    {
        degree: "Bachelor of Engineering in Computer Science and Engineering",
        school: "Jansons Institute of Technology",
        period: "2013 – 2017"
    }
];

export const projects = [
    {
        id: 1,
        title: "VegRoute — Farm-to-Home Delivery",
        role: "Team Lead",
        icon: "vegroute",
        description: "Led the engineering team in building a B2C marketplace connecting local vegetable farmers directly with home consumers — covering catalog browsing, subscriptions, and real-time order tracking.",
        tags: ["Team Lead", "B2C Marketplace", "React", "Node.js"],
    },
    {
        id: 2,
        title: "Aruna Health — Ambulance Optimization",
        role: "Strategic Consultant",
        icon: "ambulance",
        description: "Architected a strategic dispatch and route-optimization solution for Aruna Healthcare Consultancy, spanning a dispatcher admin console and a crew mobile app to cut emergency response times.",
        tags: ["Strategy", "Admin Dashboard", "Crew App", "Logistics"],
    },
    {
        id: 3,
        title: "Aruna Aesthetics & Wellness Clinic",
        role: "Design & Development",
        icon: "clinic",
        description: "Designed and built a bookings-first marketing website for Aruna's aesthetics and wellness clinic, wiring in Calendly for seamless appointment scheduling.",
        tags: ["Website", "Calendly Integration", "Healthcare", "UX"],
    },
    {
        id: 4,
        title: "RK Crackers — Inventory & Purchase Orders",
        role: "Full-stack Development",
        icon: "inventory",
        description: "Built a web-based inventory management system with an integrated purchase order workflow, giving RK Crackers real-time stock visibility across their supply chain.",
        tags: ["Inventory Management", "Purchase Orders", "Web App", "B2B"],
    },
    {
        id: 5,
        title: "Aadhi Solar — Branding & Growth Strategy",
        role: "Brand & Marketing Strategy",
        icon: "solar",
        description: "Delivered brand identity and a marketing website for Aadhi Solar, paired with strategic consultancy on brand placement and multi-channel marketing (SEO, AEO, GEO).",
        tags: ["Branding", "Website", "SEO / AEO / GEO", "Growth Strategy"],
    },
    {
        id: 6,
        title: "AI Chatbot Integration",
        role: "Bosch Global Software Technologies",
        icon: "chatbot",
        description: "Integrated Generative AI into a chatbot system to automate responses and improve user engagement.",
        tags: ["Generative AI", "Chatbot", "Angular", "Python"],
    },
    {
        id: 7,
        title: "Task Delegation Dashboard",
        role: "Bosch Global Software Technologies",
        icon: "dashboard",
        description: "Intuitive dashboards for streamlined task delegation and tracking, enhancing productivity.",
        tags: ["React/Angular", "Dashboard", "Data Structures"],
    },
    {
        id: 8,
        title: "Audio Fingerprinting Tool",
        role: "Bosch Global Software Technologies",
        icon: "audio",
        description: "Python-based tool to analyse and extract audio spectra for improving sound recognition accuracy.",
        tags: ["Python", "Audio Analysis", "Research"],
    }
];

export const speaking = {
    title: "Guest Lecturer",
    description: "Occasionally invited to speak at engineering colleges — sharing industry insights on frontend engineering, modern JavaScript frameworks, and AI-assisted development with students.",
};

// Response-time / working promise shown near Contact + FAQ
export const responsePromise = {
    headline: "I reply within 24 hours",
    detail: "Every enquiry gets a personal reply — usually same-day, always within one business day.",
};

export const faqs = [
    {
        question: "What kind of projects do you take on?",
        answer: "Everything from full product builds (like VegRoute's farmer-to-home marketplace) to focused engagements — dashboards, admin/crew apps, marketing websites with booking integrations, inventory systems, and brand + growth strategy for small businesses."
    },
    {
        question: "Do you work with startups and small businesses, or only enterprises?",
        answer: "Both. My day job is enterprise frontend at Bosch, but a lot of my favorite work has been hands-on with founders and small business owners — from a solar company's rebrand to a healthcare consultancy's dispatch system."
    },
    {
        question: "What's your tech stack?",
        answer: "React, Angular, Next.js and TypeScript on the frontend; Node.js, Express and Python (FastAPI) on the backend; Tailwind for styling; and Firebase/PostgreSQL/MongoDB depending on the project's needs."
    },
    {
        question: "How quickly can you start, and how long do projects usually take?",
        answer: "I typically respond within 24 hours to scope a project, and can usually kick off within a week. Timelines vary — a marketing website with booking integration might take 2–3 weeks, while a full platform build can run several months."
    },
    {
        question: "How does pricing and scoping work?",
        answer: "I start with a short call to understand your goals, then send a fixed-scope proposal for well-defined projects or a monthly retainer for ongoing work. No surprise invoices — you'll know the cost before we start."
    },
];

// Deeper problem → approach → result breakdowns for flagship projects.
// Numbers are illustrative placeholders — swap in real, verifiable metrics before publishing.
export const caseStudies = [
    {
        id: 1,
        title: "VegRoute",
        subtitle: "Farm-to-Home Vegetable Delivery",
        role: "Team Lead",
        problem: "Local vegetable farmers had no direct channel to home consumers — produce passed through multiple middlemen, raising prices and cutting farmer margins, while customers had no reliable way to order fresh produce online.",
        approach: "Led the engineering team to build a B2C marketplace from the ground up: catalog browsing, subscription-based recurring orders, and real-time order tracking, on a React + Node.js stack designed to scale with order volume.",
        result: "Shipped a production marketplace connecting farmers directly to households, cutting out middleman markups and giving customers a subscription-based fresh produce experience.",
        tags: ["React", "Node.js", "B2C Marketplace", "Team Leadership"],
    },
    {
        id: 2,
        title: "Aruna Health",
        subtitle: "Ambulance Dispatch Optimization",
        role: "Strategic Consultant",
        problem: "Aruna Healthcare Consultancy's ambulance fleet relied on manual, phone-based dispatch — leading to slower response times and little visibility into crew location or availability during emergencies.",
        approach: "Architected a two-sided system: an admin console for dispatchers to assign and track ambulances in real time, and a crew mobile app for accepting jobs and updating status from the field.",
        result: "Gave dispatchers real-time visibility into the fleet and streamlined the assignment workflow, with the goal of materially reducing emergency response times.",
        tags: ["Strategy", "Admin Dashboard", "Crew App", "Logistics"],
    },
    {
        id: 3,
        title: "Aadhi Solar",
        subtitle: "Brand Identity & Growth Strategy",
        role: "Brand & Marketing Strategy",
        problem: "Aadhi Solar needed a credible brand presence to compete for residential and commercial solar installs, but had no cohesive identity, website, or discoverability strategy across search and AI-driven answer engines.",
        approach: "Delivered a full brand identity and marketing website, then advised on brand placement and a multi-channel marketing strategy spanning traditional SEO, answer-engine optimization (AEO), and generative-engine optimization (GEO).",
        result: "Gave Aadhi Solar a consistent, professional brand presence online with a strategy designed to improve visibility across both traditional search and emerging AI-driven discovery channels.",
        tags: ["Branding", "Website", "SEO / AEO / GEO", "Growth Strategy"],
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
        title: "OpenAI",
        issuer: "Udemy",
        date: "September 2023",
        skills: ["OpenAI Products", "OpenAI Services"],
        credentialUrl: "#"
    },
    {
        id: 3,
        title: "EMC Academic Associate, Data Science and Big Data Analytics",
        issuer: "Dell EMC",
        date: "April 2016",
        skills: ["Data Science", "Big Data Analytics", "Machine Learning"],
        credentialUrl: "#"
    },
    {
        id: 4,
        title: "Olympiad",
        issuer: "UNSW College",
        date: "2016",
        skills: ["Problem Solving", "Competitive Programming"],
        credentialUrl: "#"
    }
];
