import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const { isSignedIn, user } = useUser();
  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
      <img src="/logo.svg" width={100} height={100} />
      {isSignedIn ? (
        <div className="flex items-center gap-2">
          <Link to="/dashboard">
            <Button variant={"outline"}>Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to="/auth/sign-in">
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
