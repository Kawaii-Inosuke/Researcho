const PaperViewer = ({ paper, onBackToEditor, onSharePaper }) => {
    const handleExport = (format) => {
        console.log(`Exporting as ${format}...`);
        // TODO: Implement export functionality
    };

    return (
        <div className="ml-56 min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-12 py-5 flex items-center justify-between sticky top-0 z-10">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Final Paper</h1>
                    <p className="text-sm text-gray-500 mt-0.5">{paper.topic}.pdf</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Export Options */}
                    <span className="text-sm text-gray-600 mr-2">Export your paper in multiple formats</span>
                    <button
                        onClick={() => handleExport('PDF')}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors text-sm font-medium"
                    >
                        <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                        PDF
                    </button>
                    <button
                        onClick={() => handleExport('DOCX')}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors text-sm font-medium"
                    >
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                        </svg>
                        DOCX
                    </button>
                </div>
            </div>

            {/* Paper Content */}
            <div className="px-12 py-10">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-16">
                    {/* Paper Header */}
                    <div className="text-center mb-12 pb-8 border-b border-gray-200">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">{paper.topic}</h1>
                        <p className="text-sm text-gray-500 mb-6">Department of Computer Science, University of Technology</p>
                        <div className="flex justify-center gap-2 flex-wrap">
                            {(paper.keywords || '').split(',').map((keyword, i) => (
                                <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                                    {keyword.trim()}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Abstract */}
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-l-4 border-blue-600 pl-4">Abstract</h2>
                        <p className="text-gray-700 leading-relaxed text-justify">{paper.abstract || paper.sections?.abstract}</p>
                    </section>

                    {/* Introduction */}
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-l-4 border-blue-600 pl-4">Introduction</h2>
                        <p className="text-gray-700 leading-relaxed text-justify whitespace-pre-wrap">{paper.introduction || paper.sections?.introduction}</p>
                    </section>

                    {/* Methodology */}
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-l-4 border-blue-600 pl-4">Methodology</h2>
                        <p className="text-gray-700 leading-relaxed text-justify whitespace-pre-wrap">{paper.methodology || paper.sections?.methodology}</p>
                    </section>

                    {/* Results */}
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-l-4 border-blue-600 pl-4">Results</h2>
                        <p className="text-gray-700 leading-relaxed text-justify whitespace-pre-wrap">{paper.results || paper.sections?.results}</p>
                    </section>

                    {/* Conclusion */}
                    <section className="mb-10">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-l-4 border-blue-600 pl-4">Conclusion</h2>
                        <p className="text-gray-700 leading-relaxed text-justify whitespace-pre-wrap">{paper.conclusion || paper.sections?.conclusion}</p>
                    </section>

                    {/* References */}
                    {paper.citations && paper.citations.length > 0 && (
                        <section className="pt-6 border-t border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-l-4 border-blue-600 pl-4">References</h2>
                            <ol className="list-decimal pl-6 space-y-2">
                                {paper.citations.map((citation, i) => (
                                    <li key={i} className="text-gray-700 text-sm leading-relaxed">{citation}</li>
                                ))}
                            </ol>
                        </section>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="max-w-4xl mx-auto mt-8 flex items-center justify-between">
                    <button
                        onClick={onBackToEditor}
                        className="text-blue-600 hover:text-blue-700 flex items-center gap-2 transition-colors text-sm font-medium"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Editor
                    </button>
                    <button
                        onClick={onSharePaper}
                        className="text-blue-600 hover:text-blue-700 flex items-center gap-2 transition-colors text-sm font-medium"
                    >
                        Share Paper
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaperViewer;
