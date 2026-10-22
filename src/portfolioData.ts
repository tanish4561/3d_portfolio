import type { SylvaHeroVariant } from "@designcodeio/threeui";

export const SYLVA_VARIANT_META: Record<
  SylvaHeroVariant,
  {
    label: string;
    season: string;
    atmosphere: string;
    swatch: string;
    accent: string;
  }
> = {
  "living-green": {
    label: "Living Green",
    season: "Ancient Moss Canopy",
    atmosphere: "Sunlit forest root arch with ferns, wildflowers, rising pollen & emerald butterfly",
    swatch: "#383b34",
    accent: "#c5d9b2",
  },
  "sakura-sunset": {
    label: "Sakura Sunset",
    season: "Cherry Blossom Dusk",
    atmosphere: "Flowering cherry boughs at twilight with drifting pink petals & amber swallowtail",
    swatch: "#3c2c36",
    accent: "#f4cbd9",
  },
  "maple-autumn": {
    label: "Maple Autumn",
    season: "Crimson Slate Dusk",
    atmosphere: "Japanese maple canopy in scarlet & gold leaf with tumbling autumn foliage",
    swatch: "#313a41",
    accent: "#e89b79",
  },
  "sequoia-mist": {
    label: "Sequoia Mist",
    season: "Redwood Grove Fog",
    atmosphere: "Old-growth redwood boughs emerging through luminous silver-green grove fog",
    swatch: "#4e5c52",
    accent: "#d4e3ce",
  },
};

export const SYLVA_FONT_OPTIONS = [
  "lexend",
  "instrument-serif",
  "plus-jakarta-sans",
  "inter",
  "space-grotesk",
  "playfair-display",
  "dm-sans",
  "syne",
] as const;

export const SYLVA_COLOR_SWATCHES = [
  { label: "Pure Ivory", value: "#ffffff" },
  { label: "Botanical Cream", value: "#f4f7ef" },
  { label: "Sakura Blush", value: "#fcebf1" },
  { label: "Autumn Amber", value: "#f9ece2" },
  { label: "Moss Mint", value: "#e1f0d3" },
] as const;

export interface VisionPersona {
  id: string;
  name: string;
  badge: string;
  description: string;
  isCanonical?: boolean;
  heroCopy: {
    dockItems: [string, string, string, string];
    headlineLine1: string;
    headlineLine2: string;
    lede: string;
    exploreLabel: string;
    statALabel: string;
    statAValue: string;
    statBLabel: string;
    statBValue: string;
    card1Label: string;
    card1Title: string;
    card2Label: string;
    card2Title: string;
    ghostWord: string;
  };
  recommendedProps: {
    variant: SylvaHeroVariant;
    headingFont: string;
    bodyFont: string;
    headingWeight: string;
    bodyWeight: string;
    primaryColor: string;
    headingSize: number;
    bodySize: number;
    headingLetterSpacing: number;
  };
}

export const VISION_PERSONAS: VisionPersona[] = [
  {
    id: "tanish-default",
    name: "Tanish Singla — Full-Stack Portfolio",
    badge: "Portfolio Identity",
    description:
      "Full-stack developer & AI engineer identity for Tanish Singla (B.Tech CSE @ TIET Patiala, SIH 2025 Winner, Adobe Hackathon Top 2,000).",
    heroCopy: {
      dockItems: ["Projects", "SIH 2025", "Skills", "Contact"],
      headlineLine1: "Tanish Singla",
      headlineLine2: "Full-Stack Developer",
      lede: "Computer Science undergraduate at TIET Patiala building full-stack web applications, backend APIs, and AI document tools. Smart India Hackathon 2025 Winner.",
      exploreLabel: "Explore my projects",
      statALabel: "SIH 2025 Hardware",
      statAValue: "Winner · Top 1%",
      statBLabel: "Coding Practice",
      statBValue: "300+ Solved",
      card1Label: "SIH 2025 Winner",
      card1Title: "NDRF Training Dashboard.",
      card2Label: "Adobe Hackathon 2025",
      card2Title: "AI PDF Parser",
      ghostWord: "TANISH",
    },
    recommendedProps: {
      variant: "living-green",
      headingFont: "lexend",
      bodyFont: "lexend",
      headingWeight: "300",
      bodyWeight: "300",
      primaryColor: "#ffffff",
      headingSize: 63,
      bodySize: 16.5,
      headingLetterSpacing: -0.006,
    },
  },
];

