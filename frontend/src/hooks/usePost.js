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







// import { useMutation } from "react-query";

// const updateUser = async (userData) => {
//   // Perform the mutation logic, e.g., make an API request to update the user
//   const response = await fetch("/api/users", {
//     method: "PUT",
//     body: JSON.stringify(userData),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to update user");
//   }

//   return response.json();
// };

// const EditUserForm = ({ userId }) => {
//   const [mutate, { isLoading, isError, error }] = useMutation(updateUser);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const userData = Object.fromEntries(formData);

//     mutate(userData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Form fields */}
//       <button type="submit" disabled={isLoading}>
//         {isLoading ? "Saving..." : "Save"}
//       </button>
//       {isError && <div>Error: {error.message}</div>}
//     </form>
//   );
// };