import { useMutation } from "react-query";
import axios from "axios";
import { makeUrl } from "@/services/api";
import { makeConfig } from "@/services/api";

// import { useQuery } from "react-query";
// import axios from "axios";
// import { makeUrl } from "@/services/api";
// import { makeConfig } from "@/services/api";

// export default function useFetch(name, url) {
//   return useQuery(name, async () => {
//     const { data } = await axios.get(
//       makeUrl(url),
//       makeConfig()
//     );
//     return data;
//   });
// }
export default function usePatch() {
  const patchData = async ({ url, data }) => {
    try {
      console.log("data", data);
      console.log("url", url);
      const response = await axios.patch(makeUrl(url), data, makeConfig());
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  };

  return useMutation(patchData);
}
