const Sidebar = ({ currentStep, steps }) => {
    return (
        <div className="w-56 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 py-8 px-6">
            {/* Header */}
            <div className="mb-10">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-sm font-semibold text-gray-900">Generating Paper</h2>
                <p className="text-xs text-gray-500 mt-1">Step {currentStep} of {steps.length}</p>
            </div>

            {/* Steps List */}
            <nav className="space-y-1">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber === currentStep;
                    const isCompleted = stepNumber < currentStep;

                    return (
                        <div
                            key={step.id}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive
                                    ? 'bg-blue-50'
                                    : ''
                                }`}
                        >
                            {/* Step Number/Checkmark */}
                            <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${isActive
                                        ? 'bg-blue-600 text-white'
                                        : isCompleted
                                            ? 'bg-blue-100 text-blue-600'
                                            : 'bg-gray-100 text-gray-400'
                                    }`}
                            >
                                {isCompleted ? (
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    stepNumber
                                )}
                            </div>

                            {/* Step Name */}
                            <span className={`text-sm font-medium ${isActive
                                    ? 'text-blue-600'
                                    : isCompleted
                                        ? 'text-gray-700'
                                        : 'text-gray-400'
                                }`}>
                                {step.name}
                            </span>

                            {/* Chevron for active */}
                            {stepNumber < steps.length && (
                                <svg
                                    className={`w-3.5 h-3.5 ml-auto ${isActive ? 'text-blue-600' : 'text-gray-300'}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            )}
                        </div>
                    );
                })}
            </nav>
        </div>
    );
};

export default Sidebar;
