import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import girlCharacterArt from "@/assets/girl-character-art.png";
import catAsset from "@/assets/pixel-cat-transparent.png";

const sections = [
  "home",
  "about",
  "services",
  "projects",
  "skills",
  "experience",
  "education",
  "certifications",
  "contact",
] as const;

type SectionId = (typeof sections)[number];

const navItems = [
  { id: "home", label: "Home", targetSection: "home" },
  { id: "about", label: "About", targetSection: "about" },
  { id: "work", label: "Work", targetSection: "projects" },
  { id: "experience", label: "Experience", targetSection: "experience" },
  { id: "contact", label: "Contact", targetSection: "contact" },
] as const;

function isNavItemActive(navId: string, activeSection: SectionId): boolean {
  if (navId === "home") return activeSection === "home";

  if (navId === "about") return activeSection === "about";

  if (navId === "work") {
    return (
      activeSection === "projects" ||
      activeSection === "services" ||
      activeSection === "skills"
    );
  }

  if (navId === "experience") {
    return (
      activeSection === "experience" ||
      activeSection === "education" ||
      activeSection === "certifications"
    );
  }

  if (navId === "contact") return activeSection === "contact";

  return false;
}

const sectionLabels: Record<SectionId, string> = {
  home: "Home",
  about: "About",
  services: "What I Do",
  projects: "Projects",
  skills: "Tech Stack",
  experience: "Experience",
  education: "Education",
  certifications: "Certifications",
  contact: "Contact",
};

const dialogue: Record<SectionId, string> = {
  home: "keep scrolling",
  about: "a little curious, always",
  services: "making ideas useful",
  projects: "leveling up...",
  skills: "quite a toolbox",
  experience: "learning by doing",
  education: "strong foundations",
  certifications: "always learning",
  contact: "robot signing off",
};

const services = [
  [
    "01",
    "Frontend Development",
    "Building responsive and interactive web interfaces with React, JavaScript, HTML, CSS and Tailwind CSS.",
  ],
  [
    "02",
    "Full-Stack Development",
    "Developing complete web applications with modern frontend, backend, databases and APIs.",
  ],
  [
    "03",
    "AI & Generative AI",
    "Exploring LLMs, agentic AI and AI-powered applications to build smarter digital experiences.",
  ],
  [
    "04",
    "Data & Analytics",
    "Working with data to uncover patterns, generate insights and turn information into useful solutions.",
  ],
] as const;

const experiences = [
  {
    role: "MERN Stack Developer Intern",
    organization: "Codec Technologies",
    type: "Internship",
    date: "2026",
    description:
      "Gained hands-on experience in full-stack web development, working with modern web technologies and application development.",
    tags: ["MERN", "React", "Node.js"],
  },
  {
    role: "Full-Stack Developer Intern",
    organization: "ShadowFox",
    type: "Internship",
    date: "2026",
    description:
      "Worked on practical full-stack development tasks, strengthening frontend, backend and web application development skills.",
    tags: ["Full-Stack", "Web Development"],
  },
  {
    role: "GenAI-Powered Data Analytics",
    organization: "Forage",
    type: "Job Simulation",
    description:
      "Applied generative AI concepts to practical data analytics tasks, focusing on extracting insights and solving data-driven problems.",
    tags: ["GenAI", "Data Analytics"],
  },
  {
    role: "Software Development",
    organization: "Forage",
    type: "Job Simulation",
    description:
      "Worked through practical software development tasks involving problem-solving, development workflows and real-world scenarios.",
    tags: ["Software Development", "Problem Solving"],
  },
] as const;

const certificationGroups = [
  {
    title: "AI & Generative AI",
    items: [
      ["Introduction to Generative AI", "Google Skills"],
      ["Introduction to Large Language Models", "Google Skills"],
      ["Introduction to Model Context Protocol", "Anthropic"],
      ["Agentic AI Saksham Program & Hackathon", "Ministry of Education"],
    ],
  },
  {
    title: "Development",
    items: [
      ["100 Days of Code™: The Complete Python Pro Bootcamp", "Udemy"],
    ],
  },
] as const;

