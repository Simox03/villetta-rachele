
/**
 * @file components/shared/VideoModal.tsx
 * @purpose A reusable modal component for displaying an embedded video player or a direct video file.
 */
import React, { useEffect } from 'react';

interface VideoModalProps {
    videoUrl: string;
    type: 'embed' | 'direct';
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, type, onClose }) => {
    
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') {
              onClose();
           }
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Finestra video"
        >
            <div 
                className="bg-black w-full max-w-5xl aspect-video relative rounded-xl shadow-2xl overflow-hidden border border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                {type === 'embed' ? (
                    <iframe
                        className="w-full h-full"
                        src={videoUrl}
                        title="Video Player Villetta Rachele"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    /* Fix: Removed duplicate className attribute on line 58 reported error */
                    <video 
                        className="w-full h-full" 
                        controls 
                        autoPlay 
                        playsInline
                    >
                        <source src={videoUrl} type="video/mp4" />
                        Il tuo browser non supporta il tag video.
                    </video>
                )}
                
                <button 
                    onClick={onClose} 
                    aria-label="Chiudi video"
                    className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center text-3xl font-light backdrop-blur-md transition-all border border-white/20 z-10"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default VideoModal;
