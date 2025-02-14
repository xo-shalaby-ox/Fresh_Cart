import React from "react";
import imageNotFound from "../../assets/notFound.webp";

export default function Notfound() {
  return (
    <div className="flex justify-center items-center">
      <img src={imageNotFound} alt="notFoundPage" />
    </div>
  );
}
