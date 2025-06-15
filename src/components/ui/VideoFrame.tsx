import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoFrameProps {
  videoId: string;
  title: string;
}

const VideoFrame: React.FC<VideoFrameProps> = ({ videoId, title }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="video-frame group">
      <div className="relative pb-[56.25%] h-0">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mb-2 group-hover:bg-orange-500/40 transition-all">
                <Play className="h-8 w-8 text-orange-500 ml-1" />
              </div>
              <p className="text-sm text-gray-300">{title}</p>
            </div>
          </div>
        )}
        <iframe
          className={`absolute top-0 left-0 w-full h-full rounded-lg ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
        ></iframe>
      </div>
    </div>
  );
};

export default VideoFrame;