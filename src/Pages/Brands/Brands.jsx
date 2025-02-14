import React from "react";
import useBrands from "./../../Components/Hooks/useBrands";
import { Link } from "react-router-dom";

export default function Brands() {
  let { data, isError, error, isLoading } = useBrands();

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
        {data.map((brand) => (
          <div key={brand._id} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-3">
            <div className="brand-item shadow-md border rounded-lg border-slate-300">
              <Link to={`/brandsDetails/${brand._id}`}>
                <img className="w-full" src={brand.image} alt={brand.name} />
              </Link>
              <h3 className="text-center p-2 text-emerald-500">{brand.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