const projects = [
  {
    number: "01",
    title: "Project Management System",
    description:
      "A focused workspace to plan, track, and manage projects efficiently.",
    stack: ["React", "PostgreSQL", "HTML", "Tailwind"],
    kind: "planner",
    github: "https://github.com/ankitha014/WorkSprint_Hub",
  },
  {
    number: "02",
    title: "ORBITA",
    description:
      "An interactive 3D solar system explorer built to make space exploration engaging.",
    stack: ["React", "TypeScript", "Three.js"],
    kind: "space",
    github: "https://github.com/ankitha014/ORBITA",
  },
  {
    number: "03",
    title: "Invoice Automation",
    description:
      "Automated invoice generation, processing, and tracking with a smart workflow.",
    stack: ["HTML", "CSS", "JavaScript"],
    kind: "invoice",
    github: "https://github.com/ankitha014/invocraft-project",
  },
] as const;

function scrollTo(id: SectionId) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
  });
}

function SectionFrame({
  id,
  active,
  children,
  className = "",
}: {
  id: SectionId;
  active: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`portfolio-section ${className}`}
      data-section={id}
    >
      {children}
    </section>
  );
}

function ProjectPreview({
  kind,
}: {
  kind: (typeof projects)[number]["kind"];
}) {
  if (kind === "space") {
    return (
      <div className="preview-art space-art" aria-hidden="true">
        <i className="planet p-one" />
        <i className="planet p-two" />
        <i className="planet p-three" />
        <i className="rocket">▲</i>
        <i className="orbit" />
      </div>
    );
  }

  if (kind === "invoice") {
    return (
      <div className="preview-art invoice-art" aria-hidden="true">
        <div className="invoice-sheet">
          <b>INVOICE</b>
          <span />
          <span />
          <span />
          <strong>$</strong>
        </div>

        <i className="leaf left" />
        <i className="leaf right" />
      </div>
    );
  }

  return (
    <div className="preview-art planner-art" aria-hidden="true">
      <i className="clock">
        <b />
        <span />
      </i>

      <i className="target">◎</i>
      <i className="chart">▥</i>
      <i className="gear">✣</i>
    </div>
  );
}

