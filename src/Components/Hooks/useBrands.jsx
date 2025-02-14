import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useBrands() {
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let brandsInfo = useQuery({
    queryKey: ["recentBrands"],
    queryFn: getBrands,
    select: (data) => data.data.data,
  });

  return brandsInfo;
}
