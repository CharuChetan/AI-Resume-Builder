import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UpdateResumeDetails } from "../../../../../services/GlobalApi";
import { toast } from "sonner";
import { Brain, LoaderCircle } from "lucide-react";
import AIModal from "../../../../../services/AIModal";

const prompt = `JOB Title: {job_title}, Depends on job title give me list of summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format`;
function Summery({ enableNext }) {
  const { resumeId } = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = React.useState(resumeInfo?.summery);
  const [loading, setLoading] = React.useState(false);
  const [aiGeneratedSummeryList, setAiGeneratedSummeryList] =
    React.useState(null);

  useEffect(() => {
    summery && setResumeInfo({ ...resumeInfo, summery: summery });
  }, [summery]);

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      summery: summery,
    };
    UpdateResumeDetails(resumeId, data)
      .then((res) => {
        setLoading(false);
        enableNext(true);
        toast("Details updated successfully");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const GenerateSummeryFromAI = async () => {
    try {
      setLoading(true);
      enableNext(false);
      const PROMPT = prompt.replace(
        "{job_title}",
        resumeInfo?.jobTitle || "Software Engineer"
      );
      const generateSummery = await AIModal(PROMPT, "application/json");
      setAiGeneratedSummeryList(JSON.parse(generateSummery));
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summery</h2>
        <p>Add Summery for your job title</p>
        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between">
            <label className="text-sm">Add Summery</label>
            <Button
              variant="outline"
              onClick={() => GenerateSummeryFromAI()}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <>
                  <Brain className="h-4 w-4" /> Generate from AI
                </>
              )}
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            value={summery}
            defaultValue={summery ? summery : resumeInfo?.summery}
            onChange={(e) => {
              setSummery(e.target.value);
              enableNext(false);
            }}
          />
          <div className="flex justify-end mt-4">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
      {aiGeneratedSummeryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummeryList?.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummery(item?.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summery;
