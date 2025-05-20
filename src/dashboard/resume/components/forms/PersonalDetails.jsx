import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UpdateResumeDetails } from "../../../../../services/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

function PersonalDetails({ enableNext }) {
  const { resumeId } = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setResumeInfo({ ...resumeInfo, [name]: value });
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = formData;
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

  return (
    <div className="p-5 rounded-lg shadow-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-col-2 mt-5 gap-3">
          <div>
            <label className="text-xs">First Name</label>
            <Input
              name="firstName"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.firstName}
            />
          </div>
          <div>
            <label className="text-xs">Last Name</label>
            <Input
              name="lastName"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.lastName}
            />
          </div>
          <div className="col-span-2">
            <label className="text-xs">Job Title</label>
            <Input
              name="jobTitle"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.jobTitle}
            />
          </div>
          <div className="col-span-2">
            <label className="text-xs">Address</label>
            <Input
              name="address"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.address}
            />
          </div>
          <div>
            <label className="text-xs">Phone</label>
            <Input
              name="phone"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.phone}
            />
          </div>
          <div>
            <label className="text-xs">Email</label>
            <Input
              name="email"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo?.email}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
