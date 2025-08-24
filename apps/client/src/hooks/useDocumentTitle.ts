import { extractFileNameFromUrl } from "@/lib/utils";
import { useGlobalStore } from "@/store/global";
import { useEffect } from "react";

export const useDocumentTitle = () => {
  const isPlaying = useGlobalStore((state) => state.isPlaying);
  const selectedAudioUrl = useGlobalStore((state) => state.selectedAudioUrl);
  const audioSources = useGlobalStore((state) => state.audioSources);

  useEffect(() => {
    if (isPlaying && selectedAudioUrl) {
      const audioSource = audioSources.find(
        (sourceState) => sourceState.source.url === selectedAudioUrl
      );

      if (audioSource) {
        const songName = extractFileNameFromUrl(audioSource.source.url);
        document.title = `${songName}`;
      }
    } else {
      document.title = "Beatsync";
    }
  }, [isPlaying, selectedAudioUrl, audioSources]);
};
