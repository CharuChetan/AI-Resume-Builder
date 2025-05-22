import React, { useCallback, useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { GetAllResumes } from "../../services/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import ResumeCardItem from "./components/ResumeCardItem";
import { Loader } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = React.useState([]);
  const [loader, setLoader] = useState(false);

  /**
   * @description Get all resumes of the user
   */
  const getUserList = useCallback(() => {
    setLoader(true);
    GetAllResumes(user?.primaryEmailAddress?.emailAddress)
      .then((res) => {
        setResumeList(res.data.resumes);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }, [user?.primaryEmailAddress?.emailAddress]);

  useEffect(() => {
    user && getUserList();
  }, [getUserList, user]);

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start creating AI resume to your next job role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-5">
        <AddResume />
        {loader && (
          <div>
            <div className="p-14 justify-center items-center flex bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[275px] rounded-t-lg border-t-4">
              <Loader className="animate-spin" />
            </div>
            <div className="border p-3 flex justify-between text-white rounded-b-lg shadow-lg">
              <div className="space-y-2">
                <Skeleton className="h-2 w-[250px]" />
                <Skeleton className="h-2 w-[200px]" />
              </div>
            </div>
          </div>
        )}
        {resumeList &&
          resumeList?.map((item) => (
            <ResumeCardItem
              resume={item}
              key={item.resumeId}
              refreshData={getUserList}
            />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
