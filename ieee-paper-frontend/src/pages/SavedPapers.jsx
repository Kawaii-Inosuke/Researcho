import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

const SavedPapers = () => {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const user = auth.currentUser;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPapers = async () => {
            if (!user) return;
            try {
                const response = await fetch(`http://localhost:5000/api/paper/papers?userId=${user.uid}`);
                const data = await response.json();
                if (data.papers) {
                    setPapers(data.papers);
                } else {
                    setError(data.error || 'Failed to fetch papers');
                }
            } catch (err) {
                setError('Error fetching papers: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPapers();
    }, [user]);

    const handleViewPaper = (paperId) => {
        navigate(`/paper/${paperId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Saved Papers</h1>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>
                ) : papers.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-500 text-lg mb-4">No saved papers yet.</p>
                        <Link
                            to="/app"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Create your first paper
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {papers.map((paper) => (
                            <div key={paper.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 flex flex-col">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                                    {paper.topic}
                                </h3>
                                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                                    <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
                                        IEEE Format
                                    </span>
                                    {/* Future: Link to view paper */}
                                    <button
                                        onClick={() => handleViewPaper(paper.id)}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        View Paper
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedPapers;
