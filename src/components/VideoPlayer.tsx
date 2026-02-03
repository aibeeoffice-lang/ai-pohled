import { useState } from 'react';
import { Play, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { VideoData, VideoChapter, formatDuration } from '@/data/articles';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface VideoPlayerProps {
  video: VideoData;
  title: string;
  isLocked?: boolean;
  posterImage?: React.ReactNode;
}

const getEmbedUrl = (video: VideoData): string => {
  const { provider, url } = video;
  
  if (provider === 'youtube') {
    // Extract video ID from various YouTube URL formats
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    const videoId = match ? match[1] : url;
    return `https://www.youtube.com/embed/${videoId}?rel=0`;
  }
  
  if (provider === 'vimeo') {
    const match = url.match(/vimeo\.com\/(\d+)/);
    const videoId = match ? match[1] : url;
    return `https://player.vimeo.com/video/${videoId}`;
  }
  
  return url; // embed type - use URL directly
};

export const VideoPlayer = ({ video, title, isLocked = false, posterImage }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  if (isLocked) {
    return (
      <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary">
        {posterImage}
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
          <div className="bg-premium/20 backdrop-blur-sm rounded-full p-4 mb-4">
            <Lock className="h-12 w-12 text-premium" />
          </div>
          <p className="text-lg font-semibold mb-2">Premium video</p>
          <p className="text-sm text-white/70">Odemkni Premium pro přehrání</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Video Player */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
        {!isPlaying ? (
          <div className="relative w-full h-full">
            {posterImage || (
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <span className="text-muted-foreground">{title}</span>
              </div>
            )}
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
              aria-label="Přehrát video"
            >
              <div className="bg-accent rounded-full p-4 group-hover:scale-110 transition-transform shadow-lg">
                <Play className="h-12 w-12 text-accent-foreground fill-current" />
              </div>
            </button>
            {video.durationSeconds && (
              <div className="absolute bottom-3 right-3 bg-black/80 text-white text-sm px-2 py-1 rounded">
                {formatDuration(video.durationSeconds)}
              </div>
            )}
          </div>
        ) : (
          <iframe
            src={getEmbedUrl(video)}
            className="w-full h-full"
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* Chapters */}
      {video.chapters && video.chapters.length > 0 && (
        <div className="bg-secondary rounded-lg p-4">
          <h3 className="font-semibold mb-3">Kapitoly</h3>
          <div className="grid gap-2">
            {video.chapters.map((chapter, index) => (
              <button
                key={index}
                onClick={() => setIsPlaying(true)} // In a real app, this would seek to the timestamp
                className="flex items-center gap-3 text-left hover:bg-muted p-2 rounded-md transition-colors"
              >
                <span className="text-xs text-muted-foreground font-mono w-12">
                  {formatDuration(chapter.t)}
                </span>
                <span className="text-sm">{chapter.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Transcript */}
      {video.transcript && (
        <Collapsible open={showTranscript} onOpenChange={setShowTranscript}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              Přepis videa
              {showTranscript ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <div className="bg-secondary rounded-lg p-4 text-sm leading-relaxed">
              {video.transcript}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

interface LockedVideoOverlayProps {
  posterImage?: React.ReactNode;
  durationSeconds?: number;
}

export const LockedVideoOverlay = ({ posterImage, durationSeconds }: LockedVideoOverlayProps) => {
  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary">
      {posterImage || (
        <div className="w-full h-full bg-gradient-to-br from-secondary to-muted" />
      )}
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
        <div className="bg-premium/20 backdrop-blur-sm rounded-full p-4 mb-4">
          <Lock className="h-12 w-12 text-premium" />
        </div>
        <p className="text-lg font-semibold mb-2">Premium video</p>
        <p className="text-sm text-white/70 mb-2">Odemkni Premium pro přehrání</p>
        {durationSeconds && (
          <p className="text-xs text-white/50">{formatDuration(durationSeconds)}</p>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
