import { SignIn, useClerk } from "@clerk/clerk-react";
import React from "react";

function SignInPage() {
  const clerk = useClerk();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {clerk.loaded && <SignIn />}
    </div>
  );
}

export default SignInPage;
