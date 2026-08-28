import { useCallback, useEffect, useRef, useState } from "react";

const assetUrl = (fileName) => `${import.meta.env.BASE_URL}${fileName}`;

export function BackgroundVideoSequence({ onIntroComplete }) {
  const transitionVideoRef = useRef(null);
  const loopVideoRef = useRef(null);
  const frameRequestRef = useRef(null);
  const hasSwitchedRef = useRef(false);
  const [activeVideo, setActiveVideo] = useState("transition");

  const startLoop = useCallback(async () => {
    if (hasSwitchedRef.current) return;
    hasSwitchedRef.current = true;

    const transitionVideo = transitionVideoRef.current;
    const loopVideo = loopVideoRef.current;

    if (transitionVideo) {
      transitionVideo.pause();
      transitionVideo.currentTime = 2;
    }

    if (loopVideo) {
      loopVideo.currentTime = 0;

      try {
        await loopVideo.play();
      } catch {
        // Caso o play seja bloqueado pelo navegador
      }
    }

    setActiveVideo("loop");
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

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={transitionVideoRef}
        className={`background-video ${activeVideo === "transition" ? "opacity-100" : "opacity-0"}`}
        src={assetUrl("transition.mp4")}
        autoPlay
        muted
        playsInline
        preload="auto"
        onPlay={startFrameWatcher}
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
        src={assetUrl("loopP3R_comprimido.mp4")}
        muted
        playsInline
        preload="auto"
        loop
        aria-hidden="true"
      />
    </div>
  );
}
