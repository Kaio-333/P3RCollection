import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { portfolioAssets, portfolioProjects } from "../data/portfolioProjects";

const SCRAMBLE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&";
const TITLE = "PORTIFÓLIO";

function getCarouselMetrics() {
  if (typeof window === "undefined") return { cardWidth: 980, gap: 30 };

  const isCompact = window.innerWidth <= 700;
  return {
    cardWidth: Math.round(
      Math.min(window.innerWidth * (isCompact ? 0.82 : 0.78), 1180),
    ),
    gap: isCompact ? 16 : Math.min(Math.round(window.innerWidth * 0.026), 40),
  };
}

function ScrambleTitle({ active }) {
  const titleRef = useRef(null);
  const playedRef = useRef(false);

  useEffect(() => {
    if (!active || playedRef.current || !titleRef.current) return undefined;
    playedRef.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      titleRef.current.textContent = TITLE;
      return undefined;
    }

    let animationFrame = null;
    const startedAt = performance.now();
    const duration = 1050;

    const animate = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const revealedCharacters = Math.floor(progress * (TITLE.length + 2));

      titleRef.current.textContent = [...TITLE]
        .map((character, index) => {
          if (character === " " || index < revealedCharacters) return character;
          return SCRAMBLE_CHARACTERS[
            Math.floor(Math.random() * SCRAMBLE_CHARACTERS.length)
          ];
        })
        .join("");

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        titleRef.current.textContent = TITLE;
      }
    };

    animationFrame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [active]);

  return (
    <span ref={titleRef} aria-label={TITLE}>
      {TITLE}
    </span>
  );
}

function PortfolioLoading({ visible }) {
  return (
    <div
      className={`portfolio-loading ${visible ? "is-visible" : "is-hidden"}`}
      role="status"
      aria-label="Carregando portfólio"
      aria-live="polite"
    >
      <div className="portfolio-loading-header">
        <span>PORTIFÓLIO</span>
        <i />
      </div>
      <div className="portfolio-skeleton-track" aria-hidden="true">
        <div className="portfolio-skeleton-card">
          <b />
          <span />
          <span />
          <span />
        </div>
        <div className="portfolio-skeleton-card">
          <b />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

function WordRevealText({ children }) {
  return (
    <p className="portfolio-word-reveal">
      {children.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} style={{ "--word-index": Math.min(index, 18) }}>
          {word}{" "}
        </span>
      ))}
    </p>
  );
}

