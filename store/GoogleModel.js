import { account, db } from "@/appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASEID;
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;

export const saveUserToDB = async () => {
  try {
    const authUser = await account.get(); // current logged-in user

    // Check if document already exists
    try {
      await db.getDocument(DATABASE_ID, USERS_COLLECTION_ID, authUser.$id);
      console.log("✅ User already exists in DB");
      return;
    } catch (err) {
      if (err.code !== 404) throw err; // rethrow if not "not found"
    }

    // If not exists, create it
    await db.createDocument(DATABASE_ID, USERS_COLLECTION_ID, authUser.$id, {
      id: authUser.$id,
      username: authUser.name || "",
      email: authUser.email,
      photoURL: "", // dynamic user avatar
    });

    console.log(" User saved in DB");
  } catch (error) {
    console.error("Error saving user:", error);
  }
};
