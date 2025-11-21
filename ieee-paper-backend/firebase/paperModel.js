import admin from "firebase-admin";
import { db } from "./init.js";

export const savePaper = async (paperData) => {
    const ref = await db.collection("papers").add({
        ...paperData,
    });

    // Update the document with its own ID
    await ref.update({ id: ref.id });

    return ref.id;
};

export const getUserPapers = async (userId) => {
    const snapshot = await db
        .collection("papers")
        .where("userId", "==", userId)
        .get();

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

export const getPaperById = async (id) => {
    const doc = await db.collection("papers").doc(id).get();
    if (!doc.exists) return null;

    return { id: doc.id, ...doc.data() };
};

export const deletePaper = async (id) => {
    await db.collection("papers").doc(id).delete();
};
