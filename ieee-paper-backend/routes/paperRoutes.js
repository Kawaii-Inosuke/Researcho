import express from "express";
import { generatePaperPipeline } from "../agents/orchestrator.js";
import { db } from "../firebase/init.js";
import { getUserPapers, getPaperById, deletePaper } from "../firebase/paperModel.js";
import PDFDocument from "pdfkit";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

const router = express.Router();

// POST /api/paper/generate - Generate paper and save to Firestore
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

        const finalState = await generatePaperPipeline({
            ...initialState,
            userId: req.body.userId || null
        });

        // Return response with paperId
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

// GET /api/paper/papers - Fetch all papers for a user (Query Param)
router.get("/papers", async (req, res) => {
    try {
        const userId = req.query.userId;
        if (!userId) {
            return res.status(400).json({ error: "Missing userId" });
        }

        const snapshot = await db
            .collection("papers")
            .where("userId", "==", userId)
            .get();

        const papers = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return res.json({ papers });
    } catch (err) {
        console.error("Error fetching papers:", err);
        return res.status(500).json({ error: err.message });
    }
});

// GET /api/paper/papers/:userId - Fetch all papers for a user
router.get("/papers/:userId", async (req, res) => {
    try {
        const papers = await getUserPapers(req.params.userId);
        res.json({
            success: true,
            papers
        });
    } catch (error) {
        console.error("Fetch User Papers Error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch user papers"
        });
    }
});

// GET /api/paper/paper/view/:id - Fetch single paper
router.get("/paper/view/:id", async (req, res) => {
    try {
        const paper = await getPaperById(req.params.id);
        if (!paper) {
            return res.status(404).json({
                success: false,
                error: "Paper not found"
            });
        }
        res.json({
            success: true,
            paper
        });
    } catch (error) {
        console.error("Fetch Paper Error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch paper"
        });
    }
});

// DELETE /api/paper/papers/:id - Delete paper
router.delete("/papers/:id", async (req, res) => {
    try {
        await deletePaper(req.params.id);
        res.json({
            success: true,
            message: "Paper deleted successfully"
        });
    } catch (error) {
        console.error("Delete Paper Error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to delete paper"
        });
    }
});

// GET /api/paper/papers/:id/pdf - Generate and download PDF
router.get("/papers/:id/pdf", async (req, res) => {
    try {
        const { id } = req.params;
        const doc = await db.collection("papers").doc(id).get();

        if (!doc.exists) {
            return res.status(404).json({
                success: false,
                error: "Paper not found"
            });
        }

        const paperData = doc.data();
        const pdfDoc = new PDFDocument({
            margins: {
                top: 72,
                bottom: 72,
                left: 72,
                right: 72
            }
        });

        // Set response headers
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="${paperData.topic.replace(/[^a-z0-9]/gi, '_')}.pdf"`);

        // Pipe PDF to response
        pdfDoc.pipe(res);

        // Add title
        pdfDoc.fontSize(16).font('Helvetica-Bold').text(paperData.topic, {
            align: 'center'
        });
        pdfDoc.moveDown(0.5);

        // Add keywords
        if (paperData.keywords && paperData.keywords.length > 0) {
            const keywordsText = Array.isArray(paperData.keywords)
                ? paperData.keywords.join(', ')
                : paperData.keywords;
            pdfDoc.fontSize(10).font('Helvetica-Oblique').text(`Keywords: ${keywordsText}`, {
                align: 'center'
            });
            pdfDoc.moveDown(1);
        }

        // Add formatted paper content
        pdfDoc.fontSize(11).font('Helvetica').text(paperData.formattedPaper || '', {
            align: 'justify',
            lineGap: 2
        });

        // Add citations if available
        if (paperData.citations && paperData.citations.length > 0) {
            pdfDoc.addPage();
            pdfDoc.fontSize(14).font('Helvetica-Bold').text('REFERENCES', {
                align: 'left'
            });
            pdfDoc.moveDown(0.5);

            paperData.citations.forEach((citation, index) => {
                pdfDoc.fontSize(10).font('Helvetica').text(`[${index + 1}] ${citation}`, {
                    align: 'left',
                    indent: 20,
                    lineGap: 2
                });
                pdfDoc.moveDown(0.3);
            });
        }

        pdfDoc.end();
    } catch (error) {
        console.error("PDF Generation Error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to generate PDF",
            details: error.message
        });
    }
});

// GET /api/paper/papers/:id/docx - Generate and download DOCX
router.get("/papers/:id/docx", async (req, res) => {
    try {
        const { id } = req.params;
        const doc = await db.collection("papers").doc(id).get();

        if (!doc.exists) {
            return res.status(404).json({
                success: false,
                error: "Paper not found"
            });
        }

        const paperData = doc.data();

        // Create DOCX document
        const docxContent = [];

        // Add title
        docxContent.push(
            new Paragraph({
                text: paperData.topic,
                heading: HeadingLevel.TITLE,
                alignment: "center",
                spacing: { after: 200 }
            })
        );

        // Add keywords
        if (paperData.keywords && paperData.keywords.length > 0) {
            const keywordsText = Array.isArray(paperData.keywords)
                ? paperData.keywords.join(', ')
                : paperData.keywords;
            docxContent.push(
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `Keywords: ${keywordsText}`,
                            italics: true
                        })
                    ],
                    alignment: "center",
                    spacing: { after: 400 }
                })
            );
        }

        // Add formatted paper content (split by lines)
        const lines = (paperData.formattedPaper || '').split('\n');
        lines.forEach(line => {
            if (line.trim()) {
                // Check if it's a heading (all caps or starts with Roman numerals)
                const isHeading = /^[IVX]+\.|^[A-Z\s]+$/.test(line.trim()) && line.length < 50;

                docxContent.push(
                    new Paragraph({
                        text: line,
                        heading: isHeading ? HeadingLevel.HEADING_1 : undefined,
                        spacing: { after: 200 }
                    })
                );
            } else {
                docxContent.push(new Paragraph({ text: "" }));
            }
        });

        // Add citations if available
        if (paperData.citations && paperData.citations.length > 0) {
            docxContent.push(
                new Paragraph({
                    text: "",
                    pageBreakBefore: true
                })
            );
            docxContent.push(
                new Paragraph({
                    text: "REFERENCES",
                    heading: HeadingLevel.HEADING_1,
                    spacing: { after: 200 }
                })
            );

            paperData.citations.forEach((citation, index) => {
                docxContent.push(
                    new Paragraph({
                        text: `[${index + 1}] ${citation}`,
                        spacing: { after: 100 }
                    })
                );
            });
        }

        const docxDoc = new Document({
            sections: [{
                properties: {},
                children: docxContent
            }]
        });

        // Generate buffer
        const buffer = await Packer.toBuffer(docxDoc);

        // Set response headers
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        res.setHeader("Content-Disposition", `attachment; filename="${paperData.topic.replace(/[^a-z0-9]/gi, '_')}.docx"`);

        res.send(buffer);
    } catch (error) {
        console.error("DOCX Generation Error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to generate DOCX",
            details: error.message
        });
    }
});

// Keep test endpoint
router.get("/test", async (req, res) => {
    res.json({ message: "Pipeline ready" });
});

export default router;
