import { useQuery } from "react-query";
import axios from "axios";
import { makeUrl } from "@/services/api";
import { makeConfig } from "@/services/api";

export default function useDelete(name, url) {
  return useQuery(name, async () => {
    const { data } = await axios.delete(makeUrl(url), makeConfig());
    return data;
  });
}
