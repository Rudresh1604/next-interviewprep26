import Image from "next/image";
import React from "react";
import AuthForm from "../../../components/AuthForm";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <div className="flex flex-col items-center border rounded-2xl p-8">
        <Image
          src={"/next.svg"}
          alt="logo"
          width={400}
          height={100}
          className="w-[180px]"
        />
        <h2 className="text-2xl font-bold my-3 text-center">
          Welcome to AI Recuriter
        </h2>
        <span className="border-black border rounded-2xl w-full"></span>
        <div className="flex flex-col items-center gap-3">
          <AuthForm type={"sign-up"} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
