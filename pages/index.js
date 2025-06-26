
import { useState } from 'react';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const askEthics = async () => {
    setLoading(true);
    setResponse('');

    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: question })
    });

    const data = await res.json();
    setResponse(data.reply || data.error || 'No response');
    setLoading(false);
  };

  return (
    <div className={darkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Aletheya</h1>
          <button className="text-sm px-3 py-1 border rounded" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        <p className="text-lg mb-4">Your AI-powered ethical decision-making guide</p>
        <textarea
          rows="5"
          placeholder="Describe your ethical dilemma..."
          className="w-full p-3 border rounded mb-4 text-black"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          onClick={askEthics}
          disabled={!question || loading}
          className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Thinking...' : 'Ask Aletheya'}
        </button>
        {response && (
          <div className="mt-6 border-t pt-4 whitespace-pre-wrap">{response}</div>
        )}
        <p className="text-center text-sm text-gray-400 mt-10">
          Built with ❤️ by Aletheya — a fusion of truth and wisdom.
        </p>
      </div>
    </div>
  );
}
