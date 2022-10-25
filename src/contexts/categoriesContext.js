import { createContext, useEffect, useState } from "react";

import SHOP_DATA from "../utils/shopData.js";

const getCategoriesMap = () => {
  const categoryMap = SHOP_DATA.reduce((acc, categoryObj) => {
    const { title, items } = categoryObj;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    setCategoriesMap(getCategoriesMap());
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
