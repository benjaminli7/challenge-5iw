import { useQuery } from "react-query";
import axios from "axios";
import { makeUrl } from "@/services/api";
import { makeConfig } from "@/services/api";

export default function useFetch(name, url) {
  return useQuery(name, async () => {
    const { data } = await axios.get(
      makeUrl(url),
      makeConfig()
    );
    return data;
  });
}
