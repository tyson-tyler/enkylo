import { db } from "@/appwrite";
import { Query } from "appwrite";

export const getUserProfile = async (userId) => {
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASEID;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
  try {
    const users = await db.listDocuments(databaseId, collectionId, [
      Query.equal("id", userId),
    ]);
    return users.documents[0]; // returns the matched document
  } catch (error) {
    console.log("User not found", error);
    return null;
  }
};