export const PERSONAL_IDENTITY = {
  name: "Tanish Singla",
  role: "Computer Science Undergraduate & Full-Stack Developer",
  institution: "Thapar Institute of Engineering and Technology, Patiala, India",
  degree: "Bachelor of Technology in Computer Science and Engineering",
  graduation: "Expected June 2027 (August 2023 – June 2027)",
  email: "tsinglabe23@thapar.edu",
  homepageIntro: {
    headline: "Hi, I’m Tanish Singla — a Computer Science undergraduate and full-stack developer.",
    paragraphs: [
      "I’m currently pursuing my B.Tech in Computer Science and Engineering at Thapar Institute of Engineering and Technology, Patiala (Class of 2027). I enjoy building full-stack web applications, backend REST APIs, and Python-based document processing tools that solve well-defined operational problems.",
      "Most of my recent work comes from building under real constraints in national hackathons and course projects — including serving as a Full-Stack Developer on the winning team of the Smart India Hackathon 2025 Hardware Edition and placing among the top 2,000 teams in the Adobe Hackathon 2025.",
      "Below you’ll find detailed case studies of what I’ve built, the specific engineering parts I owned, and what I learned along the way.",
    ],
  },
  aboutParagraphs: [
    "I’m a Computer Science and Engineering undergraduate at Thapar Institute of Engineering and Technology, Patiala, graduating in June 2027. Most of what I know about software engineering has come from taking a concrete problem — whether it is tracking trainee assessments during emergency drills or pulling clean section headings out of a 500-page PDF — and figuring out how to make the data flow reliably from the backend to the user interface.",
    "Over the past two years, my work has centered on full-stack web development (JavaScript, TypeScript, React, Vue, Node.js, Express, Django) alongside Python-based natural language processing and relational database design. Rather than locking myself into a single frontend or backend framework early on, I’ve tried to understand the common mechanics underneath them: how requests are validated, how state and user permissions are managed, and where bottlenecks appear when multiple users or large files hit the system at once.",
    "Competing in hackathons like the Smart India Hackathon 2025 and the Adobe Hackathon 2025 shaped how I work. Hackathon timelines force you to separate features that actually matter to the end user from features that merely look good on a slide deck. Working alongside teammates on the NDRF Chemical Disaster Training Dashboard taught me how to design role-based workflows and assessment reporting around real operational requirements rather than classroom assumptions.",
    "Alongside project work, I’ve solved more than 300 algorithmic problems on LeetCode and GeeksforGeeks to keep my foundations in data structures and problem-solving sharp. Right now, I’m focused on deepening my backend architecture skills, learning more about cloud deployment and Docker-based workflows, and writing cleaner, more maintainable TypeScript and Python code.",
  ],
};

export const SIH_FEATURED_ACHIEVEMENT = {
  competition: "Smart India Hackathon 2025 (Hardware Edition)",
  result: "Winner · Selected among the Top 1% of 40,000+ Teams Nationwide",
  role: "Full-Stack Developer",
  project: "NDRF Chemical Disaster Training Dashboard",
  date: "December 2025",
  contextParagraphs: [
    "Smart India Hackathon (SIH) is a nationwide engineering competition in India where student teams tackle problem statements submitted by public-sector organizations and ministries. In the 2025 cycle, my team competed in the Hardware Edition and was selected among the top 1% of more than 40,000 participating teams across the country, ultimately winning our problem category in December 2025.",
    "Our team built the NDRF Chemical Disaster Training Dashboard — a web-based training and evaluation platform designed to support chemical disaster response training for the National Disaster Response Force (NDRF). In high-stakes emergency preparedness, instructors have to manage dozens of trainees, deliver structured training modules, and evaluate performance accurately. Manual scoring and paper-based tracking slow down feedback and create administrative overhead for instructors.",
    "While the overall win belonged to our entire team across hardware and software tracks, my individual responsibility was serving as a Full-Stack Developer on the web platform. Using the MERN stack, I worked on six core functional modules covering user management, course delivery, progress tracking, analytics, and automated assessment reporting.",
    "Specifically, the platform was built to support 55+ active users in concurrent training sessions, with role-based authentication separating permissions for 50+ trainees and five administrators. According to our project metrics, automating the assessment and evaluation pipeline generated instant performance reports, cutting manual evaluation effort by 60% and reducing overall administrative overhead by roughly 40%.",
  ],
  whatItDemonstrated: [
    "Translating operational requirements (distinct trainee and instructor workflows) into role-based authentication and access control.",
    "Building full-stack modules that remain responsive when 50+ trainees access courses and submit assessments concurrently.",
    "Collaborating inside a multi-disciplinary hackathon team where the web dashboard had to align with the broader Hardware Edition solution.",
  ],
};

export interface CaseStudyQuestion {
  question: string;
  answer: string;
}

