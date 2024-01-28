import { useMutation } from "react-query";
import axios from "axios";
import { makeUrl } from "@/services/api";
import { makeConfig } from "@/services/api";
import { useQueryClient } from "react-query";

const queryClient = useQueryClient();

const usePost = () => {
  const postData = async ({ url, data }) => {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  };

  return useMutation(postData);
};

export default usePost;

export const useCustomMutation = (url, data, key) => {
  return useMutation({
    mutationFn: () => axios.post(makeUrl(url), data, makeConfig()),
    onSuccess: () => {
      queryClient.invalidateQueries(key);
    },
  })
}