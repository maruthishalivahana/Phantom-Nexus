import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import React from 'react';

const faqs = [
    {
        question: "How does Phantom Nexus generate my Career Roadmap?",
        answer: "Phantom Nexus analyzes your GitHub repositories, decodes your top languages, project structures, and contributions, then uses AI to craft a personalized career path based on your real coding experience."
    },
    {
        question: " Is my GitHub data safe?",
        answer: "Absolutely. We only read public data you authorize and never store sensitive information. Your privacy is our top priority."
    },
    {
        question: "Can I ask questions about my roadmap",
        answer: "Definitely! You can chat with our AI to clear doubts, get suggestions, or explore alternative career paths based on your profile."
    },
    {
        question: "How often should I regenerate my roadmap?",
        answer: "You can regenerate your roadmap anytime! It’s a good idea to update it after completing major projects or acquiring new skills."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 space-y-4">
            {faqs.map((faq, index) => (
                <div key={index} className="border rounded-xl overflow-hidden shadow-sm">
                    <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full flex justify-between items-center px-6 py-4 bg-white text-left text-lg font-medium hover:bg-violet-50 transition"
                    >
                        {faq.question}
                        <ChevronDown
                            className={`w-5 h-5 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                        />
                    </button>
                    <div
                        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 py-4' : 'max-h-0'
                            }`}
                    >
                        <p className="text-gray-600">{faq.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