export interface PortfolioProject {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  contextBadge: string;
  category: "fullstack" | "ai-nlp" | "backend";
  categoryLabel: string;
  date: string;
  role: string;
  image: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  problemSummary: string;
  whyItMatters: string;
  whatItDoes: string;
  myContribution: string;
  technicalChallenges: string[];
  verifiedResults: string[];
  whatILearned: string;
  caseStudyQuestions: CaseStudyQuestion[];
  missingInfoToConfirm: string[];
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "ndrf-training-dashboard",
    number: "01",
    title: "NDRF Chemical Disaster Training Dashboard",
    subtitle:
      "Role-based training delivery, concurrent session management, and automated assessment reporting for emergency response personnel",
    contextBadge: "Smart India Hackathon 2025 Winner (Hardware Edition)",
    category: "fullstack",
    categoryLabel: "Full-Stack Web Platform · MERN",
    date: "December 2025",
    role: "Full-Stack Developer",
    image: "/landing-pages/inner-green-assets/card-ethos.jpg",
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Role-Based Auth", "REST APIs"],
    metrics: [
      { label: "Concurrent Users", value: "55+ Active Sessions" },
      { label: "Role Separation", value: "50+ Trainees · 5 Admins" },
      { label: "Evaluation Effort", value: "60% Manual Reduction" },
      { label: "Admin Overhead", value: "~40% Reduction" },
    ],
    problemSummary:
      "Coordinating chemical disaster response training involves managing groups of trainees, delivering structured coursework, and grading readiness assessments. When instructors rely on manual evaluation and fragmented tracking sheets, grading takes too long and trainees do not get immediate feedback on where they made mistakes.",
    whyItMatters:
      "In disaster-response training, instructors need clear visibility into individual and cohort readiness without spending hours manually compiling scores after each session.",
    whatItDoes:
      "The NDRF Chemical Disaster Training Dashboard centralizes training administration and trainee evaluation into one web application. It provides six functional modules: user management, course delivery, assessment execution, instant performance reporting, progress tracking, and instructor analytics.",
    myContribution:
      "As a Full-Stack Developer on the team, I developed the six core application modules using the MERN stack, implemented role-based authentication for trainees and administrators, built the automated assessment scoring and report-generation workflows, and structured the backend to handle 55+ active users across concurrent training sessions.",
    technicalChallenges: [
      "Designing clean role-based access boundaries so 50+ trainees could only access assigned training modules and assessments while 5 administrators had full control over cohorts, analytics, and evaluation records.",
      "Structuring assessment submissions and state updates so 55+ concurrent users could complete training sessions simultaneously without session collisions or delayed report generation.",
      "Connecting six distinct functional modules (user management, analytics, course delivery, progress tracking, assessments, and reporting) around a consistent data model.",
    ],
    verifiedResults: [
      "Supported 55+ active users participating in concurrent training sessions.",
      "Implemented role-based authentication serving 50+ trainees and 5 administrators.",
      "Generated instant performance reports upon assessment completion, reducing manual evaluation effort by 60%.",
      "Automated recurring training and reporting workflows, reducing administrative overhead by approximately 40%.",
    ],
    whatILearned:
      "Building this platform showed me how much backend data modeling affects frontend simplicity. Once we clearly separated trainee session state, course progress, and assessment scoring rules on the backend, building the analytics views and instant reports became much more straightforward.",
    caseStudyQuestions: [
      {
        question: "1. What problem was I trying to solve?",
        answer:
          "Manual evaluation and fragmented tracking during chemical disaster response training created delays in trainee feedback and heavy administrative work for instructors.",
      },
      {
        question: "2. Who was the intended user?",
        answer:
          "Two distinct user groups: emergency-response trainees (50+ users) completing coursework and assessments, and training administrators/instructors (5 users) overseeing cohorts and reviewing analytics.",
      },
      {
        question: "3. Why was the problem worth solving?",
        answer:
          "Reducing the time spent on manual grading and administrative coordination lets instructors focus on actual training quality while giving trainees immediate visibility into their assessment performance.",
      },
      {
        question: "4. What did I personally contribute?",
        answer:
          "I served as Full-Stack Developer on the team, building the six core web modules in the MERN stack, implementing role-based authentication, and developing the automated assessment and performance-reporting workflows.",
      },
      {
        question: "5. How did the application work at a high level?",
        answer:
          "Administrators configure courses, manage trainee accounts, and monitor cohort analytics. Trainees log in through role-protected routes, complete training modules and assessments in concurrent sessions, and receive instant performance reports calculated automatically on submission.",
      },
      {
        question: "6. Which technologies did I use, and why were they relevant?",
        answer:
          "The MERN stack (MongoDB, Express.js, React.js, Node.js). React handled the interactive dashboard and analytics views for trainees and admins; Node.js and Express provided the REST API and authentication middleware; MongoDB stored user profiles, course structures, session logs, and assessment results.",
      },
      {
        question: "7. What technical challenges were involved?",
        answer:
          "Handling 55+ concurrent active users during live training sessions, enforcing strict role-based permissions between trainees and admins, and computing assessment analytics immediately upon submission.",
      },
      {
        question: "8. What measurable outcomes did the project achieve?",
        answer:
          "Resume-reported outcomes: Winner of Smart India Hackathon 2025 Hardware Edition (top 1% of 40,000+ teams); supported 55+ active users (50+ trainees, 5 admins); reduced manual evaluation effort by 60%; reduced administrative overhead by ~40%.",
      },
      {
        question: "9. What did I learn?",
        answer:
          "How to design multi-role full-stack workflows under hackathon deadlines and how automating backend evaluation logic directly improves operational usability.",
      },
      {
        question: "10. What would I improve or investigate next?",
        answer:
          "Adding offline-first session syncing for field environments with unstable connectivity, granular audit logs for instructor overrides, and automated load testing for larger trainee cohorts.",
      },
    ],
    missingInfoToConfirm: [
      "Confirm how the web dashboard interfaced with any physical hardware components in the SIH 2025 Hardware Edition (e.g., sensor telemetry, hardware trainers, or IoT inputs).",
      "Confirm the exact authentication mechanism used (e.g., JWT with HTTP-only cookies, session tokens) and any charting/UI libraries used for the analytics module.",
      "Confirm how the 60% manual evaluation reduction and 40% administrative overhead reduction were measured during testing or demonstrations.",
      "Add GitHub repository link (if public/permitted) or non-confidential UI screenshots.",
    ],
  },
  {
    id: "ai-pdf-parser",
    number: "02",
    title: "AI PDF Parser",
    subtitle:
      "Containerized Python and NLP pipeline for extracting structured headings from 500+ page PDF documents in under 10 seconds",
    contextBadge: "Adobe Hackathon 2025 · Top 2,000 of 150,000+ Participants",
    category: "ai-nlp",
    categoryLabel: "Document Processing · Python, NLP & Docker",
    date: "February 2025",
    role: "Developer (Python, NLP & Containerization)",
    image: "/landing-pages/inner-green-assets/card-ecostove.jpg",
    technologies: ["Python", "Natural Language Processing (NLP)", "Docker", "Document Parsing"],
    metrics: [
      { label: "Document Scale", value: "500+ Pages / File" },
      { label: "Heading Accuracy", value: "92% (100+ Test Docs)" },
      { label: "Processing Speed", value: "< 10s (down from 3–5m)" },
      { label: "Adobe Hackathon", value: "Top 2,000 / 150,000+" },
    ],
    problemSummary:
      "PDF files are built for visual page rendering rather than semantic structure. In long documents — such as technical manuals, reports, or textbooks exceeding 500 pages — headings are rarely tagged consistently, making manual outlining or naive rule-based extraction slow and error-prone.",
    whyItMatters:
      "Downstream workflows like document indexing, search, summarization, and automated navigation depend on accurately identifying section boundaries and heading hierarchies first.",
    whatItDoes:
      "The AI PDF Parser ingests large PDF documents (500+ pages per file), applies natural language processing to identify and extract document headings, and runs inside a Docker container so the extraction pipeline behaves identically across machines.",
    myContribution:
      "I worked on the Python document-processing and NLP heading-extraction pipeline, evaluated extraction accuracy across a test dataset of more than 100 documents, optimized execution so files processed in under 10 seconds, and packaged the runtime environment with Docker.",
    technicalChallenges: [
      "Handling layout and formatting inconsistency across 100+ diverse PDF documents where font sizes, numbering styles, and whitespace vary widely.",
      "Processing documents with more than 500 pages without running into memory spikes or multi-minute execution times.",
      "Ensuring reproducible dependencies and consistent execution across development and evaluation environments using Docker.",
    ],
    verifiedResults: [
      "Processed PDF documents containing more than 500 pages per file.",
      "Achieved 92% heading extraction accuracy across a dataset of 100+ test documents.",
      "Reduced per-document analysis time from approximately 3–5 minutes to under 10 seconds.",
      "Associated with Adobe Hackathon 2025, ranking among the top 2,000 teams out of 150,000+ participants (resume-reported).",
    ],
    whatILearned:
      "Working with real-world PDFs taught me that clean input data is rare. Combining text-level NLP signals with structural heuristics — and profiling where the pipeline spends time on 500-page files — matters just as much as the model logic itself.",
    caseStudyQuestions: [
      {
        question: "1. What problem was I trying to solve?",
        answer:
          "Extracting accurate section headings and structural hierarchy from large, inconsistently formatted PDF documents (500+ pages) without spending several minutes per file.",
      },
      {
        question: "2. Who was the intended user?",
        answer:
          "Developers, researchers, and document-processing pipelines that need structured outlines extracted automatically from long PDF reports or manuals.",
      },
      {
        question: "3. Why was the problem worth solving?",
        answer:
          "Scanning a 500-page document manually or waiting 3–5 minutes per file creates a bottleneck for any system that indexes, searches, or summarizes large document collections.",
      },
      {
        question: "4. What did I personally contribute?",
        answer:
          "I developed the Python and NLP extraction workflow, benchmarked it across 100+ test PDFs, optimized runtime performance to under 10 seconds per file, and containerized the application with Docker.",
      },
      {
        question: "5. How did the application work at a high level?",
        answer:
          "The parser reads a PDF file, extracts candidate text spans and layout cues, applies NLP classification/heuristics to distinguish true headings from body text, and outputs the structured heading outline inside a containerized Docker runtime.",
      },
      {
        question: "6. Which technologies did I use, and why were they relevant?",
        answer:
          "Python for text and document processing, Natural Language Processing (NLP) techniques for identifying headings across varied document styles, and Docker to package Python libraries and model dependencies for consistent execution.",
      },
      {
        question: "7. What technical challenges were involved?",
        answer:
          "Distinguishing headings from bold body text or headers/footers across 100+ varied test documents, keeping runtime under 10 seconds on 500+ page files, and avoiding environment-specific dependency failures.",
      },
      {
        question: "8. What measurable outcomes did the project achieve?",
        answer:
          "Resume-reported outcomes: 92% heading extraction accuracy across 100+ test documents; reduced analysis time from ~3–5 minutes to under 10 seconds per 500+ page PDF; top 2,000 teams out of 150,000+ participants in Adobe Hackathon 2025.",
      },
      {
        question: "9. What did I learn?",
        answer:
          "How to balance extraction accuracy against execution speed on large files, and why containerization is essential when shipping Python/NLP pipelines.",
      },
      {
        question: "10. What would I improve or investigate next?",
        answer:
          "Adding table-of-contents hierarchy reconstruction (H1/H2/H3 nesting), multi-column academic PDF support, and batch processing queues.",
      },
    ],
    missingInfoToConfirm: [
      "Confirm the specific Python PDF parsing library used (e.g., PyMuPDF / fitz, pdfplumber, pypdf, or PDFMiner).",
      "Confirm the exact NLP library or model approach used (e.g., spaCy, scikit-learn classifier, transformer embeddings, or hybrid layout + NLP features).",
      "Confirm what the baseline 3–5 minute comparison represented (e.g., manual human review vs. an earlier unoptimized script).",
      "Add GitHub repository link and sample JSON/markdown output format.",
    ],
  },
  {
    id: "bank-management-system",
    number: "03",
    title: "Bank Management System",
    subtitle:
      "Relational database schema and 12 RESTful API endpoints for multi-user account operations, fund transfers, and transaction logging",
    contextBadge: "Backend Architecture & Relational Data Modeling",
    category: "backend",
    categoryLabel: "Backend API · Node.js & MySQL",
    date: "Academic & Personal Engineering Project",
    role: "Backend Developer",
    image: "/landing-pages/inner-green-assets/card-ethos.jpg",
    technologies: ["Node.js", "Express", "MySQL", "RESTful APIs", "SQL", "Authentication"],
    metrics: [
      { label: "API Surface", value: "12 RESTful Endpoints" },
      { label: "Core Workflows", value: "Accounts · Transfers · Logs" },
      { label: "Simulated Latency", value: "< 200ms per Request" },
      { label: "Data Layer", value: "Normalized MySQL Schema" },
    ],
    problemSummary:
      "Financial and account-based applications cannot afford loose data handling. When multiple users create accounts, check balances, and transfer funds, the backend has to validate every input, verify caller identity, and record transactions in a relational database without leaving balances in an inconsistent state.",
    whyItMatters:
      "Building a banking-style backend is a practical test of core backend engineering fundamentals: structured API routing, authentication middleware, strict input validation, and relational schema design.",
    whatItDoes:
      "The Bank Management System is a backend-focused application built with Node.js and MySQL. It exposes 12 RESTful API endpoints supporting user authentication, account creation, balance inquiries, inter-account fund transfers, and immutable transaction history logs.",
    myContribution:
      "I designed the normalized MySQL database schema for multi-user accounts and transaction logs, implemented all 12 RESTful API endpoints in Node.js, integrated authentication and request-validation workflows, and tested endpoint response times.",
    technicalChallenges: [
      "Designing the MySQL relational schema so account balances and transaction log entries stay properly linked via foreign keys across deposits, withdrawals, and transfers.",
      "Validating transfer payloads (checking sufficient balance, valid destination accounts, positive amounts) before executing database updates.",
      "Keeping query execution clean and indexed so simulated API requests consistently returned in under 200 milliseconds.",
    ],
    verifiedResults: [
      "Implemented 12 RESTful API endpoints covering authentication, account lifecycle, fund transfers, and balance tracking.",
      "Designed a multi-user relational MySQL schema separating user credentials, account records, and transaction logs.",
      "Reported simulated API response times below 200 milliseconds per request during local/simulated testing.",
    ],
    whatILearned:
      "This project reinforced why relational databases and strict server-side validation are essential for transactional data. Writing clear SQL relationships and validating edge cases at the API boundary prevented bad state before it could ever reach the database.",
    caseStudyQuestions: [
      {
        question: "1. What problem was I trying to solve?",
        answer:
          "Designing a structured, reliable backend API and relational database capable of handling multi-user account operations, balance tracking, and fund transfers with proper validation.",
      },
      {
        question: "2. Who was the intended user?",
        answer:
          "Built as a foundational backend engineering project modeling how client applications interact with a core banking REST API.",
      },
      {
        question: "3. Why was the problem worth solving?",
        answer:
          "Account and transfer workflows force you to think carefully about data integrity, authentication, input validation, and relational SQL modeling rather than simple CRUD operations.",
      },
      {
        question: "4. What did I personally contribute?",
        answer:
          "I independently designed the MySQL schema, built the 12 Node.js REST API endpoints, added authentication and input-validation middleware, and benchmarked simulated request latency.",
      },
      {
        question: "5. How did the application work at a high level?",
        answer:
          "Clients authenticate against the Node.js API, which validates incoming requests and interacts with a MySQL database storing user accounts, current balances, and an audit trail of every transfer.",
      },
      {
        question: "6. Which technologies did I use, and why were they relevant?",
        answer:
          "Node.js for building the RESTful API server and validation middleware, and MySQL for structured relational storage of accounts and transaction logs.",
      },
      {
        question: "7. What technical challenges were involved?",
        answer:
          "Enforcing input validation on transfer operations, structuring relational tables for multi-user transaction histories, and maintaining sub-200ms simulated response times.",
      },
      {
        question: "8. What measurable outcomes did the project achieve?",
        answer:
          "Resume-reported outcomes: 12 RESTful API endpoints implemented; multi-user MySQL schema for accounts and transaction logs; simulated response times below 200ms per request. (Note: This is an academic/engineering project, not a production banking platform.)",
      },
      {
        question: "9. What did I learn?",
        answer:
          "How REST API design, authentication middleware, and relational database constraints work together to protect data consistency.",
      },
      {
        question: "10. What would I improve or investigate next?",
        answer:
          "Adding explicit SQL ACID transaction rollback tests under concurrent transfer load, idempotency keys for transfer requests, and automated integration test suites.",
      },
    ],
    missingInfoToConfirm: [
      "Confirm whether SQL transactions (BEGIN / COMMIT / ROLLBACK) were explicitly used during fund transfers.",
      "Confirm which Node.js libraries were used for validation and authentication (e.g., Express, JWT, bcrypt, Joi/Zod/express-validator).",
      "Confirm how the sub-200ms simulated response time was measured (e.g., Postman, ApacheBench, k6).",
      "Add GitHub repository link and API endpoint list.",
    ],
  },
];

