import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroTypingEffect from './HeroTypingEffect';

import image2 from '../assets/img2.png';

const GlobalStyles = () => (
    <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        /* Utility classes to apply the animation with delays */
        .fade-in {
            opacity: 0; /* Start hidden */
            animation: fadeIn 0.8s ease-out forwards;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
    `}</style>
);

const LandingPage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/dashboard');
    };

    return (
        <>
            <GlobalStyles />
            <div className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
                {/* Header */}
                <header className="w-full flex justify-between items-center px-6 md:px-12 py-5 sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-900">Phantom Nexus</h1>
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
                        <a href="#process" className="text-gray-600 hover:text-gray-900 transition-colors">Process</a>
                    </nav>
                    <button
                        onClick={handleGetStarted}
                        className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                    >
                        Get Started
                    </button>
                </header>

                {/* Main Content */}
                <main>
                    {/* Hero Section */}
                    <section className="relative px-6 md:px-20 py-24 md:py-32 text-center bg-gradient-to-br from-white to-gray-200">
                        <div className="max-w-4xl mx-auto">
                            <HeroTypingEffect />
                            {/* </h2> */}
                            <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto fade-in delay-200">
                                Connect your <strong className='text-blue-500 text-2xl'>GitHub </strong> to unlock a personalized career roadmap. We analyze your coding patterns to provide AI-powered insights that guide you to success.
                            </p>
                            <div className="mt-10 flex justify-center fade-in delay-400">
                                <button
                                    onClick={handleGetStarted}
                                    className="px-8 py-4 rounded-full bg-gray-900 text-white font-bold text-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    Analyze My GitHub
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section id="features" className="px-6 md:px-20 py-24 bg-white">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-16">
                                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Why Phantom Nexus?</h3>
                                <p className="text-lg text-gray-600 mt-4">Go beyond generic advice. Get a roadmap that understands you.</p>
                            </div>
                            <div className="grid md:grid-cols-3 gap-8 text-center">
                                <div className="p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-100 fade-in">
                                    <h4 className="text-xl font-semibold mb-3 text-gray-900">Deep Skill Analysis</h4>
                                    <p className="text-gray-700">We analyze your repositories to identify your true technical strengths and hidden potential.</p>
                                </div>
                                <div className="p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-100 fade-in ">
                                    <h4 className="text-xl font-semibold mb-3 text-gray-900">AI-Generated Roadmap</h4>
                                    <p className="text-gray-700">Receive a dynamic, step-by-step plan to level up your skills and achieve your career ambitions.</p>
                                </div>
                                <div className="p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-100 fade-in ">
                                    <h4 className="text-xl font-semibold mb-3 text-gray-900">Profile Optimization</h4>
                                    <p className="text-gray-700">Get actionable tips to enhance your GitHub profile, turning it into a powerful career asset.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* How It Works Section */}
                    <section id="process" className="px-6 md:px-20 py-24 bg-gradient-to-br from-white to-gray-200">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-16">
                                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">A Simple, Powerful Process</h3>
                            </div>
                            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
                                <div className="flex items-center  flex-col text-center p-6 fade-in">
                                    <div className="bg-gray-900 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">1</div>
                                    <h4 className="text-xl font-semibold mb-2">Connect GitHub</h4>
                                    <p className="text-gray-700">Securely link your account in seconds.</p>
                                </div>
                                <div className="text-gray-300 text-2xl hidden md:block">&rarr;</div>
                                <div className="flex items-center flex-col text-center p-6 fade-in delay-200">
                                    <div className="bg-gray-900 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">2</div>
                                    <h4 className="text-xl font-semibold mb-2">Receive Insights</h4>
                                    <p className="text-gray-700">Our AI analyzes your profile and projects.</p>
                                </div>
                                <div className="text-gray-300 text-2xl hidden md:block">&rarr;</div>
                                <div className="flex items-center flex-col text-center p-6 fade-in delay-400">
                                    <div className="bg-gray-900 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">3</div>
                                    <h4 className="text-xl font-semibold mb-2">Start Growing</h4>
                                    <p className="text-gray-700">Follow your personalized roadmap to success.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="px-6 md:px-20 py-10 bg-gray-900 text-white">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                        <p>&copy; 2025 Phantom Nexus. All rights reserved.</p>
                        <div className="flex justify-center space-x-6 mt-4 md:mt-0">
                            <a href="#privacy" className="hover:underline">Privacy Policy</a>
                            <a href="#terms" className="hover:underline">Terms of Service</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default LandingPage;
