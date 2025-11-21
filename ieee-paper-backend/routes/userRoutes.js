import express from "express";
import { db } from "../firebase/init.js";

const router = express.Router();

// POST /api/user/update - Update user profile
router.post("/update", async (req, res) => {
    try {
        const { userId, displayName } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "Missing userId" });
        }

        // Update user document in Firestore
        // We'll store profile info in the user document itself or a subfield
        // Based on request: /users/{uid}/profile/name -> we'll use a nested object 'profile'

        const userRef = db.collection("users").doc(userId);

        await userRef.set({
            profile: {
                name: displayName
            },
            updatedAt: new Date()
        }, { merge: true });

        res.json({
            success: true,
            message: "Profile updated successfully"
        });
    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to update profile",
            details: error.message
        });
    }
});

// POST /api/user/signup - Create user and Firestore document
router.post("/signup", async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Missing email or password" });
        }

        // 1. Create user in Firebase Auth
        const userRecord = await import("../firebase/init.js").then(m => m.auth.createUser({
            email,
            password,
            displayName: name || "",
        }));

        const uid = userRecord.uid;

        // 2. Create Firestore document
        await db.collection("users").doc(uid).set({
            userId: uid,
            name: name || "",
            email: email,
        });

        res.json({
            success: true,
            uid: uid,
            message: "User created successfully"
        });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

export default router;
