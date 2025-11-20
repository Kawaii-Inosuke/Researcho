import { draftingAgent } from "./draftingAgent.js";
import { researchAgent } from "./researchAgent.js";
import { citationAgent } from "./citationAgent.js";
import { formattingAgent } from "./formattingAgent.js";
import { editingAgent } from "./editingAgent.js";

export const generatePaperPipeline = async (state) => {
    let updatedState = { ...state };

    // Step 1: Initial Draft
    updatedState = await draftingAgent(updatedState);

    // Step 2: Research Papers
    updatedState = await researchAgent(updatedState);

    // Step 3: IEEE Citations
    updatedState = await citationAgent(updatedState);

    // Step 4: IEEE Formatting
    updatedState = await formattingAgent(updatedState);

    // Step 5: Final Editing & Polishing
    updatedState = await editingAgent(updatedState);

    // Build structured response for new UI
    const sections = {
        abstract: updatedState.abstract || "",
        introduction: updatedState.introduction || "",
        methodology: updatedState.methodology || "",
        results: updatedState.results || "",
        conclusion: updatedState.conclusion || ""
    };

    // Combine sections into formatted paper (fallback to finalPaper if available)
    const formattedPaper = updatedState.finalPaper ||
        `ABSTRACT\n\n${sections.abstract}\n\nI. INTRODUCTION\n\n${sections.introduction}\n\nII. METHODOLOGY\n\n${sections.methodology}\n\nIII. RESULTS\n\n${sections.results}\n\nIV. CONCLUSION\n\n${sections.conclusion}`;

    // Return structured output for new UI
    return {
        topic: updatedState.topic,
        keywords: updatedState.keywords,
        sections,
        formattedPaper,
        citations: updatedState.citations || []
    };
};
