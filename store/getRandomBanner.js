import { db } from "@/appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASEID;
const BANNERS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_BANNER_COLLECTION_ID;

export const getRandomBanner = async () => {
  try {
    const res = await db.listDocuments(DATABASE_ID, BANNERS_COLLECTION_ID);

    if (res.documents.length === 0) return null;

    // Pick a random index
    const randomIndex = Math.floor(Math.random() * res.documents.length);
    return res.documents[randomIndex];
  } catch (error) {
    console.error("❌ Error fetching random banner:", error);
    return null;
  }
};