export function Portfolio() {
  const [active, setActive] = useState<SectionId>("home");

  // ── Typewriter state ─────────────────────────────────────
  const [twText, setTwText] = useState("");
  const [twDone, setTwDone] = useState(false);
  const [twCursor, setTwCursor] = useState(true);

  const heroRef = useRef<HTMLElement | null>(null);

  // ── Section observers + scroll effects ───────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          )[0];

        if (visible) {
          setActive(
            (visible.target as HTMLElement).dataset[
              "section"
            ] as SectionId
          );
        }
      },
      {
        threshold: [0.25, 0.5, 0.7],
      }
    );

    document
      .querySelectorAll<HTMLElement>("[data-section]")
      .forEach((section) => observer.observe(section));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      {
        threshold: 0.16,
      }
    );

    document
      .querySelectorAll(".scroll-reveal")
      .forEach((el) => revealObserver.observe(el));

    // ── Split-text heading & word reveal system ─────────────

    const wrapWords = (
      text: string,
      startIndex: number
    ): [string, number] => {
      const words = text
        .trim()
        .split(/\s+/)
        .filter(Boolean);

      const html = words
        .map(
          (word, index) =>
            `<span class="w-mask"><span class="w-inner" style="--wi:${
              startIndex + index
            }">${word}</span></span>`
        )
        .join(" ");

      return [html, startIndex + words.length];
    };

    /*
     * IMPORTANT:
     *
     * WEB DEVELOPER is intentionally NOT modified here.
     *
     * It is rendered directly by React below.
     */

    // ── Section h2 headings ─────────────────────────────────

    document
      .querySelectorAll<HTMLElement>(
        ".about-copy h2, .compact-heading h2, .section-heading h2, .skills-title h2, .contact-lead h2"
      )
      .forEach((el) => {
        if (el.querySelector(".w-mask")) return;

        const hasBr = el.querySelector("br");

        if (hasBr) {
          let wordIndex = 0;
          const nodes = Array.from(el.childNodes);
          let newHtml = "";

          for (const node of nodes) {
            if (node.nodeType === Node.TEXT_NODE) {
              const text = node.textContent ?? "";

              if (text.trim()) {
                const [html, nextIndex] = wrapWords(
                  text,
                  wordIndex
                );

                newHtml += html + " ";
                wordIndex = nextIndex;
              }
            } else if (
              (node as Element).tagName === "BR"
            ) {
              newHtml += "<br />";
            }
          }

          el.innerHTML = newHtml;
        } else {
          const [html] = wrapWords(
            el.textContent ?? "",
            0
          );

          el.innerHTML = html;
        }
      });

    // ── Project h3 titles ───────────────────────────────────

    document
      .querySelectorAll<HTMLElement>(".project-info h3")
      .forEach((el) => {
        if (el.querySelector(".w-mask")) return;

        const [html] = wrapWords(
          el.textContent ?? "",
          0
        );

        el.innerHTML = html;
      });

    // ── Page scroll variable ────────────────────────────────

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty(
          "--page-scroll",
          String(window.scrollY)
        );
      });
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      observer.disconnect();
      revealObserver.disconnect();

      window.removeEventListener("scroll", onScroll);

      cancelAnimationFrame(raf);
    };
  }, []);

  // ── Typewriter effect ────────────────────────────────────
  useEffect(() => {
    const FULL_TEXT = "HEY THERE, I AM";
    const CHAR_DELAY = 70;

    if (
      window
        .matchMedia("(prefers-reduced-motion: reduce)")
        .matches
    ) {
      setTwText(FULL_TEXT);
      setTwDone(true);
      setTwCursor(false);
      return;
    }

    let index = 0;

    const timer = window.setInterval(() => {
      index += 1;

      setTwText(FULL_TEXT.slice(0, index));

      if (index >= FULL_TEXT.length) {
        window.clearInterval(timer);

        setTwDone(true);

        window.setTimeout(() => {
          setTwCursor(false);
        }, 1000);
      }
    }, CHAR_DELAY);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  // ── Keep active navigation item visible ──────────────────
  useEffect(() => {
    document
      .querySelector<HTMLElement>(
        ".site-header nav button.active"
      )
      ?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
  }, [active]);

  // ── Hero mouse movement ──────────────────────────────────
  const onHeroMove = (
    event: MouseEvent<HTMLElement>
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
        rect.width -
      0.5;

    const y =
      (event.clientY - rect.top) /
        rect.height -
      0.5;

    event.currentTarget.style.setProperty(
      "--mouse-x",
      `${x * 14}px`
    );

    event.currentTarget.style.setProperty(
      "--mouse-y",
      `${y * 10}px`
    );
  };

  return (
    <main className="portfolio-shell">
      {/* =================================================
          HEADER
      ================================================= */}

      <header className="site-header">
        <button
          className="nameplate"
          onClick={() => scrollTo("home")}
          aria-label="Go to home"
        >
          Ankitha KS
        </button>

        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={
                isNavItemActive(
                  item.id,
                  active
                )
                  ? "active"
                  : ""
              }
              onClick={() =>
                scrollTo(item.targetSection)
              }
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      {/* =================================================
          HOME
      ================================================= */}

      <SectionFrame
        id="home"
        active={active === "home"}
        className="hero-section"
      >
        <div
          className="hero-background"
          aria-hidden="true"
        >
          <i />
          <i />
          <i />
        </div>

        <div
          ref={
            heroRef as React.RefObject<HTMLDivElement>
          }
          className="hero-grid"
          onMouseMove={onHeroMove}
          onMouseLeave={(event) => {
            event.currentTarget.style.setProperty(
              "--mouse-x",
              "0px"
            );

            event.currentTarget.style.setProperty(
              "--mouse-y",
              "0px"
            );
          }}
        >
          <div className="hero-copy">
            {/* ── Hero heading ─────────────────────────── */}

            <p
              className="hero-title"
              aria-label="HEY THERE, I AM ANKITHA!"
            >
              {/* Line 1: typewriter */}
              <span
                className="hero-line hero-line-1"
                aria-hidden="true"
              >
                <span className="hero-line-inner">
                  {twText}

                  {twCursor && (
                    <span
                      className={`hero-cursor${
                        twDone ? " done" : ""
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </span>
              </span>

              {/* Line 2: ANKITHA */}
              <span
                className={`hero-line hero-line-2${
                  twDone
                    ? " tw-visible"
                    : ""
                }`}
                aria-hidden="true"
              >
                <span className="hero-line-inner">
                  <em>ANKITHA</em>
                  <b>!</b>
                </span>
              </span>
            </p>

            {/* WEB DEVELOPER is rendered directly by React. */}
            <h1 className="hero-line hero-line-3">
              <span className="hero-line-inner">
                WEB DEVELOPER.
              </span>
            </h1>

            <p className="hero-intro">
              I build modern, interactive websites
              with a focus on frontend development
              and thoughtful UI.
            </p>

            <div className="hero-actions">
              <Button
                variant="portfolio"
                size="portfolio"
                onClick={() =>
                  scrollTo("projects")
                }
              >
                VIEW MY WORK ↗
              </Button>

              <Button
                variant="portfolioSecondary"
                size="portfolio"
                onClick={() =>
                  scrollTo("contact")
                }
              >
                LET'S TALK →
              </Button>
            </div>
          </div>

          <div
            className="character-stage"
            aria-label="Illustrated portrait of Ankitha"
          >
            <div className="character-ring">
              <img
                src={girlCharacterArt}
                alt="Ankitha illustrated character"
              />
            </div>

            <div
              className="comic-rays"
              aria-hidden="true"
            >
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>

        <button
          className="scroll-cue"
          onClick={() => scrollTo("about")}
          aria-label="Scroll to About"
        >
          <span>scroll</span>
          <ArrowDown />
        </button>
      </SectionFrame>

      {/* =================================================
          ABOUT
      ================================================= */}

      <SectionFrame
        id="about"
        active={active === "about"}
        className="about-section"
      >
        <div className="about-layout scroll-reveal">
          <figure className="cat-stage">
            <img
              src={catAsset}
              alt="Cyan pixel art cat"
            />
          </figure>

          <div className="about-copy">
            <p className="section-kicker floating-text">
              01 / About
            </p>

            <h2>A LITTLE ABOUT ME</h2>

            <p>
              I’m drawn to the intersection of
              development, design, and emerging
              technology. I enjoy building responsive
              websites, experimenting with modern
              interfaces, and creating projects that
              are both functional and visually
              engaging.
            </p>

            <p className="exploring">
              Currently exploring:{" "}
              <span>
                Frontend Development · Full-Stack
                Development · AI · UI/UX
              </span>
            </p>
          </div>
        </div>
      </SectionFrame>

      {/* =================================================
          SERVICES
      ================================================= */}

      <SectionFrame
        id="services"
        active={active === "services"}
        className="services-section"
      >
        <div className="compact-heading scroll-reveal">
          <p className="section-kicker">
            02 / Capabilities
          </p>

          <h2>WHAT I DO</h2>

          <p>
            I build interactive digital experiences
            where development, data and AI come
            together.
          </p>
        </div>

        <div className="service-grid">
          {services.map(
            (
              [number, title, description],
              index
            ) => (
              <article
                className="service-card scroll-reveal"
                key={title}
                style={
                  {
                    "--delay": `${index * 80}ms`,
                  } as CSSProperties
                }
              >
                <span>{number}</span>

                <h3>{title}</h3>

                <p>{description}</p>
              </article>
            )
          )}
        </div>

        <p className="service-closing scroll-reveal">
          Design it. Build it. Make it useful.
        </p>
      </SectionFrame>

      {/* =================================================
          PROJECTS
      ================================================= */}

      <SectionFrame
        id="projects"
        active={active === "projects"}
        className="projects-section"
      >
        <div className="section-heading scroll-reveal">
          <p className="section-kicker">
            03 / Selected projects
          </p>

          <h2>FEATURED WORKS</h2>
        </div>

        <div className="project-list">
          {projects.map(
            (project, index) => (
              <article
                className="project-row scroll-reveal"
                key={project.title}
                style={
                  {
                    "--delay": `${index * 100}ms`,
                  } as CSSProperties
                }
              >
                <div className="project-number">
                  {project.number}
                </div>

                <div className="project-info">
                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  <ul>
                    {project.stack.map(
                      (item) => (
                        <li key={item}>
                          {item}
                        </li>
                      )
                    )}
                  </ul>

                  <div className="project-links">
                    <a
                      className="project-github-cta"
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <span>VIEW ON GITHUB</span>
                      <Github />
                      <ArrowUpRight />
                    </a>
                  </div>

                </div>

                <div className="project-preview">
                  <ProjectPreview
                    kind={project.kind}
                  />
                </div>
              </article>
            )
          )}
        </div>
      </SectionFrame>

      {/* =================================================
          SKILLS
      ================================================= */}

      <SectionFrame
        id="skills"
        active={active === "skills"}
        className="skills-section"
      >
        <div className="skills-layout scroll-reveal">
          <div className="skills-title">
            <p className="section-kicker">
              04 / Tech stack
            </p>

            <h2>
              TOOLS AND
              <br />
              TECHNOLOGIES
            </h2>

            <p>
              A considered toolkit for building
              responsive, expressive digital
              experiences.
            </p>
          </div>

          <div className="skill-ledger">
            {[
              [
                "01",
                "Frontend",
                "React.js · JavaScript · HTML · CSS · Tailwind CSS",
              ],
              [
                "02",
                "Backend",
                "Node.js · Express.js · Supabase",
              ],
              [
                "03",
                "Languages",
                "Python · JavaScript · C · C++",
              ],
              [
                "04",
                "Database",
                "MySQL · PostgreSQL · MongoDB",
              ],
              [
                "05",
                "Tools",
                "Git · GitHub · Figma · VS Code",
              ],
            ].map(
              ([no, label, value]) => (
                <div
                  className="skill-row"
                  key={no}
                >
                  <span>{no}</span>

                  <div>
                    <h3>{label}</h3>
                    <p>{value}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </SectionFrame>

      {/* =================================================
          EXPERIENCE
      ================================================= */}

      <SectionFrame
        id="experience"
        active={
          active === "experience"
        }
        className="experience-section"
      >
        <div className="compact-heading scroll-reveal">
          <p className="section-kicker">
            05 / Practical work
          </p>

          <h2>EXPERIENCE</h2>

          <p>
            A collection of internships and practical,
            job-focused experiences.
          </p>
        </div>

        <div className="experience-timeline">
          {experiences.map(
            (item, index) => (
              <article
                className="experience-item scroll-reveal"
                key={`${item.organization}-${item.role}`}
                style={
                  {
                    "--delay": `${index * 70}ms`,
                  } as CSSProperties
                }
              >
                <div className="experience-meta">
                  <span
                    className={`experience-type ${
                      item.type === "Internship"
                        ? "internship"
                        : "simulation"
                    }`}
                  >
                    {item.type}
                  </span>

                  {"date" in item &&
                  item.date ? (
                    <time>
                      {item.date}
                    </time>
                  ) : null}
                </div>

                <div className="experience-copy">
                  <h3>{item.role}</h3>

                  <p className="experience-org">
                    {item.organization}
                  </p>

                  <p>
                    {item.description}
                  </p>

                  <ul>
                    {item.tags.map(
                      (tag) => (
                        <li key={tag}>
                          {tag}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </article>
            )
          )}
        </div>
      </SectionFrame>

      {/* =================================================
          EDUCATION
      ================================================= */}

      <SectionFrame
        id="education"
        active={
          active === "education"
        }
        className="education-section"
      >
        <div className="compact-heading scroll-reveal">
          <p className="section-kicker">
            06 / Foundation
          </p>

          <h2>EDUCATION</h2>

          <p>
            Building the foundation behind what I
            create.
          </p>
        </div>

        <div className="education-timeline scroll-reveal">
          <article>
            <time>
              2023 — 2026
            </time>

            <div>
              <h3>
                Bachelor of Computer Applications
              </h3>

              <p>
                Sri Jagadguru Renukacharya College of
                Science, Arts &amp; Commerce
              </p>

              <strong>
                CGPA · 9.01
              </strong>

              <ul>
                <li>
                  AI &amp; Data Science
                </li>
                <li>
                  Web Development
                </li>
                <li>
                  Software Development
                </li>
              </ul>
            </div>
          </article>

          <article>
            <time>
              2021 — 2023
            </time>

            <div>
              <h3>
                Pre-University — PCMC
              </h3>

              <p>
                Seshadripuram Main PU College
              </p>

              <strong>
                86%
              </strong>
            </div>
          </article>
        </div>
      </SectionFrame>

      {/* =================================================
          CERTIFICATIONS
      ================================================= */}

      <SectionFrame
        id="certifications"
        active={
          active === "certifications"
        }
        className="certifications-section"
      >
        <div className="compact-heading scroll-reveal">
          <p className="section-kicker">
            07 / Continued learning
          </p>

          <h2>CERTIFICATIONS</h2>

          <p>
            Learning never really stops.
          </p>
        </div>

        <div className="certification-groups">
          {certificationGroups.map(
            (
              group,
              groupIndex
            ) => (
              <section
                className="certification-group scroll-reveal"
                key={group.title}
                style={
                  {
                    "--delay": `${groupIndex * 90}ms`,
                  } as CSSProperties
                }
              >
                <h3>
                  {group.title}
                </h3>

                <div>
                  {group.items.map(
                    ([name, provider]) => (
                      <article key={name}>
                        <span>
                          <strong>
                            {name}
                          </strong>

                          <small>
                            {provider}
                          </small>
                        </span>
                      </article>
                    )
                  )}
                </div>
              </section>
            )
          )}
        </div>
      </SectionFrame>

      {/* =================================================
          CONTACT
      ================================================= */}

      <SectionFrame
        id="contact"
        active={
          active === "contact"
        }
        className="contact-section"
      >
        <div className="contact-layout scroll-reveal">
          <div className="contact-lead">
            <p className="section-kicker">
              08 / Say hello
            </p>

            <h2>
              CAME THIS
              <br />
              FAR? SAY
              <br />
              HI.
            </h2>

            <p>
              Have a project, opportunity, or idea?
              <br />
              I’d love to hear about it.
            </p>

            <a
              className="email-cta"
              href="mailto:ankithaks014@gmail.com"
            >
              Email me
              <ArrowUpRight />
            </a>
          </div>

          <div className="contact-panel">
            <a href="mailto:ankithaks014@gmail.com">
              <Mail />

              <span>
                <small>Email</small>
                ankithaks014@gmail.com
              </span>

              <ArrowUpRight />
            </a>

            <a
              href="https://www.linkedin.com/in/ankitha-k-s-7b46873b7"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin />

              <span>
                <small>LinkedIn</small>
                ankitha-k-s-7b46873b7
              </span>

              <ArrowUpRight />
            </a>

            <a
              href="https://github.com/ankitha014"
              target="_blank"
              rel="noreferrer"
            >
              <Github />

              <span>
                <small>GitHub</small>
                github.com/ankitha014
              </span>

              <ArrowUpRight />
            </a>
          </div>
        </div>

        <footer>
          Designed &amp; built with curiosity{" "}
          <span>✦</span> Ankitha KS · 2026
        </footer>
      </SectionFrame>
    </main>
  );
}