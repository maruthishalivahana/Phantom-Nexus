// import { useEffect, useState } from 'react';
// import React from 'react';
// import { SignedIn, SignedOut, RedirectToSignIn, UserButton, useUser } from '@clerk/clerk-react';

// function Dashboard() {
//     const { user } = useUser();  // <-- Get Clerk User Info

//     const [repos, setRepos] = useState([]);
//     const [connected, setConnected] = useState(false);
//     const [username, setUsername] = useState('');
//     const [roadmap, setRoadmap] = useState('');
//     const [loadingRoadmap, setLoadingRoadmap] = useState(false);

//     useEffect(() => {
//         const urlParams = new URLSearchParams(window.location.search);
//         const githubUser = urlParams.get('username');
//         const githubToken = urlParams.get('token');

//         if (githubUser && githubToken) {
//             setConnected(true);
//             setUsername(githubUser);
//             fetchRepos(githubToken);
//         }
//     }, []);

//     const connectGitHub = () => {
//         window.location.href = 'http://localhost:5000/auth/github';
//     };

//     const fetchRepos = async (token) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/github/repos?token=${token}`);
//             const data = await response.json();

//             if (response.ok) {
//                 setRepos(data.repositories);
//                 sendToGeminiAPI({
//                     username: data.username,
//                     topLanguages: data.topLanguages,
//                     repositories: data.repositories
//                 });
//             } else {
//                 console.error('Failed to fetch repos');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const sendToGeminiAPI = async (githubData) => {
//         setLoadingRoadmap(true);
//         try {
//             const response = await fetch('http://localhost:5000/api/gemini/roadmap', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(githubData)
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setRoadmap(data.roadmap);
//             } else {
//                 console.error('Gemini API Error:', data.error);
//                 setRoadmap('Failed to generate roadmap. Please try again later.');
//             }
//         } catch (err) {
//             console.error('Fetch Error:', err);
//             setRoadmap('Something went wrong while communicating with the server.');
//         } finally {
//             setLoadingRoadmap(false);
//         }
//     };

//     return (
//         <>
//             <SignedOut>
//                 <RedirectToSignIn redirectUrl="/dashboard" />
//             </SignedOut>

//             <SignedIn>
//                 <header className="w-full flex justify-between items-center px-8 py-6 shadow-sm bg-white sticky top-0 z-50">
//                     <h1 className="text-2xl font-bold">Phantom Nexus</h1>
//                     <div className="flex items-center space-x-4">
//                         {user && (
//                             <div className="text-right">
//                                 <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
//                                 <p className="text-xs text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
//                             </div>
//                         )}
//                         <UserButton afterSignOutUrl="/" />
//                     </div>
//                 </header>

//                 <div className="p-10 max-w-4xl mx-auto">
//                     <h1 className="text-3xl font-bold mb-6 text-center">
//                         {connected ? `Welcome, ${username}` : 'Connect your GitHub'}
//                     </h1>

//                     {!connected && (

//                         <>


//                             <div className="min-h-screen flex flex-col items-center px-6 py-10 font-sans relative overflow-hidden">
//                                 <header className="w-full max-w-6xl flex justify-between items-center backdrop-blur-md bg-white/70 border border-white/30 rounded-3xl shadow-md py-4 px-6 mb-16 transition-all">
//                                     <h1 className="text-2xl font-extrabold text-violet-700">Phantom Nexus</h1>
//                                     <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold shadow-inner cursor-pointer hover:scale-105 transition-transform">
//                                         JD
//                                     </div>
//                                 </header>

//                                 <main className="flex flex-col items-center text-center max-w-3xl z-10">
//                                     <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-snug">
//                                         Supercharge Your Career Roadmap <br className="hidden sm:block" />
//                                         With GitHub Insights
//                                     </h2>
//                                     <p className="mt-6 text-lg text-gray-600 leading-relaxed">
//                                         Connect Your GitHub Account To Let Us Analyze Your Projects, Skills, And Contributions.
//                                         We’ll Craft A Personalized Career Roadmap That Aligns With Your Real Coding Experience.
//                                     </p>

//                                     <button className="mt-10 flex items-center px-8 py-4 rounded-full bg-violet-600 text-white font-semibold text-lg shadow-lg hover:bg-violet-700 transition-all hover:scale-105 focus:ring-4 focus:ring-violet-400" onClick={connectGitHub}>
//                                         <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                                             <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.4 5.4 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 3c0 0-1.04-.35-3.47 1.34A12.78 12.78 0 0 0 12 2.5a12.78 12.78 0 0 0-6.47 1.84C3.13 2.65 2.09 3 2.09 3A5.07 5.07 0 0 0 2 4.77a5.4 5.4 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
//                                         </svg>
//                                         Connect GitHub
//                                     </button>
//                                 </main>

