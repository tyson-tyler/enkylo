import { account, db, ID } from "@/appwrite";

export const UserCreate = async (email, password, username, photoURL) => {
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASEID;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;

  try {
    const user = await account.create(ID.unique(), email, password, username);

    const session = await account.createEmailPasswordSession(email, password);

    await db.createDocument(databaseId, collectionId, ID.unique(), {
      id: user.$id,
      email: email,
      username: username,
      photoURL: photoURL,
    });

    return { user, session };
  } catch (error) {
    console.error("User creation error:", error);
    return { error };
  }
};
