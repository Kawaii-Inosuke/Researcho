export const citationAgent = async (state) => {
    const { researchPapers } = state;

    try {
        const ieeeCitations = researchPapers.map((paper, index) => {
            const authors = paper.authors || "Unknown Author";
            const year = paper.year || "n.d.";
            const title = paper.title || "Untitled";
            const venue = paper.venue || "Unpublished";
            const url = paper.url || "";

            return `[${index + 1}] ${authors}, “${title}”, ${venue}, ${year}. Available: ${url}`;
        });

        return {
            ...state,
            citations: ieeeCitations
        };
    } catch (error) {
        console.error("Citation Agent Error:", error);
        return state;
    }
};