export interface SkillCategory {
  id: string;
  index: string;
  title: string;
  items: string[];
  explanation: string;
  projectConnection: string;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    index: "01",
    title: "Programming Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "HTML5", "CSS3"],
    explanation:
      "The core languages I use for full-stack web development, backend scripting, relational database queries, and algorithmic problem solving.",
    projectConnection:
      "Applied JavaScript across the MERN-based NDRF Training Dashboard, Python in the AI PDF Parser, SQL in the Bank Management System, and earned a TypeScript Certification from Xebia (June 2026).",
  },
  {
    id: "frameworks",
    index: "02",
    title: "Frameworks & Libraries",
    items: ["React.js", "Vue.js", "Node.js", "Django", "Express", "Framer Motion"],
    explanation:
      "Tools for building interactive component-based frontends and structured REST API backends across both the JavaScript and Python ecosystems.",
    projectConnection:
      "Used React.js, Node.js, and Express to build the 6 functional modules of the NDRF dashboard; Node.js for the 12-endpoint Bank Management API; and completed Django Certification through Great Learning (August 2024).",
  },
  {
    id: "cloud-devops",
    index: "03",
    title: "Cloud & DevOps",
    items: ["Amazon Web Services (AWS)", "Docker", "Linux CLI", "Git", "CI/CD"],
    explanation:
      "Tooling for version control, Linux-based development workflows, containerizing applications so they run consistently across environments, and cloud deployment fundamentals.",
    projectConnection:
      "Used Docker to containerize the AI PDF Parser for Adobe Hackathon 2025 so the Python and NLP runtime executed predictably across testing environments.",
  },
  {
    id: "competencies",
    index: "04",
    title: "Core Engineering Competencies",
    items: [
      "Data Structures & Algorithms",
      "RESTful APIs",
      "UI/UX Design",
      "Performance Optimization",
    ],
    explanation:
      "Foundational engineering practices that guide how I design data models, structure client-server communication, and reduce execution bottlenecks.",
    projectConnection:
      "Backed by 300+ solved DSA problems on LeetCode and GeeksforGeeks, sub-10-second processing optimization on 500+ page PDFs, and role-based workflow design for 55+ concurrent NDRF dashboard users.",
  },
];

export interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  metricBadge: string;
  summary: string;
  relatedProjectId?: string;
  relatedProjectLabel?: string;
}

export const ACHIEVEMENTS_LIST: AchievementItem[] = [
  {
    id: "sih-2025",
    title: "Winner — Smart India Hackathon 2025 (Hardware Edition)",
    subtitle: "Full-Stack Developer · NDRF Chemical Disaster Training Dashboard",
    date: "December 2025",
    metricBadge: "Top 1% of 40,000+ Teams",
    summary:
      "Selected as a Full-Stack Developer on the winning team among the top 1% of more than 40,000 teams across India. Built the six-module web training and assessment platform supporting 55+ concurrent users.",
    relatedProjectId: "ndrf-training-dashboard",
    relatedProjectLabel: "Inspect NDRF Dashboard Case Study",
  },
  {
    id: "adobe-2025",
    title: "Top 2,000 Teams — Adobe Hackathon 2025",
    subtitle: "AI-Based Document Processing · AI PDF Parser",
    date: "February 2025",
    metricBadge: "Top 2,000 of 150,000+ Participants",
    summary:
      "Ranked among the top 2,000 teams out of more than 150,000 participants (resume-reported) for developing a containerized Python and NLP pipeline that extracts structure from 500+ page PDFs in under 10 seconds.",
    relatedProjectId: "ai-pdf-parser",
    relatedProjectLabel: "Inspect AI PDF Parser Case Study",
  },
  {
    id: "dsa-300",
    title: "300+ Algorithmic Problems Solved",
    subtitle: "Consistent Data Structures & Algorithms Practice",
    date: "Ongoing",
    metricBadge: "LeetCode & GeeksforGeeks",
    summary:
      "Solved more than 300 algorithmic and data-structure problems across LeetCode and GeeksforGeeks, strengthening core problem decomposition, time/space complexity analysis, and coding fluency.",
  },
];

