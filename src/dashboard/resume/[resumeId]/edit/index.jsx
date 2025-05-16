import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FromSection from "../../components/FromSection";
import ResumePreview from "../../components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import dummy from "@/data/dummy";
import { GetResumeById } from "../../../../../services/GlobalApi";

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState(null);

  useEffect(() => {
    //setResumeInfo(dummy);
    getResumeinfo();
  }, [resumeId]);

  const getResumeinfo = () => {
    GetResumeById(resumeId).then((res) => {
      setResumeInfo(res?.data?.data);
    });
  };
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* Form Section */}
        <FromSection />
        {/* Resume Preview */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
