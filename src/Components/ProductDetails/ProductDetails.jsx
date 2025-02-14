import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  let { id, category } = useParams();
  let { addToCart, Loading, currentId } = useContext(CartContext);

  console.log(id);

  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        // console.log(res.data.data);
        setProductDetails(res.data.data);
      })
      .catch((res) => {
        // console.log(res);
        toast.error("Error To Get Product");
      });
  }

  function getRelatedProduct() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((res) => {
      let Related = res.data.data.filter(
        (product) => product.category.name == category
      );
      setRelatedProducts(Related);
    });
  }

  useEffect(() => {
    getProduct(id);
    getRelatedProduct();
  }, [id, category]);

  return (
    <>
      <div className="row items-center py-5">
        <div className="w-1/4">
          <img
            src={productDetails?.imageCover}
            className="w-full"
            alt="item-photo"
          />
        </div>
        <div className="w-3/4 p-4 my-5">
          <h3 className="font-bold text-2xl mb-4">{productDetails?.title}</h3>
          <h4 className="font-thin text-slate-600 mb-3">
            {productDetails?.description}
          </h4>
          <span className="font-bold text-emerald-500 block mb-3">
            {productDetails?.category.name}
          </span>
          <div className="product-details flex justify-between items-center my-5">
            <span className="text-sm">{productDetails?.price} EGP</span>
            <span>
              <i className="fa-solid fa-star text-sm text-yellow-400"></i>
              {productDetails?.ratingsAverage}
            </span>
          </div>
          <div
            onClick={() => addToCart(productDetails?.id)}
            className="add-btn bg-emerald-400 p-2 rounded-md flex justify-center items-center cursor-pointer text-slate-200 hover:bg-emerald-600 transition-all duration-400"
          >
            {Loading && currentId == productDetails?.id ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Add To Cart"
            )}
          </div>
        </div>
      </div>
      <div className="row">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <div
              key={product.id}
              className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 p-3"
            >
              <div className="product shadow-md p-2 rounded-md">
                <Link
                  to={`/productDetails/${product.id}/${product.category.name}`}
                >
                  <img
                    src={product.imageCover}
                    className="w-full mb-1"
                    alt="product-photo"
                  />
                  <div className="product-caption">
                    <h3 className="text-emerald-400 mb-2 font-bold text-sm">
                      {product.category.name}
                    </h3>
                    <p className="mb-1 text-sm">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </p>
                    <div className="product-details flex justify-between items-center mb-2">
                      <span className="text-sm">{product.price} EGP</span>
                      <span>
                        <i className="fa-solid fa-star text-sm text-yellow-400"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </div>
                </Link>
                <div
                  onClick={() => addToCart(product.id)}
                  className="add-btn bg-emerald-400 p-2 rounded-md flex justify-center items-center cursor-pointer text-slate-200 hover:bg-emerald-600 transition-all duration-400"
                >
                  {Loading && currentId == product.id ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    "Add To Cart"
                  )}
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
