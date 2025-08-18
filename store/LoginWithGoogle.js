import { account } from "@/appwrite";

export const LoginWithGoogle = async () => {
  account.createOAuth2Session(
    "google",
    "http://localhost:3000/dashboard",
    "http://localhost:3000/auth/login"
  );
};
