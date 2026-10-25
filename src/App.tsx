import React, { Suspense, useCallback, useRef, useState } from "react";
import "./App.css";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BookOpen,
  Check,
  Code2,
  Copy,
  Cpu,
  FileText,
  GraduationCap,
  Layers,
  Mail,
  RotateCcw,
  Sliders,
  Sparkles,
  Terminal,
  Trophy,
  X,
} from "lucide-react";
import type { SylvaHeroVariant } from "@designcodeio/threeui";
import { Scene } from "./Scene";
import {
  ACHIEVEMENTS_LIST,
  CERTIFICATIONS_LIST,
  EDUCATION_DATA,
  MISSING_INFO_CHECKLIST,
  PERSONAL_IDENTITY,
  PORTFOLIO_PROJECTS,
  SIH_FEATURED_ACHIEVEMENT,
  SYLVA_COLOR_SWATCHES,
  SYLVA_FONT_OPTIONS,
  SYLVA_VARIANT_META,
  VISION_PERSONAS,
  type PortfolioProject,
} from "./portfolioData";
import { useSylvaHeroBridge } from "./useSylvaHeroBridge";
import {
  Biome3DArtPortal,
  Project3DVisualizer,
  SIHCommandGlobe3D,
  SkillConstellation3D,
  Tilt3DCard,
} from "./Portfolio3DVisuals";

const OpticalSandbox = React.lazy(() =>
  import("./OpticalSandbox").then((m) => ({ default: m.OpticalSandbox })),
);

const DEFAULT_HERO_PROPS = VISION_PERSONAS[0].recommendedProps;

