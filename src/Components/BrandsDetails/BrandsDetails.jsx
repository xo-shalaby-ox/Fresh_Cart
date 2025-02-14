import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function BrandsDetails() {
  const [brandsDetails, setBrandsDetails] = useState(null);
  let { id } = useParams();

  function getBrands(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((res) => {
        // console.log(res.data.data);
        setBrandsDetails(res.data.data);
      })
      .catch((err) => {
        // console.log(err);
        toast.error("Error To Get Your Brand");
      });
  }

  useEffect(() => {
    getBrands(id);
  }, [id]);

  return (
    <>
      {brandsDetails ? (
        <div className="flex justify-center items-center my-28 py-5">
          <div className="text-center">
            <img
              src={brandsDetails?.image}
              className="w-full"
              alt="item-photo"
            />
            <h3 className="text-2xl text-emerald-500 font-semibold mt-3">
              {brandsDetails?.name}
            </h3>
          </div>
        </div>
      ) : (
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1"></div>
          <div className="sk-cube sk-cube2"></div>
          <div className="sk-cube sk-cube3"></div>
          <div className="sk-cube sk-cube4"></div>
          <div className="sk-cube sk-cube5"></div>
          <div className="sk-cube sk-cube6"></div>
          <div className="sk-cube sk-cube7"></div>
          <div className="sk-cube sk-cube8"></div>
          <div className="sk-cube sk-cube9"></div>
        </div>
      )}
    </>
  );
}
