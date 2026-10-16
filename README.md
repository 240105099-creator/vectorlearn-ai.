# VectorLearn AI — Web-Based AI Math Differentiator

A responsive learning website that adapts vector practice to three levels: Foundation, Standard, and Advanced. It includes immediate answer feedback, built-in hints and worked solutions, plus optional AI tutoring through Gemini API.

## Features
- Three differentiated learning levels with different problems and scaffolding.
- Answer checker for vector components and resultant magnitude.
- Built-in hints and step-by-step solutions that work even without an API key.
- AI tutor prompts tailored to the selected level.
- Responsive layout for desktop and mobile.
- API key is stored as a Netlify environment variable, not in browser JavaScript.

## Tech stack
- HTML, CSS, vanilla JavaScript
- Netlify Functions (serverless backend)
- Gemini API (`gemini-2.5-flash`)

## Run locally
The static page can be opened directly, but the AI endpoint needs Netlify Functions. For full local testing:

1. Install Node.js (LTS).
2. Install the Netlify CLI: `npm install -g netlify-cli`
3. From this project folder, run: `netlify dev`
4. Add a Gemini API key to a local `.env` file:
   ```env
   GEMINI_API_KEY=your_key_here
   ```
5. Open the local URL shown by Netlify CLI.

Do not commit `.env` or publish your API key. Add `.env` to `.gitignore` before using a repository.

## Deploy to Netlify
1. Create a GitHub repository and upload all project files, keeping `netlify.toml` and the `netlify/functions/ai-tutor.js` path intact.
2. In Netlify, choose **Add new site → Import an existing project** and connect the repository.
3. Netlify reads `netlify.toml`; the publish directory is `.` and functions directory is `netlify/functions`.
4. In Netlify site settings, add an environment variable named `GEMINI_API_KEY` with your own Gemini API key. Never put the key in `script.js` or `index.html`.
5. Trigger a deploy. Open the deployed URL and test all three levels, answer checking, hints, solutions, and the AI tutor.

## Publish to GitHub
1. Create a **public** repository, for example `vectorlearn-ai`.
2. Upload `index.html`, `styles.css`, `script.js`, `netlify.toml`, `README.md`, `REPORT.md`, and `netlify/functions/ai-tutor.js`.
3. Do not upload API keys. Add a `.gitignore` containing `.env` and `node_modules/`.
4. Share both the repository URL and the live Netlify URL for submission.

## Mathematical answer checking
- Foundation: `a=(2,1)`, `b=(3,4)`, so `a+b=(5,5)`.
- Standard: `u=(-2,5)`, `v=(6,-1)`, so `u+v=(4,4)` and `|u+v|=sqrt(4²+4²)=sqrt(32)=4sqrt(2)≈5.66`.
- Advanced: `d1=(-3,4) km`, `d2=(7,2) km`, so net displacement is `(4,6) km` and distance is `sqrt(4²+6²)=sqrt(52)=2sqrt(13)≈7.21 km`.

The checker accepts decimal magnitudes within 0.03 of the expected value. The built-in hints and solutions are deterministic. AI-generated explanations can make mistakes, so learners should compare them with the worked solution.

## Important notes
- A Gemini API key is required for live AI responses. Without it, the core learning activities still work.
- The included site is a project starter intended for review and customization. Test it after deployment and confirm your instructor's preferred submission format.
