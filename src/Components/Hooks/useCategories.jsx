import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCategories() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let categoryInfo = useQuery({
    queryKey: ["recentCategory"],
    queryFn: getCategories,
    select: (data) => data.data.data,
  });

  return categoryInfo;
}
