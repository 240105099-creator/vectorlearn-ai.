# Brief Report: VectorLearn AI — AI for Differentiated Learning

## Project purpose
VectorLearn AI is a web-based mathematics learning tool focused on vectors. It takes the same core concept—vector components and resultant vectors—and offers three difficulty levels so learners can practice with an appropriate amount of support.

## Differentiation design
**Foundation** uses small positive integer components, direct language, a short task, and a component-by-component hint. The learner finds the sum of (2, 1) and (3, 4). **Standard** introduces negative components and magnitude, requiring the learner to add vectors and apply the Pythagorean formula. **Advanced** frames vector addition as a drone displacement problem, asking the learner to calculate and interpret a net displacement and its distance from the starting point. Each level has a distinct prompt, context, hint, and worked solution. Learners can switch levels at any time.

## AI prompts and integration
The server-side AI prompt identifies the learner's selected level and provides a level-specific instruction: use simple words and one step at a time for Foundation; use standard notation and explain formulas for Standard; and provide multi-step reasoning and real-world interpretation for Advanced. The prompt includes the current problem and learner's question, asks the model to preserve given numbers, check arithmetic, and respond appropriately to requests for hints, full solutions, or new questions. Gemini is called through a Netlify serverless function. The API key is stored in a Netlify environment variable rather than in client-side code.

Example system-style instruction: “You are VectorLearn AI, a supportive mathematics tutor teaching vectors. The learner selected the FOUNDATION level. Use simple words, short sentences, one small step at a time, and a direct hint before the full solution. Keep the numbers and problem facts unchanged. Check all arithmetic before responding.”

## Feedback and mathematical verification
The page checks learner input immediately and provides positive feedback or a targeted retry message. Built-in hints and worked solutions are deterministic and available even if the AI service is not configured. The three checked results are: (2, 1) + (3, 4) = (5, 5); (−2, 5) + (6, −1) = (4, 4), with magnitude √32 ≈ 5.66; and (−3, 4) + (7, 2) = (4, 6), with magnitude √52 ≈ 7.21 km. Magnitudes are checked with a small decimal tolerance. Since generative AI may still produce errors, the site advises learners to compare AI explanations with the built-in worked solutions.

## Technology and deployment
The project uses HTML, CSS, and vanilla JavaScript for a responsive interface, Gemini API for AI explanations, and Netlify Functions to protect the API key. It is intended to be published through a public GitHub repository and deployed on Netlify. The live AI feature requires the site owner to configure `GEMINI_API_KEY` in Netlify.
