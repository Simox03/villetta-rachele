/**
 * @file hooks/useOnScreen.ts
 * @purpose A custom React hook to detect when a component enters the viewport, used for triggering animations.
 */
import { useState, useEffect, RefObject } from 'react';

// Custom hook to check if an element is visible on the screen
export const useOnScreen = (ref: RefObject<HTMLElement>, rootMargin = '0px'): boolean => {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIntersecting(true);
                    // Optional: unobserve after it's visible so it doesn't trigger again
                    observer.unobserve(entry.target);
                }
            },
            {
                rootMargin,
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, rootMargin]);

    return isIntersecting;
};