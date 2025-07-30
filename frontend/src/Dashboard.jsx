

import { useEffect, useState, } from 'react';
import React from 'react';
import { SignedIn, SignedOut, RedirectToSignIn, UserButton, useUser } from '@clerk/clerk-react';
import axios from 'axios';

function Dashboard() {
    const { user } = useUser();

    const [repos, setRepos] = useState([]);
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('');
    const [roadmap, setRoadmap] = useState('');
    const [loadingRoadmap, setLoadingRoadmap] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const githubUser = urlParams.get('username');
        const githubToken = urlParams.get('token');

        if (githubUser && githubToken) {
            setConnected(true);
            setUsername(githubUser);
            fetchRepos(githubToken);
        }
    }, []);

    const connectGitHub = () => {
        window.location.href = 'http://localhost:5000/auth/github';
    };

    const fetchRepos = async (token) => {
        try {
            const response = await fetch(`http://localhost:5000/api/github/repos?token=${token}`);
            const data = await response.json();

            if (response.ok) {
                setRepos(data.repositories);
                sendToGeminiAPI({
                    username: data.username,
                    topLanguages: data.topLanguages,
                    repositories: data.repositories
                });
            } else {
                console.error('Failed to fetch repos');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const sendToGeminiAPI = async (githubData) => {
        setLoadingRoadmap(true);
        try {
            const response = await fetch('http://localhost:5000/api/gemini/roadmap', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(githubData)
            });

            const data = await response.json();

            if (response.ok) {
                setRoadmap(data.roadmap);
            } else {
                console.error('Gemini API Error:', data.error);
                setRoadmap('Failed to generate roadmap. Please try again later.');
            }
        } catch (err) {
            console.error('Fetch Error:', err);
            setRoadmap('Something went wrong while communicating with the server.');
        } finally {
            setLoadingRoadmap(false);
        }
    };

    const [userQuery, setUserQuery] = useState('');
    const [chatHistory, setChatHistory] = useState([]);  // For showing previous Q&As



    const handleAskRoadmap = async () => {
        console.log('Sending to API:', { query: userQuery, roadmap });  // Debug Line

        setChatHistory(prev => [...prev, { role: 'user', text: userQuery }]);

        try {
            const response = await axios.post('http://localhost:5000/api/roadmapQuery', {
                query: userQuery,
                roadmap: roadmap
            });

            if (response.status === 200) {
                const data = response.data;
                console.log('AI Response:', data);  // Debug Line

                setChatHistory(prev => [...prev, { role: 'ai', text: data.answer }]);
                setUserQuery('');
            }
        } catch (err) {
            console.error('API Error:', err.response?.data || err.message);
            setChatHistory(prev => [...prev, { role: 'ai', text: '⚠️ AI failed to respond. Please try again later.' }]);
        }
    };



    return (
        <>
            <SignedOut>
                <RedirectToSignIn redirectUrl="/dashboard" />
            </SignedOut>

            <SignedIn>
                <header className="w-full flex justify-between items-center px-8 py-6 shadow-sm bg-white sticky top-0 z-50">
                    <h1 className="text-2xl font-bold">Phantom Nexus</h1>
                    <div className="flex items-center space-x-4">
                        {user && (
                            <div className="text-right">
                                <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                                <p className="text-xs text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
                            </div>
                        )}
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </header>

                <div className="p-10 max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        {connected ? `Welcome, ${username}` : 'Connect your GitHub'}
                    </h1>

                    {!connected && (
                        <div className="min-h-screen flex flex-col items-center px-6 py-10 font-sans relative overflow-hidden">
                            <header className="w-full max-w-6xl flex justify-between items-center backdrop-blur-md bg-white/70 border border-white/30 rounded-3xl shadow-md py-4 px-6 mb-16 transition-all">
                                <h1 className="text-2xl font-extrabold text-violet-700">Phantom Nexus</h1>
                                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold shadow-inner cursor-pointer hover:scale-105 transition-transform">
                                    JD
                                </div>
                            </header>

                            <main className="flex flex-col items-center text-center max-w-3xl z-10">
                                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-snug">
                                    Supercharge Your Career Roadmap <br className="hidden sm:block" />
                                    With GitHub Insights
                                </h2>
                                <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                                    Connect Your GitHub Account To Let Us Analyze Your Projects, Skills, And Contributions.
                                    We’ll Craft A Personalized Career Roadmap That Aligns With Your Real Coding Experience.
                                </p>

                                <button className="mt-10 flex items-center px-8 py-4 rounded-full bg-violet-600 text-white font-semibold text-lg shadow-lg hover:bg-violet-700 transition-all hover:scale-105 focus:ring-4 focus:ring-violet-400" onClick={connectGitHub}>
                                    Connect GitHub
                                </button>
                            </main>

                            <div className="absolute w-72 h-72 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 top-10 left-10"></div>
                            <div className="absolute w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 bottom-10 right-10"></div>
                        </div>
                    )}

                    {connected && (
                        <div className="mt-10 space-y-6">
                            <h2 className="text-2xl font-bold text-center text-violet-700">Your AI Career Roadmap</h2>

                            <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 overflow-y-scroll overflow-hidden ">
                                {loadingRoadmap ? (
                                    <div className="flex justify-center items-center">
                                        <p className="text-gray-500 animate-pulse">Analyzing your GitHub data...</p>
                                    </div>
                                ) : (
                                    roadmap && (
                                        <div className="overflow-y-auto">
                                            <div className="inline-flex space-x-4 min-w-max">
                                                <div className="bg-gray-100 p-4 rounded-xl text-gray-800 whitespace-pre-wrap leading-relaxed shadow-sm">
                                                    {roadmap}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                                <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 mt-8 max-h-96 overflow-y-auto">
                                    {chatHistory.map((msg, idx) => (
                                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`px-4 py-2 rounded-xl max-w-xs whitespace-pre-wrap leading-relaxed shadow-md
            ${msg.role === 'user' ? 'bg-violet-600 text-white' : 'bg-violet-100 text-violet-800'}`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>

                            <footer className="bg-white border-t border-gray-200 p-4 position-sticky bottom-0 left-0 right-0">
                                <div className="max-w-4xl mx-auto flex items-center gap-4">
                                    <input
                                        type="text"
                                        value={userQuery}
                                        onChange={(e) => setUserQuery(e.target.value)}
                                        placeholder="Ask about your roadmap..."
                                        className="flex-1 px-5 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
                                    />
                                    <button
                                        onClick={handleAskRoadmap}
                                        className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-full hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-transform transform active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed"

                                    >
                                        Send
                                    </button>
                                </div>
                            </footer>
                        </div>
                    )}
                </div>
            </SignedIn>
        </>
    );
}

export default Dashboard;
