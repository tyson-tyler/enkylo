import { account, db, ID } from "@/appwrite";
import bcrypt from "bcryptjs"; // or any hashing lib

export const UserCreate = async (email, password, username, photoURL) => {
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASEID;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;

  try {
    // Step 1: Create Appwrite Auth user
    const user = await account.create(ID.unique(), email, password, username);

    // Step 2: Create session (login)
    const session = await account.createEmailPasswordSession(email, password);

    // Step 3: Hash password (client-side)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Store user profile + hashed password in DB
    await db.createDocument(databaseId, collectionId, ID.unique(), {
      id: user.$id,
      email: email,
      username: username,
      photoURL: photoURL,
      password: hashedPassword,
    });

    return { user, session };
  } catch (error) {
    console.error("User creation error:", error);
    return { error };
  }
};
