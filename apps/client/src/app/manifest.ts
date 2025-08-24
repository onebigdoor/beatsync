import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Beatsync",
    short_name: "Beatsync",
    description:
      "Turn every device into a synchronized speaker. Beatsync is an open-source audio player for multi-device playback. Host a listening party today and never worry about speakers again.",
    start_url: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#111111",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
