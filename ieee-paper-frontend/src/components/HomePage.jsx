import { useState } from 'react';

const HomePage = ({ onStartGeneration }) => {
    const [topic, setTopic] = useState('');
    const [keywords, setKeywords] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!topic.trim() || !keywords.trim()) {
            setError('Please fill in both topic and keywords');
            return;
        }

        onStartGeneration({ topic: topic.trim(), keywords: keywords.trim() });
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="max-w-3xl w-full text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold tracking-wide rounded-full mb-8">
                    Powered by Advanced AI
                </div>

                {/* Main Heading */}
                <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Generate Complete{' '}
                    <span className="text-blue-600">IEEE Research Papers</span>{' '}
                    with AI
                </h1>

                {/* Subtitle */}
                <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Transform your research ideas into professionally formatted IEEE papers instantly.
                    From drafting to citations, we handle it all.
                </p>

                {/* Input Container */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Research Topic */}
                        <div className="text-left">
                            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                                Research Topic
                            </label>
                            <input
                                id="topic"
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g., Machine Learning in Healthcare"
                                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                            />
                        </div>

                        {/* Keywords */}
                        <div className="text-left">
                            <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-2">
                                Keywords
                            </label>
                            <input
                                id="keywords"
                                type="text"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                                placeholder="e.g., AI, neural networks, data science"
                                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Generate Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                        >
                            Generate Paper
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

