"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { supabase } from "@/services/supabaseClient";
import React, { useContext, useEffect, useState } from "react";

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      setLoading(true);

      // First check if there's an active session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Session error:", sessionError);
        setLoading(false);
        return;
      }

      if (!session) {
        console.log("No active session");
        setLoading(false);
        return;
      }

      // Now get the user with the valid session
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("User error:", userError);
        setLoading(false);
        return;
      }

      if (user) {
        await createOrGetUser(user);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const createOrGetUser = async (authUser) => {
    try {
      // Check if user already exists
      let { data: Users, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", authUser?.email)
        .single();

      if (error || !Users) {
        // User doesn't exist, create new one
        const { data, error: insertError } = await supabase
          .from("Users")
          .insert([
            {
              name:
                authUser?.user_metadata?.name || authUser?.email?.split("@")[0],
              email: authUser?.email,
              picture: authUser?.user_metadata?.picture,
            },
          ])
          .select()
          .single();

        if (insertError) {
          console.error("Error creating user:", insertError);
          return;
        }

        setUser(data);
        console.log("New user created:", data);
      } else {
        setUser(Users);
        console.log("Existing user found:", Users);
      }
    } catch (error) {
      console.error("Error in createOrGetUser:", error);
    }
  };

  return (
    <UserDetailContext.Provider value={{ user, setUser, loading }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
};

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  return context;
};
