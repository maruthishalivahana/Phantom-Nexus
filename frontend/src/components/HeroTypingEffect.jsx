import React, { useState, useEffect } from 'react';

const taglines = [
    { text: 'Analyzing GitHub...', color: 'text-[#6366F1]' },  // Indigo 500
    { text: 'Decoding Your Skills...', color: 'text-[#0EA5E9]' },  // Sky Blue 500
    { text: 'Building Your Roadmap...', color: 'text-[#10B981]' },  // Emerald 500
    { text: 'AI-Powered Insights...', color: 'text-[#F43F5E]' },  // Rose 500
    { text: 'Visualizing Career Goals...', color: 'text-[#F59E0B]' },  // Amber 500
];

const HeroTypingEffect = () => {
    const [currentLine, setCurrentLine] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const currentTagline = taglines[currentLine];
        if (charIndex < currentTagline.text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + currentTagline.text.charAt(charIndex));
                setCharIndex(charIndex + 1);
            }, 80);
            return () => clearTimeout(timeout);
        } else {
            const pause = setTimeout(() => {
                setDisplayedText('');
                setCharIndex(0);
                setCurrentLine((currentLine + 1) % taglines.length);
            }, 1500);  // Pause before next tagline
            return () => clearTimeout(pause);
        }
    }, [charIndex, currentLine]);

    return (
        <h2 className={`text-5xl font-bold ${taglines[currentLine].color}`}>
            {displayedText}<span className="blinking-cursor">|</span>
        </h2>
    );
};

export default HeroTypingEffect;
