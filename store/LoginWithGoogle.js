import { account, db, ID } from "@/appwrite";

export const LoginWithGoogle = async () => {
 
  try {
    account.createOAuth2Session(
      "google",
      "http://localhost:3000/dashboard",
      "http://localhost:3000/auth/login"
    );
  } catch (error) {
    console.log(error);
  }
};
