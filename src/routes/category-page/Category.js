import React, { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import ProductCard from "../../components/productCard/ProductCard";

import { CategoriesContext } from "../../contexts/categoriesContext";

import "./Category.styles.scss";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);

  const [prodcuts, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <h2 style={{ textAlign: "center", textTransform: "capitalize" }}>
        {category}
      </h2>
      <div className="category-page-container">
        {prodcuts &&
          prodcuts.map((prodcut) => (
            <ProductCard key={prodcut.id} product={prodcut} />
          ))}
      </div>
    </>
  );
};

export default Category;
