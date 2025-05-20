import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import {
  UpdateResumeDetails,
  UpdateSkills,
} from "../../../../../services/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

function Skills({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
      userResumeId: resumeInfo.id,
    },
  ]);

  const { resumeId } = useParams();
  const [isSkill, setSkill] = useState(resumeInfo.isSkill);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resumeInfo && setSkillsList(resumeInfo?.skills);
  }, []);

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, isSkill: isSkill });
  }, [isSkill]);

  const handleChange = (index, name, value) => {
    enableNext(false);
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  const AddNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
        userResumeId: resumeInfo.id,
      },
    ]);
  };
  const RemoveSkills = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = skillsList.map(({ id, ...rest }) => rest);

    UpdateResumeDetails(resumeId, { isSkill: isSkill ? 1 : 0 });
    UpdateSkills(resumeId, data).then(
      (resp) => {
        setLoading(false);
        enableNext(true);
        toast("Details updated !");
      },
      (error) => {
        setLoading(false);
        toast("Server Error, Try again!");
      }
    );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add Your top professional key skills</p>
      <div className="flex justify-items-center items-center gap-2 py-5">
        <Checkbox
          id="skill"
          checked={isSkill}
          onCheckedChange={(check) => {
            setSkill(check);
            enableNext(false);
          }}
        />
        <label
          htmlFor="skill"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Would you like to add a skill to your resume?
        </label>
      </div>
      <div>
        {skillsList.map((item, index) => (
          <div className="flex justify-between mb-2 border rounded-lg p-3 ">
            <div>
              <label className="text-xs">Name</label>
              <Input
                className="w-full"
                defaultValue={item.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewSkills}
            className="text-primary"
          >
            + Add More Skill
          </Button>
          <Button
            variant="outline"
            onClick={RemoveSkills}
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

export default Skills;
