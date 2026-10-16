exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Method not allowed.' }) };
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return { statusCode: 503, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Gemini API key is not configured.' }) };
  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON request.' }) }; }
  const level = ['foundation', 'standard', 'advanced'].includes(body.level) ? body.level : 'foundation';
  const question = typeof body.question === 'string' ? body.question.slice(0, 1200) : '';
  const problem = typeof body.problem === 'string' ? body.problem.slice(0, 1200) : '';
  if (!question.trim()) return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Please enter a question.' }) };
  const levelGuide = {
    foundation: 'Use simple words, short sentences, one small step at a time, and a direct hint before the full solution. Assume the learner is new to vectors.',
    standard: 'Use school-level mathematical notation, show the formula, and explain each calculation step clearly.',
    advanced: 'Use rigorous multi-step reasoning and connect the vector result to its real-world interpretation. Explain assumptions.'
  };
  const prompt = `You are VectorLearn AI, a supportive mathematics tutor teaching vectors. The learner selected the ${level.toUpperCase()} level. ${levelGuide[level]}\n\nCurrent verified practice problem: ${problem}\nLearner request: ${question}\n\nRules: Be concise and encouraging. Keep the numbers and problem facts unchanged. Check all arithmetic before responding. If asked for another question, give one appropriate question and do not reveal its answer unless asked. If asked for a hint, do not immediately give the complete solution. If asked for a solution, show the steps. If a question is unrelated to math learning, politely redirect to vectors. Do not claim calculations are verified externally.`;
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + encodeURIComponent(apiKey), {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.3, maxOutputTokens: 700 } })
    });
    const result = await response.json();
    if (!response.ok) return { statusCode: 502, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: result.error?.message || 'The AI provider returned an error.' }) };
    const answer = result.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('\n').trim();
    if (!answer) throw new Error('Empty AI response.');
    return { statusCode: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, body: JSON.stringify({ answer }) };
  } catch (err) {
    return { statusCode: 502, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Could not contact the AI provider. Please try again later.' }) };
  }
};
