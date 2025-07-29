import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';


const LandingPage = () => {
    const navigate = useNavigate(); // <-- Hook for navigation

    const handleGetStarted = () => {
        navigate('/dashboard');  // <-- Navigate to your Dashboard route
    };
    return (
        <div className="min-h-screen bg-white text-black font-sans">
            <header className="w-full flex justify-between items-center px-8 py-6 shadow-sm bg-white sticky top-0 z-50">
                <h1 className="text-2xl font-bold">Phantom Nexus</h1>
                <div className="flex space-x-4">
                    {/* <button className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition">Sign In</button> */}
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="px-6 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition" onClick={handleGetStarted}>
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <button className="px-6 py-2 rounded-full border border-black text-black hover:bg-gray-100 transition">Get Started</button>
                </div>
            </header>

            <main className="px-6 md:px-20 py-16 bg-[whitesmoke] rounded-b-3xl">
                <section className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
                        Build Your AI Career Roadmap<br />With GitHub Insights
                    </h2>
                    <p className="mt-6 text-lg text-gray-700">
                        Connect your GitHub account to analyze your real coding skills and get a personalized career roadmap powered by AI insights.
                    </p>
                    <div className="mt-10 flex justify-center space-x-4">
                        <button className="px-8 py-4 rounded-full bg-black text-white text-lg hover:bg-gray-800 transition">Connect GitHub</button>
                        <button className="px-8 py-4 rounded-full border border-black text-black text-lg hover:bg-gray-100 transition">Learn More</button>
                    </div>
                </section>
            </main>

            <section className="px-6 md:px-20 py-16 bg-white">
                <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    <div className="p-6 bg-[whitesmoke] rounded-2xl shadow-md hover:scale-110">
                        <h3 className="text-xl font-semibold mb-2  ">Skill Analysis</h3>
                        <p className="text-gray-700">We analyze your GitHub projects to understand your technical strengths and areas of improvement.</p>
                    </div>
                    <div className="p-6 bg-[whitesmoke] rounded-2xl shadow-md">
                        <h3 className="text-xl font-semibold mb-2">AI-Generated Roadmap</h3>
                        <p className="text-gray-700">Our AI crafts a step-by-step roadmap to elevate your skills and align with your career goals.</p>
                    </div>
                    <div className="p-6 bg-[whitesmoke] rounded-2xl shadow-md">
                        <h3 className="text-xl font-semibold mb-2">Profile Optimization</h3>
                        <p className="text-gray-700">Get actionable suggestions to enhance your GitHub profile, including README enhancements and project ideas.</p>
                    </div>
                </div>
            </section>

            <footer className="px-6 md:px-20 py-10 bg-black text-white text-center rounded-t-3xl">
                <p className="mb-4">&copy; 2025 Phantom Nexus. All rights reserved.</p>
                <div className="flex justify-center space-x-6">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    <a href="#" className="hover:underline">Terms of Service</a>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