export default function App() {
  const [heroConfig, setHeroConfig] = useState(DEFAULT_HERO_PROPS);
  const [studioOpen, setStudioOpen] = useState<boolean>(false);
  const [studioTab, setStudioTab] = useState<"biome" | "typography">("biome");
  const [projectCategory, setProjectCategory] = useState<
    "all" | "fullstack" | "ai-nlp" | "backend"
  >("all");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);
  const [checklistModalOpen, setChecklistModalOpen] = useState<boolean>(false);
  const [emailCopied, setEmailCopied] = useState<boolean>(false);

  const heroContainerRef = useRef<HTMLDivElement | null>(null);

  const activePersona = VISION_PERSONAS[0];

  const scrollToSection = useCallback((sectionId: string) => {
    const idMap: Record<string, string> = {
      top: "hero-top",
      works: "work",
      habitats: "skills",
      journal: "achievements",
      contact: "contact",
    };
    const resolvedId = idMap[sectionId] || sectionId;
    const el = document.getElementById(resolvedId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useSylvaHeroBridge({
    containerRef: heroContainerRef,
    heroCopy: activePersona.heroCopy,
    variant: heroConfig.variant,
    onNavigateSection: scrollToSection,
    onOpenShowreel: () => setResumeModalOpen(true),
    onOpenFieldNote: () => setSelectedProject(PORTFOLIO_PROJECTS[1]),
    onOpenEthos: () => setSelectedProject(PORTFOLIO_PROJECTS[0]),
    onToggleVisionStudio: () => setStudioOpen((prev) => !prev),
  });

  const handleResetDefaults = () => {
    setHeroConfig({ ...DEFAULT_HERO_PROPS });
  };

  const filteredProjects =
    projectCategory === "all"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === projectCategory);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_IDENTITY.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2200);
  };

  const currentBiomeMeta = SYLVA_VARIANT_META[heroConfig.variant];

  return (
    <div className="sylva-portfolio-app" data-biome={heroConfig.variant}>
      {/* ── HERO SECTION: Live 3D <SylvaHero /> ─────────────────────────── */}
      <section className="hero-stage-section" id="hero-top" ref={heroContainerRef}>
        <Scene {...heroConfig} />

        {/* Floating Bottom-Left & Bottom-Right Quick Controls */}
        <div className="hero-floating-hud">
          {/* Quick 1-Click 4-Biome Switcher right on the Hero */}
          <div className="hud-capsule hud-capsule--biomes">
            <span className="hud-biome-title">Theme:</span>
            {(
              Object.entries(SYLVA_VARIANT_META) as Array<
                [SylvaHeroVariant, (typeof SYLVA_VARIANT_META)[SylvaHeroVariant]]
              >
            ).map(([variantKey, meta]) => (
              <button
                key={variantKey}
                type="button"
                className={`hud-biome-pill ${heroConfig.variant === variantKey ? "is-active" : ""}`}
                onClick={() => setHeroConfig((prev) => ({ ...prev, variant: variantKey }))}
                title={`${meta.label} — ${meta.atmosphere}`}
              >
                <span className="hud-swatch-dot" style={{ background: meta.accent }} />
                {meta.label}
              </button>
            ))}
            <button
              type="button"
              className="hud-studio-trigger"
              onClick={() => setStudioOpen((prev) => !prev)}
            >
              <Sliders size={13} />
              Customize
            </button>
          </div>

          <div className="hud-capsule hud-capsule--nav">
            <button type="button" onClick={() => scrollToSection("sih-2025")}>
              SIH 2025
            </button>
            <button type="button" onClick={() => scrollToSection("work")}>
              Projects
            </button>
            <button type="button" onClick={() => scrollToSection("skills")}>
              Skills
            </button>
            <button type="button" onClick={() => scrollToSection("biomes")}>
              Themes
            </button>
            <button
              type="button"
              className="hud-scroll-down-btn"
              onClick={() => scrollToSection("intro")}
              aria-label="Scroll to portfolio content"
            >
              <ArrowDown size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ── STICKY NAVIGATION BAR ───────────────────────────────────────── */}
      <header className="portfolio-sticky-bar">
        <div className="portfolio-container sticky-bar-inner">
          <a href="#hero-top" className="sticky-brand">
            <span className="sticky-brand-mark" aria-hidden="true">
              <svg viewBox="0 0 22 24">
                <path d="M11 1.3c-2.1 0-3.95 1.2-4.75 2.95C3.95 4.55 2.3 6.25 2.3 8.35c0 2.3 1.9 4.2 4.3 4.2h8.8c2.4 0 4.3-1.9 4.3-4.2 0-2.1-1.65-3.8-4-4.1C14.95 2.5 13.1 1.3 11 1.3Z" />
                <path d="M9.6 12.55h2.8v4.2c1.35.3 2.45 1.15 3.15 2.4-1.35.4-2.4.15-3.15-.4v4.15H9.6v-4.15c-.75.55-1.8.8-3.15.4.7-1.25 1.8-2.1 3.15-2.4v-4.2Z" />
              </svg>
            </span>
            <div className="sticky-brand-text">
              <strong>TANISH SINGLA</strong>
              <span>Full-Stack · SIH '25 Winner · TIET Patiala</span>
            </div>
          </a>

          <nav className="sticky-nav-links" aria-label="Portfolio sections">
            <a href="#intro">Overview</a>
            <a href="#sih-2025">SIH 2025</a>
            <a href="#work">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#biomes">Themes</a>
            <a href="#achievements">Credentials</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="sticky-actions">
            <button
              type="button"
              className="sticky-studio-btn"
              onClick={() => setStudioOpen(true)}
            >
              <Sliders size={14} />
              <span>Theme</span>
            </button>
            <button
              type="button"
              className="sticky-reel-btn"
              onClick={() => setResumeModalOpen(true)}
            >
              <FileText size={13} />
              <span>Resume</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── SECTION 1: CONCISE VISUAL IDENTITY & STATS BENTO ───── */}
      <section className="portfolio-section" id="intro">
        <div className="portfolio-container">
          <div className="visual-intro-bento">
            <Tilt3DCard className="intro-main-bento" intensity={5}>
              <div className="intro-badge-row">
                <span className="live-status-pill">
                  <i /> B.Tech CSE @ Thapar Institute (2023–2027)
                </span>
                <span className="biome-active-pill">{currentBiomeMeta.label} Theme</span>
              </div>
              <h1 className="intro-hero-heading">{PERSONAL_IDENTITY.homepageIntro.headline}</h1>
              <p className="intro-concise-bio">
                Engineering <strong>real-time VR telemetry web platforms (MERN)</strong>,{" "}
                <strong>persona-driven Python &amp; NLP data pipelines</strong>, and{" "}
                <strong>relational SQL backends</strong> under production and national hackathon
                constraints.
              </p>
              <div className="vision-strip-cta-group">
                <button
                  type="button"
                  className="btn-paper"
                  onClick={() => scrollToSection("work")}
                >
                  View Projects <ArrowUpRight size={15} />
                </button>
                <button
                  type="button"
                  className="btn-ghost-moss"
                  onClick={() => setResumeModalOpen(true)}
                >
                  <FileText size={14} /> Resume Snapshot
                </button>
                <button type="button" className="btn-ghost-moss" onClick={handleCopyEmail}>
                  {emailCopied ? <Check size={14} /> : <Copy size={14} />}
                  {emailCopied ? "Copied!" : PERSONAL_IDENTITY.email}
                </button>
              </div>
            </Tilt3DCard>

            <div className="intro-metrics-2x2">
              {[
                {
                  code: "SIH '25",
                  title: "Hardware Edition Winner",
                  detail:
                    "Top 1% of 40,000+ teams · Real-time MERN + Unreal VR telemetry platform for NDRF",
                },
                {
                  code: "ADOBE '25",
                  title: "Top 2,000 of 150,000+",
                  detail:
                    "Core AI & Data Pipeline Architect · Dynamic NLP token re-ranking in <10s (92% precision)",
                },
                {
                  code: "300+ DSA",
                  title: "Algorithmic Problem Solving",
                  detail: "Solved 300+ problems across LeetCode & GeeksforGeeks",
                },
                {
                  code: "TIET '27",
                  title: "B.Tech Computer Science",
                  detail: "Thapar Institute, Patiala · DSA, Web Dev & Software Engineering",
                },
              ].map((item) => (
                <Tilt3DCard key={item.code} className="metric-3d-tile" intensity={10}>
                  <span className="metric-3d-code">{item.code}</span>
                  <h4>{item.title}</h4>
                  <p>{item.detail}</p>
                </Tilt3DCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: SIH 2025 WINNER ───── */}
      <section className="portfolio-section portfolio-section--alt" id="sih-2025">
        <div className="portfolio-container">
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">
                <Trophy size={14} /> {SIH_FEATURED_ACHIEVEMENT.competition} ·{" "}
                {SIH_FEATURED_ACHIEVEMENT.date}
              </span>
              <h2 className="section-display-title">
                Smart India Hackathon 2025 — <em>National Hardware Winner</em>
              </h2>
            </div>
            <div className="sih-badge-pill-box">
              <span className="sih-role-pill">Role: {SIH_FEATURED_ACHIEVEMENT.role}</span>
              <span className="sih-project-pill">{SIH_FEATURED_ACHIEVEMENT.result}</span>
            </div>
          </div>

          <div className="sih-spotlight-grid">
            <SIHCommandGlobe3D
              onInspectCaseStudy={() => setSelectedProject(PORTFOLIO_PROJECTS[0])}
            />

            <div className="sih-metrics-and-lessons">
              <div className="sih-stats-2x2">
                {PORTFOLIO_PROJECTS[0].metrics.map((m) => (
                  <Tilt3DCard key={m.label} className="ethos-stat-item" intensity={9}>
                    <strong>{m.value}</strong>
                    <span>{m.label}</span>
                  </Tilt3DCard>
                ))}
              </div>

              <Tilt3DCard className="sih-concise-summary-card" intensity={6}>
                <div className="sih-summary-tag">
                  VR Simulation + Live Telemetry · Evaluated by Senior NDRF Officers
                </div>
                <h3>{SIH_FEATURED_ACHIEVEMENT.project} (MERN + Unreal VR)</h3>
                <ul className="sih-concise-bullets">
                  <li>
                    <strong>The Problem &amp; VR Solution:</strong> Guided by the Chief of NDRF, our
                    team built a VR chemical-disaster simulation that trains new personnel in leak
                    containment, perimeter sealing, civilian evacuation, and decontamination without
                    expensive physical gear overhead.
                  </li>
                  <li>
                    <strong>My Frontend &amp; Backend Ownership:</strong> While teammates built the
                    Unreal Engine VR runtime, I engineered the low-latency API matrix and web routers
                    to ingest high-frequency VR telemetry with zero data loss and built secure
                    multi-user session auth for <strong>50+ trainees</strong> and{" "}
                    <strong>5 admins</strong>.
                  </li>
                  <li>
                    <strong>Measured Impact:</strong> Automated protocol scoring and live dashboard
                    reporting cut manual administrative evaluation time by <strong>60%</strong> and
                    reduced coordination overhead by <strong>~40%</strong> across{" "}
                    <strong>55+ concurrent sessions</strong>.
                  </li>
                </ul>
              </Tilt3DCard>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PROJECT SHOWCASE CARDS ────────────────────────── */}
      <section className="portfolio-section" id="work">
        <div className="portfolio-container">
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">
                <Layers size={14} /> Featured Engineering Work
              </span>
              <h2 className="section-display-title">
                Selected <em>Projects</em>
              </h2>
            </div>

            <div className="filter-pills-bar" role="tablist" aria-label="Filter projects">
              {(
                [
                  { id: "all", label: "All (3)" },
                  { id: "fullstack", label: "Full-Stack MERN" },
                  { id: "ai-nlp", label: "AI & NLP" },
                  { id: "backend", label: "Backend & SQL" },
                ] as const
              ).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={projectCategory === cat.id}
                  className={`filter-pill ${projectCategory === cat.id ? "is-active" : ""}`}
                  onClick={() => setProjectCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="projects-3d-grid">
            {filteredProjects.map((project) => {
              const mode =
                project.id === "ndrf-training-dashboard"
                  ? "ndrf"
                  : project.id === "ai-pdf-parser"
                    ? "pdf"
                    : "bank";
              return (
                <Tilt3DCard
                  key={project.id}
                  className="project-3d-card"
                  intensity={7}
                  onClick={() => setSelectedProject(project)}
                >
                  <Project3DVisualizer mode={mode} />

                  <div className="project-3d-card-body">
                    <div className="project-3d-meta">
                      <span className="project-3d-badge">{project.contextBadge}</span>
                      <span className="project-3d-date">{project.date}</span>
                    </div>

                    <h3 className="project-3d-title">{project.title}</h3>
                    <p className="project-3d-summary">{project.subtitle}</p>

                    <div className="project-3d-metrics-grid">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="project-3d-metric">
                          <span>{m.label}</span>
                          <strong>{m.value}</strong>
                        </div>
                      ))}
                    </div>

                    <div className="project-3d-footer">
                      <div className="project-tech-pills">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="project-tech-pill">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="project-3d-open-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                      >
                        Inspect Case Study <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                </Tilt3DCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: SKILL CONSTELLATION ───────────────── */}
      <section className="portfolio-section portfolio-section--alt" id="skills">
        <div className="portfolio-container">
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">
                <Cpu size={14} /> Technical Stack &amp; Core Competencies
              </span>
              <h2 className="section-display-title">
                Languages, Frameworks &amp; <em>Cloud</em>
              </h2>
            </div>
            <p className="section-header-lede">
              Click any technology chip to inspect how it connects to Tanish’s shipped projects and
              engineering coursework.
            </p>
          </div>

          <SkillConstellation3D />
        </div>
      </section>

      {/* ── SECTION 5: SEASONAL BOTANICAL THEMES ────────────── */}
      <section className="portfolio-section" id="biomes">
        <div className="portfolio-container">
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">
                <Sparkles size={14} /> Seasonal Atmospheres
              </span>
              <h2 className="section-display-title">
                Four Botanical Themes — <em>Sakura, Maple, Sequoia &amp; Moss</em>
              </h2>
            </div>
            <p className="section-header-lede">
              Switch between all four seasonal environments. Selecting a theme here also updates
              the main hero stage.
            </p>
          </div>

          <Biome3DArtPortal
            activeVariant={heroConfig.variant}
            onSelectVariant={(variant) => setHeroConfig((prev) => ({ ...prev, variant }))}
          />
        </div>
      </section>

      {/* ── SECTION 6: ACHIEVEMENTS, EDUCATION & CERTIFICATIONS BENTO ───── */}
      <section className="portfolio-section portfolio-section--alt" id="achievements">
        <div className="portfolio-container">
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">
                <Award size={14} /> Recognition & Academic Pedigree
              </span>
              <h2 className="section-display-title">
                Achievements, Education & <em>Certifications</em>
              </h2>
            </div>
          </div>

          <div className="pillars-grid" style={{ marginBottom: "28px" }}>
            {ACHIEVEMENTS_LIST.map((ach, i) => (
              <Tilt3DCard key={ach.id} className="pillar-glass-card" intensity={8}>
                <div className="pillar-card-head">
                  <span className="pillar-index">0{i + 1}</span>
                  <span className="pillar-metrics-badge">{ach.metricBadge}</span>
                </div>
                <h3>{ach.title}</h3>
                <p className="pillar-subtitle">
                  {ach.subtitle} · {ach.date}
                </p>
                <p className="pillar-desc">{ach.summary}</p>
              </Tilt3DCard>
            ))}
          </div>

          <div className="ethos-split-layout">
            <Tilt3DCard className="ethos-timeline-card" intensity={6}>
              <div className="section-eyebrow" style={{ color: "#4a5244", marginBottom: "8px" }}>
                <GraduationCap size={14} /> Education
              </div>
              <h3>{EDUCATION_DATA.institution}</h3>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#23261f",
                  marginBottom: "4px",
                }}
              >
                {EDUCATION_DATA.degree}
              </p>
              <p style={{ fontSize: "13px", color: "#555a50", marginBottom: "18px" }}>
                {EDUCATION_DATA.duration}
              </p>
              <div className="ethos-principles-list">
                {EDUCATION_DATA.coursework.map((course, idx) => (
                  <div key={course} className="ethos-principle">
                    <span className="ethos-principle-num">0{idx + 1}</span>
                    <div>
                      <h4>{course}</h4>
                      <p>Applied directly across hackathons, API design & 300+ DSA problems.</p>
                    </div>
                  </div>
                ))}
              </div>
            </Tilt3DCard>

            <div className="certs-stack">
              {CERTIFICATIONS_LIST.map((cert) => (
                <Tilt3DCard key={cert.id} className="cert-card" intensity={8}>
                  <div className="cert-card-top">
                    <span className="cert-type-badge">{cert.typeLabel}</span>
                    <span className="cert-date">{cert.date}</span>
                  </div>
                  <h4>{cert.name}</h4>
                  <p className="cert-issuer">Issued by {cert.issuer}</p>
                  <p className="cert-relevance">{cert.relevance}</p>
                </Tilt3DCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: INTERACTIVE SHADER SANDBOX ───────────────────────── */}
      <section className="portfolio-section">
        <div className="portfolio-container">
          <Suspense fallback={null}>
            <OpticalSandbox activeVariant={heroConfig.variant} />
          </Suspense>
        </div>
      </section>

      {/* ── SECTION 8: CONTACT & RESUME DOCK ────────────────────────────── */}
      <section className="portfolio-section contact-section" id="contact">
        <div className="portfolio-container">
          <div className="contact-card-shell">
            <div className="contact-copy-col">
              <span className="section-eyebrow">
                <Mail size={14} /> Contact & Internships
              </span>
              <h2 className="section-display-title">
                Connect with <em>Tanish Singla.</em>
              </h2>
              <p className="contact-lede">
                Open to software engineering, full-stack, and backend internships or collaborative
                projects. B.Tech CSE at Thapar Institute of Engineering and Technology (Expected
                June 2027).
              </p>

              <div className="contact-direct-box">
                <div className="contact-direct-row">
                  <span>Email (Verified)</span>
                  <button type="button" className="copy-email-btn" onClick={handleCopyEmail}>
                    <Mail size={13} />
                    <strong>{PERSONAL_IDENTITY.email}</strong>
                    {emailCopied ? <Check size={13} /> : <Copy size={13} />}
                  </button>
                </div>
                <div className="contact-direct-row">
                  <span>Campus</span>
                  <strong>{PERSONAL_IDENTITY.institution}</strong>
                </div>
              </div>

              <div className="vision-strip-cta-group">
                <a
                  href={`mailto:${PERSONAL_IDENTITY.email}?subject=Software%20Engineering%20Opportunity%20%E2%80%94%20Tanish%20Singla`}
                  className="btn-paper"
                  style={{ textDecoration: "none" }}
                >
                  <Mail size={14} /> Send Email
                </a>
                <button
                  type="button"
                  className="btn-ghost-moss"
                  onClick={() => setResumeModalOpen(true)}
                >
                  <FileText size={14} /> Resume Snapshot
                </button>
                <button
                  type="button"
                  className="btn-ghost-moss"
                  onClick={() => setChecklistModalOpen(true)}
                >
                  <BookOpen size={14} /> Missing Info Audit
                </button>
              </div>
            </div>

            <div className="contact-form-col">
              <h3>Quick Credential Summary</h3>
              <div className="resume-highlights-mini">
                <div>
                  <strong>Education</strong>
                  <span>B.Tech CSE · Thapar Institute (2023–2027)</span>
                </div>
                <div>
                  <strong>National Award</strong>
                  <span>Winner — Smart India Hackathon 2025 (Top 1% of 40,000+)</span>
                </div>
                <div>
                  <strong>Hackathon Rank</strong>
                  <span>Top 2,000 of 150,000+ — Adobe Hackathon 2025</span>
                </div>
                <div>
                  <strong>Problem Solving</strong>
                  <span>300+ DSA Problems (LeetCode & GeeksforGeeks)</span>
                </div>
              </div>

              <div className="form-submit-row">
                <button
                  type="button"
                  className="btn-submit-inquiry"
                  onClick={() => setResumeModalOpen(true)}
                >
                  <span>Open Full Resume Overview</span>
                  <ArrowUpRight size={15} />
                </button>
                <button
                  type="button"
                  className="btn-scroll-top"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Back to Top ↑
                </button>
              </div>
            </div>
          </div>

          <footer className="portfolio-footer">
            <div className="footer-meta-row">
              <span>© {new Date().getFullYear()} Tanish Singla · B.Tech CSE, TIET Patiala</span>
              <span>Full-Stack, Backend &amp; AI Systems</span>
              <span>{PERSONAL_IDENTITY.email}</span>
            </div>
            <div className="footer-ghost-word" aria-hidden="true">
              {activePersona.heroCopy.ghostWord}
            </div>
          </footer>
        </div>
      </section>

      {/* ── PORTFOLIO THEME STUDIO DRAWER (CUSTOMIZE BIOME & TYPOGRAPHY) ── */}
      {studioOpen && (
        <div className="studio-drawer-backdrop" onClick={() => setStudioOpen(false)}>
          <aside
            className="studio-drawer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Portfolio Theme Customizer"
          >
            <div className="studio-drawer-header">
              <div>
                <span className="studio-drawer-eyebrow">
                  <Sparkles size={12} /> Theme Studio
                </span>
                <h3>Customize Theme &amp; Typography</h3>
              </div>
              <button
                type="button"
                className="studio-close-btn"
                onClick={() => setStudioOpen(false)}
                aria-label="Close studio"
              >
                <X size={16} />
              </button>
            </div>

            <div className="studio-tabs-bar">
              <button
                type="button"
                className={`studio-tab-btn ${studioTab === "biome" ? "is-active" : ""}`}
                onClick={() => setStudioTab("biome")}
              >
                <Layers size={13} /> Atmosphere
              </button>
              <button
                type="button"
                className={`studio-tab-btn ${studioTab === "typography" ? "is-active" : ""}`}
                onClick={() => setStudioTab("typography")}
              >
                <Sliders size={13} /> Type &amp; Color
              </button>
            </div>

            <div className="studio-drawer-body">
              {studioTab === "biome" && (
                <div className="studio-pane">
                  <p className="studio-pane-intro">
                    Switch between the four seasonal environments for Tanish Singla’s portfolio.
                  </p>
                  <div className="studio-variant-grid">
                    {(
                      Object.entries(SYLVA_VARIANT_META) as Array<
                        [SylvaHeroVariant, (typeof SYLVA_VARIANT_META)[SylvaHeroVariant]]
                      >
                    ).map(([variantKey, meta]) => (
                      <button
                        key={variantKey}
                        type="button"
                        className={`studio-variant-btn ${
                          heroConfig.variant === variantKey ? "is-active" : ""
                        }`}
                        onClick={() =>
                          setHeroConfig((prev) => ({ ...prev, variant: variantKey }))
                        }
                      >
                        <span
                          className="studio-variant-swatch"
                          style={{ background: meta.swatch }}
                        >
                          <i style={{ background: meta.accent }} />
                        </span>
                        <div>
                          <strong>{meta.label}</strong>
                          <span>{meta.season}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {studioTab === "typography" && (
                <div className="studio-pane">
                  <div className="studio-control-row-2">
                    <div className="studio-control-group">
                      <label className="studio-label">Heading Font</label>
                      <select
                        value={heroConfig.headingFont}
                        onChange={(e) =>
                          setHeroConfig((prev) => ({ ...prev, headingFont: e.target.value }))
                        }
                      >
                        {SYLVA_FONT_OPTIONS.map((font) => (
                          <option key={font} value={font}>
                            {font}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="studio-control-group">
                      <label className="studio-label">Body Font</label>
                      <select
                        value={heroConfig.bodyFont}
                        onChange={(e) =>
                          setHeroConfig((prev) => ({ ...prev, bodyFont: e.target.value }))
                        }
                      >
                        {SYLVA_FONT_OPTIONS.map((font) => (
                          <option key={font} value={font}>
                            {font}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="studio-control-group">
                    <label className="studio-label">
                      <span>Heading Size</span>
                      <strong>{heroConfig.headingSize}px</strong>
                    </label>
                    <input
                      type="range"
                      min={44}
                      max={84}
                      step={1}
                      value={heroConfig.headingSize}
                      onChange={(e) =>
                        setHeroConfig((prev) => ({
                          ...prev,
                          headingSize: Number(e.target.value),
                        }))
                      }
                    />
                  </div>

                  <div className="studio-control-group">
                    <label className="studio-label">Primary Text Color</label>
                    <div className="studio-color-row">
                      <input
                        type="color"
                        value={heroConfig.primaryColor}
                        onChange={(e) =>
                          setHeroConfig((prev) => ({
                            ...prev,
                            primaryColor: e.target.value,
                          }))
                        }
                      />
                      <div className="studio-swatches">
                        {SYLVA_COLOR_SWATCHES.map((s) => (
                          <button
                            key={s.value}
                            type="button"
                            className={`studio-color-chip ${
                              heroConfig.primaryColor.toLowerCase() === s.value.toLowerCase()
                                ? "is-active"
                                : ""
                            }`}
                            style={{ background: s.value }}
                            onClick={() =>
                              setHeroConfig((prev) => ({ ...prev, primaryColor: s.value }))
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="studio-drawer-footer">
              <button
                type="button"
                className="studio-reset-btn"
                onClick={handleResetDefaults}
              >
                <RotateCcw size={13} />
                <span>Reset Defaults</span>
              </button>
              <button
                type="button"
                className="studio-view-stage-btn"
                onClick={() => {
                  setStudioOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <span>View Hero Stage</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ── PROJECT 10-QUESTION CASE STUDY MODAL ────────────────────────── */}
      {selectedProject && (
        <div
          className="portfolio-modal-backdrop"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="portfolio-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-top-bar">
              <div className="modal-meta-pills">
                <span className="modal-pill-num">{selectedProject.number}</span>
                <span className="modal-pill-cat">{selectedProject.contextBadge}</span>
                <span className="modal-pill-year">{selectedProject.date}</span>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-scroll-content">
              <h2 className="modal-title">{selectedProject.title}</h2>
              <p className="modal-subtitle">{selectedProject.subtitle}</p>

              <div className="modal-metrics-band">
                {selectedProject.metrics.map((m) => (
                  <div key={m.label} className="modal-metric-box">
                    <span>{m.label}</span>
                    <strong>{m.value}</strong>
                  </div>
                ))}
              </div>

              <div className="case-study-qa-list">
                {selectedProject.caseStudyQuestions.map((qa) => (
                  <div key={qa.question} className="case-study-qa-item">
                    <h4>{qa.question}</h4>
                    <p>{qa.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── RESUME SNAPSHOT MODAL ───────────────────────────────────────── */}
      {resumeModalOpen && (
        <div
          className="portfolio-modal-backdrop"
          onClick={() => setResumeModalOpen(false)}
        >
          <div
            className="portfolio-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-top-bar">
              <div className="modal-meta-pills">
                <span className="modal-pill-num">Resume Overview</span>
                <span className="modal-pill-cat">Verified Facts Only</span>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setResumeModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-scroll-content">
              <h2 className="modal-title">Tanish Singla</h2>
              <p className="modal-subtitle">
                {EDUCATION_DATA.degree} · {EDUCATION_DATA.institution} ({EDUCATION_DATA.duration}) ·{" "}
                {PERSONAL_IDENTITY.email}
              </p>

              <div className="modal-two-col">
                <div>
                  <h4>Key Achievements</h4>
                  <ul className="modal-arch-list">
                    <li>
                      <strong>Winner — Smart India Hackathon 2025 (Hardware Edition):</strong>{" "}
                      Top 1% of 40,000+ teams across India (Dec 2025).
                    </li>
                    <li>
                      <strong>Adobe Hackathon 2025:</strong> Top 2,000 of 150,000+ participants
                      (Feb 2025).
                    </li>
                    <li>
                      <strong>Algorithmic Problem Solving:</strong> 300+ problems solved across
                      LeetCode & GeeksforGeeks.
                    </li>
                  </ul>
                </div>
                <div>
                  <h4>Certifications</h4>
                  <ul className="modal-arch-list">
                    {CERTIFICATIONS_LIST.map((c) => (
                      <li key={c.id}>
                        <strong>{c.name}</strong> — {c.issuer} ({c.date})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MISSING INFORMATION CHECKLIST MODAL ─────────────────────────── */}
      {checklistModalOpen && (
        <div
          className="portfolio-modal-backdrop"
          onClick={() => setChecklistModalOpen(false)}
        >
          <div
            className="portfolio-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-top-bar">
              <div className="modal-meta-pills">
                <span className="modal-pill-num">Factual Audit</span>
                <span className="modal-pill-cat">Missing Info Checklist</span>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setChecklistModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-scroll-content">
              <h2 className="modal-title">Information to Confirm With Tanish Singla</h2>
              <div className="case-study-qa-list">
                {MISSING_INFO_CHECKLIST.map((group) => (
                  <div key={group.category} className="case-study-qa-item">
                    <h4>{group.category}</h4>
                    <ul className="modal-arch-list" style={{ marginTop: "8px" }}>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
