import { useState } from 'react'
import HomePage from './components/HomePage'

import axios from 'axios'
import Sidebar from './components/Sidebar'
import GenerationProgress from './components/GenerationProgress'
import PaperViewer from './components/PaperViewer'

const STEPS = [
    { id: 'draft', name: 'Draft', number: 1 },
    { id: 'research', name: 'Research', number: 2 },
    { id: 'citations', name: 'Citations', number: 3 },
    { id: 'formatting', name: 'Formatting', number: 4 },
    { id: 'final', name: 'Final Paper', number: 5 },
];

function App() {
    const [view, setView] = useState('home') // 'home', 'generating', 'viewing'
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [paper, setPaper] = useState(null)
    const [generationData, setGenerationData] = useState(null)

    const handleStartGeneration = async (data) => {
        setGenerationData(data)
        setView('generating')
        setCurrentStep(1)
        setLoading(true)
        setError(null)
        setPaper(null)

        try {
            // Simulate step progression (steps 1-4)
            for (let step = 1; step <= 4; step++) {
                setCurrentStep(step)
                await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate work
            }

            // Step 5: Make actual API call
            setCurrentStep(5)
            const response = await axios.post('http://localhost:5000/api/paper/generate', data)
            setPaper(response.data.paper)
            // Stay in 'generating' view to show the paper in GenerationProgress
        } catch (err) {
            console.error('Generation error:', err)
            setError(err.message || 'Failed to generate paper')
            setView('home')
        } finally {
            setLoading(false)
        }
    }

    const handleRegenerate = () => {
        if (generationData) {
            handleStartGeneration(generationData)
        }
    }

    const handleSaveDraft = () => {
        console.log('Saving draft...')
        // TODO: Implement save draft
    }

    const handleNextStep = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleViewFullPaper = () => {
        setView('viewing')
    }

    const handleBackToHome = () => {
        setView('home')
        setCurrentStep(1)
        setPaper(null)
        setGenerationData(null)
    }

    const handleBackToEditor = () => {
        setView('generating')
        setCurrentStep(5)
    }

    const handleSharePaper = () => {
        console.log('Sharing paper...')
        // TODO: Implement share functionality
    }



    // Home view
    if (view === 'home') {
        return (
            <>
                {error && (
                    <div className="fixed top-4 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50">
                        {error}
                        <button onClick={() => setError(null)} className="ml-4 font-bold">×</button>
                    </div>
                )}
                <HomePage onStartGeneration={handleStartGeneration} />
            </>
        )
    }

    // Generation progress view
    if (view === 'generating') {
        const currentStepData = STEPS[currentStep - 1]
        const progress = Math.round((currentStep / 5) * 100)

        return (
            <>
                <Sidebar currentStep={currentStep} steps={STEPS} />
                <GenerationProgress
                    step={currentStepData}
                    progress={progress}
                    onRegenerate={handleRegenerate}
                    onSaveDraft={handleSaveDraft}
                    onNextStep={handleNextStep}
                    onViewFullPaper={handleViewFullPaper}
                    isLastStep={currentStep === 5}
                    paper={paper}
                    loading={loading}
                />
            </>
        )
    }

    // Paper viewing
    if (view === 'viewing' && paper) {
        return (
            <>
                <Sidebar currentStep={5} steps={STEPS} />
                <PaperViewer
                    paper={paper}
                    onBackToEditor={handleBackToEditor}
                    onSharePaper={handleSharePaper}
                />
            </>
        )
    }

    return null
}

export default App
