import { makeConfig, makeUrl } from "@/services/api";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export const useCustomMutation = (endpoint, method, resource) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (data) => {
      switch (method) {
        case "post":
          const responsePost = await axios.post(
            makeUrl(endpoint),
            data,
            makeConfig()
          );
          return responsePost.data;
        case "patch":
          const responsePatch = await axios.patch(
            makeUrl(endpoint),
            data,
            makeConfig("patch")
          );
          return responsePatch.data;
        case "put":
          const responsePut = await axios.put(
            makeUrl(endpoint),
            data,
            makeConfig()
          );
          return responsePut.data;
        case "delete":
          const responseDelete = await axios.delete(
            makeUrl(endpoint),
            makeConfig()
          );
          return responseDelete.data;
        default:
          console.log("Error: Invalid method");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(resource);
      },
    }
  );

  return mutation;
};