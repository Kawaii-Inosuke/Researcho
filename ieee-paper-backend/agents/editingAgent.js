import { GoogleGenerativeAI } from "@google/generative-ai";

export const editingAgent = async (state) => {
    const { formattedText } = state;

    // Skip if no formatted text
    if (!formattedText) {
        console.log("Editing Agent - No formatted text, skipping");
        return { ...state, finalPaper: "No content generated" };
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Polish the following IEEE-style research paper to publication quality.
Fix grammar, clarity, transitions, and structure.
Do NOT change the meaning or remove content.

${formattedText}`;

        const result = await model.generateContent(prompt);
        const final = result.response.text();

        console.log("Editing Agent - Final paper length:", final.length);

        return {
            ...state,
            finalPaper: final
        };

    } catch (error) {
        console.error("Editing Agent (Gemini) Error:", error.message);
        // Fallback: use formatted text as-is
        return { ...state, finalPaper: formattedText };
    }
};
