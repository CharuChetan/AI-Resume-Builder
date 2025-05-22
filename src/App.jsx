import "./App.css";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/sonner";
import { GetAuthToken } from "../services/GlobalApi";
import { useEffect } from "react";

function App() {
  const { isSignedIn, isLoaded, user } = useUser();
  useEffect(() => {
    if (!isSignedIn && isLoaded) {
      return <Navigate to="/auth/sign-in" />;
    } else {
      if (user && user.fullName) {
        GetAuthToken(user.fullName).then((res) => {
          sessionStorage.setItem("token", res.data.getToken);
        });
      }
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
}

export default App;
