"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { toast } from "sonner";
import FormFieldComponent from "./FormField";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signup } from "@/lib/actions/auth.action";
import { supabase } from "@/services/supabaseClient";

const authFormSchema = (type) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    console.log(values);
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const result = await signup({
          uid: userCredential.user.uid,
          name: name ? name : "",
          email: email,
          password,
        });
        if (!result?.success) {
          toast.error(result?.message);
          return;
        }
        toast.success("Account created successfully. Please sign in");
        router.push("/signin");
      } else {
        const { email, password } = values;
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in failed");
          return;
        }
        await signIn({ email, idToken });
        toast.success("Signed in successfully!");
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("There was an error: " + error.message);
    }
  }

  // ! Sign In using firebase
  const onGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const res = await signIn({
        email: user.email,
        idToken,
      });

      if (!res.success) {
        // Try to sign up if user doesn't exist
        const signUpRes = await signup({
          uid: user.uid,
          name: user.displayName || "",
          email: user.email,
        });

        if (!signUpRes.success) {
          toast.error(signUpRes.message);
          return;
        }

        // Try sign in again after successful sign up
        const reSignIn = await signIn({ email: user.email, idToken });
        if (!reSignIn.success) {
          toast.error(reSignIn.message);
          return;
        }

        toast.success("Signed in successfully!");
        router.push("/");
        return;
      }

      toast.success("Signed in successfully!");
      router.push("/");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google Sign-In failed: " + error.message);
    }
  };

  // ! Sign In using Supabase
  const signInWithGoogle = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const isSign = type === "sign-in";

  return (
    // <div className="card-border lg:min-w-[566px]">
    <div className="flex flex-col justify-center gap-6">
      {/* <div className="flex justify-center gap-2">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div> */}

      {/* <h3>Practice job interviews with AI</h3> */}
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mt-4 space-y-6"
          >
            {!isSign && (
              <FormFieldComponent
                name="name"
                label="Name"
                control={form.control}
                placeholder="Enter your name"
              />
            )}
            <FormFieldComponent
              control={form.control}
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your Email"
            />
            <FormFieldComponent
              control={form.control}
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your Password"
            />
            <Button className="btn w-full" type="submit">
              {isSign ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>
        <div className="mt-3">
          <p className="text-gray-500 text-center">
            {isSign ? "Sign In with Google" : "Sign Up with Google"}
          </p>
          <Button
            onClick={signInWithGoogle}
            className="bg-blue-700 hover:bg-blue-500 w-full"
          >
            <FcGoogle /> Google
          </Button>
        </div>
      </div>
      <p className="text-xl text-center">
        {isSign ? "Don't have an account?" : "Have an account already?"}
        <Link
          className="font-bold text-user-primary ml-1"
          href={isSign ? "/signup" : "/signin"}
        >
          {isSign ? "Sign up" : "Sign in"}
        </Link>
      </p>
    </div>
    // </div>
  );
};

export default AuthForm;
