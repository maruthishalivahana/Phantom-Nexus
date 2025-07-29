



const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// GitHub OAuth Flow
app.get('/auth/github', (req, res) => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo user`;
    res.redirect(githubAuthUrl);
});

// GitHub OAuth Callback
app.get('/auth/github/callback', async (req, res) => {
    const code = req.query.code;
    if (!code) return res.status(400).send('Authorization code not found.');

    try {
        const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code
        }, { headers: { Accept: 'application/json' } });

        const accessToken = tokenResponse.data.access_token;
        if (!accessToken) return res.status(400).send('Access token not found.');

        const userResponse = await axios.get('https://api.github.com/user', {
            headers: { Authorization: `token ${accessToken}` }
        });

        const username = userResponse.data.login;
        res.redirect(`http://localhost:5173/dashboard?username=${username}&token=${accessToken}`);
    } catch (err) {
        console.error('OAuth Error:', err.response?.data || err.message);
        res.status(500).send('OAuth Process Failed');
    }
});

// Fetch GitHub Repositories
app.get('/api/github/repos', async (req, res) => {
    const accessToken = req.query.token;
    if (!accessToken) return res.status(401).send('GitHub token missing.');

    try {
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: { Authorization: `token ${accessToken}` }
        });

        const reposResponse = await axios.get('https://api.github.com/user/repos?per_page=100', {
            headers: { Authorization: `token ${accessToken}` }
        });

        const repos = await Promise.all(reposResponse.data.map(async (repo) => {
            const langResponse = await axios.get(repo.languages_url, {
                headers: { Authorization: `token ${accessToken}` }
            });

            let readmeContent = 'README not found.';
            try {
                const readmeResponse = await axios.get(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`, {
                    headers: {
                        Authorization: `token ${accessToken}`,
                        Accept: 'application/vnd.github.v3.raw'
                    }
                });
                readmeContent = readmeResponse.data;
            } catch {
                // Ignore if README not found
            }

            return {
                id: repo.id,
                name: repo.name,
                description: repo.description || 'No Description',
                languages: Object.keys(langResponse.data),
                readme: readmeContent.substring(0, 300) + '...'
            };
        }));

        res.json({
            username: userResponse.data.login,
            repositories: repos,
            topLanguages: extractTopLanguages(repos)
        });
    } catch (error) {
        console.error('Fetching Repos Error:', error.response?.data || error.message);
        res.status(500).send('Error fetching repositories');
    }
});

// Gemini Roadmap API
app.post('/api/gemini/roadmap', async (req, res) => {
    const { username, repositories, topLanguages } = req.body;

    if (!repositories || repositories.length === 0) {
        return res.status(400).json({ error: 'No repositories provided.' });
    }

    const prompt = `
You are an expert Career Roadmap Advisor.
GitHub Profile:
- Username: ${username}
- Top Languages: ${topLanguages.join(', ')}

Repositories:
${repositories.map(repo => `
• ${repo.name}
  - Languages: ${repo.languages.join(', ') || 'No languages'}
  - Description: ${repo.description}
  - README Preview: ${repo.readme}
`).join('\n')}

Based on this data:
1. Highlight strong technical areas.
2. Recommend 3 next skills.
3. Suggest potential career paths.
4. Provide 2-3 upskilling resources.
`;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
            { contents: [{ parts: [{ text: prompt }] }] }
        );

        if (!response.data.candidates || !response.data.candidates[0]) {
            return res.status(500).json({ error: 'Gemini API returned no candidates' });
        }

        const roadmap = response.data.candidates[0].content.parts[0].text;
        res.json({ roadmap });
    } catch (error) {
        console.error('Gemini API Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch roadmap from Gemini', details: error.response?.data || error.message });
    }
});

// Helper to Extract Top Languages
function extractTopLanguages(repos) {
    const langCount = {};
    repos.forEach(repo => {
        repo.languages.forEach(lang => {
            langCount[lang] = (langCount[lang] || 0) + 1;
        });
    });
    return Object.entries(langCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([lang]) => lang);
}

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