export const EDUCATION_DATA = {
  institution: "Thapar Institute of Engineering and Technology, Patiala",
  degree: "Bachelor of Technology in Computer Science and Engineering",
  duration: "August 2023 – June 2027 (Expected)",
  coursework: ["Data Structures and Algorithms", "Web Development", "Software Engineering"],
  summary:
    "My undergraduate coursework in data structures, software engineering, and web development provides the theoretical backbone for my project work — helping me connect classroom concepts like relational normalization, algorithmic complexity, and modular software design directly to hackathon builds and backend APIs.",
};

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  typeLabel: "Technical Certification" | "Competition Achievement Certificate";
  relevance: string;
  linkPlaceholder: string;
}

export const CERTIFICATIONS_LIST: CertificationItem[] = [
  {
    id: "cert-ts",
    name: "TypeScript Certification",
    issuer: "Xebia",
    date: "June 2026",
    typeLabel: "Technical Certification",
    relevance:
      "Validates static typing, interface design, and safer full-stack JavaScript/TypeScript application development.",
    linkPlaceholder: "Certificate URL to be added",
  },
  {
    id: "cert-sih",
    name: "Smart India Hackathon 2025 — Hardware Edition Winner Certificate",
    issuer: "Smart India Hackathon",
    date: "December 2025",
    typeLabel: "Competition Achievement Certificate",
    relevance:
      "Official recognition for winning the SIH 2025 Hardware Edition as a Full-Stack Developer on the NDRF Chemical Disaster Training Dashboard.",
    linkPlaceholder: "Certificate URL to be added",
  },
  {
    id: "cert-adobe",
    name: "Adobe Hackathon 2025 — Certificate of Achievement",
    issuer: "Adobe Hackathon",
    date: "February 2025",
    typeLabel: "Competition Achievement Certificate",
    relevance:
      "Recognizes our team's placement among the top 2,000 teams out of 150,000+ participants with the AI PDF Parser project.",
    linkPlaceholder: "Certificate URL to be added",
  },
  {
    id: "cert-django",
    name: "Django Certification",
    issuer: "Great Learning",
    date: "August 2024",
    typeLabel: "Technical Certification",
    relevance:
      "Covers Python-based backend web development, ORM data modeling, and server-side application structure in Django.",
    linkPlaceholder: "Certificate URL to be added",
  },
];

