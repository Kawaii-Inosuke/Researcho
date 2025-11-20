import { GoogleGenerativeAI } from "@google/generative-ai";

export const formattingAgent = async (state) => {
    const { abstract, introduction, methodology, results, conclusion } = state;

    // Skip if no content was generated
    if (!abstract && !introduction && !methodology && !results && !conclusion) {
        console.log("Formatting Agent - No content to format, skipping");
        return { ...state, formattedText: "" };
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Improve the following IEEE-style research paper sections. Make the tone formal, clear, and academically precise. Maintain the section structure.

ABSTRACT:
${abstract}

I. INTRODUCTION:
${introduction}

II. METHODOLOGY:
${methodology}

III. RESULTS:
${results}

IV. CONCLUSION:
${conclusion}

Return the improved version with the same section headers.`;

        const result = await model.generateContent(prompt);
        const improved = result.response.text();

        console.log("Formatting Agent - Formatted text length:", improved.length);

        return {
            ...state,
            formattedText: improved
        };

    } catch (error) {
        console.error("Formatting Agent (Gemini) Error:", error.message);
        // Fallback: combine sections manually
        const fallback = `ABSTRACT\n${abstract}\n\nI. INTRODUCTION\n${introduction}\n\nII. METHODOLOGY\n${methodology}\n\nIII. RESULTS\n${results}\n\nIV. CONCLUSION\n${conclusion}`;
        return { ...state, formattedText: fallback };
    }
};
