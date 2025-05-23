import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import {
  UpdateResumeDetails,
  UpdateExperience,
} from "../../../../../services/GlobalApi";
import { toast } from "sonner";
import { CircleMinus, LoaderCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const formFields = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
  userResumeId: "",
};

function Experience({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [experienceList, setExperienceList] = useState([
    { ...formFields, userResumeId: resumeInfo?.id },
  ]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const [isExperince, setIsExpreince] = useState(resumeInfo?.isExperince);

  const handleInputChange = (index, event) => {
    enableNext(false);
    const newEntries = [...experienceList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const addNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummery: "",
        userResumeId: resumeInfo?.id,
      },
    ]);
  };

  const removeExperience = (id) => {
    if (experienceList.length > 1) {
      const list = [...experienceList];
      list.splice(id, 1);
      setExperienceList([...list]);
    }
  };

  useEffect(() => {
    resumeInfo?.experiences.length > 0 &&
      setExperienceList(resumeInfo?.experiences);
  }, []);

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, experiences: experienceList });
  }, [experienceList]);

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, isExperince: isExperince });
  }, [isExperince]);

  const handleRichTextEditor = (e, name, index) => {
    enableNext(false);
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;

    setExperienceList(newEntries);
  };

  const handleCheckboxChange = (index, name, checked) => {
    enableNext(false);
    let newEntries = experienceList.slice();
    newEntries = newEntries.map((element) => {
      if (element[name]) {
        element[name] = false;
      }
      return element;
    });
    newEntries[index][name] = checked;
    setExperienceList(newEntries);
  };

  const onSave = () => {
    setLoading(true);
    const data = experienceList.map(({ id, ...rest }) => rest);
    UpdateResumeDetails(params?.resumeId, { isExperince: isExperince ? 1 : 0 });
    UpdateExperience(params?.resumeId, data).then(
      (res) => {
        setLoading(false);
        enableNext(true);
        toast("Details updated !");
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your previous experience</p>
        <div className="flex justify-items-center items-center gap-2 py-5">
          <Checkbox
            id="experience"
            checked={isExperince}
            onCheckedChange={(check) => {
              setIsExpreince(check);
              enableNext(false);
            }}
          />
          <label
            htmlFor="experience"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Would you like to update your resume with your professional
            experience?
          </label>
        </div>
        {experienceList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-col-2 gap-3 border p-3 rounded-lg my-5 overflow-auto">
              <div className="flex justify-end items-end col-span-2">
                <Button
                  variant="outline"
                  onClick={() => removeExperience(index)}
                  className="text-primary p-0 border-0 shadow-none"
                >
                  <CircleMinus />
                </Button>
              </div>
              <div>
                <label className="text-xs">Position Title</label>
                <Input
                  name="title"
                  onChange={(event) => handleInputChange(index, event)}
                  defaultValue={item?.title}
                />
              </div>
              <div>
                <label className="text-xs">Company Name</label>
                <Input
                  name="companyName"
                  onChange={(event) => handleInputChange(index, event)}
                  defaultValue={item?.companyName}
                />
              </div>
              <div>
                <label className="text-xs">City</label>
                <Input
                  name="city"
                  onChange={(event) => handleInputChange(index, event)}
                  defaultValue={item?.city}
                />
              </div>
              <div>
                <label className="text-xs">State</label>
                <Input
                  name="state"
                  onChange={(event) => handleInputChange(index, event)}
                  defaultValue={item?.state}
                />
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(event) => handleInputChange(index, event)}
                  defaultValue={item?.startDate}
                />
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(event) => handleInputChange(index, event)}
                  defaultValue={item?.endDate}
                  disabled={item?.currentlyWorking}
                />
              </div>
              <div className="flex items-center col-span-2">
                <Checkbox
                  name="currentlyWorking"
                  checked={item?.currentlyWorking}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(index, "currentlyWorking", checked)
                  }
                  className="h-4 w-4"
                />
                <label className="text-xs mx-2">Currently Working</label>
              </div>
              <div className="col-span-2">
                {/* Work Summery  */}
                <RichTextEditor
                  index={index}
                  defaultValue={item?.workSummery}
                  onRichTextEditorChange={(event) =>
                    handleRichTextEditor(event, "workSummery", index)
                  }
                />
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant={"outline"}
              className="text-primary"
              onClick={addNewExperience}
            >
              + Add More Experience
            </Button>
          </div>
          <Button disabled={loading} onClick={() => onSave()}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
