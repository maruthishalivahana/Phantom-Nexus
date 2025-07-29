// // src/components/SignOut.jsx
// import { useAuth } from './src/contexts/AuthContext';
// import { signOut as firebaseSignOut } from 'firebase/auth';
// import { auth } from './src/firebase';

// function SignOut() {
//     const { user } = useAuth();

//     const handleSignOut = async () => {
//         await firebaseSignOut(auth);
//     };

//     if (!user) return null;

//     return (
//         <button onClick={handleSignOut} className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded">
//             Sign Out
//         </button>
//     );
// }

// export default SignOut;
