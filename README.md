# Phantom Nexus 🚀

**Phantom Nexus** is an AI-powered Career Roadmap Generator that analyzes your **GitHub repositories** to build a personalized career development plan. It leverages **Gemini API (Google Generative AI)** to provide intelligent skill recommendations and interactively answer your career-related questions based on your actual coding work.

## ✨ Features
- 🔗 **GitHub Connect:** Analyze user's GitHub repositories and extract skills.
- 🧠 **AI Career Roadmap Generator:** Personalized roadmap suggestions based on real projects.
- 💬 **Interactive Q&A Chat:** Ask AI questions about your roadmap for detailed guidance.
- 🔒 **Clerk Authentication:** Secure sign-in with Clerk and GitHub OAuth flow.

## 🛠 Tech Stack
| Frontend             | Backend              | AI Integration             | Authentication           |
|----------------------|---------------------|----------------------------|--------------------------|
| React.js (Vite)       | Node.js + Express.js| Gemini API (Google AI)      | Clerk Authentication     |
| TailwindCSS           | Axios API Calls     | Contextual Roadmap Replies  | GitHub OAuth Integration |

## 📦 Project Structure
/client → React Frontend
/server → Express Backend API
/routes → API Routes (GitHub, Gemini)
.env → Environment Variables (API Keys)
README.md → Project Documentation

markdown
Copy
Edit

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Gemini API Key
- Clerk API Key & GitHub OAuth App setup

### Clone the Repository
```bash
git clone https://github.com/maruthishalivahana/Phantom-Nexus.git
cd Phantom-Nexus
Setup Frontend
bash
Copy
Edit
cd client
npm install
npm run dev  # Starts frontend at http://localhost:5173
Setup Backend
bash
Copy
Edit
cd server
npm install
npm run dev  # Starts backend at http://localhost:5000
Environment Variables (.env)
env
Copy
Edit
GEMINI_API_KEY=your_gemini_api_key
CLERK_API_KEY=your_clerk_api_key
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
⚡ How it Works
User Authenticates using Clerk + GitHub OAuth.

Fetch GitHub Repositories & Analyze Dominant Skills.

Gemini API generates a Career Roadmap using repository data.

User can interactively ask AI about career guidance, roadmap details, or suggestions.

📸 Screenshots
Add screenshots here showcasing GitHub Connect, Roadmap Display, and AI Chat Interface.

🤝 Contributors
Maruthi Shalivahana
Shiva Kumar Jatla

🌟 Future Enhancements
Skill Gap Analysis with Course Recommendations.

Export Roadmap as PDF.

AI Interview Q&A based on User's GitHub Profile.

Custom AI Tips based on Trending Tech Skills.
