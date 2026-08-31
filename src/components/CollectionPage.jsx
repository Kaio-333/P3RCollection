import { useEffect, useRef, useState } from "react";
import {
  collectionCopy,
  collectionMedia,
  favoriteAlbums,
} from "../data/collectionActs";

const ALBUM_PREVIEW_VOLUME = 0.07;

function SectionHeading({ number, children, light = false }) {
  return (
    <header className={`collection-section-heading ${light ? "is-light" : ""}`}>
      <span>{number}</span>
      <h2>{children}</h2>
    </header>
  );
}

function AlbumDeck({ onPreviewChange }) {
  const [activeAlbum, setActiveAlbum] = useState(0);
  const playingAudiosRef = useRef(new Set());
  const previewedAlbumRef = useRef(null);

  const fadeAudio = (audio, targetVolume, duration, onComplete) => {
    if (audio.fadeFrame) window.cancelAnimationFrame(audio.fadeFrame);

    const initialVolume = audio.volume;
    const startedAt = performance.now();

    const animateVolume = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      audio.volume = Math.max(
        0,
        Math.min(1, initialVolume + (targetVolume - initialVolume) * easedProgress),
      );

      if (progress < 1) {
        audio.fadeFrame = window.requestAnimationFrame(animateVolume);
      } else {
        audio.fadeFrame = null;
        onComplete?.();
      }
    };

    audio.fadeFrame = window.requestAnimationFrame(animateVolume);
  };

  const fadeOutPlayingAudio = () => {
    playingAudiosRef.current.forEach((audio) => {
      fadeAudio(audio, 0, 680, () => {
        audio.pause();
        playingAudiosRef.current.delete(audio);
      });
    });
  };

  const previewAlbum = (album, index) => {
    setActiveAlbum(index);
    onPreviewChange(album);

    if (previewedAlbumRef.current === album.title) return;

    previewedAlbumRef.current = album.title;
    fadeOutPlayingAudio();

    if (!album.audio) return;

    const audio = new Audio(album.audio);
    audio.preload = "auto";
    audio.volume = 0;
    playingAudiosRef.current.add(audio);

    const seekToExcerpt = () => {
      const playableDuration = Number.isFinite(audio.duration)
        ? Math.max(audio.duration - 1, 0)
        : album.startAt;
      audio.currentTime = Math.min(album.startAt, playableDuration);
    };

    if (audio.readyState >= 1) {
      seekToExcerpt();
    } else {
      audio.addEventListener("loadedmetadata", seekToExcerpt, { once: true });
    }

    audio
      .play()
      .then(() => {
        fadeAudio(audio, ALBUM_PREVIEW_VOLUME, 900);
      })
      .catch(() => {
        playingAudiosRef.current.delete(audio);
        if (previewedAlbumRef.current === album.title) {
          previewedAlbumRef.current = null;
        }
      });
  };

  const stopPreview = () => {
    previewedAlbumRef.current = null;
    onPreviewChange(null);
    fadeOutPlayingAudio();
  };

  useEffect(
    () => () => {
      playingAudiosRef.current.forEach((audio) => {
        if (audio.fadeFrame) window.cancelAnimationFrame(audio.fadeFrame);
        audio.pause();
      });
      playingAudiosRef.current.clear();
    },
    [],
  );

  return (
    <div
      className="album-experience"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) stopPreview();
      }}
      onPointerLeave={stopPreview}
    >
      <div className="album-deck" aria-label="Álbuns favoritos">
        {favoriteAlbums.map((album, index) => {
          const distance = index - activeAlbum;

          return (
            <button
              className={`vinyl-album ${index === activeAlbum ? "is-active" : ""}`}
              key={album.title}
              onClick={() => previewAlbum(album, index)}
              onFocus={() => previewAlbum(album, index)}
              onPointerEnter={() => previewAlbum(album, index)}
              style={{
                "--album-index": index,
                "--distance": distance,
                "--album-accent": album.accent,
              }}
              type="button"
              aria-label={`${album.title}, ${album.artist}`}
            >
              <span className="vinyl-record" aria-hidden="true">
                <span className="vinyl-grooves" />
                <span className="vinyl-label">
                  {album.cover ? (
                    <img src={album.cover} alt="" />
                  ) : (
                    <span>タイム</span>
                  )}
                </span>
              </span>
              <span className="album-cover">
                {album.cover ? (
                  <img src={album.cover} alt="" />
                ) : (
                  <span className="generated-cover" aria-hidden="true">
                    <b>時間</b>
                    <i>
                      machine
                      <br />
                      broken
                    </i>
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div className="album-caption" aria-live="polite">
        <span>{String(activeAlbum + 1).padStart(2, "0")}</span>
        <div>
          <strong>{favoriteAlbums[activeAlbum].title}</strong>
          <small>{favoriteAlbums[activeAlbum].artist}</small>
        </div>
      </div>
    </div>
  );
}

function AlbumCinematicFocus({ album }) {
  const [displayAlbum, setDisplayAlbum] = useState(favoriteAlbums[0]);

  useEffect(() => {
    if (album) setDisplayAlbum(album);
  }, [album]);

  return (
    <div
      className={`album-cinematic-focus ${album ? "is-active" : ""}`}
      aria-hidden="true"
    >
      <div className="cinematic-dim" />
      <div
        className="focused-album-visual"
        style={{ "--album-accent": displayAlbum.accent }}
      >
        <span className="focused-vinyl-record">
          <span className="vinyl-grooves" />
          <span className="focused-vinyl-label">
            <img src={displayAlbum.cover} alt="" />
          </span>
        </span>
        <span className="focused-album-cover">
          <img src={displayAlbum.cover} alt="" />
        </span>
        <span className="focused-album-title">
          <strong>{displayAlbum.title}</strong>
          <small>{displayAlbum.artist}</small>
        </span>
      </div>
    </div>
  );
}

function Bubbles() {
  return (
    <div className="collection-bubbles" aria-hidden="true">
      {Array.from({ length: 14 }, (_, index) => (
        <i key={index} style={{ "--bubble": index }} />
      ))}
    </div>
  );
}

function ScrollContinuationCue({ progress, hasMore }) {
  return (
    <div
      className={`collection-scroll-cue ${hasMore ? "is-visible" : "is-complete"}`}
      style={{ "--scroll-progress": progress }}
      aria-hidden="true"
    >
      <span className="scroll-cue-track">
        <i />
      </span>
    </div>
  );
}

export function CollectionPage() {
  const [albumPreview, setAlbumPreview] = useState(null);
  const [scrollStatus, setScrollStatus] = useState({
    progress: 0,
    hasMore: true,
  });
  const sewerslvtVideoRef = useRef(null);
  const albumTheme = albumPreview?.theme ?? null;

  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = sewerslvtVideoRef.current;
    if (!video) return;

    if (albumTheme === "we-had-good-times") {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [albumTheme]);

  useEffect(() => {
    let frame = null;

    const updateScrollStatus = () => {
      if (frame) window.cancelAnimationFrame(frame);

      frame = window.requestAnimationFrame(() => {
        const page = document.documentElement;
        const scrollableDistance = Math.max(page.scrollHeight - window.innerHeight, 1);
        const progress = Math.min(Math.max(window.scrollY / scrollableDistance, 0), 1);
        const hasMore = window.scrollY < scrollableDistance - 24;

        setScrollStatus((current) => {
          if (
            Math.abs(current.progress - progress) < 0.002 &&
            current.hasMore === hasMore
          ) {
            return current;
          }

          return { progress, hasMore };
        });
      });
    };

    updateScrollStatus();
    window.addEventListener("scroll", updateScrollStatus, { passive: true });
    window.addEventListener("resize", updateScrollStatus);
    const pageResizeObserver =
      "ResizeObserver" in window
        ? new ResizeObserver(updateScrollStatus)
        : null;
    pageResizeObserver?.observe(document.body);
    pageResizeObserver?.observe(document.documentElement);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrollStatus);
      window.removeEventListener("resize", updateScrollStatus);
      pageResizeObserver?.disconnect();
    };
  }, []);

  return (
    <main className="collection-page figma-collection">
      <AlbumCinematicFocus album={albumPreview} />
      <ScrollContinuationCue {...scrollStatus} />

      <a className="collection-back" href="#inicio" aria-label="Voltar ao início">
        <span aria-hidden="true">←</span>
        início
      </a>

      <section className="origin-section">
        <Bubbles />
        <div className="water-light" aria-hidden="true" />

        <header className="figma-collection-header" data-reveal>
          <span aria-hidden="true">/</span>
          <h1>COLEÇÃO</h1>
        </header>

        <div className="origin-paper" data-reveal>
          <div className="paper-copy beginning-copy">
            <SectionHeading number="1.0">Começo</SectionHeading>
            <p>{collectionCopy.beginning}</p>
          </div>

          <figure className="childhood-photo">
            <img src={collectionMedia.childhood} alt="Kaio durante a infância" />
            <figcaption>BELÉM // COMEÇO</figcaption>
          </figure>

          <div className="paper-copy creativity-copy">
            <SectionHeading number="1.1">Criatividade</SectionHeading>
            <p>{collectionCopy.creativity}</p>
          </div>

          <div className="childhood-games">
            <figure className="minecraft-photo">
              <img src={collectionMedia.minecraft} alt="Minecraft Xbox 360 Edition" />
            </figure>
            <figure className="roblox-photo">
              <img src={collectionMedia.robloxClassic} alt="Roblox clássico" />
            </figure>
            <div className="first-game-archive">
              <figure className="zombie-archive-photo">
                <img
                  src={collectionMedia.zombieGame}
                  alt="Jogo de zumbi criado aos 10 anos"
                />
              </figure>
              <figure className="archive-created-date">
                <img
                  src={collectionMedia.createdAt}
                  alt="Criado em 22 de abril de 2015"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <div className="section-blend blend-origin-to-dreams" aria-hidden="true" />

      <section
        className={`dreams-section ${albumTheme ? `theme-${albumTheme}` : "theme-default"}`}
      >
        <Bubbles />
        <video
          aria-hidden="true"
          className="sewerslvt-theme-video"
          loop
          muted
          playsInline
          preload="metadata"
          ref={sewerslvtVideoRef}
          src={collectionMedia.sewerslvtBackdrop}
          tabIndex="-1"
        />
        <div className="album-theme-backdrop" aria-hidden="true" />
        <div className="sisterhood-atmosphere" aria-hidden="true">
          <img src={collectionMedia.sisterhoodEye} alt="" />
          <div className="sisterhood-marquee marquee-one">
            <span>NULL&amp;UROBOROS</span>
            <span>NULL&amp;UROBOROS</span>
            <span>NULL&amp;UROBOROS</span>
          </div>
          <div className="sisterhood-marquee marquee-two">
            <span>love, her</span>
            <span>love, her</span>
            <span>love, her</span>
          </div>
          <div className="sisterhood-marquee marquee-three">
            <span>i am today, i am tomorrow.</span>
            <span>i am today, i am tomorrow.</span>
          </div>
        </div>
        <img
          className="persona-water-art"
          src={collectionMedia.personaWater}
          alt=""
          aria-hidden="true"
        />

        <div className="content-shell dreams-content">
          <div className="dreams-heading" data-reveal>
            <SectionHeading number="2.0">SONHOS E GOSTOS</SectionHeading>
          </div>

          <div className="music-intro" data-reveal>
            <p>{collectionCopy.music}</p>
            <figure className="lastfm-card">
              <img src={collectionMedia.lastfm} alt="Perfil blossomnote no Last.fm" />
            </figure>
            <p>{collectionCopy.scrobbles}</p>
            <p>{collectionCopy.albumsIntro}</p>
          </div>

          <div className="album-focus-stage" data-reveal>
            <AlbumDeck onPreviewChange={setAlbumPreview} />
          </div>

          <div className="valorant-layout">
            <div className="valorant-copy" data-reveal>
              <p>{collectionCopy.valorant}</p>
              <p>{collectionCopy.immortal}</p>
            </div>
            <div className="valorant-video-wrap" data-reveal>
              <span className="replay-video-label">REPLAY // VALORANT</span>
              <img
                alt="Replay de uma partida de Valorant"
                decoding="async"
                loading="lazy"
                src={collectionMedia.valorantReplay}
              />
            </div>
          </div>

          <div className="laughter-video-wrap" data-reveal>
            <div className="laughter-video-heading">
              VÍDEOS DE RISADAS E COISAS ALEATÓRIAS
            </div>
            <video
              controls
              playsInline
              preload="metadata"
              src={collectionMedia.laughterVideo}
            />
          </div>
        </div>
      </section>

      <div className="section-blend blend-dreams-to-programming" aria-hidden="true" />

      <section className="programming-section">
        <div className="content-shell">
          <div className="programming-copy" data-reveal>
            <SectionHeading number="3.0">Programação</SectionHeading>
            <p>{collectionCopy.firstGame}</p>
            <p>{collectionCopy.stillWorks}</p>
            <p>{collectionCopy.returnToRoblox}</p>
          </div>

          <div className="game-history" data-reveal>
            <figure className="game-shot recent-game-shot">
              <img src={collectionMedia.recentGame} alt="Jogo recente criado no Roblox" />
              <figcaption>10 ANOS DEPOIS // 3.900 VISITAS</figcaption>
            </figure>
            <figure className="created-date recent-created-date">
              <img
                src={collectionMedia.recentCreatedAt}
                alt="Criado em 18 de fevereiro de 2025"
              />
            </figure>
          </div>

          <div className="game-video-wrap" data-reveal>
            <div className="video-label">DEMONSTRAÇÃO DO JOGO</div>
            <img
              alt="Demonstração do jogo criado no Roblox"
              decoding="async"
              loading="lazy"
              src={collectionMedia.gameDemo}
            />
          </div>

          <div className="circle-copy" data-reveal>
            <span className="circle-mark" aria-hidden="true">
              3.1
            </span>
            <p>{collectionCopy.circle}</p>
            <p className="current-achievement">
              {collectionCopy.currentAchievement}
            </p>
            <figure className="award-photo">
              <img
                src={collectionMedia.pucprAward}
                alt="Equipe premiada em segundo lugar na Galeria de Projetos da PUCPR"
              />
              <figcaption>2º LUGAR // GALERIA DE PROJETOS PUCPR</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <footer className="collection-footer">
        <span>KAIO</span>
        <a href="#inicio">VOLTAR AO INÍCIO ↑</a>
      </footer>
    </main>
  );
}
