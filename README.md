# Tanish Singla | Interactive Developer Portfolio

A nature-inspired developer portfolio that turns a conventional personal website into an immersive, interactive experience. It combines a botanical 3D hero, seasonal environments, animated visuals, and project storytelling to showcase my work in full-stack development, backend engineering, and AI data pipelines.

## The experience

🌿 **A living botanical hero** — An immersive visual centerpiece that brings depth and atmosphere to the first impression.

🍃 **Four seasonal worlds** — Switch between Living Green, Sakura Sunset, Maple Autumn, and Sequoia Mist, each with its own distinctive mood.

✨ **Interactive throughout** — Explore animated project visuals, a command globe, skill visualizations, and a theme customization panel.

📖 **Projects with a story** — Go beyond a list of technologies with case studies covering the problem, my contribution, challenges, and results.

🏆 **Achievements in focus** — Discover the journey behind our Smart India Hackathon 2025 winning project, alongside other milestones.

🔗 **Everything in one place** — Find my coding profiles, connect with me, and download my résumé.

## Featured work

### NDRF Chemical Disaster Training Dashboard
Our team built an Unreal Engine VR simulation for chemical-disaster response training. I developed the frontend and backend of the accompanying web platform, working on VR telemetry ingestion, multi-user authentication, and automated evaluation. The project won the Smart India Hackathon 2025 Hardware Edition.

### AI PDF Parser
A Dockerized Python and NLP pipeline for persona-weighted token scoring, semantic re-ranking, and structured information retrieval from PDF documents. I worked as the Core AI & Data Pipeline Architect. The project placed among the top 2,000 in the Adobe Hackathon 2025.

### Bank Management System
A backend-focused project exploring account operations, REST APIs, and relational data modeling with Node.js and MySQL.

## Built with

- **React & TypeScript** for the portfolio interface and interactive components
- **Vite** for development and production builds
- **Three.js-powered visuals & canvas** for the immersive hero and animated elements
- **CSS** for responsive layouts, transitions, and visual styling
- **Lucide React** for icons

The botanical hero integrates the ThreeUI Sylva Hero component and its associated assets. Review the applicable third-party terms before reusing them.

## Getting started

You will need a recent Node.js LTS release and npm.

```bash
# Install dependencies
npm ci

# Start the development server
npm run dev
```

Open the local address printed in your terminal. To create and preview a production build:

```bash
npm run build
npm run preview
```

The production build is generated in `prod-bundle/`.

## Deployment

The optional `deploy-live.sh` helper deploys the production bundle with Surge. Set
`SURGE_TOKEN` in your local shell or CI secret before running it:

```bash
npm run build
SURGE_TOKEN=your-token ./deploy-live.sh
```

Never commit deployment tokens, passwords, or `.env` files. The repository ignores
local credential files by default.

## Project structure

```text
src/
├── App.tsx                     # Portfolio sections and interactions
├── App.css                     # Styling and responsive layouts
├── portfolioData.ts            # Project, achievement, and profile content
├── Portfolio3DVisuals.tsx      # Interactive project and skill visuals
├── useSylvaHeroBridge.ts       # Hero controls and navigation bridge
├── Scene.tsx                   # Hero component configuration
└── shaders/                    # Integrated hero source and assets
public/
├── Tanish-Singla-Resume.pdf    # Downloadable résumé
└── landing-pages/              # Hero assets
```

## Connect with me

- **Personal email:** [tanishsingla777@gmail.com](mailto:tanishsingla777@gmail.com)
- **College email:** [tsingla_be23@thapar.edu](mailto:tsingla_be23@thapar.edu)
- **LinkedIn:** [Tanish Singla](https://www.linkedin.com/in/tanish-singla-389739352/)
- **Codolio:** [tanish_singla](https://codolio.com/profile/tanish_singla)
- **LeetCode:** [tanish_singla](https://leetcode.com/u/tanish_singla/)
- **GeeksforGeeks:** [tanish777](https://www.geeksforgeeks.org/profile/tanish777?tab=activity)

---

Built by **Tanish Singla** — where code, creativity, and nature meet.
