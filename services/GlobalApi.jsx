import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@clerk/clerk-react";

const token = sessionStorage.getItem("token") ?? "";
const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const isExpired = decodedToken.exp * 1000 < Date.now();
      if (isExpired) {
        try {
          const { signOut } = useAuth();
          sessionStorage.clear();
          signOut();
        } catch (error) {
          console.error("Error refreshing token:", error);
          sessionStorage.clear();
          window.location.href = "/";
          return Promise.reject(error);
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const CreateNewResume = (data) => axiosClient.post("user-resumes", data);
const GetAllResumes = (userEmail) => {
  return axiosClient.get(`user-resumes/email/${userEmail}`);
};

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

const GetAuthToken = (id) => axiosClient.get(`user-resumes/auth/${id}`);

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
  GetAuthToken,
};
