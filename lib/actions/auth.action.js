"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

// to make server render component
export async function signup(params) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in istead.",
      };
    }
    await db.collection("user").doc(uid).set({
      email,
      name,
    });
    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (e) {
    console.error("Error creating a user", e);
    if (e.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already in use.",
      };
    }
    return { success: false, message: "Failed to create an account" };
  }
}

export async function setSessionCookie(idToken) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000,
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function signIn(params) {
  const { email, idToken } = params;
  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist. Create an account instead.",
      };
    }
    await setSessionCookie(idToken);
    return {
      success: true,
      message: "Sign In successfully.",
    };
  } catch (e) {
    console.error("Error login a user", e);

    return {
      success: false,
      message: "Failed to log into an account.",
    };
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;
  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) return null;
    console.log(userRecord);

    return {
      ...userRecord.data(),
      id: userRecord.id,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function isAuthenticated() {
  const user = getCurrentUser();
  //   to return true or false based on user we use
  // !!user => !{} => which is false => !false is true so if obj is present then 1 else 0
  console.log(user);

  return !!user;
}
