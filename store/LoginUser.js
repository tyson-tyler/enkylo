import { account } from "@/appwrite";

export const LoginUser = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    console.log("User session ", session);
    return { success: true, session };
  } catch (error) {
    if (error.code === 401) {
      console.error("Invalid email or password.");
      return { success: false, message: "Invalid email or password." };
    }
    console.error("⚠️ Login error:", error.message || error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
