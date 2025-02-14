import React from "react";
import { Link } from "react-router-dom";
import useCategories from "../../Components/Hooks/useCategories";

export default function Products() {
  let { data, isError, error, isLoading } = useCategories();

  if (isError) {
    return <h3>{error}</h3>;
  }
  if (isLoading) {
    return (
      <>
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
      </>
    );
  }

  return (
    <>
      <div className="row">
        {data?.map((category) => (
          <div key={category["_id"]} className="w-1/2 sm:w-1/3 md:w-1/5 p-3">
            <div className="category border border-slate-300 shadow-md p-2 rounded-md">
              <Link to={`/categoryDetails/${category["_id"]}`}>
                <img
                  src={category?.image}
                  className="w-full h-[300px] mb-1"
                  alt="category-photo"
                />
                <div className="category-caption">
                  <h3 className="text-emerald-400 mb-2 font-bold text-sm">
                    {category?.name}
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
