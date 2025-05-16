import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";
import "../../../App.css";
import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

function Header() {
  const { isSignedIn, user } = useUser();

  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
      <Link to="/">
        <img src="/logo.svg" width={100} height={100} />
      </Link>
      {isSignedIn ? (
        <div className="flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="NavigationMenuLink"
                  href={"/dashboard"}
                >
                  Dashboard
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="NavigationMenuTrigger">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent className="NavigationMenuContent">
                  <NavigationMenuLink>
                    <Link to="/services/text-generation">AI Chat Bot</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink>
                    <Link to="/services/image-generation">AI Image Maker</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink>
                    <Link to="/services/video-generation">AI Video Maker</Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport className="NavigationMenuViewport" />
          </NavigationMenu>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="NavigationMenuLink"
                  href={"/contact"}
                >
                  Contact Us
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <UserButton />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link to="/auth/sign-in">
            <Button>Get Started</Button>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="NavigationMenuLink"
                  href={"/contact"}
                >
                  Contact Us
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </div>
  );
}

export default Header;
