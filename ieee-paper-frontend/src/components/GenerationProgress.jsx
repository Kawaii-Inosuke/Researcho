const GenerationProgress = ({
    step,
    progress,
    onRegenerate,
    onSaveDraft,
    onNextStep,
    onViewFullPaper,
    isLastStep,
    paper,
    loading
}) => {
    // Show skeleton loaders if we don't have paper data yet or still loading
    const showSkeletonLoaders = !paper || (loading && !paper);

    return (
        <div className="ml-56 min-h-screen bg-gray-50 px-12 py-8">
            <div className="max-w-5xl mx-auto">
                {/* Header with Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold text-gray-900">{step.name}</h1>
                        <span className="text-sm font-medium text-blue-600">{progress}% Complete</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 mb-6">
                    {showSkeletonLoaders ? (
                        // Skeleton Loaders
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div className="h-3 bg-gray-100 rounded w-full animate-pulse"></div>
                                <div className="h-3 bg-gray-100 rounded w-11/12 animate-pulse"></div>
                                <div className="h-3 bg-gray-100 rounded w-10/12 animate-pulse"></div>
                                <div className="h-3 bg-gray-100 rounded w-full animate-pulse"></div>
                                <div className="h-3 bg-gray-100 rounded w-9/12 animate-pulse"></div>
                            </div>

                            <div className="py-3"></div>

                            <div className="space-y-4">
                                <div className="h-3 bg-gray-100 rounded w-full animate-pulse"></div>
                                <div className="h-3 bg-gray-100 rounded w-10/12 animate-pulse"></div>
                                <div className="h-3 bg-gray-100 rounded w-11/12 animate-pulse"></div>
                                <div className="h-3 bg-gray-100 rounded w-8/12 animate-pulse"></div>
                            </div>

                            <div className="py-3"></div>

                            <div className="space-y-4">
                                <div className="h-3 bg-gray-100 rounded w-10/12 animate-pulse"></div>
                                <div className="h-3 bg-gray-100 rounded w-full animate-pulse"></div>
                                <div className="h-3 bg-gray-100 rounded w-9/12 animate-pulse"></div>
                            </div>

                            <p className="text-center text-gray-400 mt-10 text-sm italic">
                                {loading ? 'Generating your paper... This may take a few minutes.' : `AI-generated content for ${step.name.toLowerCase()} will appear here...`}
                            </p>
                        </div>
                    ) : (
                        // Actual Paper Content (at step 5)
                        <div className="space-y-8">
                            {/* Paper Title */}
                            <div className="text-center pb-6 border-b border-gray-200">
                                <h2 className="text-3xl font-bold text-gray-900 mb-3">{paper.topic}</h2>
                                {paper.keywords && (
                                    <div className="flex justify-center gap-2 flex-wrap mt-4">
                                        {paper.keywords.split(',').map((keyword, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                                                {keyword.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Abstract */}
                            {(paper.abstract || paper.sections?.abstract) && (
                                <section>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">Abstract</h3>
                                    <p className="text-gray-700 leading-relaxed text-justify line-clamp-4">
                                        {paper.abstract || paper.sections?.abstract}
                                    </p>
                                </section>
                            )}

                            {/* Introduction */}
                            {(paper.introduction || paper.sections?.introduction) && (
                                <section>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-blue-600 pl-3">Introduction</h3>
                                    <p className="text-gray-700 leading-relaxed text-justify line-clamp-4">
                                        {paper.introduction || paper.sections?.introduction}
                                    </p>
                                </section>
                            )}

                            <div className="text-center pt-4">
                                <p className="text-gray-500 text-sm italic">Preview of your generated paper</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                        <button
                            onClick={onRegenerate}
                            className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors text-sm font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Regenerate
                        </button>
                        <button
                            onClick={onSaveDraft}
                            className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors text-sm font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                            Save Draft
                        </button>
                    </div>

                    {isLastStep && paper ? (
                        <button
                            onClick={onViewFullPaper}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors text-sm font-semibold shadow-sm"
                        >
                            View Final Paper
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    ) : (
                        <button
                            onClick={onNextStep}
                            disabled={isLastStep}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors text-sm font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next Step
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        ← Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GenerationProgress;
