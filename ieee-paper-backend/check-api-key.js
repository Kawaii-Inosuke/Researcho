import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

async function listAvailableModels() {
    console.log("Checking Gemini API Key and Available Models...\n");

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error("❌ GEMINI_API_KEY not found in .env file");
        return;
    }

    console.log("✅ API Key found:", apiKey.substring(0, 10) + "..." + apiKey.substring(apiKey.length - 4));
    console.log("   Full length:", apiKey.length, "characters\n");

    // Try to list models using direct API call
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
        );

        if (!response.ok) {
            console.error(`❌ API Error: ${response.status} ${response.statusText}`);
            const errorText = await response.text();
            console.error("Error details:", errorText);

            if (response.status === 400) {
                console.log("\n⚠️  Possible issues:");
                console.log("   1. API key is invalid or malformed");
                console.log("   2. API key doesn't have Gemini API enabled");
                console.log("   3. You need to enable the Generative Language API");
                console.log("\n📝 Steps to fix:");
                console.log("   1. Go to: https://aistudio.google.com/app/apikey");
                console.log("   2. Create a new API key or verify your existing one");
                console.log("   3. Make sure 'Generative Language API' is enabled");
                console.log("   4. Replace the key in your .env file");
            }
            return;
        }

        const data = await response.json();

        if (data.models && data.models.length > 0) {
            console.log("✅ Available models:\n");
            data.models.forEach(model => {
                console.log(`   - ${model.name}`);
                if (model.supportedGenerationMethods) {
                    console.log(`     Methods: ${model.supportedGenerationMethods.join(', ')}`);
                }
            });
        } else {
            console.log("⚠️  No models found for this API key");
        }

    } catch (error) {
        console.error("❌ Error:", error.message);
        console.log("\n⚠️  This could mean:");
        console.log("   1. Network connectivity issue");
        console.log("   2. Invalid API key format");
        console.log("   3. API key needs to be regenerated");
    }
}

listAvailableModels();