function ProjectVisual({ project }) {
  if (project.images) {
    return (
      <div
        className={`project-image-grid ${
          project.images.length === 1 ? "has-single-image" : ""
        }`}
      >
        {project.images.map((image) => (
          <figure key={image.src}>
            <img src={image.src} alt={image.alt} />
          </figure>
        ))}
      </div>
    );
  }

  return (
    <div className={`project-abstract-visual visual-${project.id}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <span>{project.id === "elliptic-app" ? "◉—◉—◉" : "MQTT / IOT"}</span>
    </div>
  );
}

function ProjectCard({ project, active, clone }) {
  return (
    <article
      className={`portfolio-project-card ${active ? "is-active" : ""}`}
      style={{
        "--project-accent": project.accent,
        "--project-title": project.titleColor,
        "--project-title-bg": project.titleBackground,
      }}
      aria-hidden={clone ? "true" : undefined}
    >
      <header className="project-title-band">
        {project.banner && <img src={project.banner} alt="" aria-hidden="true" />}
        <span>{project.number}</span>
        <h2>{project.title}</h2>
      </header>

      <div className="project-card-body">
        <ProjectVisual project={project} />
        <div className="project-copy-panel">
          <small>{project.eyebrow}</small>
          {project.paragraphs.map((paragraph) => (
            <WordRevealText key={paragraph}>{paragraph}</WordRevealText>
          ))}
        </div>
      </div>

      <a
        className="project-link"
        href={project.link}
        target="_blank"
        rel="noreferrer"
        tabIndex={clone || !active ? -1 : 0}
      >
        <span>VER NO GITHUB</span>
        <b aria-hidden="true">↗</b>
      </a>
    </article>
  );
}

export function PortfolioPage() {
  const pageRef = useRef(null);
  const wheelTotalRef = useRef(0);
  const transitionLockedRef = useRef(false);
  const touchStartRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [slideIndex, setSlideIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [metrics, setMetrics] = useState(getCarouselMetrics);
  const projectCount = portfolioProjects.length;

  const loopedProjects = useMemo(
    () => [
      { ...portfolioProjects[projectCount - 1], loopKey: "clone-last", clone: true },
      ...portfolioProjects.map((project) => ({
        ...project,
        loopKey: project.id,
        clone: false,
      })),
      { ...portfolioProjects[0], loopKey: "clone-first", clone: true },
    ],
    [projectCount],
  );

  const normalizedIndex =
    ((slideIndex - 1) % projectCount + projectCount) % projectCount;

  const goToAdjacentProject = useCallback(
    (direction) => {
      if (isLoading || transitionLockedRef.current) return;
      transitionLockedRef.current = true;
      setTransitionEnabled(true);
      setSlideIndex((current) => current + direction);
    },
    [isLoading],
  );

  useEffect(() => {
    const urls = [
      portfolioAssets.logo,
      portfolioAssets.headerTexture,
      ...portfolioProjects.flatMap((project) => [
        ...(project.images?.map((image) => image.src) ?? []),
        ...(project.banner ? [project.banner] : []),
      ]),
    ];
    const loadAsset = (url) =>
      new Promise((resolve) => {
        const image = new Image();
        image.onload = resolve;
        image.onerror = resolve;
        image.src = url;
      });
    const minimumLoadingTime = new Promise((resolve) =>
      window.setTimeout(resolve, 900),
    );
    let cancelled = false;

    Promise.all([Promise.all(urls.map(loadAsset)), minimumLoadingTime]).then(() => {
      if (!cancelled) setIsLoading(false);
    });

    const loadingFallback = window.setTimeout(() => setIsLoading(false), 3200);
    return () => {
      cancelled = true;
      window.clearTimeout(loadingFallback);
    };
  }, []);

  useEffect(() => {
    const updateMetrics = () => setMetrics(getCarouselMetrics());
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  }, []);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const handleWheel = (event) => {
      event.preventDefault();
      if (isLoading) return;

      wheelTotalRef.current += event.deltaY || event.deltaX;
      if (Math.abs(wheelTotalRef.current) < 42) return;

      goToAdjacentProject(wheelTotalRef.current > 0 ? 1 : -1);
      wheelTotalRef.current = 0;
    };

    page.addEventListener("wheel", handleWheel, { passive: false });
    return () => page.removeEventListener("wheel", handleWheel);
  }, [goToAdjacentProject, isLoading]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(
      () => {
        if (slideIndex === 0 || slideIndex === projectCount + 1) {
          setTransitionEnabled(false);
          setSlideIndex(slideIndex === 0 ? projectCount : 1);
          window.requestAnimationFrame(() => setTransitionEnabled(true));
        }
        transitionLockedRef.current = false;
      },
      reducedMotion ? 80 : 680,
    );

    return () => window.clearTimeout(timer);
  }, [projectCount, slideIndex]);

  const trackX =
    window.innerWidth / 2 -
    metrics.cardWidth / 2 -
    slideIndex * (metrics.cardWidth + metrics.gap);

  return (
    <main
      className="portfolio-work-page"
      ref={pageRef}
      onKeyDown={(event) => {
        if (["ArrowDown", "ArrowRight", "PageDown"].includes(event.key)) {
          event.preventDefault();
          goToAdjacentProject(1);
        }
        if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) {
          event.preventDefault();
          goToAdjacentProject(-1);
        }
      }}
      onTouchStart={(event) => {
        touchStartRef.current = event.changedTouches[0].clientY;
      }}
      onTouchEnd={(event) => {
        if (touchStartRef.current === null) return;
        const distance = touchStartRef.current - event.changedTouches[0].clientY;
        touchStartRef.current = null;
        if (Math.abs(distance) > 44) goToAdjacentProject(distance > 0 ? 1 : -1);
      }}
      tabIndex="0"
    >
      <PortfolioLoading visible={isLoading} />

      <header className="portfolio-work-header">
        <img className="portfolio-header-texture" src={portfolioAssets.headerTexture} alt="" />
        <a className="portfolio-work-back" href="#inicio" aria-label="Voltar ao início">
          ← INÍCIO
        </a>
        <h1>
          <ScrambleTitle active={!isLoading} />
        </h1>
        <img className="portfolio-work-logo" src={portfolioAssets.logo} alt="Logo Kumo" />
      </header>

      <section className="portfolio-carousel" aria-roledescription="carrossel">
        <div
          className={`portfolio-carousel-track ${transitionEnabled ? "has-transition" : ""}`}
          style={{
            "--project-card-width": `${metrics.cardWidth}px`,
            "--project-gap": `${metrics.gap}px`,
            transform: `translate3d(${trackX}px, 0, 0)`,
          }}
        >
          {loopedProjects.map((project, index) => (
            <ProjectCard
              key={project.loopKey}
              project={project}
              clone={project.clone}
              active={index === slideIndex}
            />
          ))}
        </div>
      </section>

      <div className="portfolio-carousel-controls">
        <button type="button" onClick={() => goToAdjacentProject(-1)} aria-label="Projeto anterior">
          ←
        </button>
        <div className="portfolio-project-position" aria-live="polite">
          <b>{String(normalizedIndex + 1).padStart(2, "0")}</b>
          <span>/ {String(projectCount).padStart(2, "0")}</span>
        </div>
        <div className="portfolio-project-dots" aria-hidden="true">
          {portfolioProjects.map((project, index) => (
            <i className={index === normalizedIndex ? "is-active" : ""} key={project.id} />
          ))}
        </div>
        <span className="portfolio-scroll-instruction">SCROLL ↓ MOVE →</span>
        <button type="button" onClick={() => goToAdjacentProject(1)} aria-label="Próximo projeto">
          →
        </button>
      </div>
    </main>
  );
}
