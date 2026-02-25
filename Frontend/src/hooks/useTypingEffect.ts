import { useState, useCallback } from 'react';

/**
 * Simple hook to simulate a "typing" state for AI responses.
 */
export const useTypingEffect = (duration: number = 2000) => {
    const [isTyping, setIsTyping] = useState(false);

    const simulateTyping = useCallback(() => {
        setIsTyping(true);
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                setIsTyping(false);
                resolve();
            }, duration);
        });
    }, [duration]);

    return { isTyping, simulateTyping };
};