export const PHILOSOPHY_AND_DIRECTION = {
  philosophyNote:
    "Proposed positioning based on resume project evidence — ready for your personal review:",
  philosophyItems: [
    {
      num: "01",
      title: "Start With the Operational Bottleneck",
      body: "Whether it is reducing manual grading effort by 60% in a training dashboard or cutting PDF analysis from minutes to under 10 seconds, software is most useful when it removes a measurable friction point for the user.",
    },
    {
      num: "02",
      title: "Think Across the Full Request Lifecycle",
      body: "Good frontend interfaces depend on well-structured backends. Designing role-based permissions, input validation, and clean database schemas early prevents fragile workarounds in the UI later.",
    },
    {
      num: "03",
      title: "Protect Data Integrity and Reproducibility",
      body: "From validating fund-transfer payloads in Node.js and MySQL to packaging Python NLP dependencies in Docker, predictable behavior matters just as much as feature count.",
    },
    {
      num: "04",
      title: "Learn by Shipping Under Constraints",
      body: "Pairing consistent algorithmic practice (300+ DSA problems) with time-boxed hackathon builds keeps both problem-solving fundamentals and practical execution sharp.",
    },
  ],
  futureInterests: [
    {
      title: "Scalable Backend & API Architecture",
      detail:
        "Building on my Node.js, Express, Django, and SQL foundation to explore concurrency handling, caching, and transactional reliability in larger systems.",
    },
    {
      title: "Cloud Infrastructure & Automated Deployment",
      detail:
        "Expanding my hands-on usage of Docker, Linux CLI, CI/CD, and AWS to deploy and monitor multi-service full-stack applications.",
    },
    {
      title: "Practical AI & Document Intelligence Pipelines",
      detail:
        "Extending the lessons from the AI PDF Parser into more capable document extraction, layout understanding, and structured NLP workflows.",
    },
    {
      title: "Collaborative Engineering & Open Source",
      detail:
        "Contributing to collaborative codebases and open-source developer tools while preparing for software engineering internships and full-time roles (Class of 2027).",
    },
  ],
};

