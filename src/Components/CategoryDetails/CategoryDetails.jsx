import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function CategoryDetails() {
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [deepSubCategories, setDeepSubCategories] = useState([]);
  let { id } = useParams();

  function getCategory(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
      .then((res) => {
        // console.log(res.data.data);
        setCategoryDetails(res.data.data);
      })
      .catch((err) => {
        // console.log(err);
        toast.error("Error To Get Your Category");
      });
  }
  function getSubCategoriesID(id) {
    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
      )
      .then((res) => {
        console.log(res);
        let RelatedDeepCategory = res.data.data;
        setDeepSubCategories(RelatedDeepCategory);
        console.log(deepSubCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getCategory(id);
    getSubCategoriesID(id);
  }, [id]);

  return (
    <>
      <div className="flex justify-center items-center">
        <img
          src={categoryDetails?.image}
          className="w-[250px] h-[250px]"
          alt="item-photo"
        />
      </div>
      <div className="category-caption-text flex justify-center items-center my-3">
        <h3 className="relative text-xl font-bold text-slate-700">
          {categoryDetails?.name}
        </h3>
      </div>
      <div className="row">
        {deepSubCategories?.length > 0 ? (
          deepSubCategories?.map((category) => (
            <div
              key={category._id}
              className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-3"
            >
              <div className="category shadow-md p-2 rounded-md">
                <div className="category-caption">
                  <h3 className="text-emerald-400 mb-2 font-bold text-sm">
                    {category?.name}
                  </h3>
                </div>
              </div>
            </div>
          ))
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
      </div>
    </>
  );
}
