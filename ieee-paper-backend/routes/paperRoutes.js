import express from "express";
import { generatePaperPipeline } from "../agents/orchestrator.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
    try {
        const { topic, keywords } = req.body;

        // Initial state object
        const initialState = {
            topic,
            keywords,
            abstract: "",
            introduction: "",
            methodology: "",
            results: "",
            conclusion: "",
            researchPapers: [],
            citations: []
        };

        const finalState = await generatePaperPipeline(initialState);

        res.json({
            success: true,
            paper: finalState
        });
    } catch (error) {
        console.error("Pipeline Error:", error);
        res.status(500).json({
            success: false,
            error: "Paper generation pipeline failed",
            details: error.message
        });
    }
});

router.get("/test", async (req, res) => {
    res.json({ message: "Pipeline ready" });
});

export default router;
