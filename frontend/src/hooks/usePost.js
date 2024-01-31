import { useMutation } from "react-query";
import axios from "axios";
import { makeUrl } from "@/services/api";
import { makeConfig } from "@/services/api";
import { useQueryClient } from "react-query";

const queryClient = useQueryClient();

export const useCustomMutation = (url, data, key) => {
  return useMutation({
    mutationFn: () => axios.post(makeUrl(url), data, makeConfig()),
    onSuccess: () => {
      queryClient.invalidateQueries(key);
    },
  })
}