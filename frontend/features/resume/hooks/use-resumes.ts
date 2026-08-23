import { useQuery } from "@tanstack/react-query";
import { getResumes } from "../api/resume.api";

export const useResumes = () => {
  return useQuery({
    queryKey: ["resumes"],
    queryFn: getResumes,
  });
};
