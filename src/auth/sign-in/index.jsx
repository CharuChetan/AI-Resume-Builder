import { SignIn } from "@clerk/clerk-react";
import React from "react";

function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <SignIn />
    </div>
  );
}

export default SignInPage;
