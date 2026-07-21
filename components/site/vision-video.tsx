"use client";

import { useEffect, useRef } from "react";

export function VisionVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const prepareVideo = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.controls = false;
      video.autoplay = true;
      video.loop = true;
      video.preload = "auto";
      video.setAttribute("muted", "");
      video.setAttribute("autoplay", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.removeAttribute("controls");
    };

    const playVideo = () => {
      prepareVideo();
      void video.play().catch(() => {
        // Mobile browsers may defer autoplay in low-power or data-saving modes.
      });
    };

    prepareVideo();
    video.load();
    playVideo();
    video.addEventListener("loadedmetadata", playVideo);
    video.addEventListener("loadeddata", playVideo);
    video.addEventListener("canplay", playVideo);
    video.addEventListener("canplaythrough", playVideo);
    document.addEventListener("visibilitychange", playVideo);

    return () => {
      video.removeEventListener("loadedmetadata", playVideo);
      video.removeEventListener("loadeddata", playVideo);
      video.removeEventListener("canplay", playVideo);
      video.removeEventListener("canplaythrough", playVideo);
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
      webkit-playsinline="true"
      preload="auto"
      disablePictureInPicture
      controls={false}
      src="/mobile-assets/snapinsta-1784518426556-ios-safe.mp4"
      aria-label="Vídeo de bastidores e ambientação da Mobile Eventos"
    >
      <source src="/mobile-assets/snapinsta-1784518426556-ios-safe.mp4" type="video/mp4" />
    </video>
  );
}
