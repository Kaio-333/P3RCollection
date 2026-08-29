import { useCallback, useEffect, useRef, useState } from "react";

const assetUrl = (fileName) => `${import.meta.env.BASE_URL}${fileName}`;

export function BackgroundVideoSequence({ onIntroComplete }) {
  const transitionVideoRef = useRef(null);
  const loopVideoRef = useRef(null);
  const frameRequestRef = useRef(null);
  const hasSwitchedRef = useRef(false);
  const [activeVideo, setActiveVideo] = useState("pending");

  const activateFallback = useCallback(() => {
    if (hasSwitchedRef.current) return;
    hasSwitchedRef.current = true;

    transitionVideoRef.current?.pause();
    loopVideoRef.current?.pause();
    setActiveVideo("fallback");
    onIntroComplete();
  }, [onIntroComplete]);

  const startLoop = useCallback(async () => {
    if (hasSwitchedRef.current) return;
    hasSwitchedRef.current = true;

    const transitionVideo = transitionVideoRef.current;
    const loopVideo = loopVideoRef.current;

    if (transitionVideo) {
      transitionVideo.pause();
      transitionVideo.currentTime = 2;
    }

    let loopStarted = false;

    if (loopVideo) {
      loopVideo.currentTime = 0;

      try {
        await loopVideo.play();
        loopStarted = true;
      } catch {
        loopStarted = false;
      }
    }

    setActiveVideo(loopStarted ? "loop" : "fallback");
    onIntroComplete();
  }, [onIntroComplete]);

  const watchTransitionFrame = useCallback(
    (_now, metadata) => {
      if (metadata.mediaTime >= 2) {
        startLoop();
        return;
      }

      const transitionVideo = transitionVideoRef.current;

      if (transitionVideo?.requestVideoFrameCallback) {
        frameRequestRef.current =
          transitionVideo.requestVideoFrameCallback(watchTransitionFrame);
      }
    },
    [startLoop],
  );

  const startFrameWatcher = useCallback(
    (event) => {
      if (event.currentTarget.requestVideoFrameCallback) {
        frameRequestRef.current =
          event.currentTarget.requestVideoFrameCallback(watchTransitionFrame);
      }
    },
    [watchTransitionFrame],
  );

  useEffect(
    () => () => {
      const transitionVideo = transitionVideoRef.current;

      if (transitionVideo?.cancelVideoFrameCallback && frameRequestRef.current) {
        transitionVideo.cancelVideoFrameCallback(frameRequestRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    const transitionVideo = transitionVideoRef.current;
    const fallbackTimer = window.setTimeout(activateFallback, 3200);

    if (transitionVideo) {
      transitionVideo.muted = true;
      const playAttempt = transitionVideo.play();
      playAttempt?.catch(activateFallback);
    }

    return () => window.clearTimeout(fallbackTimer);
  }, [activateFallback]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        className={`background-poster ${activeVideo === "pending" || activeVideo === "fallback" ? "opacity-100" : "opacity-0"}`}
        src={assetUrl("portfolio-poster.jpg")}
        alt=""
        aria-hidden="true"
      />

      <video
        ref={transitionVideoRef}
        className={`background-video ${activeVideo === "transition" ? "opacity-100" : "opacity-0"}`}
        src={assetUrl("transition.web.mp4")}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster={assetUrl("portfolio-poster.jpg")}
        disablePictureInPicture
        onPlaying={(event) => {
          if (!hasSwitchedRef.current) setActiveVideo("transition");
          startFrameWatcher(event);
        }}
        onTimeUpdate={(event) => {
          if (event.currentTarget.currentTime >= 2) startLoop();
        }}
        onEnded={startLoop}
        onError={startLoop}
        aria-hidden="true"
      />

      <video
        ref={loopVideoRef}
        className={`background-video ${activeVideo === "loop" ? "opacity-100" : "opacity-0"}`}
        src={assetUrl("loopP3R-web.mp4")}
        autoPlay
        muted
        playsInline
        preload="auto"
        loop
        poster={assetUrl("portfolio-poster.jpg")}
        disablePictureInPicture
        aria-hidden="true"
      />
    </div>
  );
}