export const WRITING_ROADMAP = {
  recommendation:
    "Editorial Note: Rather than publishing placeholder or AI-generated blog posts, this section is structured as an upcoming Engineering Notes roadmap drawn directly from your real builds. Publish each note as you write it in your own words.",
  plannedTopics: [
    {
      tag: "Planned Note 01 · Full-Stack Architecture",
      title: "Designing Role-Based Assessment Workflows for 55+ Concurrent Users in the MERN Stack",
      summary:
        "A breakdown of how we structured trainee vs. administrator permissions and instant report generation for the NDRF Chemical Disaster Training Dashboard during Smart India Hackathon 2025.",
    },
    {
      tag: "Planned Note 02 · Python & NLP",
      title: "What Makes 500-Page PDFs Hard to Parse: Lessons from Adobe Hackathon 2025",
      summary:
        "How layout inconsistencies break simple heading rules, and how combining NLP signals with Docker containerization helped us reach 92% accuracy in under 10 seconds per file.",
    },
    {
      tag: "Planned Note 03 · Backend Fundamentals",
      title: "Structuring Multi-User Account & Transaction Tables in Node.js and MySQL",
      summary:
        "Practical lessons on input validation, relational schema design, and keeping API endpoints predictable in a banking-style backend.",
    },
  ],
};

export const MISSING_INFO_CHECKLIST = [
  {
    category: "Profile & Resume Links",
    items: [
      "Actual GitHub profile URL (e.g., https://github.com/...)",
      "Actual LinkedIn profile URL (e.g., https://linkedin.com/in/...)",
      "Actual LeetCode & GeeksforGeeks profile URLs",
      "Direct PDF file or link for 'View / Download Resume'",
    ],
  },
  {
    category: "NDRF Chemical Disaster Training Dashboard (SIH 2025)",
    items: [
      "Clarify how the web dashboard connected to the Hardware Edition deliverables of your SIH 2025 team.",
      "Specify the authentication library/strategy (e.g., JWT, sessions) and analytics charting libraries used.",
      "Add non-confidential screenshots or architecture diagrams of the 6 core modules.",
    ],
  },
  {
    category: "AI PDF Parser (Adobe Hackathon 2025)",
    items: [
      "Specify the exact Python PDF library (e.g., PyMuPDF, pdfplumber) and NLP model/technique used for heading extraction.",
      "Clarify the evaluation methodology used to measure 92% accuracy across the 100+ test documents.",
      "Add GitHub repository link and a sample input/output demonstration.",
    ],
  },
  {
    category: "Bank Management System & Certifications",
    items: [
      "Add GitHub repository link and list of the 12 RESTful endpoints for the Bank Management System.",
      "Add verification links or PDF views for the Xebia TypeScript, SIH 2025, Adobe Hackathon 2025, and Great Learning Django certificates.",
    ],
  },
];
