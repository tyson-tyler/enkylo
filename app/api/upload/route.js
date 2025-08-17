import cloudinary from "@/cloudinary";

export async function POST(req) {
  try {
    const formdata = await req.formdata();
    const file = formdata.get("file");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const res = await new Promise((res, rej) => {
      const uploadStream = cloudinary.uploader.upload_stream({
        folder: folderName,
      });
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.log(error);
  }
}
