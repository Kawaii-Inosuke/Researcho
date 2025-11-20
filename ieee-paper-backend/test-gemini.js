import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

async function testGeminiAPI() {
    console.log("Testing Gemini API...\n");

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error("❌ GEMINI_API_KEY not found in .env file");
        return;
    }

    console.log("✅ API Key found:", apiKey.substring(0, 10) + "...");

    const genAI = new GoogleGenerativeAI(apiKey);

    // Test different model names
    const modelsToTest = [
        "gemini-pro",
        "gemini-1.5-pro",
        "gemini-1.5-flash",
        "gemini-1.5-flash-latest",
        "models/gemini-pro",
        "models/gemini-1.5-pro",
        "models/gemini-1.5-flash"
    ];

    console.log("\nTesting model availability:\n");

    for (const modelName of modelsToTest) {
        try {
            console.log(`Testing: ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Say hello");
            const text = result.response.text();
            console.log(`✅ ${modelName} WORKS!`);
            console.log(`   Response: ${text.substring(0, 50)}...\n`);
            break; // Stop after first working model
        } catch (error) {
            console.log(`❌ ${modelName} failed: ${error.message}\n`);
        }
    }

    console.log("\n--- Test Complete ---");
}

testGeminiAPI();
