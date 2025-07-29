// src/components/SignIn.jsx
import { auth, googleProvider, githubProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';

function SignIn() {
    const handleSignIn = async (provider) => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error('Error during sign in:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <button onClick={() => handleSignIn(googleProvider)} className="bg-blue-500 text-white px-6 py-3 rounded">Sign in with Google</button>
            <button onClick={() => handleSignIn(githubProvider)} className="bg-gray-800 text-white px-6 py-3 rounded">Sign in with GitHub</button>
        </div>
    );
}

export default SignIn;
