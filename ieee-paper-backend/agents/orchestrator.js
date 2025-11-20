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

    // Final output structure
    return {
        topic: updatedState.topic,
        keywords: updatedState.keywords,
        citations: updatedState.citations,
        finalPaper: updatedState.finalPaper
    };
};
