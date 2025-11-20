import { GoogleGenerativeAI } from "@google/generative-ai";

export const draftingAgent = async (state) => {
    const { topic, keywords } = state;

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // Try different model names
        let model;
        try {
            model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        } catch {
            model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        }

        const prompt = `Write a complete IEEE-style research paper on the following topic.

Topic: ${topic}
Keywords: ${keywords}

Please structure your response with these exact section headers:
## ABSTRACT
## I. INTRODUCTION
## II. METHODOLOGY
## III. RESULTS
## IV. CONCLUSION

Write in formal academic tone. Each section should be 2-3 paragraphs.`;

        console.log("Drafting Agent - Calling Gemini API...");
        const result = await model.generateContent(prompt);
        const text = result.response.text();

        console.log("Drafting Agent - Generated text length:", text.length);
        console.log("Drafting Agent - First 200 chars:", text.substring(0, 200));

        // More robust parsing
        const abstract = text.match(/##\s*ABSTRACT\s*([\s\S]*?)##\s*I\.\s*INTRODUCTION/i)?.[1]?.trim() ||
            text.match(/ABSTRACT[:\s]*([\s\S]*?)(?:INTRODUCTION|I\.)/i)?.[1]?.trim() || "";

        const introduction = text.match(/##\s*I\.\s*INTRODUCTION\s*([\s\S]*?)##\s*II\.\s*METHODOLOGY/i)?.[1]?.trim() ||
            text.match(/INTRODUCTION[:\s]*([\s\S]*?)(?:METHODOLOGY|II\.)/i)?.[1]?.trim() || "";

        const methodology = text.match(/##\s*II\.\s*METHODOLOGY\s*([\s\S]*?)##\s*III\.\s*RESULTS/i)?.[1]?.trim() ||
            text.match(/METHODOLOGY[:\s]*([\s\S]*?)(?:RESULTS|III\.)/i)?.[1]?.trim() || "";

        const results = text.match(/##\s*III\.\s*RESULTS\s*([\s\S]*?)##\s*IV\.\s*CONCLUSION/i)?.[1]?.trim() ||
            text.match(/RESULTS[:\s]*([\s\S]*?)(?:CONCLUSION|IV\.)/i)?.[1]?.trim() || "";

        const conclusion = text.match(/##\s*IV\.\s*CONCLUSION\s*([\s\S]*)/i)?.[1]?.trim() ||
            text.match(/CONCLUSION[:\s]*([\s\S]*)/i)?.[1]?.trim() || "";

        console.log("Drafting Agent - Parsed sections:", {
            abstract: abstract.length,
            introduction: introduction.length,
            methodology: methodology.length,
            results: results.length,
            conclusion: conclusion.length
        });

        return {
            ...state,
            abstract,
            introduction,
            methodology,
            results,
            conclusion,
            rawDraft: text // Keep original for debugging
        };

    } catch (error) {
        console.error("Drafting Agent (Gemini) Error:", error.message);
        console.error("Full error:", error);
        return state;
    }
};
