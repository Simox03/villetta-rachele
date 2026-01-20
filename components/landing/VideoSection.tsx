
/**
 * @file components/landing/VideoSection.tsx
 * @purpose Renders the video tour section with a thumbnail and play button, opening a modal for playback.
 */
import React, { useState, useMemo, useRef } from 'react';
import { INITIAL_SITE_CONTENT } from '../../data/siteContent';
import VideoModal from '../shared/VideoModal';
import { useOnScreen } from '../../hooks/useOnScreen';

interface VideoSectionProps {
    content: typeof INITIAL_SITE_CONTENT['video'];
}

/**
 * Determines if the URL is a known embed platform or a direct video link.
 * Returns an object with the URL to use and the type of player needed.
 */
const getVideoData = (url: string): { url: string; type: 'embed' | 'direct' } | null => {
    if (!url) return null;

    // YouTube URL Regex
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch && youtubeMatch[1]) {
        return { 
            url: `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&rel=0&modestbranding=1`, 
            type: 'embed' 
        };
    }

    // Google Drive URL Regex
    const driveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
    const driveMatch = url.match(driveRegex);
    if (driveMatch && driveMatch[1]) {
        return { 
            url: `https://drive.google.com/file/d/${driveMatch[1]}/preview`, 
            type: 'embed' 
        };
    }

    // Default to direct video playback for other URLs (like .mp4)
    return { url, type: 'direct' };
};

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-white">
        <path d="M8 5v14l11-7z"></path>
    </svg>
);


const VideoSection: React.FC<VideoSectionProps> = ({ content }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(sectionRef, '-100px');
    
    const videoData = useMemo(() => getVideoData(content.videoUrl), [content.videoUrl]);

    // If no video URL is set, we still show the section as a placeholder or hide it if preferred.
    // Given the user request, we assume they will provide a URL, but we handle the empty case gracefully.
    if (!content.videoUrl) {
        return null;
    }

    return (
        <>
            <section id="video" className="py-20 bg-slate-50 scroll-mt-24" ref={sectionRef}>
                <div className={`container mx-auto px-6 text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 font-serif">{content.title}</h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-12">{content.description}</p>
                    
                    <div 
                        className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                        onClick={() => setIsModalOpen(true)}
                        onKeyDown={(e) => e.key === 'Enter' && setIsModalOpen(true)}
                        role="button"
                        tabIndex={0}
                        aria-label="Riproduci video presentazione"
                    >
                        {/* Improved placeholder/thumbnail handling */}
                        <div className="aspect-video bg-slate-200 relative">
                            <img 
                                src={content.thumbnailSrc || '/images/veranda/veranda_01.jpg'} 
                                alt="Anteprima video presentazione Villetta Rachele" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                <div className="bg-white/20 group-hover:bg-white/40 backdrop-blur-md p-6 rounded-full transition-all duration-300 transform group-hover:scale-110 shadow-xl border border-white/30">
                                   <PlayIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {isModalOpen && videoData && (
                <VideoModal 
                    videoUrl={videoData.url} 
                    type={videoData.type}
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </>
    );
};

export default VideoSection;
