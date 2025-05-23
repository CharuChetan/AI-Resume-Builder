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
  axiosClient.get(
    `user-resumes?sort=updatedAt:desc&filters[userEmail][$eq]=${userEmail}`
  );

const UpdateResumeDetails = (id, data) =>
  axiosClient.put(`user-resumes/${id}`, data);

const GetResumeById = (id) => axiosClient.get(`user-resumes/${id}?populate=*`);
const DeleteResumeById = (id) => axiosClient.delete(`user-resumes/${id}`);

const CreateQuery = (data) => axiosClient.post("user-queries", data);

export {
  CreateNewResume,
  GetAllResumes,
  UpdateResumeDetails,
  GetResumeById,
  DeleteResumeById,
  CreateQuery,
};
