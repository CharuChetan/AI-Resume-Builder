import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_KEY}`,
  },
});

const CreateNewResume = (data) => axiosClient.post("user-resumes", data);
const GetAllResumes = (userEmail) =>
  axiosClient.get(`user-resumes/email/${userEmail}`);

const UpdateResumeDetails = (id, data) =>
  axiosClient.put(`user-resumes/${id}`, data);

const GetResumeById = (id) => axiosClient.get(`user-resumes/${id}`);
const DeleteResumeById = (id) => axiosClient.delete(`user-resumes/${id}`);

const CreateQuery = (data) => axiosClient.post("user-queries", data);

//Experince queries
const UpdateExperience = (id, data) =>
  axiosClient.put(`experiences/${id}`, data);

//Education queries
const UpdateEducation = (id, data) => axiosClient.put(`educations/${id}`, data);
//Skills queries
const UpdateSkills = (id, data) => axiosClient.put(`skills/${id}`, data);

export {
  CreateNewResume,
  GetAllResumes,
  UpdateResumeDetails,
  GetResumeById,
  DeleteResumeById,
  CreateQuery,
  UpdateExperience,
  UpdateEducation,
  UpdateSkills,
};
