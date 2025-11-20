import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [loading, setLoading] = useState(false);
  const [paper, setPaper] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!topic.trim() || !keywords.trim()) {
      setError('Please fill in both topic and keywords');
      return;
    }

    setLoading(true);
    setError('');
    setPaper(null);

    try {
      const response = await axios.post('http://localhost:5000/api/paper/generate', {
        topic: topic.trim(),
        keywords: keywords.trim()
      });

      if (response.data.success) {
        setPaper(response.data.paper);
      } else {
        setError('Failed to generate paper');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to connect to server');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="background-gradient"></div>

      <div className="container">
        <header className="header">
          <h1 className="title">
            <span className="title-icon">📄</span>
            IEEE Paper Writer
          </h1>
          <p className="subtitle">AI-Powered Research Paper Generator</p>
        </header>

        <div className="content">
          {!paper ? (
            <form className="input-form glass" onSubmit={handleGenerate}>
              <div className="form-group">
                <label htmlFor="topic">Research Topic</label>
                <input
                  id="topic"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., AI in Healthcare"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="keywords">Keywords</label>
                <input
                  id="keywords"
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="e.g., deep learning, medical imaging"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="error-message">
                  <span>⚠️</span> {error}
                </div>
              )}

              <button
                type="submit"
                className="generate-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Generating Paper...
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    Generate Paper
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="results">
              <div className="paper-display glass">
                <div className="paper-header">
                  <h2>{paper.topic}</h2>
                  <p className="keywords-display">
                    <strong>Keywords:</strong> {paper.keywords}
                  </p>
                </div>

                <div className="paper-content">
                  {paper.finalPaper && paper.finalPaper !== "No content generated" ? (
                    <pre className="paper-text">{paper.finalPaper}</pre>
                  ) : (
                    <div className="no-content">
                      <p>⚠️ Paper generation incomplete</p>
                      <p className="hint">The backend may need API key configuration</p>
                    </div>
                  )}
                </div>

                {paper.citations && paper.citations.length > 0 && (
                  <div className="citations">
                    <h3>References</h3>
                    <ol>
                      {paper.citations.map((citation, index) => (
                        <li key={index}>{citation.replace(/^\[\d+\]\s*/, '')}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              <button
                className="new-paper-btn"
                onClick={() => {
                  setPaper(null);
                  setTopic('');
                  setKeywords('');
                }}
              >
                <span>➕</span>
                Generate New Paper
              </button>
            </div>
          )}
        </div>

        <footer className="footer">
          <p>Powered by Gemini AI & Semantic Scholar</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
