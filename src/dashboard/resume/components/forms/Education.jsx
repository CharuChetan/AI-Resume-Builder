import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  UpdateResumeDetails,
  UpdateEducation,
} from "../../../../../services/GlobalApi";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const formFields = {
  universityName: "",
  degree: "",
  major: "",
  startDate: "",
  endDate: "",
  description: "",
  userResumeId: "",
};

function Education({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [educationalList, setEducationalList] = useState([
    { ...formFields, userResumeId: resumeInfo.id },
  ]);
  const [isEducation, setIsEducation] = useState(resumeInfo.isEducation);
  const params = useParams();

  useEffect(() => {
    resumeInfo?.educations.length > 0 &&
      setEducationalList(resumeInfo?.educations);
  }, []);

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      educations: educationalList,
    });
  }, [educationalList]);

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, isEducation: isEducation });
  }, [isEducation]);

  const handleChange = (event, index) => {
    enableNext(false);
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
        userResumeId: resumeInfo.id,
      },
    ]);
  };
  const RemoveEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = educationalList.map(({ id, ...rest }) => rest);

    UpdateResumeDetails(params?.resumeId, { isEducation: isEducation ? 1 : 0 });
    UpdateEducation(params.resumeId, data).then(
      (resp) => {
        setLoading(false);
        enableNext(true);
        toast("Details updated !");
      },
      (error) => {
        console.log(error);
        setLoading(false);
        toast("Server Error, Please try again!");
      }
    );
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add Your educational details</p>
      <div className="flex justify-items-center items-center gap-2 py-5">
        <Checkbox
          id="education"
          checked={isEducation}
          onCheckedChange={(check) => {
            setIsEducation(check);
            enableNext(false);
          }}
        />
        <label
          htmlFor="education"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Do you want to include an education section on your resume?
        </label>
      </div>
      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label className="text-xs">University Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.universityName}
                />
              </div>
              <div>
                <label className="text-xs">Degree</label>
                <Input
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.degree}
                />
              </div>
              <div>
                <label className="text-xs">Major</label>
                <Input
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.major}
                />
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.startDate}
                />
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.endDate}
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs">Description</label>
                <Textarea
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.description}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewEducation}
            className="text-primary"
          >
            + Add More Education
          </Button>
          <Button
            variant="outline"
            onClick={RemoveEducation}
            className="text-primary"
          >
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Education;
