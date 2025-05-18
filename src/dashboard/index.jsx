import React, { useCallback, useEffect } from "react";
import AddResume from "./components/AddResume";
import { GetAllResumes } from "../../services/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import ResumeCardItem from "./components/ResumeCardItem";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = React.useState([]);

  /**
   * @description Get all resumes of the user
   */
  const getUserList = useCallback(() => {
    GetAllResumes(user?.primaryEmailAddress?.emailAddress)
      .then((res) => {
        setResumeList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
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
