import axios from "axios";

export const researchAgent = async (state) => {
    const { topic } = state;

    try {
        // OpenAlex API - free, no rate limits, no API key required
        const response = await axios.get(
            "https://api.openalex.org/works",
            {
                params: {
                    search: topic,
                    per_page: 5,
                    sort: "cited_by_count:desc", // Get most cited papers
                    filter: "type:article" // Only research articles
                },
                headers: {
                    "User-Agent": "IEEE-Paper-Writer/1.0 (mailto:research@example.com)" // Polite API usage
                }
            }
        );

        const papers = response.data.results.map((work) => ({
            title: work.title || "Untitled",
            authors: work.authorships?.map((a) => a.author?.display_name).filter(Boolean).join(", ") || "Unknown Author",
            year: work.publication_year || "n.d.",
            venue: work.primary_location?.source?.display_name || work.host_venue?.display_name || "Unpublished",
            abstract: work.abstract_inverted_index ? reconstructAbstract(work.abstract_inverted_index) : "",
            url: work.doi ? `https://doi.org/${work.doi}` : work.primary_location?.landing_page_url || ""
        }));

        console.log(`Research Agent - Found ${papers.length} papers from OpenAlex`);

        return {
            ...state,
            researchPapers: papers
        };
    } catch (error) {
        console.error("Research Agent (OpenAlex) Error:", error.message);
        return { ...state, researchPapers: [] }; // fail gracefully
    }
};

// Helper function to reconstruct abstract from inverted index
function reconstructAbstract(invertedIndex) {
    if (!invertedIndex) return "";

    try {
        const words = [];
        for (const [word, positions] of Object.entries(invertedIndex)) {
            positions.forEach(pos => {
                words[pos] = word;
            });
        }
        return words.filter(Boolean).join(" ").substring(0, 500); // Limit to 500 chars
    } catch (error) {
        return "";
    }
}
