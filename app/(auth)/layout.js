import Image from "next/image";
import React from "react";
import AuthForm from "../../components/AuthForm";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }) => {
  // const isUserAuthenticated = await isAuthenticated();
  // if (isUserAuthenticated) redirect("/");
  return (
    <div className="flex flex-col h-screen">
      {/* <div className="flex flex-col items-center border rounded-2xl p-8"> */}
      {/* <Image
          src={"/next.svg"}
          alt="logo"
          width={400}
          height={100}
          className="w-[180px]"
        /> */}
      {/* <div className="flex flex-col"> */}
      {/* <Image
            src={"/next.svg"}
            height={100}
            alt="login"
            width={100}
            className="w-[400px] h-[250px] rounded-2xl"
          /> */}

      {/* <AuthForm type="sign-up" /> */}
      {children}
      {/* <p className="text-gray-500 text-center">
            Sign In with Google Authenticator
          </p>
          <button className=" w-full">Login with Google</button> */}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default AuthLayout;