//                                 <div className="absolute w-72 h-72 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 top-10 left-10"></div>
//                                 <div className="absolute w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 bottom-10 right-10"></div>
//                             </div>

//                         </>
//                     )}

//                     {connected && (
//                         <div className="mt-10">
//                             <h2 className="text-2xl font-bold mb-6 text-center text-violet-700">Your AI Career Roadmap</h2>

//                             <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
//                                 {loadingRoadmap ? (
//                                     <div className="flex justify-center items-center">
//                                         <p className="text-gray-500 animate-pulse">Analyzing your GitHub data...</p>
//                                     </div>
//                                 ) : (
//                                     roadmap && (
//                                         <div className="space-y-4">
//                                             {/* ChatGPT-style Roadmap Output */}
//                                             <div className="bg-gray-100 p-4 rounded-xl text-gray-800 whitespace-pre-wrap leading-relaxed">
//                                                 {roadmap}
//                                             </div>

//                                             {/* ChatGPT-like Input & Buttons */}
//                                             <div className="flex flex-col md:flex-row items-center gap-4">
//                                                 <input
//                                                     type="text"
//                                                     placeholder="Ask more about your roadmap..."
//                                                     className="flex-1 px-5 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
//                                                 />

//                                                 <button className="px-6 py-3 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition">
//                                                     LinkedIn Resume
//                                                 </button>

//                                                 <button className="px-6 py-3 border border-violet-600 text-violet-600 rounded-full hover:bg-violet-50 transition">
//                                                     Upload Resume
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     )
//                                 )}
//                             </div>
//                         </div>

//                     )}
//                 </div>
//             </SignedIn>
//         </>
//     );
// }

// export default Dashboard;


import { useEffect, useState, useRef } from 'react';
import React from 'react';
import { SignedIn, SignedOut, RedirectToSignIn, UserButton, useUser } from '@clerk/clerk-react';

function Dashboard() {
    const { user } = useUser();

    const [repos, setRepos] = useState([]);
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('');
    const [roadmap, setRoadmap] = useState('');
    const [loadingRoadmap, setLoadingRoadmap] = useState(false);

    const [showLinkedinInput, setShowLinkedinInput] = useState(false);
    const [linkedinURL, setLinkedinURL] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const fileInputRef = useRef(null);

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

    const handleLinkedInClick = () => {
        setShowLinkedinInput(true);
    };

    const handleLinkedinSubmit = () => {
        if (linkedinURL.startsWith('https://www.linkedin.com/')) {
            alert(`LinkedIn URL Saved: ${linkedinURL}`);
            setShowLinkedinInput(false);
        } else {
            alert('Please enter a valid LinkedIn URL');
        }
    };

    const triggerResumeUpload = () => {
        fileInputRef.current.click();
    };

    const handleResumeUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await fetch('http://localhost:5000/api/upload-resume', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setRoadmap(data.roadmap);
            } else {
                console.error('Failed to generate roadmap from resume');
            }
        } catch (err) {
            console.error('Error uploading resume:', err);
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

                            <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
                                {loadingRoadmap ? (
                                    <div className="flex justify-center items-center">
                                        <p className="text-gray-500 animate-pulse">Analyzing your GitHub data...</p>
                                    </div>
                                ) : (
                                    roadmap && (
                                        <div className="overflow-x-auto">
                                            <div className="inline-flex space-x-4 min-w-max">
                                                <div className="bg-gray-100 p-4 rounded-xl text-gray-800 whitespace-pre-wrap leading-relaxed shadow-sm">
                                                    {roadmap}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <input
                                    type="text"
                                    placeholder="Ask about your roadmap..."
                                    className="flex-1 px-5 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
                                />

                                {/* <button
                                    onClick={handleLinkedInClick}
                                    className="px-6 py-3 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition"
                                >
                                    LinkedIn Resume
                                </button> */}

                                <button
                                    onClick={triggerResumeUpload}
                                    className="px-6 py-3 border border-violet-600 text-violet-600 rounded-full hover:bg-violet-50 transition"
                                >
                                    Upload Resume
                                </button>

                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleResumeUpload}
                                    className="hidden"
                                    id="resume-upload"
                                />
                            </div>

                            {showLinkedinInput && (
                                <div className="flex items-center gap-4 mt-4">
                                    <input
                                        type="text"
                                        value={linkedinURL}
                                        onChange={(e) => setLinkedinURL(e.target.value)}
                                        placeholder="Paste your LinkedIn Profile URL"
                                        className="flex-1 px-5 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
                                    />
                                    <button
                                        onClick={handleLinkedinSubmit}
                                        className="px-6 py-3 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition"
                                    >
                                        Save
                                    </button>
                                </div>
                            )}

                            {resumeFile && (
                                <div className="text-center text-sm text-gray-500">
                                    Uploaded Resume: {resumeFile.name}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </SignedIn>
        </>
    );
}

export default Dashboard;
