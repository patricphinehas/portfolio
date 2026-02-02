import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const personalInfo = {
    name: "Patric Phinehas Raj",
    role: "Senior Frontend Engineer",
    summary: "Results-driven Frontend Engineer with over 5 years of experience in developing scalable, high-performance web applications. Adept at leading teams, mentoring junior engineers, and integrating modern JavaScript frameworks. Passionate about creating seamless user experiences through Angular, React, and modern frontend technologies. Experienced in Agile development, CI/CD, and integrating AI solutions to enhance efficiency.",
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
        title: "AI Chatbot Integration",
        description: "Integrated Generative AI into a chatbot system to automate responses and improve user engagement.",
        tags: ["Generative AI", "Chatbot", "Angular", "Python"],
    },
    {
        id: 2,
        title: "Task Delegation Dashboard",
        description: "intuitive dashboards for streamlined task delegation and tracking, enhancing productivity.",
        tags: ["React/Angular", "Dashboard", "Data Structures"],
    },
    {
        id: 3,
        title: "Audio Fingerprinting Tool",
        description: "Python-based tool to analyse and extract audio spectra for improving sound recognition accuracy.",
        tags: ["Python", "Audio Analysis", "Research"],
    }
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
