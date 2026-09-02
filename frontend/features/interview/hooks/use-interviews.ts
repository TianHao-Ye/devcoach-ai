import { useQuery } from "@tanstack/react-query";

import { getInterviews } from "../api/interview.api";

export const useInterviews = () => {
  return useQuery({
    queryKey: ["interviews"],
    queryFn: getInterviews,
  });
};
