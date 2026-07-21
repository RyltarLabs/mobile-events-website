"use client";

import { useEffect, useRef } from "react";

export function VisionVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const playVideo = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      void video.play().catch(() => {
        // Mobile browsers may defer autoplay in low-power or data-saving modes.
      });
    };

    playVideo();
    video.addEventListener("loadeddata", playVideo);
    video.addEventListener("canplay", playVideo);
    document.addEventListener("visibilitychange", playVideo);

    return () => {
      video.removeEventListener("loadeddata", playVideo);
      video.removeEventListener("canplay", playVideo);
      document.removeEventListener("visibilitychange", playVideo);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="vision-video"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      controls={false}
      aria-label="Vídeo de bastidores e ambientação da Mobile Eventos"
    >
      <source src="/mobile-assets/snapinsta-1784518426556.mp4" type="video/mp4" />
    </video>
  );
}
