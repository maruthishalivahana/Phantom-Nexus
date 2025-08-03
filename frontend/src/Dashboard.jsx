

import { useEffect, useState, } from 'react';
import React from 'react';
// import { SignedIn, SignedOut, RedirectToSignIn, UserButton, useUser } from '@clerk/clerk-react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;


function Dashboard() {
    // const { user } = useUser();

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
        window.location.href = `${apiUrl}/auth/github`;
    };

    // const fetchRepos = async (token) => {
    //     try {
    //         const response = await fetch(`${apiUrl}/api/github/repos?token=${token}`);
    //         const data = await response.json();

    //         if (response.ok) {
    //             setRepos(data.repositories);
    //             sendToGeminiAPI({
    //                 username: data.username,
    //                 topLanguages: data.topLanguages,
    //                 repositories: data.repositories
    //             });
    //         } else {
    //             console.error('Failed to fetch repos');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };
    const fetchRepos = async (token) => {
        try {
            const response = await axios.get(`${apiUrl}/api/github/repos`, {
                params: { token }
            });

            const data = response.data;  // Axios auto parses JSON

            setRepos(data.repositories);

            sendToGeminiAPI({
                username: data.username,
                topLanguages: data.topLanguages,
                repositories: data.repositories
            });

        } catch (error) {
            console.error('Error fetching repos:', error.response?.data || error.message);
        }
    };


    const sendToGeminiAPI = async (githubData) => {
        setLoadingRoadmap(true);
        try {
            const response = await fetch(`${apiUrl}/api/gemini/roadmap`, {
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
            const response = await axios.post(`${apiUrl}/api/roadmapQuery`, {
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
    useEffect(() => {
        if (roadmap) {
            // Here is where the roadmap becomes a chat message
            setChatHistory([
                { role: 'assistant', text: roadmap }
            ]);
            setLoadingRoadmap(false);
        }
    }, [roadmap]);



    return (
        <>
            {/* <SignedOut>
                <RedirectToSignIn redirectUrl="/dashboard" />
            </SignedOut> */}

            {/* <SignedIn> */}
            <header className="w-full flex justify-between items-center px-8 py-6 shadow-sm bg-white sticky top-0 z-50">
                <h1 className="text-2xl font-bold">Phantom Nexus</h1>
                {/* <div className="flex items-center space-x-4">
                        {user && (
                            <div className="text-right">
                                <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                                <p className="text-xs text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
                            </div>
                        )}
                        <UserButton afterSignOutUrl="/" />
                    </div> */}
            </header>

            <div className="p-10 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    {connected ? `Welcome, ${username}` : 'Connect your GitHub'}
                </h1>

                {!connected && (
                    <div className="min-h-screen flex flex-col items-center px-6 py-10 font-sans relative overflow-hidden">
                        {/* <header className="w-full max-w-6xl flex justify-between items-center backdrop-blur-md bg-white/70 border border-white/30 rounded-3xl shadow-md py-4 px-6 mb-16 transition-all">
                            <h1 className="text-2xl font-extrabold text-violet-700">Phantom Nexus</h1>
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold shadow-inner cursor-pointer hover:scale-105 transition-transform">
                                JD
                            </div>
                        </header> */}

                        <main className="flex flex-col items-center text-center max-w-3xl z-10">
                            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-snug">
                                Supercharge Your Career Roadmap <br className="hidden sm:block" />
                                With GitHub Insights
                            </h2>
                            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                                Connect Your GitHub Account To Let Us Analyze Your Projects, Skills, And Contributions.
                                We’ll Craft A Personalized Career Roadmap That Aligns With Your Real Coding Experience.
                            </p>

                            <button className="mt-10 flex items-center px-8 py-4 rounded-full bg-black text-white font-semibold text-lg shadow-lg hover:bg-black-700 transition-all hover:scale-105 focus:ring-4 focus:ring-violet-400" onClick={connectGitHub}>
                                Connect GitHub
                            </button>
                        </main>

                        <div className="absolute w-72 h-72 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 top-10 left-10"></div>
                        <div className="absolute w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 bottom-10 right-10"></div>
                    </div>
                )}

                {connected && (
                    // This parent container is key: full height and flex-column layout
                    <div className="flex flex-col h-screen bg-gray-50">

                        {/* Chat History Area: Takes up all available space and becomes scrollable */}
                        <main className="flex-1 overflow-y-auto p-4 md:p-6">
                            <div className="max-w-4xl mx-auto space-y-8">
                                <h2 className="text-2xl font-bold text-center text-gray-800">Your AI Career Roadmap</h2>
                                <div className="space-y-6">
                                    {chatHistory.map((msg, idx) => (
                                        <div key={idx} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            {msg.role !== 'user' && (
                                                <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0">
                                                    AI
                                                </div>
                                            )}
                                            <div className={`px-5 py-3 rounded-2xl max-w-xl shadow-md whitespace-pre-wrap leading-relaxed
                                ${msg.role === 'user'
                                                    ? 'bg-violet-600 text-white rounded-br-none'
                                                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'}`
                                            }>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    {loadingRoadmap && (
                                        <div className="flex justify-center items-center p-4">
                                            <p className="text-gray-500 animate-pulse">Analyzing your GitHub data...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </main>

                        {/* Sticky Footer Input: Now with 'sticky' and 'bottom-0' */}
                        <footer className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
                            <div className="max-w-4xl mx-auto">
                                <form
                                    onSubmit={(e) => { e.preventDefault(); handleAskRoadmap(); }}
                                    className="flex items-center gap-3"
                                >
                                    <input
                                        type="text"
                                        value={userQuery}
                                        onChange={(e) => setUserQuery(e.target.value)}
                                        placeholder="Ask a follow-up question..."
                                        className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!userQuery || loadingRoadmap}
                                        className="w-12 h-12 flex items-center justify-center bg-violet-600 text-white font-semibold rounded-full hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-transform transform active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </footer>
                    </div>
                )}
            </div>
            {/* </SignedIn> */}
        </>
    );
}

export default Dashboard;
