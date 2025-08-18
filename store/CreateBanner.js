import { db, ID } from "@/appwrite";

export const CreateBanner = async (title, desc, url, infoUrl, videoUrl) => {
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASEID;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_BANNER_COLLECTION_ID;

  try {
    const res = await db.createDocument(databaseId, collectionId, ID.unique(), {
      title: title,
      desc: desc,
      url: url,
      infoUrl: infoUrl,
      videoUrl: videoUrl,
    });
    return { res };
  } catch (error) {
    console.log(error);
  }
};
